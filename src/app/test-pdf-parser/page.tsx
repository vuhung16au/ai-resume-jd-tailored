"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function TestPdfParser() {
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState<{name: string; size: number; type: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setExtractedText("");
    setLoading(true);
    setFileInfo(null);
    
    const file = e.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }

    // Only accept PDF files
    if (file.type !== 'application/pdf') {
      setError("Please upload a PDF file");
      setLoading(false);
      return;
    }
    
    // Set file info for display
    setFileInfo({
      name: file.name,
      size: Math.round(file.size / 1024), // Size in KB
      type: file.type
    });

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', file);
      
      // Call the API endpoint
      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });
      
      // Check if we got a successful response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to parse PDF file');
      }
      
      const data = await response.json();
      
      // Check if the text indicates an error or fallback message
      if (data.text && data.text.includes('For full text extraction, PDF content needs to be processed')) {
        setError('PDF text extraction partially failed. Only basic PDF information was extracted. The PDF might be scanned or have security restrictions.');
      }
      
      setExtractedText(data.text);
    } catch (error: unknown) {
      console.error('Error parsing PDF file:', error);
      setError(error instanceof Error ? error.message : 'Failed to parse PDF file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">PDF Parser Test</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Back to Main App</Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test PDF Text Extraction</h2>
          <p className="text-gray-300 mb-4">
            Upload a PDF file to test the extraction of text content using pdf-parse library.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              {loading ? 'Processing...' : 'Upload PDF File'}
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        {fileInfo && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
            <h3 className="text-lg font-medium mb-2">File Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Name:</span> {fileInfo.name}
              </div>
              <div>
                <span className="text-gray-400">Size:</span> {fileInfo.size} KB
              </div>
              <div>
                <span className="text-gray-400">Type:</span> {fileInfo.type}
              </div>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="bg-blue-900/30 text-blue-400 p-4 rounded-lg mb-6 flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Extracting text from PDF...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-1">Error</h3>
            <p>{error}</p>
            
            <p className="mt-2 text-sm">
              Try uploading a different PDF file or check if the file has proper text content.
            </p>
          </div>
        )}
        
        {extractedText && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Extracted Text:</h2>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(extractedText);
                }}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy
              </button>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">
              {extractedText}
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>Text extraction results can vary based on the PDF format and how content is embedded.</p>
              <p>If text appears garbled or incomplete, the PDF might use non-standard fonts or be a scanned document.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
