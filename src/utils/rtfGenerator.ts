/**
 * RTF generator utility
 * Converts plain text to RTF format for download
 */

/**
 * Strip markdown syntax from text content
 * @param content - Content with markdown syntax
 * @returns Plain text without markdown formatting
 */
const stripMarkdown = (content: string): string => {
  return content
    // Remove bold (**text** or __text__)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    // Remove code blocks (```text```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code (`text`)
    .replace(/`(.*?)`/g, '$1')
    // Remove strikethrough (~~text~~)
    .replace(/~~(.*?)~~/g, '$1')
    // Remove headers (# ## ### etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove horizontal rules (--- or ***)
    .replace(/^[-*]{3,}$/gm, '')
    // Remove blockquotes (> text)
    .replace(/^>\s*/gm, '')
    // Clean up bullet points - convert to simple dashes (handle indented bullets too)
    .replace(/^\s*[-*+]\s+/gm, '- ')
    // Clean up numbered lists
    .replace(/^\s*\d+\.\s+/gm, '- ')
    // Remove italic (*text* or _text_) - do this after bullet points to avoid conflicts
    .replace(/\*([^*\n]+?)\*/g, '$1')
    .replace(/_([^_\n]+?)_/g, '$1')
    // Remove links [text](url) - keep text only
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove reference links [text][ref]
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
    // Clean up multiple newlines
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
};

/**
 * Generate a basic RTF document from plain text
 * @param text - Plain text to convert to RTF
 * @returns RTF formatted string
 */
export function generateRTF(text: string): string {
  // Strip markdown syntax first
  const plainText = stripMarkdown(text);
  
  // RTF header
  let rtf = '{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033';
  
  // Font table
  rtf += '{\\fonttbl{\\f0\\fswiss\\fcharset0 Arial;}}';
  
  // Document start
  rtf += '{\\pard\\fs24 ';
  
  // Convert all line breaks to RTF line breaks
  const escapedText = plainText
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