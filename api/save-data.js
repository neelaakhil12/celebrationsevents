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
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'admin-data.json');
      if (payload && typeof payload === 'object') {
        let existing = {};
        if (fs.existsSync(filePath)) {
          try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch(e){}
        }
        const merged = { ...existing, ...payload };
        if (payload.deletedItems || existing.deletedItems) {
          const delProds = new Set([...(existing.deletedItems?.products || []), ...(payload.deletedItems?.products || [])]);
          const delBlogs = new Set([...(existing.deletedItems?.blogs || []), ...(payload.deletedItems?.blogs || [])]);
          const delCats = new Set([...(existing.deletedItems?.categories || []), ...(payload.deletedItems?.categories || [])]);
          merged.deletedItems = {
            products: Array.from(delProds),
            blogs: Array.from(delBlogs),
            categories: Array.from(delCats)
          };
          if (Array.isArray(merged.products)) merged.products = merged.products.filter(p => !delProds.has(p.id));
          if (Array.isArray(merged.blogs)) merged.blogs = merged.blogs.filter(b => !delBlogs.has(b.id));
          if (Array.isArray(merged.categories)) merged.categories = merged.categories.filter(c => !delCats.has(c.id));
        }
        fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
      }
    } catch(fsErr) {
      // In read-only serverless environment (e.g. Vercel), client uses Supabase & localStorage
    }

    // Persist reviews to Supabase Cloud directly from API
    if (payload && Array.isArray(payload.reviews)) {
      try {
        const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
        const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
        await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: '__site_reviews__',
            name: 'Customer Reviews and Photos',
            image: '',
            desc: JSON.stringify(payload.reviews)
          })
        });
      } catch (sbErr) {
        console.warn('[Vercel API save-data] Supabase reviews sync warning:', sbErr.message);
      }
    }

    // Persist top announcement bar to Supabase Cloud directly from API
    if (payload && payload.announcement && typeof payload.announcement === 'object') {
      try {
        const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
        const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
        await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: '__site_announcement__',
            name: 'Site Top Announcement Bar & Ticker Configuration',
            image: '',
            desc: JSON.stringify(payload.announcement)
          })
        });
      } catch (sbErr) {
        console.warn('[Vercel API save-data] Supabase announcement sync warning:', sbErr.message);
      }
    }

    // Persist operating cities to Supabase Cloud directly from API
    if (payload && Array.isArray(payload.cities)) {
      try {
        const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
        const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';
        await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: '__site_cities__',
            name: 'Operating Cities and Locations',
            image: '',
            desc: JSON.stringify(payload.cities)
          })
        });
      } catch (sbErr) {
        console.warn('[Vercel API save-data] Supabase cities sync warning:', sbErr.message);
      }
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Data saved successfully.',
      data: payload
    });
  } catch (err) {
    return sendJson(res, 500, { success: false, error: err.message });
  }
};
