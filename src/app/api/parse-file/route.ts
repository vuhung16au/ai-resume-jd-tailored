import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '@/utils/constants';

/**
 * Function to extract text from an array buffer based on mime type
 */
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

    // Check file size against our constant limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` }, { status: 400 });
    }
    
    // Check file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF, DOCX, RTF, or TXT file' }, { status: 400 });
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