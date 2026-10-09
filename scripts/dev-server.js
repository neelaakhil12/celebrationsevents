const http = require('http');
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.warn('⚠️ nodemailer module not found:', e.message);
}

const ROOT_DIR = path.resolve(__dirname, '..');

// Simple .env Loader
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        const key = k.trim();
        const val = v.join('=').trim().replace(/^['"](.*)['"]$/, '$1');
        process.env[key] = val;
      }
    });
  }
}
loadEnv();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

// Data Store Helpers
function getAdminData() {
  const dataFilePath = path.join(ROOT_DIR, 'admin-data.json');
  if (fs.existsSync(dataFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveAdminData(data) {
  const dataFilePath = path.join(ROOT_DIR, 'admin-data.json');
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

  // Also sync to data.js so local dev and Vercel git deploys are 100% in sync
  try {
    const dataJsPath = path.join(ROOT_DIR, 'data.js');
    if (fs.existsSync(dataJsPath)) {
      let currentSiteData = {};
      try {
        const fileContent = fs.readFileSync(dataJsPath, 'utf-8');
        const match = fileContent.match(/const\s+SITE_DATA\s*=\s*(\{[\s\S]*?\});?\s*(?:if\s*\(typeof|$)/);
        if (match) {
          currentSiteData = JSON.parse(match[1]);
        }
      } catch (e) {}

      const merged = { ...currentSiteData, ...data };
      if (data.announcement) merged.announcementBar = data.announcement;
      const outputCode = `const SITE_DATA = ${JSON.stringify(merged, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.SITE_DATA = SITE_DATA;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = SITE_DATA;\n}\n`;
      fs.writeFileSync(dataJsPath, outputCode, 'utf-8');
    }
  } catch (err) {
    console.warn('Could not sync data.js:', err.message);
  }
}

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'kishorek80192@gmail.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASS = 'admin123';

function getAdminCredentials() {
  const data = getAdminData();
  if (data.adminAuth && data.adminAuth.email) {
    return {
      email: data.adminAuth.email.toLowerCase().trim(),
      password: data.adminAuth.password || DEFAULT_ADMIN_PASS
    };
  }
  return {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASS
  };
}

// Mail Transporter
function getMailTransporter() {
  if (!nodemailer) {
    try {
      nodemailer = require('nodemailer');
    } catch (e) {
      return null;
    }
  }
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'kishorek80192@gmail.com';
  const rawPass = process.env.SMTP_PASSWORD || '';
  const pass = rawPass.replace(/\s+/g, '');

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: { user, pass }
  });
}

// In-Memory OTP Store: key = `${role}:${normalizedEmail}`, value = { code, expiresAt }
const otpStore = new Map();

// Periodically clean up expired OTPs
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of otpStore.entries()) {
    if (value.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}, 60000);

// Helper to read JSON request body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', err => reject(err));
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let safePath = req.url.split('?')[0];

  // API: Return Public Client Config
  if (req.method === 'GET' && safePath === '/api/config') {
    sendJson(res, 200, {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'gu0q1mxy',
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
      adminEmail: DEFAULT_ADMIN_EMAIL
    });
    return;
  }

  // API: Get Admin Info (for prefill and restriction checks)
  if (req.method === 'GET' && safePath === '/api/auth/admin-info') {
    sendJson(res, 200, {
      adminEmail: DEFAULT_ADMIN_EMAIL
    });
    return;
  }

  // API: Admin Login
  if (req.method === 'POST' && safePath === '/api/auth/admin-login') {
    try {
      const payload = await parseJsonBody(req);
      const email = (payload.email || '').trim().toLowerCase();
      const password = payload.password || '';

      if (email !== DEFAULT_ADMIN_EMAIL) {
        sendJson(res, 403, {
          success: false,
          error: `Access restricted: Only authorized administrator email (${DEFAULT_ADMIN_EMAIL}) can access Admin Studio.`
        });
        return;
      }

      const storedAuth = getAdminCredentials();
      if (password !== storedAuth.password) {
        sendJson(res, 401, {
          success: false,
          error: 'Incorrect administrator password. Please check your password or use Reset Password.'
        });
        return;
      }

      sendJson(res, 200, {
        success: true,
        user: { email: DEFAULT_ADMIN_EMAIL, role: 'admin' },
        message: 'Admin login successful.'
      });
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
    }
    return;
  }

  // API: User Login
  if (req.method === 'POST' && safePath === '/api/auth/user-login') {
    try {
      const payload = await parseJsonBody(req);
      const email = (payload.email || '').trim().toLowerCase();
      const password = payload.password || '';

      if (!email || !password) {
        sendJson(res, 400, { success: false, error: 'Please enter both email and password.' });
        return;
      }

      const data = getAdminData();
      const users = data.users || [];
      const user = users.find(u => (u.email || '').toLowerCase() === email);

      if (!user || user.password !== password) {
        sendJson(res, 401, {
          success: false,
          error: 'Invalid email or password. Please verify your details or use Forgot Password.'
        });
        return;
      }

      sendJson(res, 200, {
        success: true,
        user: { name: user.name, email: user.email, phone: user.phone || '' },
        message: 'Welcome back, ' + user.name + '!'
      });
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
    }
    return;
  }

  // API: User Register
  if (req.method === 'POST' && safePath === '/api/auth/user-register') {
    try {
      const payload = await parseJsonBody(req);
      const name = (payload.name || '').trim();
      const email = (payload.email || '').trim().toLowerCase();
      const phone = (payload.phone || '').trim();
      const password = payload.password || '';

      if (!name || !email || !password) {
        sendJson(res, 400, { success: false, error: 'Name, email, and password are required.' });
        return;
      }
      if (password.length < 6) {
        sendJson(res, 400, { success: false, error: 'Password must be at least 6 characters long.' });
        return;
      }

      const data = getAdminData();
      const users = data.users || [];
      if (users.some(u => (u.email || '').toLowerCase() === email)) {
        sendJson(res, 400, {
          success: false,
          error: 'An account with this email already exists. Please sign in or reset your password.'
        });
        return;
      }

      const newUser = {
        id: 'usr_' + Date.now(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      data.users = users;
      saveAdminData(data);

      sendJson(res, 200, {
        success: true,
        user: { name, email, phone },
        message: 'Account created successfully!'
      });
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
    }
    return;
  }

  // API: Send Password Reset OTP via SMTP
  if (req.method === 'POST' && safePath === '/api/auth/send-otp') {
    try {
      const payload = await parseJsonBody(req);
      const role = (payload.role || 'user').toLowerCase().trim();
      const email = (payload.email || '').trim().toLowerCase();

      if (!email) {
        sendJson(res, 400, { success: false, error: 'Email address is required.' });
        return;
      }

      // Check admin email restriction
      if (role === 'admin' && email !== DEFAULT_ADMIN_EMAIL) {
        sendJson(res, 403, {
          success: false,
          error: `Access restricted: Only authorized administrator email (${DEFAULT_ADMIN_EMAIL}) can reset admin credentials.`
        });
        return;
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpKey = `${role}:${email}`;
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
      otpStore.set(otpKey, { code: otp, expiresAt, role });

      // Create Mail Transporter
      const transporter = getMailTransporter();
      if (!transporter) {
        sendJson(res, 500, {
          success: false,
          error: 'Email transporter is not available on server.'
        });
        return;
      }

      const fromAddress = process.env.SMTP_FROM || `"Celebration Events" <${process.env.SMTP_USER || 'kishorek80192@gmail.com'}>`;
      const isRoleAdmin = role === 'admin';

      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #d81b60 0%, #be123c 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 38px; margin-bottom: 6px;">🎈</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Celebration Events</h1>
            <p style="margin: 6px 0 0; opacity: 0.92; font-size: 13.5px; font-weight: 500;">
              ${isRoleAdmin ? 'Administrator Security Portal' : 'Customer Account Verification'}
            </p>
          </div>
          <div style="padding: 32px 28px; text-align: center;">
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">
              ${isRoleAdmin ? 'Admin Password Reset Request' : 'Password Reset Request'}
            </h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
              We received a request to reset your password. Use the 6-digit verification code below to authorize this request:
            </p>
            <div style="display: inline-block; font-size: 34px; font-weight: 800; letter-spacing: 7px; color: #d81b60; background: #fff1f2; border: 2px dashed #f43f5e; padding: 14px 28px; border-radius: 12px; margin: 10px 0 24px; font-family: 'Courier New', Courier, monospace;">
              ${otp}
            </div>
            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px; line-height: 1.5;">
              ⏱️ This code will expire in <strong>10 minutes</strong>.
            </p>
            <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.4;">
              If you did not request this verification code, please ignore this email or reach out to support immediately.
            </p>
          </div>
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
            &copy; ${new Date().getFullYear()} Celebration Events. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `;

      await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `🔐 Celebration Events - ${isRoleAdmin ? 'Admin ' : ''}Password Reset Code: ${otp}`,
        text: `Your Celebration Events verification code is: ${otp}. This code is valid for 10 minutes.`,
        html: emailHtml
      });

      console.log(`✅ Reset OTP sent successfully to ${email} (Role: ${role})`);
      const hmacSecret = process.env.HMAC_SECRET || 'celebration_events_secure_otp_salt_2026';
      const token = `${expiresAt}.${crypto.createHmac('sha256', hmacSecret).update(`${role}:${email}:${otp}:${expiresAt}`).digest('hex')}`;
      sendJson(res, 200, {
        success: true,
        message: `Verification code sent to ${email}. Please check your inbox.`,
        token: token
      });
    } catch (err) {
      console.error('❌ Error sending OTP mail:', err);
      sendJson(res, 500, {
        success: false,
        error: 'Failed to send verification email. Error: ' + err.message
      });
    }
    return;
  }

  // API: Verify Reset Password OTP & Update Password
  if (req.method === 'POST' && safePath === '/api/auth/verify-reset-password') {
    try {
      const payload = await parseJsonBody(req);
      const role = (payload.role || 'user').toLowerCase().trim();
      const email = (payload.email || '').trim().toLowerCase();
      const otp = (payload.otp || '').trim();
      const newPassword = payload.newPassword || '';
      const token = payload.token || '';

      if (!email || !otp || !newPassword) {
        sendJson(res, 400, { success: false, error: 'Email, verification code, and new password are required.' });
        return;
      }

      if (newPassword.length < 6) {
        sendJson(res, 400, { success: false, error: 'New password must be at least 6 characters long.' });
        return;
      }

      const otpKey = `${role}:${email}`;
      let record = otpStore.get(otpKey);

      if (!record && token && token.includes('.')) {
        const [exp, hash] = token.split('.');
        const hmacSecret = process.env.HMAC_SECRET || 'celebration_events_secure_otp_salt_2026';
        const expected = crypto.createHmac('sha256', hmacSecret).update(`${role}:${email}:${otp}:${exp}`).digest('hex');
        if (hash === expected) {
          record = { code: otp, expiresAt: Number(exp) };
        }
      }

      if (!record) {
        sendJson(res, 400, {
          success: false,
          error: 'No active verification code found for this email. Please request a new code.'
        });
        return;
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(otpKey);
        sendJson(res, 400, {
          success: false,
          error: 'Verification code has expired. Please request a new code.'
        });
        return;
      }

      if (record.code !== otp) {
        sendJson(res, 400, {
          success: false,
          error: 'Incorrect verification code. Please check your email and try again.'
        });
        return;
      }

      // Valid OTP: perform password update
      const data = getAdminData();
      if (role === 'admin') {
        data.adminAuth = {
          email: DEFAULT_ADMIN_EMAIL,
          password: newPassword,
          updatedAt: new Date().toISOString()
        };
        saveAdminData(data);
        otpStore.delete(otpKey);
        console.log(`🔑 Admin password updated successfully for ${DEFAULT_ADMIN_EMAIL}`);
        sendJson(res, 200, {
          success: true,
          message: 'Admin password has been reset successfully! You can now log in.'
        });
        return;
      } else {
        const users = data.users || [];
        const userIndex = users.findIndex(u => (u.email || '').toLowerCase() === email);
        if (userIndex >= 0) {
          users[userIndex].password = newPassword;
          users[userIndex].updatedAt = new Date().toISOString();
        } else {
          users.push({
            id: 'usr_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            password: newPassword,
            createdAt: new Date().toISOString()
          });
        }
        data.users = users;
        saveAdminData(data);
        otpStore.delete(otpKey);
        console.log(`🔑 User password updated successfully for ${email}`);
        sendJson(res, 200, {
          success: true,
          message: 'Password reset successfully! You can now log in with your new password.'
        });
        return;
      }
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
    }
    return;
  }

  // API: Upload Image to Cloudinary (using user API Key & Secret)
  if (req.method === 'POST' && safePath === '/api/upload-image') {
    try {
      const payload = await parseJsonBody(req);
      const imageBase64 = payload.image || payload.file;
      const folder = payload.folder || 'celebration-events';

      if (!imageBase64) {
        sendJson(res, 400, { success: false, error: 'No image provided in request body.' });
        return;
      }

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'gu0q1mxy';
      const apiKey = process.env.CLOUDINARY_API_KEY || '635343183418351';
      const apiSecret = process.env.CLOUDINARY_API_SECRET || 'BZsd1wCOaGG5_rgajoI5A0OLodc';

      const timestamp = Math.round(Date.now() / 1000);
      const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

      const postData = JSON.stringify({
        file: imageBase64,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
        folder: folder
      });

      const cReq = https.request({
        hostname: 'api.cloudinary.com',
        path: `/v1_1/${cloudName}/image/upload`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (cRes) => {
        let cBody = '';
        cRes.on('data', cChunk => { cBody += cChunk; });
        cRes.on('end', () => {
          try {
            const cParsed = JSON.parse(cBody);
            if (cRes.statusCode >= 200 && cRes.statusCode < 300) {
              sendJson(res, 200, {
                success: true,
                url: cParsed.secure_url || cParsed.url,
                publicId: cParsed.public_id,
                format: cParsed.format,
                bytes: cParsed.bytes
              });
            } else {
              sendJson(res, cRes.statusCode || 500, {
                success: false,
                error: cParsed.error?.message || 'Cloudinary upload failed'
              });
            }
          } catch (err) {
            sendJson(res, 500, { success: false, error: err.message });
          }
        });
      });

      cReq.on('error', (err) => {
        sendJson(res, 500, { success: false, error: err.message });
      });

      cReq.write(postData);
      cReq.end();
    } catch (e) {
      sendJson(res, 400, { success: false, error: 'Invalid JSON request payload' });
    }
    return;
  }

  // API: Save custom data to disk backup
  if (req.method === 'POST' && safePath === '/api/save-data') {
    try {
      const payload = await parseJsonBody(req);
      const existing = getAdminData();
      const merged = { ...existing, ...payload };
      if (payload.deletedItems || existing.deletedItems) {
        const delProds = new Set([...(existing.deletedItems?.products || []), ...(payload.deletedItems?.products || [])]);
        const delBlogs = new Set([...(existing.deletedItems?.blogs || []), ...(payload.deletedItems?.blogs || [])]);
        const delCats = new Set([...(existing.deletedItems?.categories || []), ...(payload.deletedItems?.categories || [])]);
        merged.deletedItems = {
          products: Array.from(delProds),
          blogs: Array.from(delBlogs),
          categories: Array.from(delCats)
        };
        if (Array.isArray(merged.products)) merged.products = merged.products.filter(p => !delProds.has(p.id));
        if (Array.isArray(merged.blogs)) merged.blogs = merged.blogs.filter(b => !delBlogs.has(b.id));
        if (Array.isArray(merged.categories)) merged.categories = merged.categories.filter(c => !delCats.has(c.id));
      saveAdminData(merged);

      // Also persist reviews directly to Supabase from localhost dev-server
      if (payload && Array.isArray(payload.reviews)) {
        try {
          const sUrl = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
          const sKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
          await fetch(`${sUrl}/rest/v1/categories`, {
            method: 'POST',
            headers: {
              'apikey': sKey,
              'Authorization': `Bearer ${sKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
              id: '__site_reviews__',
              name: 'Customer Reviews and Photos',
              image: '',
              desc: JSON.stringify(payload.reviews)
            })
          });
        } catch(sbErr) {
          console.warn('[dev-server save-data] Supabase review sync warning:', sbErr.message);
        }
      }

      // Also persist announcement directly to Supabase from localhost dev-server
      if (payload && payload.announcement && typeof payload.announcement === 'object') {
        try {
          const sUrl = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
          const sKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
          await fetch(`${sUrl}/rest/v1/categories`, {
            method: 'POST',
            headers: {
              'apikey': sKey,
              'Authorization': `Bearer ${sKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
              id: '__site_announcement__',
              name: 'Site Top Announcement Bar & Ticker Configuration',
              image: '',
              desc: JSON.stringify(payload.announcement)
            })
          });
        } catch(sbErr) {
          console.warn('[dev-server save-data] Supabase announcement sync warning:', sbErr.message);
        }
      }

      sendJson(res, 200, { success: true, message: 'Data saved successfully to disk.' });
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message });
    }
    return;
  }

  // API: Fetch saved data from disk backup
  if (req.method === 'GET' && safePath === '/api/data') {
    const data = getAdminData();
    sendJson(res, 200, data);
    return;
  }

  // Handle route aliases
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  } else if (safePath === '/admin' || safePath === '/admin/') {
    safePath = '/admin/index.html';
  }

  let filePath = path.join(ROOT_DIR, safePath);

  // If path points to a directory, check for index.html inside
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const indexCandidate = path.join(filePath, 'index.html');
      if (fs.existsSync(indexCandidate)) {
        filePath = indexCandidate;
        safePath = path.join(safePath, 'index.html');
      }
    }
  } catch (e) {}

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const htmlPath = filePath + '.html';
        fs.readFile(htmlPath, (htmlErr, htmlContent) => {
          if (!htmlErr) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            const len = Buffer.isBuffer(htmlContent) ? htmlContent.length : Buffer.byteLength(htmlContent);
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Content-Length': len
            });
            res.end(htmlContent);
            return;
          }

          // Check if requested path matches an existing category slug
          const slugCandidate = safePath.replace(/^\//, '').replace(/\.html$/, '').toLowerCase();
          const adminData = getAdminData();
          if (adminData.categories && adminData.categories.some(c => c.id && c.id.toLowerCase() === slugCandidate)) {
            res.writeHead(302, { 'Location': `/category.html?id=${encodeURIComponent(slugCandidate)}` });
            res.end();
            return;
          }

          // 404 fallback to index.html
          fs.readFile(path.join(ROOT_DIR, 'index.html'), (fallbackErr, fallbackContent) => {
            if (fallbackErr) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            } else {
              const len = Buffer.isBuffer(fallbackContent) ? fallbackContent.length : Buffer.byteLength(fallbackContent);
              res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': len
              });
              res.end(fallbackContent);
            }
          });
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      const len = Buffer.isBuffer(content) ? content.length : Buffer.byteLength(content);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': len
      });
      res.end(content);
    }
  });
});

function startServer(port, maxTries = 10) {
  server.listen(port, () => {
    console.log('\n====================================================');
    console.log(`🎉 Celebration Events Server is running!`);
    console.log(`👉 Local:   http://localhost:${port}/`);
    console.log(`👉 Admin:   http://localhost:${port}/admin`);
    console.log(`👉 Admin Email: ${DEFAULT_ADMIN_EMAIL}`);
    console.log('====================================================\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && maxTries > 0) {
      console.log(`Port ${port} is in use, trying http://localhost:${port + 1}...`);
      startServer(port + 1, maxTries - 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
startServer(DEFAULT_PORT);
