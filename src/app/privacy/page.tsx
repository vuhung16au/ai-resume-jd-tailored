"use client";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Last Updated: May 20, 2025
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Overview
            </h2>
            <p className="mb-4">
              At AI✨resume+jd=tailored, we take your privacy seriously. This Privacy Policy outlines how we handle your information when you use our resume tailoring service. Our founding team of university students and a lecturer built this service with privacy as a core principle.
            </p>
            <p className="mb-4">
              We provide this service without requiring account creation or personal data storage because we believe you should have access to helpful tools without compromising your privacy.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Information We Don't Collect
            </h2>
            <p className="mb-4">
              Unlike many online services, we deliberately choose not to collect or store:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Your resume content after processing</li>
              <li className="mb-2">Job descriptions you submit</li>
              <li className="mb-2">Personal information (name, address, phone, email)</li>
              <li className="mb-2">User accounts or profiles</li>
              <li className="mb-2">Payment information (our service is currently free)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              How Your Data Is Processed
            </h2>
            <p className="mb-4">
              Here's how we handle the information you provide:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li className="mb-3">
                <strong>Resume and Job Description Processing:</strong> When you upload or paste your resume and job description, they are temporarily processed in memory to generate your tailored resume. This processing occurs in real-time.
              </li>
              <li className="mb-3">
                <strong>Temporary Storage:</strong> Your files and text are held in temporary memory only for the duration of your session. Once you navigate away or close the browser tab, this data is automatically deleted.
              </li>
              <li className="mb-3">
                <strong>AI Processing:</strong> Our AI models analyze your content to identify relevant keywords and optimize your resume. This process happens without permanently storing your data.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Information We May Collect
            </h2>
            <p className="mb-4">
              While we don't store your resume or job posting content, we do collect limited technical information:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Anonymous Usage Statistics:</strong> We collect anonymized data about how our service is used, such as the number of resume tailoring requests, average processing time, and service errors. This helps us improve our platform.
              </li>
              <li className="mb-2">
                <strong>Standard Web Logs:</strong> Like most websites, we collect standard server logs including IP addresses, browser types, referring pages, and timestamps. These logs help us troubleshoot issues and detect unusual patterns that might indicate security problems.
              </li>
              <li className="mb-2">
                <strong>Cookies:</strong> We use minimal cookies necessary for the proper functioning of our website. These cookies don't track you across other sites.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Future Privacy Considerations
            </h2>
            <p className="mb-4">
              As a new service launched in April 2025, we are currently operating with a minimal data approach. In the future, we may introduce additional features that could require data storage to enhance user experience, such as:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Optional user accounts to save tailored resumes</li>
              <li className="mb-2">Resume version history</li>
              <li className="mb-2">Personalized improvement suggestions</li>
            </ul>
            <p className="mb-4">
              If and when we implement such features, they will be:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Clearly communicated</strong> with updated privacy policies</li>
              <li className="mb-2"><strong>Optional</strong> with explicit consent required</li>
              <li className="mb-2"><strong>Secured</strong> using industry-standard encryption and security practices</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Third-Party Services
            </h2>
            <p className="mb-4">
              Our service uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Hosting:</strong> Our application is hosted on Vercel, which has its own privacy policy.</li>
              <li className="mb-2"><strong>AI Processing:</strong> We use secure AI services for natural language processing. These services do not retain your data after processing.</li>
              <li className="mb-2"><strong>Analytics:</strong> We use basic analytics to understand general usage patterns (not individual user behavior).</li>
            </ul>
            <p className="mb-4">
              We carefully select partners that align with our privacy values and do not share your data with third parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Your Rights and Choices
            </h2>
            <p className="mb-4">
              Since we don't store personal data, many typical privacy rights (like the right to access or delete your data) are automatically satisfied. However, you can:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Choose to download your tailored resume and not save it on our servers (we don't save it anyway)</li>
              <li className="mb-2">Use the service without providing any identifiable information</li>
              <li className="mb-2">Disable cookies through your browser settings (this may affect functionality)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions or concerns about our privacy practices, please contact us at:
            </p>
            <p className="mb-8">
              <strong>Email:</strong> privacy@ai-resume-tailored.example.com
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Changes To This Policy
            </h2>
            <p className="mb-4">
              As a new service, we may update our privacy policy as our service evolves. Any significant changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
            </p>
            <p className="mb-4">
              By using our service, you agree to the terms outlined in this privacy policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
