import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'Contact FindCoworkNYC - Get in Touch',
  description: 'Have questions about NYC coworking spaces? Want to report outdated information or suggest a space? Contact the FindCoworkNYC team.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <article className="bg-gray-900 rounded-xl p-6 sm:p-8 lg:p-10 border border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Contact Us
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              <strong>We'd love to hear from you.</strong> Whether you have questions about NYC coworking spaces, want to report outdated information, or have suggestions for improving our directory, we're here to help.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Get In Touch</h2>

            <p className="leading-relaxed">
              The best way to reach us is via email:
            </p>

            <div className="bg-gray-800 rounded-lg p-6 my-6 border border-gray-700">
              <p className="text-xl">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:support@deuceyapp.com" className="text-blue-400 hover:text-blue-300">
                  support@deuceyapp.com
                </a>
              </p>
            </div>

            <p className="leading-relaxed">
              We typically respond within 24-48 hours during business days (Monday-Friday).
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">What You Can Contact Us About</h2>

            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Questions about coworking spaces</strong> - We can help you understand pricing, amenities, and which spaces might fit your needs</li>
              <li><strong>Outdated information</strong> - Let us know if you spot incorrect pricing, closed locations, or changed amenities</li>
              <li><strong>Missing spaces</strong> - Know of a coworking space we should add to our directory?</li>
              <li><strong>Business inquiries</strong> - For partnerships, advertising, or other business-related questions</li>
              <li><strong>Feedback and suggestions</strong> - Help us improve FindCoworkNYC with your ideas</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">About Response Times</h2>

            <p className="leading-relaxed">
              We're a small team of NYC tech workers who are passionate about coworking spaces. We check our email regularly and aim to respond quickly, though during busy periods it may take up to 48 hours.
            </p>

            <p className="leading-relaxed">
              For urgent data corrections (like a permanently closed location), please put "URGENT" in your subject line and we'll prioritize your message.
            </p>

            <div className="mt-10 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                <strong>Note:</strong> We are not affiliated with any coworking brands listed on our site. For questions about specific spaces, memberships, or bookings, please contact those businesses directly.
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
