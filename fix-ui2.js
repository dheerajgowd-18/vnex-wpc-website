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
  console.log(`Processing file: ${file}`);
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove black background/mix-blend-mode filters from the footer logo
  // The user says: "use same logo that we use for header". The header uses just class="h-14 lg:h-16 w-auto"
  // Let's replace the inline styling of the footer logo to be standard.
  content = content.replace(/style="height:76px;.*?object-fit:contain;.*?"/g, 'class="h-16 w-auto bg-white p-2 rounded-lg"');
  content = content.replace(/style="height:68px;.*?object-fit:contain;.*?"/g, 'class="h-16 w-auto bg-white p-2 rounded-lg"');
  // If we just want the pure logo from header:
  content = content.replace(/<img(.*?)class="h-16 w-auto bg-white p-2 rounded-lg"(.*?)>/g, '<img$1class="h-14 lg:h-16 w-auto"$2>');
  // Since the footer is dark, if the logo is a dark logo with transparent background, we should put a white background box around it so it matches header, or just let it be. Wait, the user said "use same logo that we use for header". No filters.
  content = content.replace(/<img src="(.*?logo\.jpg)" alt="VNEX WPC" style=".*?" onerror="this\.style\.display='none';" \/>/g, '<img src="$1" alt="VNEX WPC" class="h-14 lg:h-16 w-auto" onerror="this.style.display=\'none\';" />');

  // 2. Fix footer layout and alignment
  // Revert the center text alignment previously injected into footer-col
  content = content.replace(/<div class="footer-col text-center sm:text-left flex flex-col items-center sm:items-start">/g, '<div class="footer-col text-left">');
  // Make quicklinks side-by-side
  content = content.replace(/<div class="footer-links">/g, '<div class="footer-links grid grid-cols-2 gap-x-6 gap-y-3 mt-4">');

  // Also remove text-center logically from the very first footer div (the brand description)
  content = content.replace(/<div class="text-center sm:text-left">/g, '<div class="text-left">');
  content = content.replace(/<div class="footer-socials flex justify-center sm:justify-start">/g, '<div class="footer-socials flex justify-start gap-4">');

  // 3. Home page `About Us` section "left to right" alignment instead of middle
  if (file === 'index.html') {
    content = content.replace(/<div class="reveal reveal-delay-1 text-center md:text-left">/g, '<div class="reveal reveal-delay-1 text-left">');
    content = content.replace(/<div class="section-divider mx-auto md:mx-0">/g, '<div class="section-divider">');
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log("UI patches 2 applied successfully.");
