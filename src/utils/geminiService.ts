// Gemini AI service for resume tailoring
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Get the API key from environment variables - only used server-side
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

// Validate the API key exists
if (!API_KEY) {
  console.error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

// Initialize the Gemini API with the API key from environment variables
const genAI = new GoogleGenerativeAI(API_KEY || "dummy-key");

// Define model options with fallbacks in priority order
export const MODEL_OPTIONS = {
  PRIMARY: "gemini-2.0-flash-lite", // 1st priority: Gemini 2.0 Flash-Lite
  SECONDARY: "gemini-1.5-flash-8b", // 2nd priority: Gemini 1.5 Flash-8B
  FALLBACK: "gemini-1.0-pro"        // 3rd priority: Original fallback option
};

// Using default safety settings provided by the Gemini API
// This ensures compatibility across different models

/**
 * Formats an error message from Gemini API for better user feedback
 * @param {any} error - The error object from the Gemini API
 * @returns {string} - A formatted error message for logging
 */
const formatErrorMessage = (error: any) => {
  // Log the full error to console for debugging
  console.debug("Gemini API Error details:", {
    message: error?.message,
    status: error?.status,
    statusText: error?.statusText,
    errorDetails: error?.errorDetails,
    stack: error?.stack
  });
  
  // Check if the API key is missing or invalid
  if (!API_KEY) {
    return "API key is not configured. Please add your Gemini API key to the environment variables.";
  }
  
  // Check for API key validation errors
  if (error?.message && error.message.toLowerCase().includes("api key not valid")) {
    return "The Gemini API key is invalid. Please check your API key configuration.";
  }
  
  // Check for quota limits
  if (error?.message && error.message.includes("quota")) {
    return "You've reached the AI generation quota limit. Please try again later.";
  }
  
  // Check for safety settings errors
  if (error?.message && error.message.includes("safety_settings")) {
    return "There was an issue with the AI safety settings. This is a configuration problem. Please check server logs.";
  }
  
  // Generic error handling with more details for logs
  return error?.message || "An unexpected error occurred during resume tailoring";
};

/**
 * Tailors a resume and generates a cover letter to match a job description
 * @param {string} resumeText - The original resume text
 * @param {string} jobDescription - The job description to tailor for
 * @returns {Promise<{success: boolean, data?: any, error?: string}>} - Object containing success status and results
 */
export const tailorResumeWithAI = async (resumeText: string, jobDescription: string): Promise<{
  success: boolean, 
  data?: { 
    tailoredResume: string, 
    coverLetter: string, 
    resumeMatchExplanation: string,
    coverLetterExplanation: string
  }, 
  error?: string
}> => {
  // Create the prompt for the API
  const prompt = `
    You are an expert resume tailor and cover letter writer. Your goal is to help job seekers by:
    1. Rewriting their resume to align with a job description
    2. Creating a professional cover letter for the job
    3. Explaining why both documents are well-tailored to the position

    **Resume:**
    ${resumeText}

    **Job Description:**
    ${jobDescription}

    **Instructions:**
    1. Analyze the job description for key skills, keywords, responsibilities, and qualifications.
    2. Review the provided resume and identify sections that can be rephrased or emphasized to match the job description.
    3. Focus on quantifiable achievements where possible.
    4. Ensure the tailored resume sounds natural and professional.
    5. Do NOT invent new experiences or skills that are not present in the original resume. Only rephrase existing information.
    6. Create a compelling cover letter that highlights the candidate's most relevant skills and experiences for this specific job.
    7. Provide brief explanations of why both the resume and cover letter are well-tailored to this job.

    **Output Format:**
    Provide your output in JSON format with the following structure:
    {
      "tailoredResume": "The complete tailored resume text...",
      "coverLetter": "The complete cover letter text...",
      "resumeMatchExplanation": "A detailed explanation of why this resume matches the job description...",
      "coverLetterExplanation": "A detailed explanation of why this cover letter effectively supports the application..."
    }

    **Instructions:**
    1. "resumeMatchExplanation" should explain how the resume aligns with the job description
    2. "coverLetterExplanation" should explain how the cover letter supports the application
    3. Use clear and concise language, avoiding jargon or overly complex sentences.
    4. Ensure the JSON is valid and properly formatted.
    5. Do not include any additional text outside of the JSON structure.
    6. If you cannot generate a valid JSON response, return an error message in the same format.
  `;


  // Try models in priority order
  const modelOptions = [
    MODEL_OPTIONS.PRIMARY,     // Try Gemini 2.0 Flash-Lite first
    MODEL_OPTIONS.SECONDARY,   // Then try Gemini 1.5 Flash-8B
    MODEL_OPTIONS.FALLBACK     // Finally fall back to Gemini 1.0 Pro
  ];
  
  let lastError = null;
  
  for (const modelName of modelOptions) {
    try {
      console.log(`Attempting to generate tailored resume and cover letter using model: ${modelName}`);
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          maxOutputTokens: 12000
        },
        // Avoid using custom safety settings as they might not be compatible with all models
        // Rely on the default safety settings instead
      });
      
      // Generate content from the model - using simpler prompt format to avoid type issues
      // @ts-ignore - Ignoring type issues with safety settings
      const result = await model.generateContent(prompt);
      
      const response = await result.response;
      const responseText = response.text();
      
      console.log("Response from Gemini AI:", responseText);
      try {
        // Parse the JSON response
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        
        // Extract just the JSON part if there's any text around it
        let jsonString = responseText;
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          jsonString = responseText.substring(jsonStart, jsonEnd);
        }
        
        const parsedResponse = JSON.parse(jsonString);
        
        // Validate the parsed response has the required fields
        if (!parsedResponse.tailoredResume || !parsedResponse.coverLetter) {
          throw new Error("Invalid response format: missing required fields");
        }
        
        console.log(`Successfully generated tailored resume and cover letter using ${modelName}`);
        return { 
          success: true, 
          data: {
            tailoredResume: parsedResponse.tailoredResume,
            coverLetter: parsedResponse.coverLetter,
            resumeMatchExplanation: parsedResponse.resumeMatchExplanation || "This resume has been tailored to highlight experiences and skills most relevant to the job description.",
            coverLetterExplanation: parsedResponse.coverLetterExplanation || "This cover letter emphasizes your most relevant qualifications and expresses your interest in the position."
          }
        };
      } catch (parseError) {
        // Improved error logging
        console.error("Failed to parse JSON response:", parseError);
        if (parseError instanceof Error) {
          console.error('Stack:', parseError.stack);
        }
        console.log("Response text:", responseText);
        // Fallback: If we can't parse the JSON, try to extract the tailored resume as the whole response
        return { 
          success: true, 
          data: {
            tailoredResume: responseText,
            coverLetter: "We couldn't generate a cover letter at this time. Please try again.",
            resumeMatchExplanation: "This resume has been tailored to highlight experiences and skills most relevant to the job description.",
            coverLetterExplanation: "Cover letter generation encountered an issue. Please try again."
          }
        };
      }
      
    } catch (error: any) {
      // Improved error logging
      console.error(`Error generating content with model ${modelName}:`, error);
      if (error instanceof Error) {
        console.error('Stack:', error.stack);
      }
      lastError = error;
      
      // If this is not a quota error, or if we're on the last model option, don't try again
      if (!error.message?.includes("quota") && !error.message?.includes("429")) {
        break;
      }
    }
  }
  
  // If we get here, all attempts failed
  const errorMessage = formatErrorMessage(lastError);
  console.error("All Gemini AI model attempts failed:", errorMessage);
  return {
    success: false,
    error: "We couldn't generate your tailored resume and cover letter at this time. Please try again later."
  };
};

/**
 * Simple function to check if the Gemini API is responsive
 * Can be used to test API connectivity
 */
export const testGeminiAPIConnection = async (): Promise<{success: boolean, message: string}> => {
  try {
    // Use the primary model for the test connection
    const model = genAI.getGenerativeModel({ model: MODEL_OPTIONS.PRIMARY });
    const result = await model.generateContent("Hello, are you online?");
    return { success: true, message: "API is responsive" };
  } catch (error: any) {
    // Improved error logging
    console.error("API test connection failed:", error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    return { success: false, message: formatErrorMessage(error) };
  }
};
