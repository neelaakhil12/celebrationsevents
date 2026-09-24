const fs = require('fs');
const path = require('path');

const dir = __dirname + '/..';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('Found HTML files:', htmlFiles);

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check header-nav-desktop
  if (content.includes('header-nav-desktop')) {
    // Check if blog link is missing in header-nav-desktop
    const navMatch = content.match(/<div class="header-nav-desktop">([\s\S]*?)<\/div>/);
    if (navMatch && !navMatch[0].includes('blog.html')) {
      console.log('Updating file:', file);
      // Replace Contact with Contact and Blog
      let updatedNav = navMatch[0];
      if (file === 'blog.html' || file === 'blog-detail.html') {
        updatedNav = updatedNav.replace(
          /(<a href="contact\.html"[^>]*>Contact<\/a>)/,
          '$1\n        <a href="blog.html" class="header-nav-link active">Blog</a>'
        );
      } else {
        updatedNav = updatedNav.replace(
          /(<a href="contact\.html"[^>]*>Contact<\/a>)/,
          '$1\n        <a href="blog.html" class="header-nav-link">Blog</a>'
        );
      }
      content = content.replace(navMatch[0], updatedNav);
    }
  }

  // Also check mobile sidebar navigation
  if (content.includes('mobile-nav-list') && !content.includes('href="blog.html" class="mobile-nav-link"')) {
    content = content.replace(
      /(<li><a href="contact\.html"[^>]*>.*?<\/a><\/li>)/,
      '$1\n        <li><a href="blog.html" class="mobile-nav-link">📝 Blog & Guides <span>›</span></a></li>'
    );
  }

  // Also check footer quick links
  if (content.includes('href="contact.html">Contact Us</a></li>') && !content.includes('href="blog.html">Blog & Guides</a></li>')) {
    content = content.replace(
      '<li><a href="contact.html">Contact Us</a></li>',
      '<li><a href="contact.html">Contact Us</a></li>\n            <li><a href="blog.html">Blog & Guides</a></li>'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('All files processed successfully.');
