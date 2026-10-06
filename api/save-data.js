const { setCors, parseBody, sendJson } = require('../lib/shared');

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
    // In serverless environments, file persistence is ephemeral; the client saves to localStorage & Supabase
    return sendJson(res, 200, {
      success: true,
      message: 'Data saved successfully.',
      data: payload
    });
  } catch (err) {
    return sendJson(res, 500, { success: false, error: err.message });
  }
};
