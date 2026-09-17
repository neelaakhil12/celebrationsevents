const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname + '/..').filter(f => f.endsWith('.html'));
let count = 0;

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace <div style="display: flex; align-items: center; gap: ..."> before header-nav-link
  const beforeNav = content;
  content = content.replace(
    /<div style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*[0-9]+px;">\s*(?=\s*<a[^>]*class="header-nav-link")/g,
    '<div class="header-nav-desktop">\n        '
  );
  if (content !== beforeNav) {
    changed = true;
  }

  // Also replace header-wa-btn inline style
  if (content.includes('header-wa-btn')) {
    const beforeWa = content;
    content = content.replace(
      /class="header-wa-btn"\s+style="[^"]*"/g,
      'class="header-wa-btn"'
    );
    if (content !== beforeWa) {
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log('Updated:', file);
  }
}

console.log('Finished! Updated files:', count);
