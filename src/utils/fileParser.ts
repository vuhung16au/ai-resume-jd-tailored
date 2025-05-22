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
    console.error('Error parsing file:', error);
    // Preserve the original error message if it exists
    if (error instanceof Error && error.message) {
      throw error;
    } else {
      throw new Error('Failed to parse file');
    }
  }
}
