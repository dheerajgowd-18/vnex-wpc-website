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

  // Replace logos
  content = content.replace(/logo-dark\.svg/g, 'logo.webp');
  content = content.replace(/logo-light\.svg/g, 'logo.webp');

  // Replace navbar background
  content = content.replace(/bg-white\/95 backdrop-blur-md/g, 'bg-white');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 8: solid white navbars and logo.webp globally.");
