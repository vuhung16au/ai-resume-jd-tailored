"use client";

// Removed unused imports
// import Image from "next/image";
import { useState, useRef } from "react";
// import Tutorial from "@/components/Tutorial";
import { loadSampleData } from "@/utils/sampleData";
import { generateResumeDocx } from "@/utils/docxGenerator";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [jdUploadError, setJdUploadError] = useState("");
  const [processingStep, setProcessingStep] = useState(0);
  const [resumeFilename, setResumeFilename] = useState<string>("");
  const [jdFilename, setJdFilename] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jdFileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to convert text to markdown format
  const convertToMarkdown = (text: string): string => {
    // Split the text by lines
    const lines = text.split('\n');
    let markdown = '';
    let inList = false;
    
    lines.forEach((line, index) => {
      // Skip empty lines, but add them to preserve formatting
      if (line.trim() === '') {
        markdown += '\n';
        inList = false; 
        return;
      }
      
      // Check if line is likely a heading
      // Headings are usually short, uppercase text like "EXPERIENCE", "SKILLS", etc.
      const trimmedLine = line.trim();
      if (trimmedLine === trimmedLine.toUpperCase() && 
          trimmedLine.length > 0 && 
          trimmedLine.length < 30 &&
          !trimmedLine.includes(':') &&
          ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'].some(keyword => trimmedLine.includes(keyword))) {
        markdown += `\n## ${trimmedLine}\n\n`;
        inList = false;
        return;
      }
      
      // Check for contact information at the top (usually within first 5 lines)
      if (index < 5 && (line.includes('@') || line.includes('LinkedIn') || line.includes('GitHub') || line.includes('http'))) {
        markdown += `*${line}*\n`;
        return;
      }
      
      // Check if this is likely a name at the top
      if (index < 2 && line.trim().length > 0 && line.trim().split(' ').length <= 4 && !line.includes(':')) {
        markdown += `# ${line.trim()}\n\n`;
        return;
      }
      
      // Check for bullet points
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        inList = true;
        markdown += `${line}\n`;
        return;
      }
      
      // Regular text - could be part of a paragraph
      markdown += `${line}\n`;
    });
    
    return markdown;
  };

  // Function to download the resume as a DOCX file
  const downloadAsDocx = async () => {
    try {
      setSuccess("");
      setError("");
      
      // Generate and download the DOCX
      const blob = await generateResumeDocx(tailoredResume);
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tailored-resume.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      setSuccess("Resume downloaded as DOCX successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Error generating DOCX:", err);
      setError("Failed to generate DOCX file");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit");
      return;
    }

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf', 'text/rtf'];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a PDF, DOCX, RTF, or TXT file");
      return;
    }

    try {
      setUploadError("");
      // Save the filename
      setResumeFilename(file.name);
      
      // Show loading indicator
      const loadingText = "Extracting text from file...";
      setResumeText(loadingText);
      
      // Import the file parser dynamically to reduce initial load time
      const { parseFile } = await import('@/utils/fileParser');
      const extractedText = await parseFile(file);
      
      // Update the resume text with the extracted content
      setResumeText(extractedText || "");
      
      // Show a success message if it's a PDF file and text was extracted
      if (file.type === 'application/pdf' && extractedText && extractedText.length > 100 && 
          !extractedText.includes('For full text extraction, PDF content needs to be processed')) {
        setSuccess("Successfully extracted text from PDF!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadError("Failed to process file. Please try another file or paste the text directly.");
      setResumeText(""); // Clear the loading indicator
      setResumeFilename(""); // Clear the filename
    }
  };
  
  const handleJdFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setJdUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setJdUploadError("File size exceeds 5MB limit");
      return;
    }

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf', 'text/rtf'];
    if (!validTypes.includes(file.type)) {
      setJdUploadError("Please upload a PDF, DOCX, RTF, or TXT file");
      return;
    }

    try {
      setJdUploadError("");
      // Save the filename
      setJdFilename(file.name);
      
      // Show loading indicator
      const loadingText = "Extracting text from file...";
      setJobDescription(loadingText);
      
      // Import the file parser dynamically to reduce initial load time
      const { parseFile } = await import('@/utils/fileParser');
      const extractedText = await parseFile(file);
      
      // Update the job description text with the extracted content
      setJobDescription(extractedText || "");
    } catch (error) {
      console.error("Error processing file:", error);
      setJdUploadError("Failed to process file. Please try another file or paste the text directly.");
      setJobDescription(""); // Clear the loading indicator
      setJdFilename(""); // Clear the filename
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both your resume and the job description.");
      return;
    }

    // More detailed validation
    if (resumeText.trim().length < 50) {
      setError("Your resume text is too short. Please provide a more complete resume.");
      return;
    }

    if (jobDescription.trim().length < 30) {
      setError("Job description is too short. Please provide a more detailed job description.");
      return;
    }

    if (resumeText.trim().length > 10000) {
      setError("Resume is too large. Please shorten it or break it into multiple submissions.");
      return;
    }

    if (jobDescription.trim().length > 5000) {
      setError("Job description is too long. Please include only the relevant details.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProcessingStep(1);
      
      // Simulate initial processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(2);
      
      const response = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to tailor resume. Please try again.");
      }

      // Simulate final processing delay
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = await response.json();
      setTailoredResume(data.tailoredResume);
      
      // Show success message after getting the result
      setError(""); // Clear any existing error
      setSuccess("Resume successfully tailored for the job description!");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.error("Error tailoring resume:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
      setProcessingStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <main className="max-w-6xl mx-auto">
        <header className="text-center mb-12 pt-6">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">AI Resume Tailoring</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your resume to match job descriptions with AI assistance
          </p>
        </header>

        {!tailoredResume ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  Your Resume
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Upload resume or paste text below
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload File
                    </button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.rtf"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                  </div>
                  {resumeFilename && (
                    <div className="text-sm text-green-600 dark:text-green-400 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                      {resumeFilename}
                    </div>
                  )}
                  {uploadError && (
                    <div className="text-red-500 text-sm mb-2">{uploadError}</div>
                  )}
                  <textarea
                    className="w-full h-80 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    required
                  />
                  {/* Removed demo text */}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                  Job Description
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Upload JD or paste text below
                    </label>
                    <button
                      type="button"
                      onClick={() => jdFileInputRef.current?.click()}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload File
                    </button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.rtf"
                      className="hidden"
                      ref={jdFileInputRef}
                      onChange={handleJdFileUpload}
                    />
                  </div>
                  {jdFilename && (
                    <div className="text-sm text-green-600 dark:text-green-400 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                      </svg>
                      {jdFilename}
                    </div>
                  )}
                  {jdUploadError && (
                    <div className="text-red-500 text-sm mb-2">{jdUploadError}</div>
                  )}
                  <textarea
                    className="w-full h-80 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                  {/* Removed demo text */}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() => {
                  const { resumeText: sampleResumeText, jobDescription: sampleJobDesc } = loadSampleData();
                  setResumeText(sampleResumeText);
                  setJobDescription(sampleJobDesc);
                  setResumeFilename("");
                  setJdFilename("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Load Sample Data (for testing)
              </button>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-md">
                {success}
              </div>
            )}

            <div className="text-center">
              {loading ? (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md h-2 mb-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${(processingStep / 3) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-4">
                      <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium">
                        {processingStep === 1 && "Analyzing your resume and job description..."}
                        {processingStep === 2 && "Identifying key skills and experience matches..."}
                        {processingStep === 3 && "Generating your tailored resume..."}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This process may take up to a minute to complete
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md hover:shadow-lg"
                >
                  Tailor My Resume
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  Resume Comparison
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(tailoredResume);
                      setSuccess("Resume copied to clipboard!");
                      setTimeout(() => setSuccess(""), 3000);
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Copy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {success && (
                <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-md mb-4">
                  {success}
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Original Resume</h3>
                    <button
                      onClick={() => {
                        const markdownContent = convertToMarkdown(resumeText);
                        const element = document.createElement("a");
                        const file = new Blob([markdownContent], { type: "text/markdown" });
                        element.href = URL.createObjectURL(file);
                        element.download = "original-resume.md";
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        
                        setSuccess("Original resume downloaded as markdown!");
                        setTimeout(() => setSuccess(""), 3000);
                      }}
                      className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download as Markdown
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[600px]">
                    {resumeText}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Tailored Resume</h3>
                    <button
                      onClick={() => {
                        const markdownContent = convertToMarkdown(tailoredResume);
                        const element = document.createElement("a");
                        const file = new Blob([markdownContent], { type: "text/markdown" });
                        element.href = URL.createObjectURL(file);
                        element.download = "tailored-resume.md";
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        
                        setSuccess("Tailored resume downloaded as markdown!");
                        setTimeout(() => setSuccess(""), 3000);
                      }}
                      className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download as Markdown
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[600px]">
                    {tailoredResume}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => {
                    setTailoredResume("");
                    setSuccess("");
                    setError("");
                    setResumeFilename("");
                    setJdFilename("");
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Start Over
                  </span>
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([tailoredResume], { type: "text/plain" });
                      element.href = URL.createObjectURL(file);
                      element.download = "tailored-resume.txt";
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      
                      setSuccess("Text file downloaded successfully!");
                      setTimeout(() => setSuccess(""), 3000);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download as Text
                    </span>
                  </button>
                  
                  <button
                    onClick={downloadAsDocx}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download as DOCX
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}