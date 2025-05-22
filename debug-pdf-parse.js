// Debug script for pdf-parse with explicit options to prevent test file lookup
console.log('Starting debug script');
const fs = require('fs');
console.log('Loaded fs module');
const pdfParse = require('pdf-parse');
console.log('Loaded pdf-parse module');
const path = require('path');
console.log('Loaded path module');

async function testPdfExtraction() {
  try {
    console.log('Starting PDF extraction test with explicit options');
    
    // Path to the test PDF
    const pdfPath = path.resolve('./tests/samples/test-resume.pdf');
    console.log('Reading PDF from:', pdfPath);
    
    if (!fs.existsSync(pdfPath)) {
      console.error('ERROR: File does not exist:', pdfPath);
      return;
    }
    
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('PDF buffer length:', dataBuffer.length);
    
    // Options to avoid test file lookup issues
    const options = {
      noNative: true,           // Avoid native bindings
      version: 'default',       // Use default version handling
      noFontDecoder: true,      // Skip font decoding (may reduce accuracy but avoid errors)
      fontExtraList: []         // No extra fonts
    };
    
    console.log('Parsing PDF with options:', JSON.stringify(options, null, 2));
    const result = await pdfParse(dataBuffer, options);
    
    console.log('PDF page count:', result.numpages);
    console.log('PDF info:', JSON.stringify(result.info, null, 2));
    console.log('Extracted text (first 500 chars):', result.text.substring(0, 500));
    console.log('Total text length:', result.text.length);
    console.log('PDF parsing completed successfully');
  } catch (error) {
    console.error('Error in PDF extraction:');
    console.error('- Message:', error.message || 'No error message');
    console.error('- Name:', error.name || 'Unknown error type');
    
    if (error.code === 'ENOENT') {
      console.error('- Type: File not found error');
      console.error('- Path:', error.path || 'Unknown path');
    }
    
    if (error.stack) {
      console.error('- Stack:');
      console.error(error.stack);
    }
  }
}

// Run the test
testPdfExtraction()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Unhandled error:', err));
