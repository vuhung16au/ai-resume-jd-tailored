// Debug script for testing password-protected PDF extraction
console.log('Starting password-protected PDF test script');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

// Get the PDF path and password from command line arguments
const args = process.argv.slice(2);
const pdfPath = args[0] || path.resolve('./tests/samples/test-resume.pdf');
const password = args[1] || '';

console.log(`Using PDF path: ${pdfPath}`);
console.log(`Using password: ${password ? '(provided)' : '(none)'}`);

async function testPasswordProtectedPdf() {
  try {
    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      console.error('ERROR: File does not exist:', pdfPath);
      return;
    }
    
    console.log('Reading PDF file...');
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log('PDF buffer length:', dataBuffer.length);
    
    // Configure options for PDF parsing
    const options = {
      noNative: true,
      version: 'default',
      noFontDecoder: true,
      fontExtraList: []
    };
    
    // Add password if provided
    if (password) {
      options.password = password;
      console.log('Using provided password for PDF decryption');
    }
    
    console.log('Parsing PDF with options:', JSON.stringify(options, null, 2));
    
    try {
      // Attempt to parse the PDF
      const result = await pdfParse(dataBuffer, options);
      
      console.log('PDF successfully parsed:');
      console.log('- Page count:', result.numpages);
      console.log('- PDF version:', result.info.PDFFormatVersion || 'Unknown');
      console.log('- Is encrypted:', result.info.IsEncrypted ? 'Yes' : 'No');
      
      if (result.text) {
        console.log('- Text length:', result.text.length);
        console.log('- First 100 characters:', result.text.substring(0, 100).replace(/\n/g, ' '));
      } else {
        console.log('- No text content extracted');
      }
      
      console.log('PDF parsing completed successfully');
    } catch (error) {
      console.error('PDF parsing failed:');
      console.error('- Error name:', error.name);
      console.error('- Error message:', error.message);
      
      if (error.message.includes('password')) {
        console.error('This appears to be a password protected PDF. Please provide the correct password.');
      }
      
      if (error.message.includes('file')) {
        console.error('This may be an issue with file permissions or format.');
      }
      
      if (error.stack) {
        console.error('- Stack trace (first 3 lines):');
        const stackLines = error.stack.split('\n').slice(0, 3);
        stackLines.forEach(line => console.error('  ', line));
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the test
testPasswordProtectedPdf().then(() => {
  console.log('Test completed');
}).catch(err => {
  console.error('Unhandled error in main function:', err);
});

// Usage instructions
console.log('\nUsage:');
console.log('node test-password-pdf.js [pdf_path] [password]');
console.log('Example: node test-password-pdf.js ./path/to/encrypted.pdf mypassword123');
