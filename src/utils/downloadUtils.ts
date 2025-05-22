import { generateResumeDocx } from './docxGenerator';
import { generateRTF } from './rtfGenerator';
import { jsPDF } from 'jspdf';

/**
 * Utility function for generic file download
 * @param content - Content to download
 * @param filename - Filename to save as
 * @param mimeType - MIME type of the content
 */
const downloadFile = (content: string | Blob, filename: string, mimeType: string) => {
  const element = document.createElement('a');
  const file = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

// Download content as plain text
export const downloadAsText = (content: string, filename: string) => {
  downloadFile(content, filename, 'text/plain');
};

// Download content as markdown
export const downloadAsMarkdown = (content: string, filename: string) => {
  downloadFile(content, filename, 'text/markdown');
};

// Download content as RTF
export const downloadAsRtf = (content: string, filename: string) => {
  const rtfContent = generateRTF(content);
  downloadFile(rtfContent, filename, 'application/rtf');
};

// Download content as DOCX
export const downloadAsDocx = async (content: string, filename: string) => {
  try {
    const blob = await generateResumeDocx(content);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    // Improved error logging
    console.error('Error generating DOCX:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    return { success: false, error };
  }
};

// Download content as PDF
export const downloadAsPdf = (content: string, filename: string) => {
  try {
    const doc = new jsPDF();
    
    // Split content into lines and add to PDF
    const lines = content.split('\n');
    let y = 10;
    
    for (let i = 0; i < lines.length; i++) {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      
      const line = lines[i].trim();
      
      // Check if line is likely a heading
      if (line === line.toUpperCase() && 
          line.length > 0 && 
          line.length < 30 &&
          !line.includes(':') &&
          ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'].some(keyword => line.includes(keyword))) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y += 5; // Add a bit of space before headings
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }
      
      doc.text(line, 10, y);
      y += 6; // Line spacing
    }
    
    doc.save(filename);
    return { success: true };
  } catch (error) {
    // Improved error logging
    console.error('Error generating PDF:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    return { success: false, error };
  }
};
