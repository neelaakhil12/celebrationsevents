const { setCors, sendJson } = require('../lib/shared');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  let result = {};

  try {
    const dataFilePath = path.join(process.cwd(), 'admin-data.json');
    if (fs.existsSync(dataFilePath)) {
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      result = JSON.parse(content);
    }
  } catch (e) {
    console.warn('[Vercel API] Reading admin-data.json error:', e.message);
  }

  // Fetch latest reviews and announcement bar from Supabase to guarantee real-time sync on Vercel
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
    const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?id=in.(__site_reviews__,__site_announcement__,__site_cities__)`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (sbRes.ok) {
      const rows = await sbRes.json();
      if (Array.isArray(rows)) {
        const revRow = rows.find(r => r.id === '__site_reviews__');
        if (revRow && revRow.desc) {
          result.reviews = JSON.parse(revRow.desc);
        }
        const annRow = rows.find(r => r.id === '__site_announcement__');
        if (annRow && annRow.desc) {
          result.announcement = JSON.parse(annRow.desc);
          result.announcementBar = result.announcement;
        }
        const citiesRow = rows.find(r => r.id === '__site_cities__');
        if (citiesRow && citiesRow.desc) {
          result.cities = JSON.parse(citiesRow.desc);
        }
      }
    }
  } catch(sbErr) {
    // Non-blocking fallback to local result
  }

  return sendJson(res, 200, result);
};
