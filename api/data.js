const { setCors, sendJson } = require('./_shared');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const dataFilePath = path.join(process.cwd(), 'admin-data.json');
    if (fs.existsSync(dataFilePath)) {
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      return sendJson(res, 200, JSON.parse(content));
    }
  } catch (e) {
    console.warn('[Vercel API] Reading admin-data.json error:', e.message);
  }

  return sendJson(res, 200, {});
};
