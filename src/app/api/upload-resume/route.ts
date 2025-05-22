import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { join } from 'path';
// Removing unused import: import { createReadStream } from 'fs';
import os from 'os';

// Disable body parsing for this route since we're handling it with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to parse form data - Removed because it's unused
/* 
async function parseFormData(_req: NextRequest) {
  // Create a temporary directory
  const tempDir = join(os.tmpdir(), 'resume-uploads');
  try {
    await fs.mkdir(tempDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
*/

  return new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    // We need to convert NextRequest to standard NodeJS IncomingMessage
    // This is a bit of a hack since NextRequest doesn't directly convert
    // Instead we'll need to manually extract the data from the request
    
    // Note: This implementation is simplified for the example
    // For a production app, use a proper file upload solution like AWS S3
    // or a library specifically designed for Next.js file uploads
    reject(new Error('Direct file upload not implemented in this demo'));
    
    // In a real implementation, you would handle the file upload properly:
    // const form = new formidable.IncomingForm({ uploadDir: tempDir, keepExtensions: true });
    // form.parse(req, (err, fields, files) => {
    //   if (err) reject(err);
    //   resolve({ fields, files });
    // });
  });
}

// Function to extract text from files - Removed because it's unused
/*
async function extractTextFromFile(file: Record<string, unknown>): Promise<string> {
  const filePath = file.filepath;
  const fileType = file.mimetype;

  if (fileType === 'application/pdf') {
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else if (fileType === 'text/plain') {
    const text = await fs.readFile(filePath, 'utf8');
    return text;
  } else {
    throw new Error('Unsupported file type');
  }
}

export async function POST(_req: NextRequest) {
  try {
    // For this demo, we'll focus on the text-based implementation
    // since file upload handling in Next.js App Router requires more complex setup
    return NextResponse.json(
      { message: 'Please use the text input field for the demo version' },
      { status: 200 }
    );
    
    // In a production app, you would implement full file upload handling:
    // const { fields, files } = await parseFormData(req);
    // const resumeFile = files.resume as formidable.File;
    // if (!resumeFile) {
    //   return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    // }
    
    // const resumeText = await extractTextFromFile(resumeFile);
    // return NextResponse.json({ resumeText });
  } catch (error) {
    console.error('Error processing file upload:', error);
    return NextResponse.json(
      { error: 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
