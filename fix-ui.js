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

  // 1. Increase the size of the logo in navbar
  content = content.replace(/class="h-10 w-auto"/g, 'class="h-14 lg:h-16 w-auto"');

  // 2. Fix footer logo (remove filter:brightness(0) invert(1) which turns .jpg intro black rectangle)
  // Also add rounded rendering if helpful
  content = content.replace(/style="height:68px;filter:brightness\(0\)\s*invert\(1\);object-fit:contain;"/g, 'style="height:76px;object-fit:contain;mix-blend-mode:multiply;border-radius:4px;"');
  content = content.replace(/style="height:68px;width:auto;object-fit:contain;filter:brightness\(0\)\s*invert\(1\);"/g, 'style="height:76px;width:auto;object-fit:contain;mix-blend-mode:multiply;border-radius:4px;"');

  // 3. Enhance footer alignment on mobile in Quick Links & Contact Us
  content = content.replace(/<div class="footer-col">/g, '<div class="footer-col text-center sm:text-left flex flex-col items-center sm:items-start">');

  // 4. In index.html, fix the '10+ Years' badge clipping (as shown in picture) to exactly match picture 1 'ESTABLISHED 2013'
  if (file === 'index.html' || file === 'about.html') {
    const oldBadge = `<div style="position:absolute;bottom:-20px;right:-20px;background:var(--accent);color:white;padding:20px 24px;border-radius:12px;text-align:center;box-shadow:0 8px 24px rgba(200,90,42,0.4);">
            <div style="font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;line-height:1;">10+</div>
            <div style="font-size:0.8rem;font-weight:600;letter-spacing:1px;margin-top:4px;">Years of Trust</div>
          </div>`;
    const newBadge = `<div style="position:absolute;top:0;left:0;background:#1E2B4D;color:white;padding:16px 24px;border-bottom-right-radius:24px;text-align:left;box-shadow:0 8px 24px rgba(30,43,77,0.4);">
            <div style="font-size:0.75rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.8);margin-bottom:2px;">Established</div>
            <div style="font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:900;line-height:1;">2013</div>
          </div>`;
    // We also must remove 'overflow-hidden' from the parent if we want it to float outside, 
    // BUT the new design is strictly AT top:0 left:0 so it sits perfectly fine within overflow-hidden.
    // However, just in case, let's just do a string replace on the badge:
    content = content.replace(oldBadge, newBadge);
  }

  // 5. In contact.html, remove the entire contact form
  if (file === 'contact.html') {
    // We'll surgically slice out the form block in the grid-cols-2
    // Let's use regex to replace the <form>...</form> block with a nice simplified 'Contact details placeholder' or simply remove it.
    // The prompt says "remove contact form in contact section".
    const formRegex = /<form[^>]*>[\s\S]*?<\/form>/;
    content = content.replace(formRegex, `<div class="bg-gray-50 p-8 rounded-2xl flex items-center justify-center text-center"><div style="color:var(--text-muted);"><h3 style="font-size:1.5rem;margin-bottom:12px;color:var(--text-dark);font-family:'Playfair Display',serif;">Get in Touch</h3><p>Please reach out to us via Phone or Email provided on this page.</p></div></div>`);
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Global fixes applied successfully.");
