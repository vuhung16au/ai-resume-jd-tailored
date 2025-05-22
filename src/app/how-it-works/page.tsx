"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How AI Resume Tailoring Works
          </h1>

          <section className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              The Challenge: ATS Systems & Resume Matching
            </h2>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Did you know that 75% of job applications are rejected by Applicant Tracking Systems (ATS) before a human ever sees them?
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                These automated systems scan resumes for keywords and relevance to the job description. If your resume doesn't contain the right keywords and phrases, it might get filtered out regardless of your qualifications.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">The Problem:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Manually tailoring resumes is time-consuming</li>
                <li>It's difficult to identify which keywords matter most</li>
                <li>You might miss important requirements in long job descriptions</li>
                <li>Generic resumes get filtered out by ATS systems</li>
              </ul>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Solution: AI-Powered Resume Tailoring
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-10">
              <p className="text-gray-700 dark:text-gray-300">
                Our team of 5 (one lecturer and four students) started this project in April 2025 after a conversation on campus about the struggles of job hunting. As a group of ambitious and tech-savvy individuals, we saw an opportunity to use AI to solve a common problem faced by job seekers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg h-full">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  The Technology
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We built a specialized AI model that:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                  <li>Analyzes both your resume and the job description</li>
                  <li>Identifies key requirements and qualifications in the job listing</li>
                  <li>Finds relevant experience and skills in your resume</li>
                  <li>Optimizes your content for ATS systems while maintaining authenticity</li>
                  <li>Suggests specific changes to better match the job requirements</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg h-full">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Privacy Focused
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We built our system with privacy as a priority:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Your resume and job descriptions are not stored on our servers</li>
                  <li>Processing happens securely in real-time</li>
                  <li>Your data is never used to train our models</li>
                  <li>No personal information is shared with third parties</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Our Simple 3-Step Process
            </h2>
            
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  1
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Upload Your Resume</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Upload your existing resume in PDF, DOCX, or TXT format, or paste your content directly into our editor. Our system will parse your information while preserving your formatting.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  2
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Add the Job Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Copy and paste the job description you're applying for or upload it as a file. Our AI will analyze the requirements, qualifications, and keywords that matter most.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  3
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Your Tailored Resume</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Within seconds, our AI generates a tailored version of your resume that highlights relevant skills and experience, incorporates key terms, and is optimized for both ATS systems and human recruiters. Download it in your preferred format and apply with confidence!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Team's Mission
            </h2>
            <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
              <p className="text-gray-800 dark:text-blue-100 italic text-lg">
                "We started this project with a simple goal: to help job seekers compete in an increasingly automated hiring process. As students and academics, we understand the challenge of showcasing your true potential when you're up against algorithms that might filter out qualified candidates. Our AI tool bridges that gap, helping you present your best self while staying 100% authentic."
              </p>
              <p className="text-right mt-4 font-medium text-gray-900 dark:text-white">
                - The AI✨resume+jd=tailored Team
              </p>
            </div>
          </section>

          <div className="text-center">
            <Link 
              href="/tailor"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg inline-block"
            >
              Try It Now — It's Free!
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              No registration required. Get started right away!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
