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
 * Tailors a resume to match a specific job description using Gemini AI
 * @param {string} resumeText - The original resume text
 * @param {string} jobDescription - The job description to tailor the resume for
 * @returns {Promise<{success: boolean, data?: string, error?: string}>} - Object containing success status and either tailored resume or error message
 */
export const tailorResumeWithAI = async (resumeText: string, jobDescription: string): Promise<{success: boolean, data?: string, error?: string}> => {
  // Create the prompt for the API
  const prompt = `
    You are an expert resume tailor. Your goal is to rewrite or rephrase sections of a given resume to perfectly align with a provided job description, highlighting relevant skills and experiences.

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
    6. Present the tailored resume in a clear, easy-to-read format, similar to a standard resume (e.g., with sections for Summary, Experience, Education, Skills).
    7. Provide only the tailored resume, no conversational text before or after.
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
      console.log(`Attempting to tailor resume using model: ${modelName}`);
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          maxOutputTokens: 8192
        },
        // Avoid using custom safety settings as they might not be compatible with all models
        // Rely on the default safety settings instead
      });
      
      // Generate content from the model - using simpler prompt format to avoid type issues
      // @ts-ignore - Ignoring type issues with safety settings
      const result = await model.generateContent(prompt);
      
      const response = await result.response;
      const tailoredResume = response.text();
      
      console.log(`Successfully tailored resume using ${modelName}`);
      return { 
        success: true, 
        data: tailoredResume 
      };
      
    } catch (error: any) {
      console.error(`Error tailoring resume with model ${modelName}:`, error);
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
    error: "We couldn't generate your tailored resume at this time. Please try again later."
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
    console.error("API test connection failed:", error);
    return { success: false, message: formatErrorMessage(error) };
  }
};
