"use client";

import { useState, useRef } from "react";
import { generateResumeDocx } from "@/utils/docxGenerator";
import { downloadAsText, downloadAsMarkdown, downloadAsDocx, downloadAsPdf } from "@/utils/downloadUtils";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB, ACCEPTED_FILE_TYPES, ACCEPTED_FILE_EXTENSIONS } from "@/utils/constants";
import React from "react";

export default function TailorPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeMatchExplanation, setResumeMatchExplanation] = useState("");
  const [coverLetterExplanation, setCoverLetterExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [jdUploadError, setJdUploadError] = useState("");
  const [processingStep, setProcessingStep] = useState(0);
  const [resumeFilename, setResumeFilename] = useState<string>("");
  const [jdFilename, setJdFilename] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"resume" | "coverLetter">("resume");
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

  // Old downloadAsDocx function removed in favor of the util function

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size using our constant
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      return;
    }

    // Check file type using our constants
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
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
      
      // Check if the error message contains file size info
      if (error instanceof Error && error.message.includes(`size exceeds ${MAX_FILE_SIZE_MB}MB`)) {
        setUploadError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please upload a smaller file or paste text directly.`);
      } else {
        setUploadError("Failed to process file. Please try another file or paste the text directly.");
      }
      
      setResumeText(""); // Clear the loading indicator
      setResumeFilename(""); // Clear the filename
    }
  };
  
  const handleJdFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setJdUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size using our constant
    if (file.size > MAX_FILE_SIZE) {
      setJdUploadError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      return;
    }

    // Check file type using our constants
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
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
      
      // Check if the error message contains file size info
      if (error instanceof Error && error.message.includes(`size exceeds ${MAX_FILE_SIZE_MB}MB`)) {
        setJdUploadError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please upload a smaller file or paste text directly.`);
      } else {
        setJdUploadError("Failed to process file. Please try another file or paste the text directly.");
      }
      
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
      // Fix escaped newline characters by converting \n to actual line breaks
      const processText = (text: string) => {
        if (!text) return text;
        return text
          .replace(/\\n/g, '\n')    // Convert \n to actual newlines
          .replace(/\\t/g, '\t')    // Convert \t to actual tabs
          .replace(/\\"/g, '"')     // Convert \" to actual quotes
          .replace(/\\\\/g, '\\');  // Convert \\ to actual backslashes (do this last)
      };
      
      setTailoredResume(processText(data.tailoredResume));
      setCoverLetter(processText(data.coverLetter || ""));
      setResumeMatchExplanation(processText(data.resumeMatchExplanation || ""));
      setCoverLetterExplanation(processText(data.coverLetterExplanation || ""));
      
      // Show success message after getting the result
      setError(""); // Clear any existing error
      setSuccess("Resume and cover letter successfully tailored for the job description!");
      
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

  function ExplanationWithToggle({ explanation, title }: { explanation: string; title: string }) {
    const [expanded, setExpanded] = React.useState(false);
    const MAX_LENGTH = 400;

    // Split executive summary (first paragraph) and the rest
    const [summary, ...rest] = explanation.split(/\n|\r|\r\n/).filter(Boolean);
    const restText = rest.join("\n");

    // Try to extract bullet points from the rest
    const bulletPoints = restText
      .split(/\n|\r|\r\n/)
      .filter(line => line.trim().startsWith("-") || line.trim().startsWith("•"));

    // Short version: summary + first 2 bullets
    const shortBullets = bulletPoints.slice(0, 2);
    const isLong = bulletPoints.length > 2 || restText.length > MAX_LENGTH;

    return (
      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-4 rounded-md mb-6">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">{title}</h3>
        <div className="text-sm whitespace-pre-wrap">
          <span className="font-semibold block mb-2">{summary}</span>
          <ul className="list-disc pl-5">
            {(expanded || !isLong
              ? bulletPoints
              : shortBullets
            ).map((point, idx) => (
              <li key={idx}>{point.replace(/^[-•]\s*/, "")}</li>
            ))}
          </ul>
          {isLong && (
            <button
              className="mt-2 text-xs text-blue-600 dark:text-blue-300 underline focus:outline-none"
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <main className="max-w-6xl mx-auto">
        <header className="text-center mb-12 pt-6">
          <h1 className="text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100">Tailor Your Resume</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Optimize your resume for specific job descriptions using AI technology. 
            Upload your resume and a job description to get a tailored version that highlights relevant skills and experience.
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
                      Upload resume or paste text below <span className="text-xs text-gray-500">(max {MAX_FILE_SIZE_MB}MB)</span>
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
                      accept={ACCEPTED_FILE_EXTENSIONS}
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
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      {uploadError}
                    </div>
                  )}
                  <div className="relative">
                    <textarea
                      className="w-full h-80 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Paste your resume text here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      required
                    />
                    {/* Copy button inside textarea */}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(resumeText);
                        setSuccess("Resume copied to clipboard!");
                        setTimeout(() => setSuccess(""), 3000);
                      }}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 bg-gray-100 dark:bg-gray-800 rounded-full shadow"
                      title="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                      </svg>
                    </button>
                  </div>
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
                      Upload JD or paste text below <span className="text-xs text-gray-500">(max {MAX_FILE_SIZE_MB}MB)</span>
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
                      accept={ACCEPTED_FILE_EXTENSIONS}
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
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      {jdUploadError}
                    </div>
                  )}
                  <div className="relative">
                    <textarea
                      className="w-full h-80 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                    />
                    {/* Copy button inside textarea */}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(jobDescription);
                        setSuccess("Job description copied to clipboard!");
                        setTimeout(() => setSuccess(""), 3000);
                      }}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 bg-gray-100 dark:bg-gray-800 rounded-full shadow"
                      title="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
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
                        {processingStep === 3 && "Generating your tailored resume and cover letter..."}
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
                  Tailor Resume & Cover Letter
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("resume")}
                    className={`py-2 px-3 text-sm font-medium ${
                      activeTab === "resume"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                      Tailored Resume
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("coverLetter")}
                    className={`py-2 px-3 text-sm font-medium ${
                      activeTab === "coverLetter"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                      Cover Letter
                    </div>
                  </button>
                </nav>
              </div>

              {/* Content based on active tab */}
              {activeTab === "resume" ? (
                <>
                  {/* Resume Tab Content */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                      Resume Comparison
                    </h2>
                    <div className="flex gap-2 items-center">
                      {/* Copy to clipboard */}
                      <button
                        onClick={() => {
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
                  
                  {resumeMatchExplanation && (
                    <ExplanationWithToggle
                      explanation={resumeMatchExplanation}
                      title="Why this resume matches the job description:"
                    />
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[600px] relative">
                        {/* Copy button inside text area */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(resumeText);
                            setSuccess("Original resume copied to clipboard!");
                            setTimeout(() => setSuccess(""), 3000);
                          }}
                          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 bg-gray-100 dark:bg-gray-800 rounded-full shadow"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                          </svg>
                        </button>
                        {resumeText}
                      </div>
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
                    </div>
                    
                    <div className="relative">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[600px] relative">
                        {/* Copy button inside text area */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(tailoredResume);
                            setSuccess("Tailored resume copied to clipboard!");
                            setTimeout(() => setSuccess(""), 3000);
                          }}
                          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 bg-gray-100 dark:bg-gray-800 rounded-full shadow"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                          </svg>
                        </button>
                        {tailoredResume}
                      </div>
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
                    </div>
                  </div>
                  
                  {/* Download buttons row */}
                  <div className="mt-6 flex flex-col space-y-4">
                    <div className="flex flex-wrap justify-center gap-4">
                      {/* PDF button */}
                      <button
                        onClick={() => {
                          try {
                            downloadAsPdf(tailoredResume, "tailored-resume.pdf");
                            setSuccess("Resume downloaded as PDF successfully!");
                            setTimeout(() => setSuccess(""), 3000);
                          } catch (err) {
                            console.error("Error generating PDF:", err);
                            setError("Failed to generate PDF file");
                          }
                        }}
                        className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
                        title="Download as PDF"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                          <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                          <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor" />
                        </svg>
                        PDF
                      </button>

                      {/* DOCX button */}
                      <button
                        onClick={() => {
                          try {
                            downloadAsDocx(tailoredResume, "tailored-resume.docx")
                              .then(result => {
                                if (result.success) {
                                  setSuccess("Resume downloaded as DOCX successfully!");
                                  setTimeout(() => setSuccess(""), 3000);
                                } else {
                                  setError("Failed to generate DOCX file");
                                }
                              })
                              .catch(err => {
                                console.error("Error generating DOCX:", err);
                                setError("Failed to generate DOCX file");
                              });
                          } catch (error) {
                            console.error("Error generating DOCX:", error);
                            setError("Failed to generate DOCX file");
                          }
                        }}
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
                        title="Download as DOCX"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.535 3.515L20.485 8.465L21.95 7L14.05 0L12.586 1.465L14.071 2.95L8.465 8.556L9.879 9.97L15.535 3.515Z" fill="currentColor" />
                          <path d="M2 8V24H22V8H2ZM20 22H4V10H20V22Z" fill="currentColor" />
                          <path d="M8 16H16V18H8V16Z" fill="currentColor" />
                          <path d="M8 12H16V14H8V12Z" fill="currentColor" />
                        </svg>
                        DOCX
                      </button>

                      {/* Markdown button */}
                      <button
                        onClick={() => {
                          downloadAsMarkdown(convertToMarkdown(tailoredResume), "tailored-resume.md");
                          setSuccess("Resume downloaded as Markdown successfully!");
                          setTimeout(() => setSuccess(""), 3000);
                        }}
                        className="px-5 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center"
                        title="Download as Markdown"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6ZM5 8.5V16H7V11.5L9 14.5L11 11.5V16H13V8.5H11L9 11.5L7 8.5H5ZM14 8.5H16L18 12.5L20 8.5H22V16H20V11.5L18 15.5L16 11.5V16H14V8.5Z" fill="currentColor" />
                        </svg>
                        MD
                      </button>

                      {/* TXT button */}
                      <button
                        onClick={() => {
                          downloadAsText(tailoredResume, "tailored-resume.txt");
                          setSuccess("Resume downloaded as TXT successfully!");
                          setTimeout(() => setSuccess(""), 3000);
                        }}
                        className="px-5 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center"
                        title="Download as Text"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 24H21C22.6569 24 24 22.6569 24 21V3C24 1.34315 22.6569 0 21 0H3C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24ZM2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3Z" fill="currentColor" />
                          <path d="M7 8H5V6H13V8H11V18H9V8H7Z" fill="currentColor" />
                          <path d="M15 6H19V8H17V11H19V13H17V16H19V18H15V6Z" fill="currentColor" />
                        </svg>
                        TXT
                      </button>
                    </div>
                    
                    {/* Start Over button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setTailoredResume("");
                          setCoverLetter("");
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Cover Letter Tab Content */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                      Cover Letter
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(coverLetter);
                          setSuccess("Cover letter copied to clipboard!");
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

                  {coverLetterExplanation && (
                    <ExplanationWithToggle
                      explanation={coverLetterExplanation}
                      title="Why this cover letter matches the job description:"
                    />
                  )}
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 whitespace-pre-wrap text-sm overflow-auto max-h-[600px]">
                    {coverLetter}
                  </div>
                  
                  {/* Download buttons row */}
                  <div className="mt-6 flex flex-col space-y-4">
                    <div className="flex flex-wrap justify-center gap-4">
                      {/* PDF button */}
                      <button
                        onClick={() => {
                          try {
                            downloadAsPdf(coverLetter, "cover-letter.pdf");
                            setSuccess("Cover letter downloaded as PDF successfully!");
                            setTimeout(() => setSuccess(""), 3000);
                          } catch (err) {
                            console.error("Error generating PDF:", err);
                            setError("Failed to generate PDF file");
                          }
                        }}
                        className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
                        title="Download as PDF"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                          <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                          <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor" />
                        </svg>
                        PDF
                      </button>

                      {/* DOCX button */}
                      <button
                        onClick={async () => {
                          try {
                            const blob = await generateResumeDocx(coverLetter);
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'cover-letter.docx';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                            
                            setSuccess("Cover letter downloaded as DOCX!");
                            setTimeout(() => setSuccess(""), 3000);
                          } catch (error) {
                            console.error("Error generating DOCX:", error);
                            setError("Failed to generate DOCX file");
                          }
                        }}
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
                        title="Download as DOCX"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.535 3.515L20.485 8.465L21.95 7L14.05 0L12.586 1.465L14.071 2.95L8.465 8.556L9.879 9.97L15.535 3.515Z" fill="currentColor" />
                          <path d="M2 8V24H22V8H2ZM20 22H4V10H20V22Z" fill="currentColor" />
                          <path d="M8 16H16V18H8V16Z" fill="currentColor" />
                          <path d="M8 12H16V14H8V12Z" fill="currentColor" />
                        </svg>
                        DOCX
                      </button>

                      {/* Markdown button */}
                      <button
                        onClick={() => {
                          downloadAsMarkdown(convertToMarkdown(coverLetter), "cover-letter.md");
                          setSuccess("Cover letter downloaded as Markdown successfully!");
                          setTimeout(() => setSuccess(""), 3000);
                        }}
                        className="px-5 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center"
                        title="Download as Markdown"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6ZM5 8.5V16H7V11.5L9 14.5L11 11.5V16H13V8.5H11L9 11.5L7 8.5H5ZM14 8.5H16L18 12.5L20 8.5H22V16H20V11.5L18 15.5L16 11.5V16H14V8.5Z" fill="currentColor" />
                        </svg>
                        MD
                      </button>

                      {/* TXT button */}
                      <button
                        onClick={() => {
                          downloadAsText(coverLetter, "cover-letter.txt");
                          setSuccess("Cover letter downloaded as text file!");
                          setTimeout(() => setSuccess(""), 3000);
                        }}
                        className="px-5 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center"
                        title="Download as Text"
                      >
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 24H21C22.6569 24 24 22.6569 24 21V3C24 1.34315 22.6569 0 21 0H3C1.34315 0 0 1.34315 0 3V21C0 22.6569 1.34315 24 3 24ZM2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3Z" fill="currentColor" />
                          <path d="M7 8H5V6H13V8H11V18H9V8H7Z" fill="currentColor" />
                          <path d="M15 6H19V8H17V11H19V13H17V16H19V18H15V6Z" fill="currentColor" />
                        </svg>
                        TXT
                      </button>
                    </div>
                    
                    {/* Start Over button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setTailoredResume("");
                          setCoverLetter("");
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
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
