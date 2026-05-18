const fs = require('fs');
const pdfParse = require('pdf-parse');

console.log("pdfParse type:", typeof pdfParse);

let dataBuffer = fs.readFileSync('vnex-digital-catalogue.pdf');

pdfParse(dataBuffer).then(function(data) {
  fs.writeFileSync('catalog_text.txt', data.text);
  console.log('Extracted text successfully, length:', data.text.length);
}).catch(err => {
  console.error("Error parsing PDF:", err);
});
