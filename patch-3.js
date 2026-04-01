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
  console.log(`Patching ${file}`);
  let content = fs.readFileSync(file, 'utf8');

  // 1. Fix Footer Copyright Contrast
  // Change "text-gray-400" to "text-gray-300 text-opacity-80" or something brighter.
  // We'll use "text-gray-200" to ensure strong visibility against deep black.
  content = content.replace(/text-sm text-gray-400 text-center/g, 'text-sm text-gray-200 text-center');

  // 2. Fix the "ESTABLISHED 2013" badge in both index.html and about.html
  // Need to capture the old badge exactly to replace it.
  const oldBadgeRegex = /<div style="position:absolute;top:0;left:0;background:#1E2B4D;color:white;padding:16px 24px;border-bottom-right-radius:24px;text-align:left;box-shadow:0 8px 24px rgba\(30,43,77,0\.4\);">[\s\S]*?<div style="font-family:'Playfair Display',serif;font-size:2\.5rem;font-weight:900;line-height:1;">2013<\/div>\s*<\/div>/g;
  
  const newBadge = `<div style="position:absolute; top:0; left:0; background:#1C2331; color:white; padding: 24px 36px 28px 24px; border-bottom-right-radius: 48px; box-shadow: 0 8px 32px rgba(28,35,49,0.5); z-index: 10;">
            <div style="font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; margin-bottom: 4px;">Established</div>
            <div style="font-family: 'Playfair Display', serif; font-size: 4.5rem; font-weight: 900; line-height: 0.85; color: #FFFFFF;">2013</div>
          </div>`;

  content = content.replace(oldBadgeRegex, newBadge);

  // 3. Fix the squished 4-image Gallery feature in index.html
  if (file === 'index.html') {
    // Replace the inline hardcoded grid map with Tailwind dynamic grid.
    // `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;" class="reveal">`
    content = content.replace(/<div style="display:grid;grid-template-columns:repeat\(4,1fr\);gap:12px;" class="reveal">/g, '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">');
    
    // Also, adjust the height from fixed 260px to fluid aspect ratio or a taller mobile height so it looks incredible.
    // `<div style="overflow:hidden;border-radius:12px;height:260px;">`
    content = content.replace(/<div style="overflow:hidden;border-radius:12px;height:260px;">/g, '<div style="overflow:hidden;border-radius:12px;" class="h-64 lg:h-[320px]">');
  }

  // Same for Gallery page? The prompt specifically said "in the home page this looks ugly"
  // so index.html is the primary target. We'll leave gallery.html alone unless we see a similar hardcoded grid grid-template-columns:repeat(4,1fr). Let's do a safe global regex just in case.
  content = content.replace(/<div style="display:grid;grid-template-columns:repeat\(4,1fr\);gap:12px;"/g, '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"');
  content = content.replace(/<div style="overflow:hidden;border-radius:12px;height:260px;">/g, '<div style="overflow:hidden;border-radius:12px;" class="h-64 lg:h-[320px]">');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Patch 3 Complete.");
