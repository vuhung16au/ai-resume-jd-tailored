import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

/**
 * Parse RTF content and extract only the human-readable text
 * @param rtfContent - The raw RTF content as a string
 * @returns Plain text extracted from RTF without formatting tags
 */
function parseRtfToPlainText(rtfContent: string): string {
  try {
    // More comprehensive RTF parsing approach
    
    // State tracking variables
    let isInContent = false;
    let skipNextChar = false;
    let depth = 0;
    let plainText = '';
    
    // Process character by character for better control
    for (let i = 0; i < rtfContent.length; i++) {
      const char = rtfContent[i];
      
      // Handle opening and closing braces to track nesting level
      if (char === '{') {
        depth++;
        continue;
      }
      
      if (char === '}') {
        depth--;
        continue;
      }
      
      // Handle backslash escape sequences
      if (char === '\\') {
        // Check if it's just an escaped character
        const nextChar = rtfContent[i + 1];
        
        if (nextChar === '{' || nextChar === '}' || nextChar === '\\') {
          // It's an escaped brace or backslash
          if (isInContent && depth > 0) {
            plainText += nextChar;
          }
          i++; // Skip the next character
          continue;
        }
        
        // Check if it's a control word
        if (/[a-zA-Z]/.test(nextChar)) {
          // Skip the control word and its parameter if any
          let j = i + 1;
          // Skip the control word itself
          while (j < rtfContent.length && /[a-zA-Z]/.test(rtfContent[j])) {
            j++;
          }
          
          // Check for possible numeric parameter
          if (rtfContent[j] === '-' || /[0-9]/.test(rtfContent[j])) {
            while (j < rtfContent.length && (rtfContent[j] === '-' || /[0-9]/.test(rtfContent[j]))) {
              j++;
            }
          }
          
          // Handle special control words that represent text
          const controlWord = rtfContent.substring(i + 1, j);
          
          // Special handling for newlines, tabs, etc.
          if (controlWord === 'par' || controlWord === 'line') {
            plainText += '\n';
          } else if (controlWord === 'tab') {
            plainText += '\t';
          }
          
          // Skip space after control word if present
          if (rtfContent[j] === ' ') {
            j++;
          }
          
          i = j - 1;
          continue;
        }
        
        // Handle Unicode character references
        if (nextChar === 'u' && /[0-9]/.test(rtfContent[i + 2])) {
          let j = i + 2;
          let charCode = '';
          
          while (j < rtfContent.length && /[0-9]/.test(rtfContent[j])) {
            charCode += rtfContent[j];
            j++;
          }
          
          if (charCode.length > 0) {
            const uChar = String.fromCharCode(parseInt(charCode, 10));
            plainText += uChar;
          }
          
          // Skip the trailing '?' character if present
          if (rtfContent[j] === '?') {
            j++;
          }
          
          i = j - 1;
          continue;
        }
        
        i++; // Skip the next character after backslash
        continue;
      }
      
      // Normal character
      if (depth > 0 && !skipNextChar && char !== '\r' && char !== '\n') {
        // Only add printable ASCII characters
        if (char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126) {
          plainText += char;
        }
      }
      
      if (skipNextChar) {
        skipNextChar = false;
      }
    }
    
    // Post-process the extracted text
    plainText = plainText.replace(/\s{2,}/g, ' '); // Replace multiple spaces with single space
    plainText = plainText.replace(/\n{3,}/g, '\n\n'); // Replace multiple newlines with at most 2
    
    return plainText.trim();
  } catch (error) {
    console.error('Error parsing RTF:', error);
    return '';
  }
}

// Function to extract text from an array buffer based on mime type
async function extractTextFromArrayBuffer(buffer: ArrayBuffer, mimeType: string): Promise<string> {
  try {
    // PDF files
    if (mimeType === 'application/pdf') {
      try {
        console.log("Processing PDF file with pdf-parse...");
        
        // Use our enhanced PDF parser utility
        const { extractTextFromPdf, extractFullText } = await import('@/utils/pdfParser');
        
        try {
          // Try to extract full text with pdf-parse first
          console.log("Attempting full text extraction with pdf-parse...");
          const extractedText = await extractFullText(buffer);
          
          if (extractedText && extractedText.trim().length > 0) {
            console.log(`Successfully extracted ${extractedText.length} characters from PDF`);
            return extractedText;
          }
          
          // If full text extraction returns empty, fall back to basic extraction
          console.log("Full text extraction failed or returned empty, falling back to basic PDF info");
          const basicInfo = await extractTextFromPdf(buffer);
          return basicInfo;
        } catch (extractError) {
          console.error('PDF text extraction error:', extractError);
          
          // Fallback to basic info using pdf-lib
          console.log("Falling back to basic PDF info extraction");
          const basicInfo = await extractTextFromPdf(buffer);
          return basicInfo;
        }
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        throw new Error(`Failed to parse PDF file: ${pdfError instanceof Error ? pdfError.message : String(pdfError)}`);
      }
    }
    
    // Word documents (DOCX and DOC)
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        mimeType === 'application/msword') {
      try {
        // Create a Buffer from ArrayBuffer for mammoth
        const nodeBuffer = Buffer.from(buffer);
        const result = await mammoth.extractRawText({ buffer: nodeBuffer });
        return result.value || 'No text content extracted from Word document';
      } catch (docxError) {
        console.error('DOCX parsing error:', docxError);
        throw new Error('Failed to parse Word document');
      }
    }
    
    // RTF files - parse to extract only human-readable text
    if (mimeType === 'application/rtf' || mimeType === 'text/rtf') {
      try {
        // Extract text from RTF by removing RTF control codes and markup
        const decoder = new TextDecoder('utf-8');
        const rtfContent = decoder.decode(buffer);
        
        // Parse RTF to extract only human-readable text
        const extractedText = parseRtfToPlainText(rtfContent);
        return extractedText || 'No text content extracted from RTF';
      } catch (rtfError) {
        console.error('RTF parsing error:', rtfError);
        throw new Error('Failed to parse RTF file');
      }
    }
    
    // Plain text files - just decode the buffer
    if (mimeType === 'text/plain') {
      try {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(buffer);
        return text || 'No text content extracted';
      } catch (textError) {
        console.error('Text parsing error:', textError);
        throw new Error('Failed to parse text file');
      }
    }
    
    // Default: try to decode as text
    try {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(buffer);
      return text || `Parsed content from file (${mimeType})`;
    } catch (defaultError) {
      console.error('Default parsing error:', defaultError);
      // Return a default message instead of throwing an error
      return `Could not extract text from file of type ${mimeType}`;
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    // Return a default message instead of throwing an error
    return `Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Export the POST handler as a named export as required by Next.js App Router
export const POST = async (req: NextRequest) => {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Get file type and array buffer
    const mimeType = file.type;
    const buffer = await file.arrayBuffer();
    
    console.log(`Processing file of type: ${mimeType}, size: ${buffer.byteLength} bytes, name: ${file.name}`);
    
    // Extract text based on file type
    let extractedText;
    try {
      extractedText = await extractTextFromArrayBuffer(buffer, mimeType);
    } catch (parseError) {
      console.error('Error during text extraction:', parseError);
      extractedText = `Failed to extract text from ${file.name}`;
    }
    
    // Return the extracted text (or error message)
    return NextResponse.json({ text: extractedText }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: `Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
};