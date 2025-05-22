'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Step {
  title: string;
  content: string;
  image?: string;
}

export default function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: "Welcome to the AI Resume Tailoring Tool",
      content: "This app helps you customize your resume to match specific job descriptions using AI technology. Follow this quick tutorial to learn how to use it."
    },
    {
      title: "Step 1: Add Your Resume",
      content: "Paste your resume text in the first box or upload a text file. The AI will analyze this content to match it with the job description."
    },
    {
      title: "Step 2: Enter Job Description",
      content: "Paste the job description you're applying for in the second box. The more detailed the job description, the better the AI can tailor your resume."
    },
    {
      title: "Step 3: Generate Tailored Resume",
      content: "Click 'Tailor My Resume' and wait for the AI to process your information. This usually takes less than a minute."
    },
    {
      title: "Step 4: Review and Download",
      content: "Review your tailored resume, make any necessary edits, and download it as a text file. You can also copy it to the clipboard for easy pasting."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Tutorial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white">{steps[currentStep].title}</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300">{steps[currentStep].content}</p>
          
          {steps[currentStep].image && (
            <div className="mt-4 rounded-md overflow-hidden">
              <Image
                src={steps[currentStep].image}
                alt={`Tutorial step ${currentStep + 1}`}
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-center">
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
