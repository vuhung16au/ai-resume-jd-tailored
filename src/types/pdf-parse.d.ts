/**
 * Type definitions for the pdf-parse library.
 * Used for extracting text content from PDF files.
 */
declare module 'pdf-parse' {
  export interface PDFData {
    text: string;
    numpages: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  export default function(
    dataBuffer: Buffer, 
    options?: {
      pagerender?: (pageData: any) => string;
      max?: number;
      version?: string;
      // Additional options to handle PDF parsing
      disableCombineTextItems?: boolean;
      noNative?: boolean;
      // Font handling
      fontExtraList?: string[];
      noFontDecoder?: boolean;
    }
  ): Promise<PDFData>;
}
