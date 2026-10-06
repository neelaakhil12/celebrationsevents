const {
  setCors,
  parseBody,
  sendJson,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASS
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
    const email = (payload.email || '').trim().toLowerCase();
    const password = payload.password || '';

    if (email !== DEFAULT_ADMIN_EMAIL) {
      return sendJson(res, 403, {
        success: false,
        error: 'Access restricted: Only authorized administrator can access Admin Studio.'
      });
    }

    if (password !== DEFAULT_ADMIN_PASS) {
      return sendJson(res, 401, {
        success: false,
        error: 'Incorrect administrator password. Please check your password or use Reset Password.'
      });
    }

    return sendJson(res, 200, {
      success: true,
      user: { email: DEFAULT_ADMIN_EMAIL, role: 'admin' },
      message: 'Admin login successful.'
    });
  } catch (err) {
    return sendJson(res, 400, { success: false, error: err.message });
  }
};
