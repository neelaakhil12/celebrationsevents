const {
  setCors,
  sendJson,
  DEFAULT_ADMIN_EMAIL
} = require('./_shared');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  return sendJson(res, 200, {
    supabaseUrl: process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ',
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'gu0q1mxy',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '635343183418351',
    adminEmail: DEFAULT_ADMIN_EMAIL
  });
};
