const nodemailer = require('nodemailer');
const crypto = require('crypto');

const HMAC_SECRET = process.env.HMAC_SECRET || 'celebration_events_secure_otp_salt_2026';

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'kishorek80192@gmail.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

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

module.exports = {
  HMAC_SECRET,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASS,
  setCors,
  parseBody,
  sendJson,
  getMailTransporter,
  generateOtpToken,
  verifyOtpToken
};
