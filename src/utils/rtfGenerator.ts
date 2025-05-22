/**
 * RTF generator utility
 * Converts plain text to RTF format for download
 */

/**
 * Generate a basic RTF document from plain text
 * @param text - Plain text to convert to RTF
 * @returns RTF formatted string
 */
export function generateRTF(text: string): string {
  // RTF header
  let rtf = '{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033';
  
  // Font table
  rtf += '{\\fonttbl{\\f0\\fswiss\\fcharset0 Arial;}}';
  
  // Document start
  rtf += '{\\pard\\fs24 ';
  
  // Convert all line breaks to RTF line breaks
  const escapedText = text
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/\{/g, '\\{')   // Escape opening braces
    .replace(/\}/g, '\\}')   // Escape closing braces
    .split('\n')
    .join('\\par ');

  // Process for headings - we'll make section titles bold
  const lines = escapedText.split('\\par ');
  const processedLines = lines.map(line => {
    // Check if this is likely a heading (all caps, short line)
    if (
      line.trim() === line.trim().toUpperCase() && 
      line.trim().length > 0 && 
      line.trim().length < 30 &&
      !line.includes(':') &&
      ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'].some(keyword => line.includes(keyword))
    ) {
      // Format as bold
      return `{\\b ${line}}`;
    }
    return line;
  });
  
  // Add the processed content to RTF
  rtf += processedLines.join('\\par ');
  
  // RTF footer
  rtf += '}';
  
  return rtf;
}
