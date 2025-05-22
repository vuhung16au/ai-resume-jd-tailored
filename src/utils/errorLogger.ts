/**
 * Enhanced logging utility for PDF parsing errors
 */

/**
 * Log detailed information about PDF parsing errors
 */
export function logPdfError(error: any): void {
  console.error('PDF Parsing Error:');
  
  // Log basic error information
  console.error(`- Message: ${error.message || 'No error message'}`);
  console.error(`- Name: ${error.name || 'Unknown error type'}`);
  
  // Check if it's a file not found error
  if (error.code === 'ENOENT') {
    console.error('- Type: File not found error');
    console.error(`- Path: ${error.path || 'Unknown path'}`);
    console.error('- This may be caused by pdf-parse looking for test files');
  }
  
  // If we have a stack trace, log it formatted
  if (error.stack) {
    console.error('- Stack trace:');
    const stackLines = error.stack.split('\n');
    stackLines.forEach((line: string) => {
      console.error(`  ${line}`);
    });
  }
  
  // Additional context for pdf-parse specific errors
  if (error.message && error.message.includes('test/data')) {
    console.error('- Note: This appears to be an internal test file error from pdf-parse');
    console.error('  Try using the noNative and version options when calling pdf-parse');
  }
}
