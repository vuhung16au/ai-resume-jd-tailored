"use client";

import Link from "next/link";

export default function CVTipsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            10 Essential Resume Tips to Get Past ATS and Impress Recruiters
          </h1>

          <div className="space-y-10">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Tailor your resume for each job application
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                The most important tip is to customize your resume for each job you apply to.
                Match your skills and experience with the keywords found in the job description.
                Our AI tool makes this process quick and easy by automatically analyzing job 
                descriptions and suggesting relevant modifications to your resume.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Use ATS-friendly formatting
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Keep your formatting simple and clean. Use standard section headings like 
                "Experience," "Education," and "Skills." Avoid tables, headers, footers,
                text boxes, and complex graphical elements that ATS software may not process correctly.
                Stick to common fonts like Arial, Calibri, or Times New Roman.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Include relevant keywords
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                ATS systems scan for specific keywords related to the job. Include industry 
                terminology, hard skills, soft skills, and certifications mentioned in the job 
                posting. Our AI tool helps identify these keywords and suggests where to 
                incorporate them naturally in your resume.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Quantify your achievements
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Use numbers and percentages to showcase your accomplishments. Instead of saying
                "Increased sales," say "Increased sales by 35% over 6 months." Quantifiable 
                achievements catch recruiters' attention and provide concrete evidence of your 
                contributions.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Focus on recent and relevant experience
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Emphasize your most recent and relevant experiences. While you shouldn't 
                exclude older positions, give more detail to roles that directly relate to 
                the job you're applying for. Our AI tool helps identify which experiences 
                are most relevant for each specific job description.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Keep your resume concise
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Aim for a 1-2 page resume. Be selective about what you include and prioritize 
                information that directly supports your candidacy for the specific role. 
                Recruiters typically spend just 6-7 seconds scanning a resume initially, so
                make every word count.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Use an appropriate file format
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Submit your resume as a .docx or .pdf file unless otherwise specified. These 
                formats are generally ATS-compatible, though .docx is often preferred for better 
                parsing by ATS systems. Our tool allows you to download your tailored resume in 
                multiple formats.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Include a strong professional summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Start with a compelling professional summary that highlights your years of experience,
                key skills, and biggest achievements. This section is often the first thing a 
                recruiter reads, so make it impactful and relevant to the position you're applying for.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Skip the objective statement
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Instead of an objective statement that focuses on what you want, use a professional
                summary that emphasizes what you can offer the employer. This shift in perspective
                shows employers how you can add value to their organization.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Proofread carefully
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Spelling and grammar errors can immediately disqualify your resume. Proofread 
                thoroughly and consider asking someone else to review it as well. Small mistakes 
                can signal a lack of attention to detail to potential employers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ready to put these tips into action?
            </h3>
            <Link
              href="/tailor"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Tailor Your Resume Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
