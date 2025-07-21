// Gemini AI service for resume tailoring
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { generatePrompt } from "../prompts";

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
  // Create the prompt using our new prompt generator
  const prompt = generatePrompt(resumeText, jobDescription);

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
        
        // Fix escaped newline characters by converting \n to actual line breaks
        const processText = (text: string) => {
          if (!text) return text;
          return text
            .replace(/\\n/g, '\n')    // Convert \n to actual newlines
            .replace(/\\t/g, '\t')    // Convert \t to actual tabs
            .replace(/\\"/g, '"')     // Convert \" to actual quotes
            .replace(/\\\\/g, '\\');  // Convert \\ to actual backslashes (do this last)
        };
        
        console.log(`Successfully generated tailored resume and cover letter using ${modelName}`);
        return { 
          success: true, 
          data: {
            tailoredResume: processText(parsedResponse.tailoredResume),
            coverLetter: processText(parsedResponse.coverLetter),
            resumeMatchExplanation: processText(parsedResponse.resumeMatchExplanation || "This resume has been tailored to highlight experiences and skills most relevant to the job description."),
            coverLetterExplanation: processText(parsedResponse.coverLetterExplanation || "This cover letter emphasizes your most relevant qualifications and expresses your interest in the position.")
          }
        };
      } catch (parseError) {
        // Improved error logging
        console.error("Failed to parse JSON response:", parseError);
        if (parseError instanceof Error) {
          console.error('Stack:', parseError.stack);
        }
        console.log("Response text:", responseText);
        // Attempt to recover tailoredResume and coverLetter using regex
        const tailoredResumeMatch = responseText.match(/"?tailoredResume"?\s*:\s*"([\s\S]*?)"\s*,/);
        const coverLetterMatch = responseText.match(/"?coverLetter"?\s*:\s*"([\s\S]*?)"\s*,/);
        const resumeMatchExplanationMatch = responseText.match(/"?resumeMatchExplanation"?\s*:\s*"([\s\S]*?)"\s*,/);
        const coverLetterExplanationMatch = responseText.match(/"?coverLetterExplanation"?\s*:\s*"([\s\S]*?)"\s*[}\n]/);
        if (tailoredResumeMatch && coverLetterMatch) {
          // Fix escaped newline characters by converting \n to actual line breaks
          const processText = (text: string) => {
            if (!text) return text;
            return text
              .replace(/\\n/g, '\n')    // Convert \n to actual newlines
              .replace(/\\t/g, '\t')    // Convert \t to actual tabs
              .replace(/\\"/g, '"')     // Convert \" to actual quotes
              .replace(/\\\\/g, '\\');  // Convert \\ to actual backslashes (do this last)
          };
          
          return {
            success: true,
            data: {
              tailoredResume: processText(tailoredResumeMatch[1]),
              coverLetter: processText(coverLetterMatch[1]),
              resumeMatchExplanation: resumeMatchExplanationMatch ? processText(resumeMatchExplanationMatch[1]) : "This resume has been tailored to highlight experiences and skills most relevant to the job description.",
              coverLetterExplanation: coverLetterExplanationMatch ? processText(coverLetterExplanationMatch[1]) : "This cover letter emphasizes your most relevant qualifications and expresses your interest in the position."
            }
          };
        }
        // Fallback: If we can't parse or recover, provide clear error messages
        return {
          success: false,
          error: "We couldn't parse the AI's response. Please try again or check your input."
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
