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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Best Coworking Spaces in NYC
          </h1>

          {/* Intro Sentence */}
          <p className="text-lg sm:text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            Compare coworking spaces across NYC — sorted by neighborhood, vibe, and price range. Find your perfect workspace whether you need a quiet focus room in FiDi or a creative hub in Williamsburg.
          </p>

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

        {/* Search by Neighborhood Section */}
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 mb-16 border border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
            Find Your Neighborhood →
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Browse spaces by your preferred area. Each neighborhood has its own vibe and community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Financial District', icon: '🏦', link: '/locations?neighborhood=financial-district' },
              { name: 'Midtown', icon: '🏙️', link: '/locations?neighborhood=midtown' },
              { name: 'Union Square', icon: '🌳', link: '/locations?neighborhood=union-square' },
              { name: 'Williamsburg', icon: '🎨', link: '/locations?neighborhood=williamsburg' },
              { name: 'Dumbo', icon: '🌉', link: '/locations?neighborhood=dumbo' },
              { name: 'Long Island City', icon: '🏗️', link: '/locations?neighborhood=long-island-city' },
            ].map((neighborhood) => (
              <a
                key={neighborhood.name}
                href={neighborhood.link}
                className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all border border-gray-700 hover:border-gray-600 group"
              >
                <span className="text-3xl">{neighborhood.icon}</span>
                <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  {neighborhood.name}
                </span>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/locations"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              View all neighborhoods →
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-white mb-2">Real Locations</h3>
            <p className="text-gray-400">
              Actual coworking spaces with addresses, hours, and verified amenities
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-white mb-2">Real Ratings</h3>
            <p className="text-gray-400">
              Google reviews and ratings from actual members and day pass users
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Price Ranges</h3>
            <p className="text-gray-400">
              Compare pricing from budget-friendly options to premium spaces
            </p>
          </div>
        </div>

        {/* Popular Brands */}
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 border border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Popular Coworking Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'WeWork',
              'Industrious',
              'The Wing',
              'KettleSpace',
              'Croissant',
              'Spaces',
              'Regus',
              'Yard',
            ].map((brand) => (
              <a
                key={brand}
                href={`/brands?search=${brand.toLowerCase()}`}
                className="p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-center text-white font-medium transition-all border border-gray-700 hover:border-blue-500"
              >
                {brand}
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/brands"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-lg"
            >
              Compare all brands →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
