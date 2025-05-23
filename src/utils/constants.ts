/**
 * Application-wide constants
 */

// File size limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
export const MAX_FILE_SIZE_MB = 5; // 5MB

// Accepted file types for resume and job descriptions
export const ACCEPTED_FILE_TYPES = [
  // TODO: fix #20 
  // 'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

// File type descriptions
// TODO: fix #20 
export const ACCEPTED_FILE_EXTENSIONS = '.doc, .docx, .txt';
// export const ACCEPTED_FILE_EXTENSIONS = '.pdf, .doc, .docx, .txt';
