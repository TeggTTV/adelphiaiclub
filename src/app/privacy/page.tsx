import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Adelphi AI Society website and data handling practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. 
              This includes Google Analytics to understand how visitors interact with our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Analyze website traffic and user behavior</li>
              <li>Improve our website and services</li>
              <li>Provide personalized content</li>
              <li>Ensure website security and functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
            <p>
              We use cookies to collect anonymous analytics data. You can choose to accept or 
              decline cookies through our cookie consent banner. Declining will not affect 
              your ability to use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Accept or decline cookies</li>
              <li>Request information about data we collect</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of analytics tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{' '}
              <a href="mailto:aiclub@adelphi.edu" className="text-blue-400 hover:text-blue-300 underline">
                aiclub@adelphi.edu
              </a>
            </p>
          </section>

          <section className="text-sm text-gray-400 pt-8 border-t border-gray-700">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
