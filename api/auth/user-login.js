const {
  setCors,
  parseBody,
  sendJson,
  getUserFromSupabase
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

    if (!email || !password) {
      return sendJson(res, 400, { success: false, error: 'Please enter both email and password.' });
    }

    // Query user directly from Supabase
    const user = await getUserFromSupabase(email);
    if (!user || user.password !== password) {
      return sendJson(res, 401, {
        success: false,
        error: 'Invalid email or password. Please verify your details or use Forgot Password.'
      });
    }

    return sendJson(res, 200, {
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone || '' },
      message: `Welcome back, ${user.name || 'Customer'}!`
    });
  } catch (err) {
    return sendJson(res, 400, { success: false, error: err.message });
  }
};
