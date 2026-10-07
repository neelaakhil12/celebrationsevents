const fs = require('fs');
const path = require('path');
const SITE_DATA = require('../data.js');

const subcatMap = {
  'simple-balloon-decor-for-home': 'home',
  'rose-gold-birthday-home-decor': 'home',
  'adorable-birthday-arch-backdrop': 'arch',
  'blush-glow-birthday-theme': 'home',
  'boho-theme-birthday-decoration': 'luxury',
  'ballon-decoration': 'home',

  'red-anniversary-home-decor': 'canopy',
  'romantic-anniversary-room-celebration': 'room',
  'happy-anniversary-backdrop-decoration': 'grand',
  'cabana-canopy-terrace-decor': 'canopy',
  'anniversary-bliss-setup': 'ring',
  'anniversary-home-decoration': 'room',

  'cocomelon-kids-theme': 'cocomelon',
  'baby-shark-underwater-theme': 'babyshark',
  'boss-baby-theme-decor': 'bossbaby',
  'jungle-safari-kids-party': 'jungle',
  'frozen-wonderland-theme': 'frozen',

  'baby-shower-pastel-decor': 'shower',
  'newborn-welcome-baby-decor': 'welcome',
  'baby-shower-teddy-bear-theme': 'teddy',
  'baby-shower-teddy-cloud-cradle-decor': 'teddy',
  'baby-welcome-home-balloon-surprise': 'welcome',

  'house-decor': 'house-decor',
  'nalugu-snanam': 'nalugu-snanam',
  'function-hall-decor': 'mandap-stage',
  'catering': 'house-decor',
  'sangyam-sweets': 'house-decor',
  'photo-video': 'photo-video',
  'melam': 'melam-music',
  'special-events': 'melam-music',
  'musical-events': 'melam-music',
  'sangyam-bags': 'house-decor',
  'bridal-makeup': 'bridal-styling',
  'mehandi': 'bridal-styling',
  'sangeet': 'melam-music',

  'corporate-office-milestone-decor': 'office',
  'corporate-annual-day-grand-stage': 'stage',
  'corporate-product-launch-balloon-arch': 'office',
  'corporate-cubicle-bay-festive-decor': 'office',
  'corporate-executive-townhall-stage-backdrop': 'stage',

  'gift-01': 'girls',
  'gift-02': 'boys',
  'gift-03': 'women',
  'gift-04': 'men',
  'gift-05': 'flowers',
  'gift-06': 'cakes',
  'gift-07': 'boys',
  'gift-08': 'cakes',
  'gift-09': 'women',
  'gift-10': 'men',
  'gift-11': 'boys',
  'gift-12': 'boys'
};

SITE_DATA.products.forEach(p => {
  if (subcatMap[p.id]) {
    p.subcategory = subcatMap[p.id];
  }
});

// Also make sure ballon-decoration exists in SITE_DATA
const adminDataPath = path.join(__dirname, '..', 'admin-data.json');
const adminData = JSON.parse(fs.readFileSync(adminDataPath, 'utf8'));
const ballon = adminData.products.find(p => p.id === 'ballon-decoration');
if (ballon && !SITE_DATA.products.some(p => p.id === 'ballon-decoration')) {
  SITE_DATA.products.push(ballon);
}

const fileHeader = 'const SITE_DATA = ' + JSON.stringify(SITE_DATA, null, 2) + ';\n\n' +
  'if (typeof window !== "undefined") {\n' +
  '  window.SITE_DATA = SITE_DATA;\n' +
  '}\n\n' +
  'if (typeof module !== "undefined" && module.exports) {\n' +
  '  module.exports = SITE_DATA;\n' +
  '}\n';

const dataJsPath = path.join(__dirname, '..', 'data.js');
fs.writeFileSync(dataJsPath, fileHeader, 'utf8');
console.log('Successfully updated data.js with subcategories and full products!');
