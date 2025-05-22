// Script to create a password-protected PDF for testing
const fs = require('fs');
const path = require('path');

// Import pdf-lib with explicit path for troubleshooting
console.log('Loading pdf-lib...');
try {
  // Use explicit path to node_modules
  var { PDFDocument } = require('./node_modules/pdf-lib/lib/index.js');
  console.log('Successfully loaded pdf-lib');
} catch (err) {
  console.error('Failed to load pdf-lib:', err.message);
  // Try alternative import approach
  try {
    var { PDFDocument } = require('pdf-lib');
    console.log('Successfully loaded pdf-lib using default import');
  } catch (importErr) {
    console.error('All import attempts failed:', importErr.message);
    process.exit(1);
  }
}

async function createPasswordProtectedPDF() {
  try {
    console.log('Creating a password-protected PDF for testing...');
    
    // Path to source PDF - use __dirname for reliable path resolution
    const sourcePdfPath = path.join(__dirname, 'tests', 'samples', 'test-resume.pdf');
    const outputPath = path.join(__dirname, 'tests', 'samples', 'protected-test-resume.pdf');
    
    console.log('Source PDF path:', sourcePdfPath);
    console.log('Output path:', outputPath);
    
    if (!fs.existsSync(sourcePdfPath)) {
      console.error('Source PDF not found:', sourcePdfPath);
      return;
    }
    
    // Read the source PDF
    const pdfBytes = fs.readFileSync(sourcePdfPath);
    console.log('Source PDF loaded, size:', pdfBytes.length, 'bytes');
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);
    console.log('PDF loaded successfully');
    
    // Set encryption options
    const encryptedBytes = await pdfDoc.save({
      userPassword: 'test123',
      ownerPassword: 'admin123',
      permissions: {
        // Restrict permissions
        printing: 'lowResolution',
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: false,
        documentAssembly: false
      }
    });
    
    // Write the protected PDF
    fs.writeFileSync(outputPath, encryptedBytes);
    
    console.log('Password-protected PDF created successfully!');
    console.log('File path:', outputPath);
    console.log('User password: test123');
    console.log('Owner password: admin123');
  } catch (error) {
    console.error('Error creating protected PDF:', error);
  }
}

createPasswordProtectedPDF().catch(console.error);
