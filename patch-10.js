const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'contact.html',
  'faq.html',
  'gallery.html',
  'products/index.html',
  'products/digital-doors.html',
  'products/texture-doors.html',
  'products/frames.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace references to vnex-digital-catalogue.pdf with catalog.html
  // Depending on whether it's in the root or in the products directory, we handle pathing:
  if (file.includes('products/')) {
    content = content.replace(/href="\.\.\/vnex-digital-catalogue\.pdf"/g, 'href="../catalog.html"');
  } else {
    content = content.replace(/href="vnex-digital-catalogue\.pdf"/g, 'href="catalog.html"');
  }
  
  // We can remove target="_blank" since it's a web page now, or we can leave it to open in a new tab.
  // Let's leave target="_blank" because opening a catalog in a new tab is a great UX.
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 10: Switched PDF links to catalog.html viewer.");
