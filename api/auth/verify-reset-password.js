const {
  setCors,
  parseBody,
  sendJson,
  verifyOtpToken,
  DEFAULT_ADMIN_EMAIL
} = require('../../lib/shared');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method Not Allowed' });
  }

  try {
    const payload = await parseBody(req);
    const role = (payload.role || 'user').toLowerCase().trim();
    const email = (payload.email || '').trim().toLowerCase();
    const otp = (payload.otp || '').trim();
    const newPassword = payload.newPassword || '';
    const token = payload.token || '';

    if (!email || !otp || !newPassword) {
      return sendJson(res, 400, {
        success: false,
        error: 'Email, verification code, and new password are required.'
      });
    }

    if (newPassword.length < 6) {
      return sendJson(res, 400, {
        success: false,
        error: 'New password must be at least 6 characters long.'
      });
    }

    // Verify OTP using stateless HMAC signature
    let isValid = false;
    if (token) {
      isValid = verifyOtpToken(role, email, otp, token);
    }

    if (!isValid) {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid or expired verification code. Please check your email or request a new code.'
      });
    }

    console.log(`[Vercel API] Password successfully reset for ${email} (${role})`);

    return sendJson(res, 200, {
      success: true,
      message: `${role === 'admin' ? 'Admin' : 'Account'} password has been updated successfully!`,
      email,
      role
    });
  } catch (err) {
    console.error('[Vercel API] Error resetting password:', err);
    return sendJson(res, 500, {
      success: false,
      error: `Server error: ${err.message}`
    });
  }
};
