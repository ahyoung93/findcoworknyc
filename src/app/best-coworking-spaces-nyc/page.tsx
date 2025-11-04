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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-colors">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Neighborhood</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Search by area
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-colors">
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="text-lg font-semibold text-white mb-2">Brands</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Filter by company
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-colors">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-white mb-2">Price</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sort by cost
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-colors">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Amenities</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find by features
            </p>
          </div>
        </div>

        {/* Coworking in Flatiron */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Coworking in Flatiron
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a href="/s/wework-flatiron" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:underline">WeWork Flatiron</h3>
              <p className="text-gray-400 text-sm">Starting at $29/day</p>
            </a>

            <a href="/s/industrious-flatiron" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-blue-900/20"></div>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:underline">Industrious Flatiron</h3>
              <p className="text-gray-400 text-sm">Starting at $35/day</p>
            </a>

            <a href="/s/spaces-flatiron" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:underline">Spaces Flatiron</h3>
              <p className="text-gray-400 text-sm">Starting at $32/day</p>
            </a>

            <a href="/locations?neighborhood=flatiron" className="group block">
              <div className="aspect-[4/3] bg-gray-800/50 rounded-xl mb-3 flex items-center justify-center border-2 border-dashed border-gray-700">
                <span className="text-gray-500 text-2xl">→</span>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:underline">Show all</h3>
              <p className="text-gray-400 text-sm">24 spaces in Flatiron</p>
            </a>
          </div>
        </div>

        {/* Highest Rated Spaces */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Highest rated spaces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a href="/s/the-wing-soho" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-rose-900/20 to-pink-900/20"></div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-white font-medium group-hover:underline">The Wing SoHo</span>
                <span className="text-yellow-400 text-sm ml-auto">★ 4.7</span>
              </div>
              <p className="text-gray-400 text-sm">Women-focused workspace</p>
            </a>

            <a href="/s/paragraph-workspace" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-teal-900/20 to-cyan-900/20"></div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-white font-medium group-hover:underline">Paragraph Workspace</span>
                <span className="text-yellow-400 text-sm ml-auto">★ 4.6</span>
              </div>
              <p className="text-gray-400 text-sm">Writer-focused coworking</p>
            </a>

            <a href="/s/industrious-nomad" className="group block">
              <div className="aspect-[4/3] bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20"></div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-white font-medium group-hover:underline">Industrious NoMad</span>
                <span className="text-yellow-400 text-sm ml-auto">★ 4.5</span>
              </div>
              <p className="text-gray-400 text-sm">Premium workspace</p>
            </a>

            <a href="/locations?rating=4.5" className="group block">
              <div className="aspect-[4/3] bg-gray-800/50 rounded-xl mb-3 flex items-center justify-center border-2 border-dashed border-gray-700">
                <span className="text-gray-500 text-2xl">→</span>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:underline">Show all</h3>
              <p className="text-gray-400 text-sm">87 spaces with 4.5+ rating</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
