const fs = require('fs');

const files = ['kids.html', 'birthday.html', 'baby-shower.html', 'anniversary.html', 'corporate.html', 'index.html'];
const requiredIds = [
  'productModalOverlay', 'modalProductBadge', 'modalProductMainImg',
  'modalCategoryPill', 'modalRating', 'modalProductTitle', 'modalProductDesc',
  'modalCurrentPrice', 'modalOriginalPrice', 'modalDiscount', 'modalDeliveringCity',
  'bookingDateInput', 'slotPickerGrid', 'modalIncludedCount', 'modalInclusionsGrid',
  'modalTabDuration', 'modalAboutPackageBody', 'addonsCardsSlider',
  'modalCalcBasePrice', 'modalGrandTotal', 'closePackageBtn', 'pkgRelatedSection'
];

let allPassed = true;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('fullscreen-pkg-overlay')) {
    console.error(f + ' is MISSING fullscreen-pkg-overlay class!');
    allPassed = false;
  }
  const missing = [];
  for (const id of requiredIds) {
    if (!content.includes('id="' + id + '"')) {
      missing.push(id);
    }
  }
  if (missing.length > 0) {
    console.error(f + ' missing IDs: ' + missing.join(', '));
    allPassed = false;
  } else {
    console.log(f + ': ALL ' + requiredIds.length + ' package elements verified OK!');
  }
}

// Wedding page check
const weddingContent = fs.readFileSync('wedding.html', 'utf8');
if (weddingContent.includes('weddingServiceDetailModal') && weddingContent.includes('closeWeddingServiceBtn')) {
  console.log('wedding.html: weddingServiceDetailModal with back button verified OK!');
} else {
  console.error('wedding.html check FAILED!');
  allPassed = false;
}

if (allPassed) {
  console.log('\n>>> SUCCESS: All category pages and wedding page have verified full-screen layout! <<<');
} else {
  process.exit(1);
}
