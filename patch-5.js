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
  'products/sheets.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove WPC Sheets from Navigation & Footer links
  content = content.replace(/<a href="[^"]*sheets\.html"[^>]*>.*?WPC Sheets.*?<\/a>\s*/g, '');
  
  // 2. Remove WPC Sheets from Gallery filter
  content = content.replace(/<button class="filter-tab" data-filter="sheets">WPC Sheets<\/button>\s*/g, '');
  
  // 3. Remove "and sheets" or references to WPC Sheets in body text
  content = content.replace(/doors, frames, and sheets/g, 'doors and frames');
  content = content.replace(/Digital Doors, Texture Doors, Door Frames, and WPC Sheets/g, 'Digital Doors, Texture Doors, and Door Frames');
  
  // 4. Remove WPC Sheets section in products/index.html
  // Need to be careful. In products/index.html:
  // <!-- WPC Sheets -->
  // <div class="product-card reveal reveal-delay-2"> ... </div>
  if (file === 'products/index.html') {
    const sheetsBlockRegex = /<!-- WPC Sheets -->[\s\S]*?<div class="product-card reveal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    content = content.replace(sheetsBlockRegex, '');
  }

  // 5. ESTABLISHED IN 2025
  // The badge text has "2013" in it.
  content = content.replace(/>2013</g, '>2025<');

  // 6. Remove Phone Number
  // In footer (various formatting):
  const footerPhoneRegex = /<div class="footer-contact-item">\s*<span class="footer-contact-icon">📞<\/span>\s*<div>[\s\S]*?<\/div>\s*<\/div>/g;
  content = content.replace(footerPhoneRegex, '');

  // In contact.html:
  if (file === 'contact.html') {
    const contactInfoPhone = /<div class="contact-info-card">[\s\S]*?<div class="contact-info-icon">📞<\/div>[\s\S]*?<div class="contact-info-value">\+91 XXXXX XXXXX<\/div>[\s\S]*?<\/div>/g;
    content = content.replace(contactInfoPhone, '');
    
    const contactCallBtn = /<a href="tel:\+91XXXXXXXXXX" class="btn-outline">\s*📞 Call \+91 XXXXX XXXXX\s*<\/a>/g;
    content = content.replace(contactCallBtn, '');
    
    // There is also a WhatsApp button in footer, should we remove it? The user said "REMOVE PHONE NUMBER THING". WhatsApp uses a phone number.
    // Let's remove whatsapp links globally too.
    content = content.replace(/<a href="https:\/\/wa\.me\/[^"]+"[^>]*>💬<\/a>\s*/g, '');
  }
  
  // Global whatsapp removal:
  content = content.replace(/<a href="https:\/\/wa\.me\/[^"]+"[^>]*>💬<\/a>\s*/g, '');

  // 7. Update Address
  const oldAddressRegex1 = /Industrial Area, Phase II<br\/>City, State — 000 000, India/g;
  const oldAddressRegex2 = /Industrial Area, Phase II<br>\s*City, State — 000 000, India/g;
  content = content.replace(oldAddressRegex1, 'Hyderabad, Telangana');
  content = content.replace(oldAddressRegex2, 'Hyderabad, Telangana');
  
  // Check for address in contact.html if it's formatted differently
  // <div class="contact-info-value">Industrial Area, Phase II<br>City, State — 000 000</div>
  const contactAddressRegex = /Industrial Area, Phase II<br>City, State — 000 000/g;
  content = content.replace(contactAddressRegex, 'Hyderabad, Telangana');
  // Or:
  const contactAddressRegex2 = /Industrial Area, Phase II<br\/>City, State — 000 000/g;
  content = content.replace(contactAddressRegex2, 'Hyderabad, Telangana');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 5 across all files.");
