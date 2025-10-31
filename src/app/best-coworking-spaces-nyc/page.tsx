import CoworkingNav from '@/components/CoworkingNav'
import { brands } from '../../../coworkingData'

export const metadata = {
  title: 'Best Coworking Spaces in NYC 2025 | Top Manhattan, Brooklyn & Queens Spaces',
  description: 'Find the best coworking spaces in NYC. Compare 14+ brands across 400+ locations in Manhattan, Brooklyn, and Queens. Updated monthly with pricing, amenities, and reviews.',
  keywords: 'best coworking spaces NYC, best coworking in manhattan, coworking new york city, best coworking spaces in new york, NYC coworking',
}

export default function BestCoworkingNYC() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Best Coworking Spaces in NYC
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 px-4">
            Compare 400+ coworking locations across Manhattan, Brooklyn, and Queens
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <a
              href="/brands"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium text-base sm:text-lg"
            >
              Compare All Brands
            </a>
            <a
              href="/locations"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium text-base sm:text-lg"
            >
              Browse Locations
            </a>
          </div>
        </div>

        <article className="bg-gray-900 rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-800">
          <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why NYC Has the Best Coworking Spaces in America</h2>
              <p className="mb-4 text-sm sm:text-base">
                New York City leads the nation in coworking innovation, with over 400 locations serving everyone from solo
                freelancers to Fortune 500 remote teams. Whether you're looking for the best coworking in Manhattan's corporate
                center or Brooklyn's creative hubs, NYC offers unmatched variety, quality, and networking opportunities.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 my-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Quick Stats: NYC Coworking Scene</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">400+</span>
                    <span>coworking locations across all 5 boroughs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">14+</span>
                    <span>major coworking brands</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">$179-$800</span>
                    <span>monthly pricing range for hot desks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">24/7</span>
                    <span>access available at most premium locations</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Best Coworking Spaces in NYC by Category</h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-lg p-4 sm:p-6 border border-blue-800">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3">Best Overall: WeWork</h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <p>
                      With 74+ NYC locations, WeWork offers the best coworking in Manhattan and beyond. From Times Square to
                      Williamsburg, you're never far from a WeWork. Their day passes ($29-39) let you test spaces risk-free,
                      and hot desks ($200-300/month) provide affordable full-time solutions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Best For:</p>
                        <p className="text-white">Startups, freelancers, remote workers seeking community</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Top Amenities:</p>
                        <p className="text-white">24/7 access, coffee & beer, phone booths, events</p>
                      </div>
                    </div>
                    <a href="/brands" className="inline-block mt-3 text-blue-400 hover:text-blue-300 font-medium text-sm sm:text-base">
                      See all WeWork locations →
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-lg p-4 sm:p-6 border border-purple-800">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3">Best for Professionals: Industrious</h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <p>
                      For established businesses seeking the best coworking spaces in NYC, Industrious delivers premium quality
                      across 25+ locations. Their hospitality-focused approach includes reception services, premium coffee, and
                      consistently quiet work environments.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Best For:</p>
                        <p className="text-white">Executives, established businesses, client-facing professionals</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Top Amenities:</p>
                        <p className="text-white">Reception services, premium coffee, quiet atmosphere</p>
                      </div>
                    </div>
                    <a href="/compare/wework-vs-industrious" className="inline-block mt-3 text-purple-400 hover:text-purple-300 font-medium text-sm sm:text-base">
                      Compare with WeWork →
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-4 sm:p-6 border border-green-800">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3">Best Value: Green Desk</h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <p>
                      Eco-friendly coworking with some of the best prices in NYC. Day passes from just $29 and hot desks from $250/month
                      make Green Desk ideal for budget-conscious professionals. Eight locations across Brooklyn and Queens.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Best For:</p>
                        <p className="text-white">Budget-conscious freelancers, outer-borough residents</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Top Amenities:</p>
                        <p className="text-white">Eco-friendly workspace, printing, meeting rooms</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 rounded-lg p-4 sm:p-6 border border-orange-800">
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3">Best for Creatives: The Yard</h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <p>
                      Community-driven coworking with 8 locations across Manhattan and Brooklyn. Pet-friendly policies, outdoor
                      spaces, and creative events make The Yard popular with designers, writers, and artists seeking the best
                      coworking spaces in New York's creative hubs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Best For:</p>
                        <p className="text-white">Creatives, designers, artists, pet owners</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-2 sm:p-3">
                        <p className="text-gray-400 mb-1">Top Amenities:</p>
                        <p className="text-white">Pet-friendly, outdoor space, coffee & beer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Best Coworking in Manhattan by Neighborhood</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Midtown Manhattan</h3>
                  <p className="text-sm mb-2">
                    The epicenter of NYC coworking with 100+ locations. WeWork, Industrious, and Serendipity Labs dominate.
                    Best for corporate networking and client meetings.
                  </p>
                  <a href="/neighborhoods/midtown" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Explore Midtown spaces →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Financial District</h3>
                  <p className="text-sm mb-2">
                    Premium coworking for finance and legal professionals. Serendipity Labs and Convene offer sophisticated
                    spaces with meeting rooms perfect for client presentations.
                  </p>
                  <a href="/locations" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View FiDi locations →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">SoHo</h3>
                  <p className="text-sm mb-2">
                    Creative and trendy. The Farm SoHo and Cubico attract media, fashion, and design professionals.
                    Beautiful historic buildings with excellent natural light.
                  </p>
                  <a href="/locations" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Browse SoHo coworking →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Chelsea / Flatiron</h3>
                  <p className="text-sm mb-2">
                    Mix of tech startups and creative agencies. WeWork and Nomadworks have strong communities.
                    Great restaurant scene and access to High Line.
                  </p>
                  <a href="/locations" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Find Chelsea spaces →
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Best Coworking Spaces in Brooklyn</h2>

              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Williamsburg</h3>
                    <span className="text-green-400 font-medium text-sm">20-30% cheaper than Manhattan</span>
                  </div>
                  <p className="text-sm mb-3">
                    Hip and creative with excellent coworking options. The Yard, Nomadworks, and WeWork serve the thriving startup
                    and creative community. Perfect for those seeking best coworking spaces in NYC without Manhattan prices.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Startups</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Creatives</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Great food scene</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">DUMBO</h3>
                    <span className="text-green-400 font-medium text-sm">Tech hub</span>
                  </div>
                  <p className="text-sm mb-3">
                    Brooklyn's tech corridor with waterfront views. Bond Collective and WeWork attract startups and established
                    tech companies. Easy Manhattan access via F train.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Tech companies</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Waterfront views</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Great commute</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Park Slope / Gowanus</h3>
                    <span className="text-green-400 font-medium text-sm">Best value</span>
                  </div>
                  <p className="text-sm mb-3">
                    Residential neighborhood with growing coworking scene. Bond Collective and local spaces offer great value
                    for Brooklyn residents who want to avoid long commutes.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Residential</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Affordable</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">Local community</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Coworking for Freelancers in NYC</h2>
              <div className="bg-gradient-to-r from-indigo-900/20 to-indigo-800/20 rounded-lg p-4 sm:p-6 border border-indigo-800">
                <p className="mb-4 text-sm sm:text-base">
                  Freelancers need flexibility and affordability. The best NYC coworking spaces for freelancers offer day passes
                  starting at just $18 (The Farm SoHo) and hot desks from $119/month (Spaces). No long-term commitments required.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs sm:text-sm">
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-indigo-400 font-bold mb-1">Day Passes</div>
                    <div className="text-white">$18-39/day at 7+ brands</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-indigo-400 font-bold mb-1">Hot Desks</div>
                    <div className="text-white">From $119/month</div>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <div className="text-indigo-400 font-bold mb-1">Flexibility</div>
                    <div className="text-white">Month-to-month only</div>
                  </div>
                </div>
                <a
                  href="/coworking-for-freelancers"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base"
                >
                  Read Complete Freelancer Guide →
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">How to Choose the Best Coworking Space for You</h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">📍</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Location is Everything</h3>
                    <p className="text-sm">
                      The best coworking space is one you'll actually use. Choose a location within 30 minutes of home or your
                      clients. Midtown offers maximum transit access, while outer boroughs provide better value and shorter commutes
                      for residents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">💰</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Budget Realistically</h3>
                    <p className="text-sm">
                      Hot desks in Manhattan average $200-400/month. Brooklyn and Queens offer 20-30% savings. Don't forget to budget
                      for extras like printing, meeting rooms, and lunch costs in expensive neighborhoods.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">🎯</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Match the Vibe</h3>
                    <p className="text-sm">
                      Corporate environment (Industrious, Serendipity Labs) vs creative community (The Yard, Nomadworks) vs
                      networking focus (WeWork, WorkHouse NYC). Visit during your intended working hours to experience the
                      atmosphere firsthand.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">✅</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Test Before Committing</h3>
                  <p className="text-sm">
                      Use day passes to test 3-5 spaces. Check WiFi speed, noise levels, desk comfort, and meeting room availability.
                      Start with month-to-month memberships - never sign long-term contracts upfront.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Find Your Perfect NYC Coworking Space</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Compare all {brands.length} brands and 400+ locations across NYC. Filter by neighborhood, price, amenities, and workspace type:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/brands"
                  className="inline-block px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium text-base sm:text-lg"
                >
                  Compare All Brands
                </a>
                <a
                  href="/locations"
                  className="inline-block px-6 sm:px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium text-base sm:text-lg"
                >
                  Browse All Locations
                </a>
                <a
                  href="/guide"
                  className="inline-block px-6 sm:px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center font-medium text-base sm:text-lg"
                >
                  Read Full Guide
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
