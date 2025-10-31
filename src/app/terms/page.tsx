export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using CoworkingNYC (the "Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this Website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p className="mb-2">CoworkingNYC provides:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Comparison information about coworking spaces in New York City</li>
              <li>Brand and location data compiled from publicly available sources</li>
              <li>Pricing information, workspace types, and amenity details</li>
              <li>Links to third-party coworking space websites</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information Accuracy</h2>
            <p className="mb-2">While we strive to provide accurate and up-to-date information:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Data is updated monthly and may not reflect real-time changes</li>
              <li>Pricing, availability, and amenities are subject to change by the coworking providers</li>
              <li>We are not responsible for inaccuracies in third-party information</li>
              <li>Always verify details directly with the coworking space provider before making decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. No Booking or Reservation Services</h2>
            <p>This Website is for informational purposes only. We do not:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Accept bookings or reservations</li>
              <li>Process payments for coworking spaces</li>
              <li>Act as an agent for any coworking provider</li>
              <li>Guarantee availability of listed spaces</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Links</h2>
            <p>Our Website contains links to third-party websites. We are not responsible for:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>The content, accuracy, or opinions expressed on third-party websites</li>
              <li>Privacy practices of third-party websites</li>
              <li>Products or services offered by third parties</li>
            </ul>
            <p className="mt-3">Your interactions with third-party websites are governed by their own terms and policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Advertising</h2>
            <p>This Website displays advertisements through Google AdSense and potentially other advertising networks. We do not control or endorse the products or services advertised on our Website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p className="mb-2">The content on this Website, including but not limited to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Text, graphics, logos, and design</li>
              <li>Data compilations and database structures</li>
              <li>Software and code</li>
            </ul>
            <p className="mt-3">is owned by CoworkingNYC or used with permission and is protected by copyright and intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Prohibited Uses</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Use the Website for any unlawful purpose</li>
              <li>Scrape, copy, or redistribute our data without permission</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Website's functionality</li>
              <li>Use automated systems to access the Website excessively</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Disclaimer of Warranties</h2>
            <p>This Website is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>The Website will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Website is free of viruses or harmful components</li>
              <li>Information provided is complete, accurate, or current</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, CoworkingNYC shall not be liable for any:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Direct, indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from your use or inability to use the Website</li>
              <li>Decisions made based on information from the Website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Indemnification</h2>
            <p>You agree to indemnify and hold harmless CoworkingNYC from any claims, damages, losses, liabilities, and expenses arising from your use of the Website or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after changes constitutes acceptance of the modified Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">14. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2">Email: support@deuceyapp.com</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <a href="/brands" className="text-blue-400 hover:underline">← Back to CoworkingNYC</a>
        </div>
      </div>
    </div>
  )
}
