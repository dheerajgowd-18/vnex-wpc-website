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
  
  const prefix = file.includes('products/') ? '../' : '';
  const pdfPath = prefix + 'vnex-digital-catalogue.pdf';

  // 1. Desktop Nav
  const desktopNavFind = /<a href="contact\.html" class="ml-2 inline-flex items-center justify-center px-6 py-2\.5 bg-\[#1C2331\] hover:bg-\[#2A354A\] text-white text-sm font-bold tracking-wide rounded-lg shadow-lg shadow-\[#1C2331\]\/20 transition-all duration-300 hover:-translate-y-0\.5">\s*Get a Quote\s*<\/a>/;
  
  const desktopNavReplace = `<a href="${pdfPath}" target="_blank" class="ml-2 hidden xl:inline-flex items-center justify-center px-5 py-2.5 bg-[#C85A2A] hover:bg-[#b04f25] text-white text-sm font-bold tracking-wide rounded-lg shadow-lg shadow-[#C85A2A]/20 transition-all duration-300 hover:-translate-y-0.5">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Catalog
        </a>
        <a href="contact.html" class="ml-2 inline-flex items-center justify-center px-6 py-2.5 bg-[#1C2331] hover:bg-[#2A354A] text-white text-sm font-bold tracking-wide rounded-lg shadow-lg shadow-[#1C2331]/20 transition-all duration-300 hover:-translate-y-0.5">
          Get a Quote
        </a>`;

  if (!content.includes('View Digital Catalog') && !content.includes('vnex-digital-catalogue.pdf')) {
    content = content.replace(desktopNavFind, desktopNavReplace);

    // 2. Mobile Nav
    const mobileNavFind = /<a href="contact\.html" class="flex items-center justify-center w-full px-6 py-4 bg-\[#C85A2A\] text-white text-base font-bold rounded-xl shadow-lg shadow-\[#C85A2A\]\/20">\s*Request a Quote\s*<\/a>/;
    
    const mobileNavReplace = `<div class="flex flex-col gap-3">
        <a href="${pdfPath}" target="_blank" class="flex items-center justify-center w-full px-6 py-3 border-2 border-[#1C2331] text-[#1C2331] hover:bg-gray-50 text-base font-bold rounded-xl transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> View Catalog
        </a>
        <a href="contact.html" class="flex items-center justify-center w-full px-6 py-3 bg-[#C85A2A] text-white text-base font-bold rounded-xl shadow-lg shadow-[#C85A2A]/20">
          Request a Quote
        </a>
      </div>`;
    content = content.replace(mobileNavFind, mobileNavReplace);

    // 3. Footer
    const footerFind = /<a href="contact\.html">Contact Us<\/a>\s*<\/div>/;
    const footerReplace = `<a href="contact.html">Contact Us</a>
            <a href="${pdfPath}" target="_blank" style="color: #C85A2A; font-weight: bold;">Digital Catalog 📥</a>
          </div>`;
    content = content.replace(footerFind, footerReplace);

    // 4. Hero (index.html only)
    if (file === 'index.html') {
      const heroFind = /<a href="contact\.html" class="btn-outline w-full sm:w-auto text-center px-8 py-3">\s*Contact Us\s*<\/a>/;
      const heroReplace = `<a href="${pdfPath}" target="_blank" class="btn-outline w-full sm:w-auto text-center px-8 py-3" style="display:flex;align-items:center;justify-content:center;gap:8px;">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download Catalog
        </a>`;
      content = content.replace(heroFind, heroReplace);
    }
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Applied patch 9: Catalog injected everywhere.");
