import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

/**
 * Parse markdown text and convert to TextRun objects with proper formatting
 * @param text - Text that may contain markdown formatting
 * @returns Array of TextRun objects
 */
function parseMarkdownToTextRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  let currentIndex = 0;
  
  // Regular expressions for different markdown elements
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, format: { bold: true } },     // **bold**
    { regex: /__(.*?)__/g, format: { bold: true } },         // __bold__
    { regex: /\*(.*?)\*/g, format: { italics: true } },      // *italic*
    { regex: /_(.*?)_/g, format: { italics: true } },        // _italic_
    { regex: /`(.*?)`/g, format: { font: 'Courier New' } },  // `code`
  ];
  
  // Find all matches for all patterns
  const matches: Array<{
    start: number;
    end: number;
    text: string;
    format: any;
  }> = [];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[1], // The captured content
        format: pattern.format
      });
    }
  });
  
  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);
  
  // Process the text
  let currentPos = 0;
  
  for (const match of matches) {
    // Add plain text before this match
    if (match.start > currentPos) {
      const plainText = text.substring(currentPos, match.start);
      if (plainText) {
        runs.push(new TextRun({ text: plainText }));
      }
    }
    
    // Add formatted text
    runs.push(new TextRun({ 
      text: match.text,
      ...match.format
    }));
    
    currentPos = match.end;
  }
  
  // Add remaining plain text
  if (currentPos < text.length) {
    const remainingText = text.substring(currentPos);
    if (remainingText) {
      runs.push(new TextRun({ text: remainingText }));
    }
  }
  
  // If no markdown was found, return the original text as a single run
  if (runs.length === 0) {
    runs.push(new TextRun({ text: text }));
  }
  
  return runs;
}

// Helper function to determine if a line is a heading/section title
function isHeading(line: string): boolean {
  const trimmedLine = line.trim();
  
  // Check for markdown headers (# ## ###)
  if (/^#{1,6}\s+/.test(trimmedLine)) {
    return true;
  }
  
  // Checking if line is uppercase or contains common section keywords
  const headingKeywords = ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS', 'OBJECTIVE', 'PROFILE'];
  return (
    trimmedLine === trimmedLine.toUpperCase() && 
    trimmedLine.length > 0 && 
    trimmedLine.length < 50 &&
    !trimmedLine.includes(':') &&
    headingKeywords.some(keyword => trimmedLine.includes(keyword))
  );
}

// Function to convert a text-based resume to a formatted docx document
export async function generateResumeDocx(resumeText: string): Promise<Blob> {
  const paragraphs: Paragraph[] = [];
  
  // Process resume text line by line
  const lines = resumeText.split('\n');
  
  lines.forEach((line, index) => {
    if (line.trim() === '') {
      // Add empty paragraph for spacing
      paragraphs.push(new Paragraph({}));
    } else if (isHeading(line) || (index < 3 && line.trim().length > 0)) {
      // Clean up markdown headers and format as headings
      let cleanLine = line.trim().replace(/^#{1,6}\s+/, '');
      
      // Format headings and name (assuming name is within first 3 lines)
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: cleanLine,
              bold: true,
            }),
          ],
        })
      );
    } else {
      // Regular text line - parse markdown formatting
      const textRuns = parseMarkdownToTextRuns(line);
      paragraphs.push(
        new Paragraph({
          children: textRuns,
        })
      );
    }
  });
  
  // Create document with the processed paragraphs
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });
  
  // Generate and return the docx as a blob
  return await Packer.toBlob(doc);
}
