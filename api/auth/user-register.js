const {
  setCors,
  parseBody,
  sendJson,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
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
    const name = (payload.name || '').trim();
    const email = (payload.email || '').trim().toLowerCase();
    const phone = (payload.phone || '').trim();
    const password = payload.password || '';

    if (!name || !email || !password) {
      return sendJson(res, 400, { success: false, error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return sendJson(res, 400, { success: false, error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await getUserFromSupabase(email);
    if (existingUser) {
      return sendJson(res, 400, {
        success: false,
        error: 'An account with this email already exists. Please sign in or reset your password.'
      });
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      phone,
      password,
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert user into Supabase
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(newUser)
    });

    if (!insertRes.ok) {
      const errData = await insertRes.text();
      console.warn('[Supabase] Failed to insert user into Supabase:', errData);
    }

    return sendJson(res, 200, {
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
      message: 'Account created successfully!'
    });
  } catch (err) {
    return sendJson(res, 400, { success: false, error: err.message });
  }
};
