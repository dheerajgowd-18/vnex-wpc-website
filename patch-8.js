const fs = require('fs');
const path = require('path');

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

  // Fix Navbar logo
  // In root files:
  content = content.replace(/<img src="logo\.jpg" alt="VNEX WPC" class="h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left" onerror="this\.style\.display='none';">/g, 
    '<img src="logo-dark.svg" alt="VNEX WPC" class="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left">');
  
  // In nested files (products/):
  content = content.replace(/<img src="\.\.\/logo\.jpg" alt="VNEX WPC" class="h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left" onerror="this\.style\.display='none';">/g, 
    '<img src="../logo-dark.svg" alt="VNEX WPC" class="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left">');

  // Fix Footer logo and remove the text span
  // Root:
  content = content.replace(/<div class="footer-logo">\s*<img src="logo\.jpg"[^>]*>\s*<span class="footer-logo-text">VNEX WPC<\/span>\s*<\/div>/g, 
    '<div class="footer-logo">\n            <img src="logo-light.svg" alt="VNEX WPC" class="h-16 lg:h-20 w-auto" />\n          </div>');
  
  // Nested:
  content = content.replace(/<div class="footer-logo">\s*<img src="\.\.\/logo\.jpg"[^>]*>\s*<span class="footer-logo-text">VNEX WPC<\/span>\s*<\/div>/g, 
    '<div class="footer-logo">\n            <img src="../logo-light.svg" alt="VNEX WPC" class="h-16 lg:h-20 w-auto" />\n          </div>');

  // Also catch any remaining logo.jpg and replace with logo-dark.svg (just in case)
  // (Like if there's an about page image, but it uses about-factory.webp mostly)

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 8 - SVGs integrated.");
