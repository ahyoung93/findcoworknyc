import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'Best Day Pass Coworking in NYC 2025 | $18-39 Daily Workspace',
  description: 'Find the best day pass coworking spaces in NYC. Compare prices from $18-39/day across Manhattan, Brooklyn & Queens. No membership required.',
  keywords: 'day pass coworking NYC, daily coworking pass, temporary workspace NYC, coworking day rate, hourly coworking NYC',
}

export default function DayPassCoworking() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <article className="bg-gray-900 rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Best Day Pass Coworking Spaces in NYC
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Last updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Get a Day Pass?</h2>
              <p className="mb-4 text-sm sm:text-base">
                Day passes let you access professional coworking spaces without monthly commitments. Perfect for remote workers
                visiting NYC, freelancers who work from home most days, or anyone wanting to test a space before committing to
                a membership. Prices range from $18-39 per day across NYC.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 my-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Day Pass Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">✓</span>
                    <span><strong className="text-white">No commitment</strong> - Pay only for days you use</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">✓</span>
                    <span><strong className="text-white">Try before you buy</strong> - Test spaces before monthly membership</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">✓</span>
                    <span><strong className="text-white">Professional environment</strong> - Better than coffee shops</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold text-lg sm:text-xl">✓</span>
                    <span><strong className="text-white">Full amenities</strong> - WiFi, coffee, meeting rooms included</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Best Day Pass Options by Price</h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-4 sm:p-6 border border-green-800">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-400">The Farm SoHo</h3>
                    <span className="text-2xl sm:text-3xl font-bold text-green-400">$18-29/day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best Value in NYC.</strong> Rustic creative vibe in the heart of SoHo with
                    high ceilings and natural light. Full access to hot desks, meeting rooms, and event space. Coffee and kitchen
                    facilities included.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Location:</p>
                      <p className="text-white">447 Broadway, SoHo</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Creatives, designers, budget-conscious workers</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-900/50 text-green-300 rounded">WiFi included</span>
                    <span className="px-2 py-1 bg-gray-900/50 text-green-300 rounded">Coffee</span>
                    <span className="px-2 py-1 bg-gray-900/50 text-green-300 rounded">Kitchen</span>
                    <span className="px-2 py-1 bg-gray-900/50 text-green-300 rounded">Event space</span>
                  </div>
                  <a href="https://thefarmsoho.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-medium text-sm">
                    Visit The Farm SoHo →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Cubico</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">From $20/hour</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Hourly Needs.</strong> Unique hourly pricing model perfect for quick
                    client meetings or half-day work sessions. Pet-friendly with rooftop access. Four locations across SoHo and NoLita.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Locations:</p>
                      <p className="text-white">4 SoHo/NoLita locations</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Short meetings, pet owners, flexible hours</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Pet-friendly</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Rooftop</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Hourly rates</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Private offices</span>
                  </div>
                  <a href="https://cubico.co" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit Cubico →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">WeWork</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">$29-39/day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Location Options.</strong> With 74+ NYC locations, there's always a
                    WeWork nearby. Access any location with your day pass. Great for networking and community events. Beer on tap,
                    phone booths, and modern design.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Locations:</p>
                      <p className="text-white">74+ across Manhattan, Brooklyn, Queens</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Networking, travelers, flexibility</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Global access</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Coffee & Beer</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Phone booths</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Events</span>
                  </div>
                  <a href="https://wework.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit WeWork →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Green Desk</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">From $29/day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Brooklyn & Queens.</strong> Eco-friendly coworking with 8 outer-borough
                    locations. Great for avoiding Manhattan commute and prices. Sustainable workspace for environmentally conscious workers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Locations:</p>
                      <p className="text-white">8 Brooklyn & Queens locations</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Eco-conscious workers, outer boroughs</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Eco-friendly</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Printing</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Meeting rooms</span>
                  </div>
                  <a href="https://greendesk.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit Green Desk →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">The Yard</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">Contact for pricing</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Community.</strong> Creative and community-driven with 8 locations
                    across Manhattan and Brooklyn. Pet-friendly with outdoor spaces and beer on tap. Strong emphasis on member events.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Locations:</p>
                      <p className="text-white">8 locations - Manhattan (5), Brooklyn (3)</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Creatives, pet owners, community seekers</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Pet-friendly</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Outdoor space</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Coffee & Beer</span>
                  </div>
                  <a href="https://theyard.nyc" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit The Yard →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">WorkHouse NYC</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">From $100/day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Entrepreneurs.</strong> Premium founder-focused space in Midtown.
                    Single curated location with strong emphasis on networking and building entrepreneur community. 24/7 access included.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Location:</p>
                      <p className="text-white">1 Midtown Manhattan location</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Startup founders, entrepreneurs</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">24/7 access</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Networking events</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Founder community</span>
                  </div>
                  <a href="https://workhousenyc.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit WorkHouse NYC →
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Bond Collective</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">From $25/day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3">
                    <strong className="text-white">Best for Luxurious Amenities.</strong> Boutique coworking with 5 locations
                    across Brooklyn and Manhattan. Beer on tap, shower facilities, recording studios, and pet-friendly policies.
                    Premium experience at reasonable day pass rates.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Locations:</p>
                      <p className="text-white">5 locations - Brooklyn (3), Manhattan (2)</p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-400 mb-1">Best For:</p>
                      <p className="text-white">Premium amenities, creatives, pet owners</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Pet-friendly</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Showers</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Recording studio</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-blue-300 rounded">Beer</span>
                  </div>
                  <a href="https://bondcollective.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Visit Bond Collective →
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Day Pass vs Monthly Membership: When to Choose What</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-lg p-4 sm:p-6 border border-blue-800">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Choose Day Pass If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>You work from home 3-4 days per week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>You're visiting NYC temporarily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>You need occasional client meeting space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>You want to test spaces before committing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Your schedule varies week to week</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-900/50 rounded">
                    <p className="text-xs text-gray-400">Break-even point:</p>
                    <p className="text-sm text-white">If you go less than 6-8 days/month, day passes are cheaper</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 rounded-lg p-4 sm:p-6 border border-purple-800">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Choose Monthly If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>You need workspace 3+ days per week consistently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>You want your own dedicated desk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>You need to leave personal items/equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>You want community and networking opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>You need regular meeting room access</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-900/50 rounded">
                    <p className="text-xs text-gray-400">Break-even point:</p>
                    <p className="text-sm text-white">If you go 8+ days/month, monthly membership saves money</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Tips for Maximizing Your Day Pass</h2>

              <div className="space-y-4">
                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">📅</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Book in Advance</h3>
                    <p className="text-sm">
                      Popular spaces fill up, especially on Tuesdays-Thursdays. Book your day pass at least 24 hours ahead
                      to guarantee a spot. Some spaces like WeWork let you book online instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">⏰</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Arrive Early</h3>
                    <p className="text-sm">
                      Get there by 9am to claim a good desk spot, especially at hot desk locations. The best desks (near windows,
                      quiet corners) go fast. Most day passes start at 8 or 9am.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">🎧</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Bring Headphones</h3>
                    <p className="text-sm">
                      Even quiet coworking spaces have ambient noise. Bring noise-canceling headphones for focus time and
                      video calls. Phone booths are available but can be booked during busy hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">🤝</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Network While You're There</h3>
                    <p className="text-sm">
                      Don't just put your head down. Chat with members during lunch or coffee breaks. Many business relationships
                      and collaborations start with casual coworking conversations. Ask about community events.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">💼</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Take a Tour</h3>
                    <p className="text-sm">
                      Use your day pass as a trial run. Check WiFi speed, test phone booths, scout meeting rooms, and gauge
                      the vibe. If you're thinking about a monthly membership, this is your chance to evaluate before committing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl shrink-0">🍕</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">Plan Your Lunch</h3>
                    <p className="text-sm">
                      Midtown and Manhattan lunch can be expensive ($15-25). Many coworking spaces have kitchens where you can
                      store and heat food. Bringing lunch saves $10-15 per day pass visit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Day Pass by Neighborhood</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Midtown Manhattan</h3>
                  <p className="text-sm mb-2">
                    Most options with 30+ day pass locations. WeWork and WorkHouse NYC are popular. Expect $29-100/day range.
                  </p>
                  <p className="text-xs text-blue-400">Best for: Client meetings, central location, transit access</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">SoHo</h3>
                  <p className="text-sm mb-2">
                    The Farm SoHo ($18-29) and Cubico ($20/hr) offer the best value. Creative vibe in beautiful historic buildings.
                  </p>
                  <p className="text-xs text-blue-400">Best for: Creatives, budget-conscious, trendy atmosphere</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Brooklyn</h3>
                  <p className="text-sm mb-2">
                    Green Desk ($29), The Yard, and Bond Collective ($25). 20-30% cheaper than Manhattan with great communities.
                  </p>
                  <p className="text-xs text-blue-400">Best for: Brooklyn residents, lower prices, creative scene</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Financial District</h3>
                  <p className="text-sm mb-2">
                    WeWork locations available. Quieter than Midtown. Good for financial/legal professionals.
                  </p>
                  <p className="text-xs text-blue-400">Best for: Finance professionals, quiet atmosphere, prestige</p>
                </div>
              </div>
            </section>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Compare All NYC Coworking Options</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Ready to explore? Compare all brands and locations to find your perfect workspace:
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
                  href="/coworking-for-freelancers"
                  className="inline-block px-6 sm:px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center font-medium text-base sm:text-lg"
                >
                  Freelancer Guide
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              Data compiled from public sources. Last updated: October 2025
            </p>
            <div className="flex gap-4 sm:gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
