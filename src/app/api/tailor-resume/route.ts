import { NextRequest, NextResponse } from 'next/server';
import { tailorResumeWithAI } from '../../../utils/geminiService';

// Next.js Route Handler with named export for POST method
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get resume and job description
    const { resumeText, jobDescription } = await req.json();

    // Validate input
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Both resume text and job description are required' },
        { status: 400 }
      );
    }

    // Use our geminiService to tailor the resume and generate a cover letter
    const result = await tailorResumeWithAI(resumeText, jobDescription);

    if (result.success) {
      // Return the successfully tailored resume and cover letter
      return NextResponse.json({
        tailoredResume: result.data?.tailoredResume,
        coverLetter: result.data?.coverLetter,
        resumeMatchExplanation: result.data?.resumeMatchExplanation,
        coverLetterExplanation: result.data?.coverLetterExplanation
      });
    } else {
      // Return a friendly error message with 200 status
      // Using 200 instead of error status so the frontend can easily display the message
      return NextResponse.json({ 
        error: true, 
        message: result.error,
        friendlyMessage: "We couldn't tailor your resume and cover letter at this moment. Please try again later."
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing resume:', error);
    
    // Log detailed error information for debugging
    const errorDetails = error instanceof Error 
      ? {
          message: error.message,
          cause: error.cause,
          stack: error.stack
        }
      : { message: 'Unknown error occurred' };
      
    console.debug('Detailed error information:', errorDetails);
    
    // Return a user-friendly error message with a 200 status code
    // so the frontend can easily display it without handling HTTP error codes
    return NextResponse.json(
      { 
        error: true,
        message: 'We encountered a problem processing your request.',
        friendlyMessage: 'We couldn\'t tailor your resume and generate your cover letter at this moment. Please try again later.',
        modelInfo: 'Using Gemini AI models with fallback strategy'
      },
      { status: 200 }
    );
  }
}