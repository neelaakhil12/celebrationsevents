/**
 * Celebration Events - Seed Initial Data to Supabase
 * Usage: node scripts/seed-supabase.js
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// Load .env
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [k, ...v] = trimmed.split('=');
      process.env[k.trim()] = v.join('=').trim().replace(/^['"](.*)['"]$/, '$1');
    }
  });
}

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wqnobkskmvilfhduvxsu.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ';

const dataPath = path.resolve(__dirname, '..', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Extract SITE_DATA
const siteData = require(dataPath);

console.log('----------------------------------------------------');
console.log('🚀 Supabase Seeding Script');
console.log('Target URL:', SUPABASE_URL);
console.log('Categories to sync:', siteData.categories.length);
console.log('Products to sync:', siteData.products.length);
console.log('----------------------------------------------------');

function makeRequest(method, table, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);

    const options = {
      method: method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body });
        } else {
          reject(new Error(`Status ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runSeed() {
  try {
    console.log('1. Uploading categories to Supabase...');
    const catPayload = siteData.categories.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon || '🎈',
      badge: c.badge || 'POPULAR',
      image: c.image,
      desc: c.desc || ''
    }));

    await makeRequest('POST', 'categories', catPayload);
    console.log('✅ Successfully seeded categories to Supabase!');

    console.log('2. Uploading products to Supabase...');
    const prodPayload = siteData.products.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      category_name: p.categoryName || p.category,
      price: p.price,
      original_price: p.originalPrice || p.price,
      discount: p.discount || 0,
      rating: p.rating || 4.9,
      reviews_count: p.reviewsCount || 100,
      badge: p.badge || 'BESTSELLER',
      setup_duration: p.setupDuration || '1.5 - 2 Hours',
      image: p.image,
      gallery: p.gallery || [p.image],
      description: p.description || '',
      inclusions: p.inclusions || [],
      tags: p.tags || []
    }));

    await makeRequest('POST', 'products', prodPayload);
    console.log('✅ Successfully seeded all products to Supabase!');
    console.log('🎉 Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    if (err.message.includes('404') || err.message.includes('PGRST205')) {
      console.log('\n💡 Tip: Please run the SQL schema in your Supabase dashboard first:');
      console.log('   File location: supabase-schema.sql');
      console.log('   Supabase SQL Editor: https://supabase.com/dashboard/project/wqnobkskmvilfhduvxsu/sql/new\n');
    }
  }
}

// Only run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = { runSeed };
