import { SYSTEM_PROMPT } from './templates/system';
import { RESUME_INSTRUCTIONS } from './templates/resume';
import { COVER_LETTER_INSTRUCTIONS } from './templates/coverLetter';

const OUTPUT_FORMAT = `{
  "tailoredResume": "The complete tailored resume text...",
  "resumeMatchExplanation": "A detailed explanation of why this resume matches the job description...",
  "coverLetter": "The complete cover letter text...",
  "coverLetterExplanation": "A detailed explanation of why this cover letter effectively supports the application..."
}`;

export const generatePrompt = (resumeText: string, jobDescription: string): string => {
  return `
    ${SYSTEM_PROMPT}

    **Resume:**
    ${resumeText}

    **Job Description:**
    ${jobDescription}

    **Instructions:**
    ${RESUME_INSTRUCTIONS}
    ${COVER_LETTER_INSTRUCTIONS}

    **Output Format:**
    Provide your output in JSON format with the following structure:
    ${OUTPUT_FORMAT}

    **Additional Instructions:**
    1. Use clear and concise language, avoiding jargon or overly complex sentences.
    2. Ensure the JSON is valid and properly formatted.
    3. Do not include any additional text outside of the JSON structure.
    4. If you cannot generate a valid JSON response, return an error message in the same format.
  `;
};

export * from './templates/system';
export * from './templates/resume';
export * from './templates/coverLetter'; 