const https = require('https');
const crypto = require('crypto');
const { setCors, parseBody, sendJson } = require('../lib/shared');

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'gu0q1mxy';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '635343183418351';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'BZsd1wCOaGG5_rgajoI5A0OLodc';

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
    const imageBase64 = payload.image || payload.file;
    const folder = payload.folder || 'celebration-events';

    if (!imageBase64) {
      return sendJson(res, 400, { success: false, error: 'No image provided in request body.' });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const strToSign = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

    const postData = JSON.stringify({
      file: imageBase64,
      api_key: CLOUDINARY_API_KEY,
      timestamp: timestamp,
      signature: signature,
      folder: folder
    });

    const result = await new Promise((resolve, reject) => {
      const cReq = https.request({
        hostname: 'api.cloudinary.com',
        path: `/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (cRes) => {
        let respData = '';
        cRes.on('data', chunk => { respData += chunk; });
        cRes.on('end', () => {
          try {
            const parsed = JSON.parse(respData);
            if (cRes.statusCode >= 200 && cRes.statusCode < 300 && parsed.secure_url) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.error?.message || `Cloudinary returned status ${cRes.statusCode}`));
            }
          } catch (e) {
            reject(new Error(`Invalid response from Cloudinary: ${respData}`));
          }
        });
      });

      cReq.on('error', reject);
      cReq.write(postData);
      cReq.end();
    });

    return sendJson(res, 200, {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (err) {
    console.error('[Cloudinary Upload Error]', err.message);
    return sendJson(res, 500, { success: false, error: err.message });
  }
};
