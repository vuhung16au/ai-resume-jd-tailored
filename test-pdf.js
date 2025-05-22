// Simple PDF extraction test script
console.log('Starting PDF extraction test');

const fs = require('fs');
console.log('Loaded fs module');

const pdfParse = require('pdf-parse');
console.log('Loaded pdf-parse module');

async function testPdfExtraction() {
  try {
    const pdfPath = './tests/samples/test-resume.pdf';
    console.log('Reading PDF from:', pdfPath);
    
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('PDF buffer length:', dataBuffer.length);
    
    console.log('Attempting to parse PDF...');
    const result = await pdfParse(dataBuffer);
    
    console.log('PDF page count:', result.numpages);
    console.log('PDF info:', result.info);
    console.log('Extracted text (first 500 chars):', result.text.substring(0, 500));
    console.log('Total text length:', result.text.length);
  } catch (error) {
    console.error('Error testing PDF extraction:', error);
    console.error(error.stack);
  }
}

console.log('Calling testPdfExtraction function');
testPdfExtraction()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Unhandled error in testPdfExtraction:', err));
