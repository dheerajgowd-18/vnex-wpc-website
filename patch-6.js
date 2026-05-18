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
]; // excluding sheets.html

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Address
  const addressRegex = /Industrial Area, Phase II<br\s*\/?>\s*City, State — 000 000(?:, India)?/g;
  content = content.replace(addressRegex, 'Hyderabad, Telangana');

  const addressContactInfo = /Industrial Area, Phase II<\/div>\s*<div[^>]*>City, State — 000 000(?:, India)?<\/div>/g;
  content = content.replace(addressContactInfo, 'Hyderabad, Telangana</div>\n              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">India</div>');

  // Also remove the placeholder Map embed text
  content = content.replace(/Industrial Area, Phase II — City, State/g, 'Hyderabad, Telangana');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Applied patch 6.");
