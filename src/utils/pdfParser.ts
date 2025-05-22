/**
 * Server-side PDF parsing using pdf-lib and pdf-parse
 * Provides both basic document info and text extraction
 */
import { PDFDocument } from 'pdf-lib';
import pdfParse from 'pdf-parse';
import { logPdfError } from './errorLogger';

/**
 * Extract basic information and text from a PDF file
 * @param buffer - The PDF file as an ArrayBuffer
 */
export async function extractTextFromPdf(buffer: ArrayBuffer): Promise<string> {
  try {
    // First, try to extract actual text content using pdf-parse
    const textContent = await extractFullText(buffer);
    
    // If we have valid text content, return it
    if (textContent && textContent.trim().length > 0) {
      return textContent;
    }
    
    // Fallback to basic info if text extraction fails
    try {
      const pdfDoc = await PDFDocument.load(buffer);
      
      // Get basic document info
      const pageCount = pdfDoc.getPageCount();
      const pages = pdfDoc.getPages();
      
      let info = `PDF document with ${pageCount} pages.\n\n`;
      
      // Extract what we can from pages
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        info += `Page ${i + 1}: ${width.toFixed(1)}×${height.toFixed(1)}\n`;
      });
      
      // Add instructions for better PDF parsing
      info += '\n(For full text extraction, PDF content needs to be processed with a dedicated PDF parser. ' +
              'The PDF format is designed for visual presentation, not for text extraction.)';
      
      return info;
    } catch (loadError: any) {
      // Improved error logging
      console.error('Error loading PDF:', loadError);
      if (loadError instanceof Error) {
        console.error('Stack:', loadError.stack);
      }
      throw loadError;
    }
  } catch (error: any) {
    // Improved error logging
    console.error('Error extracting text from PDF:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    throw error;
  }
}

/**
 * Extract the full text content from a PDF using pdf-parse
 * @param buffer - The PDF file as an ArrayBuffer
 */
export async function extractFullText(buffer: ArrayBuffer): Promise<string> {
  try {
    // Convert ArrayBuffer to Buffer for pdf-parse
    const data = Buffer.from(buffer);
    
    // Parse the PDF and extract text with options that have been verified to work in debug testing
    const options = {
      // Skip internal tests and native bindings that look for specific test files
      noNative: true,
      // Use default version handling to avoid test file references
      version: 'default',
      // Skip font decoding which may require test files
      noFontDecoder: true,
      // No extra fonts
      fontExtraList: []
    };
    
    const result = await pdfParse(data, options);
    
    // Check if the text was successfully extracted
    if (result.text && result.text.trim().length > 0) {
      return result.text;
    } else {
      // If no text was extracted but no error was thrown
      console.warn('No text content extracted from PDF');
      return '';
    }
  } catch (error: any) {
    // Improved error logging
    console.error('Error parsing PDF:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    throw error;
  }
}

/**
 * Get options for pdf-parse if needed in the future
 */
function getPdfParseOptions() {
  return {
    // Can add custom options here if needed
  };
}

/**
 * Get just the page count from a PDF
 */
export async function getPdfInfo(buffer: ArrayBuffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();
    
    return `PDF document with ${pageCount} pages. Text extraction is limited in this format.`;
  } catch (error) {
    // Improved error logging
    console.error('Error in PDF utility:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    throw error;
  }
}
