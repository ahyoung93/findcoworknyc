import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'Find the Best Coworking Spaces in NYC (Real Ratings, 2025)',
  description: 'Compare 400+ coworking spaces across NYC — see real ratings, neighborhoods, pricing, and amenities. Find your perfect workspace in Manhattan, Brooklyn, or Queens.',
  keywords: 'best coworking spaces NYC, best coworking in manhattan, coworking new york city, NYC coworking',
}

export default function BestCoworkingNYC() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Best Coworking Spaces in NYC
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-semibold">
            400+ coworking locations across Manhattan, Brooklyn & Queens
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto mb-16">
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
        </div>

        {/* Search Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-white mb-2">Neighborhood</h3>
            <p className="text-gray-400">
              Find spaces in your preferred NYC area
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-white mb-2">Brands</h3>
            <p className="text-gray-400">
              Compare WeWork, Industrious, and more
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Price</h3>
            <p className="text-gray-400">
              Filter by day pass or membership cost
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-white mb-2">Amenities</h3>
            <p className="text-gray-400">
              WiFi, meeting rooms, coffee, and more
            </p>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 border border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Popular Searches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/locations?neighborhood=flatiron"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                Coworking in Flatiron
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Tech hub with dozens of spaces
              </p>
            </a>

            <a
              href="/locations?rating=4.5"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                4.5+ Rating Spaces
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Highest rated coworking spots
              </p>
            </a>

            <a
              href="/locations?amenity=coffee"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">☕</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                Spaces with Coffee
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Free coffee and espresso bars
              </p>
            </a>

            <a
              href="/locations?neighborhood=williamsburg"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                Williamsburg Spaces
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Creative hubs in Brooklyn
              </p>
            </a>

            <a
              href="/brands?brand=wework"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                WeWork Locations
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                100+ WeWork spaces across NYC
              </p>
            </a>

            <a
              href="/locations?price=budget"
              className="group p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                Budget-Friendly Options
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Affordable day passes under $30
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
