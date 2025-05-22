/**
 * Parse a file based on its type and extract text content
 * This client-side implementation uses a server API endpoint to handle file parsing
 * @param file - The file to parse
 * @returns A promise that resolves to the extracted text
 */
export async function parseFile(file: File): Promise<string> {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Call the API endpoint to parse the file
    const response = await fetch('/api/parse-file', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      // Pass the specific error message from the server
      throw new Error(errorData.error || 'Failed to parse file');
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    // Improved error logging
    console.error('Error parsing file:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    throw error;
  }
}
