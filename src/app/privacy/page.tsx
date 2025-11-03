import CoworkingNav from '@/components/CoworkingNav'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />
      <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect information that you provide directly to us and information automatically collected when you visit our website:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Usage data (pages visited, time spent, browser type)</li>
              <li>Device information (IP address, device type, operating system)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Provide, maintain, and improve our website</li>
              <li>Analyze how our website is used</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Communicate with you about updates or changes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cookies and Tracking Technologies</h2>
            <p className="mb-2">We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Remember your preferences</li>
              <li>Understand how you use our website (Google Analytics)</li>
              <li>Serve personalized advertisements (Google AdSense)</li>
            </ul>
            <p className="mt-3">You can control cookies through your browser settings. However, disabling cookies may affect website functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p className="mb-2">We use third-party services that may collect information:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Google Analytics:</strong> Analyzes website traffic and user behavior</li>
              <li><strong>Google AdSense:</strong> Displays advertisements on our website</li>
              <li><strong>Google Places API:</strong> Provides location data for coworking spaces</li>
            </ul>
            <p className="mt-3">These services have their own privacy policies governing the use of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>We retain usage data and analytics information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights (GDPR/CCPA)</h2>
            <p className="mb-2">Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of personalized advertising</li>
              <li>Object to processing of your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Children's Privacy</h2>
            <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at:</p>
            <p className="mt-2">Email: support@deuceyapp.com</p>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-3">Opt-Out of Personalized Advertising</h2>
            <p className="mb-2">To opt-out of personalized advertising:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Google Ads: Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Ad Settings</a></li>
              <li>Adjust your browser cookie settings</li>
              <li>Use browser extensions to block advertising cookies</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
        </div>
      </div>
      </div>
    </div>
  )
}
