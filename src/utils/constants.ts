/**
 * Application-wide constants
 */

// File size limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
export const MAX_FILE_SIZE_MB = 5; // 5MB

// Accepted file types for resume and job descriptions
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/rtf',
  'text/rtf'
];

// File type descriptions
export const ACCEPTED_FILE_EXTENSIONS = '.pdf, .doc, .docx, .txt, .rtf';
