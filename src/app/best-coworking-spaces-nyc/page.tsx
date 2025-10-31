import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'Best Coworking Spaces in NYC 2025 | Compare 400+ Locations',
  description: 'Find and compare the best coworking spaces in NYC. 14+ brands across 400+ locations in Manhattan, Brooklyn, and Queens. Updated monthly.',
  keywords: 'best coworking spaces NYC, best coworking in manhattan, coworking new york city, NYC coworking',
}

export default function BestCoworkingNYC() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Best Coworking Spaces in NYC
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Compare 400+ coworking locations across Manhattan, Brooklyn, and Queens
          </p>

          {/* Quick Stats */}
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 mb-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">400+</div>
                <div className="text-sm sm:text-base text-gray-400">Locations</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">14+</div>
                <div className="text-sm sm:text-base text-gray-400">Brands</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">$18+</div>
                <div className="text-sm sm:text-base text-gray-400">Day Passes</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm sm:text-base text-gray-400">Access</div>
              </div>
            </div>
          </div>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
            <a
              href="/brands"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Compare All Brands
            </a>
            <a
              href="/locations"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Browse Locations
            </a>
          </div>

          {/* Guide Links */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4">Looking for more specific information?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/day-pass-coworking" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Day Passes
              </a>
              <a href="/coworking-for-freelancers" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                For Freelancers
              </a>
              <a href="/neighborhoods/midtown" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Midtown Guide
              </a>
              <a href="/compare/wework-vs-industrious" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                WeWork vs Industrious
              </a>
              <a href="/guide" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Complete Guide
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
