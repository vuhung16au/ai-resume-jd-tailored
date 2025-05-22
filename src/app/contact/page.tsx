"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    // Since this is a demo, we'll just simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        success: true,
        message: "Your message has been sent! We'll get back to you soon."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
    
    // In a real implementation, you would send the form data to your backend:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: data.message || "Your message has been sent! We'll get back to you soon."
        });
        // Reset the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Contact Us
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're always looking for feedback, questions, or collaboration opportunities. Feel free to reach out to us using the form below or through our email.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Email</p>
                      <p>vuhung16plus+hello (at) gmail (dot) com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-gray-700 dark:text-gray-300">
                      <p className="font-medium">GitHub</p>
                      <a 
                        href="https://github.com/vuhung16au/ai-resume-jd-tailored" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        github.com/vuhung16au/ai-resume-jd-tailored
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Response Time</p>
                      <p>We aim to respond within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <a href="/how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → How our service works
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → Pricing information
                    </a>
                  </li>
                  <li>
                    <a href="/cv-tips" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → Resume tips and best practices
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → About our team
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → Our privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Please select a topic</option>
                  <option value="general">General Question</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors w-full md:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              
              {submitResult && (
                <div className={`p-4 rounded-md ${submitResult.success ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {submitResult.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
