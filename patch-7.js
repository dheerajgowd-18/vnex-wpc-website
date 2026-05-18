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
  'products/frames.html',
  'css/style.css'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // CSS
  if (file === 'css/style.css') {
    content = content.replace(/\.placeholder-img-sheets\s*\{[\s\S]*?\}\s*/, '');
  }

  // 1. Remove Sheets Product Card in index.html and any other index
  const sheetsCardRegex = /<!-- Sheets -->[\s\S]*?<div class="product-card reveal[\s\S]*?<a href="[^"]*sheets\.html"[^>]*>View Product →<\/a>\s*<\/div>\s*<\/div>\s*/;
  content = content.replace(sheetsCardRegex, '');

  // 2. Remove Sheets Cross-link Card in product pages
  const crossLinkRegex = /<div class="product-card reveal reveal-delay-[^>]*>[\s\S]*?<a href="sheets\.html"[^>]*>View Product →<\/a>\s*<\/div>\s*<\/div>\s*/;
  content = content.replace(crossLinkRegex, '');

  // 3. Grid Adjustments
  // If we remove 1 card from 4, we should change <div class="grid-4" to <div class="grid-3"
  // Wait, in products cross links, there were originally 3 OTHER products. So digital-doors.html had 3 cross-links. Removing sheets makes it 2!
  if (file.includes('products/')) {
    // For product detail pages, the cross-link grid might be grid-3. 
    // Wait, digital-doors cross links to: texture-doors, frames, sheets. (3 items). So it was grid-3.
    // If we remove sheets, it becomes 2 items. So change grid-3 to grid-2 in those sections.
    if (file !== 'products/index.html') {
      content = content.replace(/<div class="grid-3" style="margin-bottom: 48px;">/, '<div class="grid-2" style="margin-bottom: 48px;">');
    }
  } else if (file === 'index.html') {
    content = content.replace(/<div class="grid-4" style="margin-bottom:48px;">/, '<div class="grid-3" style="margin-bottom:48px;">');
  }

  // 4. Testimonial Removal in index.html (Vikram Patil talking about sheets)
  if (file === 'index.html') {
    const testimonialRegex = /<div class="testimonial-slide">\s*<div class="testimonial-card">[\s\S]*?VNEX WPC sheets[\s\S]*?Vikram Patil[\s\S]*?<\/div>\s*<\/div>/;
    content = content.replace(testimonialRegex, '');
    // Remove the 5th dot since we removed the 4th testimonial
    // Actually the dots are 5 buttons. We just remove one button.
    content = content.replace(/<button class="testimonial-dot" aria-label="Slide 5"><\/button>\s*/, '');
  }

  // 5. FAQ scrubbing
  if (file === 'faq.html') {
    content = content.replace(/Can VNEX WPC doors and sheets be customized\?/g, 'Can VNEX WPC doors and frames be customized?');
    content = content.replace(/For sheets, we offer a wide range of thicknesses from 3mm to 25mm, and both standard and custom sheet sizes\./g, 'For frames, we offer both standard and custom sizes.');
    content = content.replace(/For bulk orders \(10\+ doors or 50\+ sheets\)/g, 'For bulk orders (10+ doors or 20+ frames)');
    content = content.replace(/For sheets, the laminated surface is maintained exactly as you would any laminate furniture — easy wipe-clean care\./g, '');
    
    const specificSheetFaqRegex = /<div class="faq-item">\s*<button class="faq-question">[\s\S]*?What thickness options are available for VNEX WPC sheets\?[\s\S]*?<\/div>\s*<\/div>/;
    content = content.replace(specificSheetFaqRegex, '');
  }

  // 6. Meta description
  content = content.replace(/digital doors, texture doors, frames, and WPC sheets/g, 'digital doors, texture doors, and frames');
  
  // 7. Text in products/index.html
  content = content.replace(/and versatile sheets —/g, 'and sturdy frames —');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 7 - total elimination of sheets.");
