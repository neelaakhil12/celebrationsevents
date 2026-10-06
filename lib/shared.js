const nodemailer = require('nodemailer');
const crypto = require('crypto');

const HMAC_SECRET = process.env.HMAC_SECRET || 'celebration_events_secure_otp_salt_2026';

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'kishorek80192@gmail.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'kishorek80192@gmail.com';
  const rawPass = process.env.SMTP_PASSWORD || 'vwpejwhqlhhfnedy';
  const pass = rawPass.replace(/\s+/g, '');

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

function generateOtpToken(role, email, otp, expiresAt) {
  const hash = crypto.createHmac('sha256', HMAC_SECRET)
    .update(`${role}:${email}:${otp}:${expiresAt}`)
    .digest('hex');
  return `${expiresAt}.${hash}`;
}

function verifyOtpToken(role, email, otp, token) {
  if (!token || !token.includes('.')) return false;
  const [expiresAtStr, providedHash] = token.split('.');
  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const expectedHash = crypto.createHmac('sha256', HMAC_SECRET)
    .update(`${role}:${email}:${otp}:${expiresAt}`)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(providedHash), Buffer.from(expectedHash));
}

// -----------------------------------------------------------------------------
// Supabase Database Helpers
// -----------------------------------------------------------------------------
async function getAdminFromSupabase(email) {
  const normEmail = (email || '').toLowerCase().trim();
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_auth?email=eq.${encodeURIComponent(normEmail)}&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data[0];
    }
  } catch (e) {
    console.warn('[Supabase] getAdminFromSupabase error:', e.message);
  }
  return null;
}

async function updateAdminPasswordInSupabase(email, newPassword) {
  const normEmail = (email || '').toLowerCase().trim();
  try {
    // 1. Try PATCH existing record
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_auth?email=eq.${encodeURIComponent(normEmail)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        password: newPassword,
        updated_at: new Date().toISOString()
      })
    });
    if (patchRes.ok) {
      const patched = await patchRes.json();
      if (Array.isArray(patched) && patched.length > 0) return true;
    }

    // 2. If not found or table empty, UPSERT
    const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_auth`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: 'admin_primary',
        email: normEmail,
        password: newPassword,
        role: 'admin',
        updated_at: new Date().toISOString()
      })
    });
    return upsertRes.ok;
  } catch (e) {
    console.error('[Supabase] updateAdminPasswordInSupabase error:', e.message);
    return false;
  }
}

async function getUserFromSupabase(email) {
  const normEmail = (email || '').toLowerCase().trim();
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(normEmail)}&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data[0];
    }
  } catch (e) {
    console.warn('[Supabase] getUserFromSupabase error:', e.message);
  }
  return null;
}

async function updateUserPasswordInSupabase(email, newPassword) {
  const normEmail = (email || '').toLowerCase().trim();
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(normEmail)}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        password: newPassword,
        updated_at: new Date().toISOString()
      })
    });
    return res.ok;
  } catch (e) {
    console.error('[Supabase] updateUserPasswordInSupabase error:', e.message);
    return false;
  }
}

module.exports = {
  HMAC_SECRET,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASS,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  setCors,
  parseBody,
  sendJson,
  getMailTransporter,
  generateOtpToken,
  verifyOtpToken,
  getAdminFromSupabase,
  updateAdminPasswordInSupabase,
  getUserFromSupabase,
  updateUserPasswordInSupabase
};
