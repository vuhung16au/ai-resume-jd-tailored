"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            About AI✨resume+jd=tailored
          </h1>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                AI✨resume+jd=tailored was born in April 2025 from a casual conversation on a university campus. Five of us—one lecturer and four ambitious students—were discussing the challenges of job hunting in today's competitive market. We all knew someone (or had personally experienced) the frustration of applying to dozens of jobs without getting a response.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The conversation turned to Applicant Tracking Systems (ATS) and how these automated screening tools often filter out qualified candidates simply because their resumes don't contain the right keywords. We realized there was an opportunity to use AI to level the playing field.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The collaboration was built on curiosity, and shared values, but quickly evolved into ambition. Experimental ideas and discoveries developed into tangible designs.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                As a team already passionate about AI and machine learning, we decided to build something that could help job seekers optimize their resumes for specific job descriptions, increasing their chances of getting past that initial automated screening and into the hands of actual recruiters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our mission is to democratize access to advanced resume optimization technology. We believe that everyone deserves a fair shot at their dream job, regardless of whether they're familiar with the inner workings of ATS systems or have the resources to hire professional resume writers.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We envision a future where job seekers can present their true value to potential employers, without being filtered out by algorithms before a human ever sees their application. We're building tools that help bridge the gap between talented individuals and the opportunities they deserve.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              We're a diverse group bringing together academic expertise and fresh innovative thinking. Our team combines backgrounds in computer science, AI, UX design, and career development.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">DR</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dr. Sarah Chen</h3>
                <p className="text-gray-500 dark:text-gray-400">Faculty Mentor</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Computer Science lecturer specializing in NLP and AI applications. Provides technical guidance and research insights.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Michael Johnson</h3>
                <p className="text-gray-500 dark:text-gray-400">AI Developer</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Graduate student focused on machine learning models. Leads the development of our core AI resume analysis system.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">AP</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Aisha Patel</h3>
                <p className="text-gray-500 dark:text-gray-400">Frontend Developer</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Computer Science student with a passion for creating intuitive user experiences. Designs and builds our web interface.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">TN</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tyler Nguyen</h3>
                <p className="text-gray-500 dark:text-gray-400">Backend Developer</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Software engineering student specializing in system architecture. Ensures our platform runs smoothly and securely.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">EM</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Emma Martinez</h3>
                <p className="text-gray-500 dark:text-gray-400">Product & Research</p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  Psychology major with a focus on industrial/organizational psychology. Provides insights on career development and ATS systems.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Approach
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Human-Centered AI
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We build AI tools that enhance human capabilities rather than replace them. Our technology helps you present your authentic skills and experience in a way that works with today's hiring systems.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Privacy First
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We built our service with a strong commitment to privacy. Your resume and job descriptions are not stored on our servers, and we don't require account creation or collection of personal data.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Continuous Improvement
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We're constantly refining our AI models and adding new features based on user feedback and emerging hiring trends. As a new startup, we're agile and responsive to our users' needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Accessibility
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We believe powerful career tools should be available to everyone. That's why our service is currently free to use, and we're committed to maintaining accessibility as we grow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We'd love to hear from you! Whether you have questions, feedback, or just want to share your success story, feel free to reach out.
              </p>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Email:</strong> vuhung16plus+hello (at) gmail (dot) com
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/contact"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors inline-block"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
