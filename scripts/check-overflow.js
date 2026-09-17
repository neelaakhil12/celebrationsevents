const fs = require('fs');

const html = fs.readFileSync('marketplace.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

const classMatches = [...html.matchAll(/class="([^"]+)"/g)];
const classes = new Set();
classMatches.forEach(m => m[1].split(/\s+/).forEach(c => classes.add(c)));

console.log('Total classes in marketplace.html:', classes.size);

const suspicious = [];
for (const cls of classes) {
  const reg = new RegExp('\\.' + cls + '\\s*\\{([^}]+)\\}', 'g');
  let match;
  while ((match = reg.exec(css)) !== null) {
    const body = match[1];
    if (/min-width:\s*([2-9]\d{2}|\d{4,})px/i.test(body) || /width:\s*([3-9]\d{2}|\d{4,})px/i.test(body)) {
      suspicious.push({ cls, body: body.replace(/\s+/g, ' ').trim() });
    }
  }
}
console.log('Suspicious classes with fixed/min width:', suspicious);
