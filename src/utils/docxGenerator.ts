import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

// Helper function to determine if a line is a heading/section title
function isHeading(line: string): boolean {
  // Checking if line is uppercase or contains common section keywords
  const headingKeywords = ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'];
  const trimmedLine = line.trim();
  return (
    trimmedLine === trimmedLine.toUpperCase() && 
    trimmedLine.length > 0 && 
    trimmedLine.length < 30 &&
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
      // Format headings and name (assuming name is within first 3 lines)
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: line.trim(),
              bold: true,
            }),
          ],
        })
      );
    } else {
      // Regular text line
      paragraphs.push(
        new Paragraph({
          children: [new TextRun(line)],
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
