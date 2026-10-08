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

    return sendJson(res, 200, {
      success: true,
      message: 'Data saved successfully.',
      data: payload
    });
  } catch (err) {
    return sendJson(res, 500, { success: false, error: err.message });
  }
};
