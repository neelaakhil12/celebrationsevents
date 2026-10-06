const {
  setCors,
  sendJson,
  DEFAULT_ADMIN_EMAIL
} = require('../_shared');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  return sendJson(res, 200, {
    adminEmail: DEFAULT_ADMIN_EMAIL
  });
};
