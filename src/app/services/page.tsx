"use client";

import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Services
          </h1>
          
          <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
            Leveraging AI to revolutionize the job application process and help you land your dream role
          </p>

          <section className="mb-16">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 shadow-md mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                AI Resume Tailoring
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our flagship service uses artificial intelligence to customize your resume for specific job descriptions. By analyzing both your resume and the job requirements, our AI identifies relevant skills and experiences to highlight, ensuring your resume gets past Applicant Tracking Systems (ATS) and catches recruiters' attention.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Features:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>Automated keyword optimization based on job descriptions</li>
                <li>Skill matching and prioritization</li>
                <li>Experience highlighting based on relevance</li>
                <li>ATS-friendly formatting suggestions</li>
                <li>Multiple export formats (DOCX, TXT)</li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/tailor"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors inline-block"
                >
                  Try It Now
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  CV Tips & Resources
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Access our collection of expert advice on creating effective resumes, optimizing for ATS systems, and presenting your skills and experience in the best possible light. We regularly update our resources with the latest industry insights.
                </p>
                <div className="mt-auto pt-4">
                  <Link 
                    href="/cv-tips"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    View CV Tips →
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Career Resources Coming Soon
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We're working on expanding our services to include more comprehensive career resources, including interview preparation, cover letter generation, and personal brand development. Stay tuned for updates as our platform grows!
                </p>
                <div className="mt-auto pt-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                    In development - Coming Summer 2025
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Choose Our Services
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-blue-600 dark:text-blue-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Built by a Talented Team
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Created by a team of 5 including one lecturer and four students, combining academic expertise with fresh, innovative thinking.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-blue-600 dark:text-blue-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Focused
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We don't store your resume or job descriptions on our servers, ensuring your personal information remains private and secure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-blue-600 dark:text-blue-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Free to Use
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All our current services are completely free to use, as we're committed to helping job seekers succeed without financial barriers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Roadmap
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="space-y-8">
                <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    April 2025 — Launch
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Initial release of our AI resume tailoring service, along with basic CV tips resources.
                  </p>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Summer 2025 — Expansion
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Introducing cover letter generation, more advanced resume analytics, and industry-specific optimization.
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Fall 2025 — Full Career Platform
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Evolution into a comprehensive career development platform with interview preparation, networking strategies, and personalized career coaching.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              Ready to transform your job search?
            </h2>
            <Link 
              href="/tailor"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg inline-block"
            >
              Start Tailoring Your Resume
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
