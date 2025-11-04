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

        {/* Sort By Section */}
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 mb-16 border border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Sort By
          </h2>

          {/* Neighborhoods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Neighborhood</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Financial District', icon: '🏦' },
                { name: 'Midtown', icon: '🏙️' },
                { name: 'Union Square', icon: '🌳' },
                { name: 'Williamsburg', icon: '🎨' },
                { name: 'Dumbo', icon: '🌉' },
                { name: 'Long Island City', icon: '🏗️' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Brands</h3>
            <div className="flex flex-wrap gap-3">
              {['WeWork', 'Industrious', 'The Wing', 'KettleSpace', 'Croissant', 'Spaces', 'Regus', 'Yard'].map((brand) => (
                <div
                  key={brand}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700"
                >
                  <span className="text-white text-sm font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Price</h3>
            <div className="flex flex-wrap gap-3">
              {['$', '$$', '$$$', '$$$$'].map((price) => (
                <div
                  key={price}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700"
                >
                  <span className="text-white text-sm font-medium">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'WiFi', icon: '📶' },
                { name: 'Coffee', icon: '☕' },
                { name: 'Meeting Rooms', icon: '🏢' },
                { name: 'Printing', icon: '🖨️' },
                { name: 'Kitchen', icon: '🍽️' },
                { name: 'Pet Friendly', icon: '🐕' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
