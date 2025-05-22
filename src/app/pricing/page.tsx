"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We believe everyone deserves access to tools that help them succeed in their job search
            </p>
          </div>

          <div className="mb-20">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center shadow-lg border border-blue-100 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Currently Free for Everyone
              </h2>
              <h3 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
                $0
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                As a newly launched service (April 2025), we're currently offering all features for free while we gather feedback and improve our platform.
              </p>
              <div className="space-y-3 text-left mb-10">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Unlimited resume tailoring</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">AI-powered keyword optimization</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Multiple export formats (DOCX, PDF)</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">No registration required</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Privacy-focused (no data storage)</p>
                </div>
              </div>
              <Link 
                href="/tailor"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors inline-block"
              >
                Start Tailoring Now
              </Link>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Will this service always be free?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We're currently offering our service for free while we're in our initial launch phase. 
                  In the future, we may introduce premium features or tiered plans to sustain our operations. 
                  However, we're committed to always maintaining a free tier that provides value to job seekers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Are there any usage limits?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Currently, there are no hard limits on the number of resumes you can tailor. 
                  However, if we encounter high demand that affects our service quality, we may 
                  implement reasonable rate limits. We'll always communicate any changes clearly 
                  to our users.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Do I need to create an account?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No, our service currently doesn't require registration or account creation. 
                  You can use all features immediately without signing up. This approach aligns 
                  with our privacy-first philosophy, as we don't need to store your personal information.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  What if I need help with my resume?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  While our tool is designed to tailor existing resumes to job descriptions, we 
                  understand that some users might need additional guidance. Check out our <Link href="/cv-tips" className="text-blue-600 dark:text-blue-400 hover:underline">CV Tips</Link> page 
                  for helpful advice on creating an effective resume. In the future, we may 
                  introduce additional resume writing and improvement services.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-blue-600 dark:bg-blue-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to increase your interview chances?
            </h2>
            <p className="text-blue-100 mb-6">
              Start tailoring your resume to specific job descriptions and beat the ATS systems — absolutely free!
            </p>
            <Link 
              href="/tailor"
              className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-md transition-colors inline-block"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
