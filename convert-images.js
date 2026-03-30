const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'images');
const files = fs.readdirSync(imgDir);

(async () => {
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const inputPath = path.join(imgDir, file);
      const outputPath = path.join(imgDir, basename + '.webp');
      
      try {
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`Converted ${file} to WebP`);
      } catch (e) {
        console.error(`Error converting ${file}:`, e.message);
      }
    }
  }
})();