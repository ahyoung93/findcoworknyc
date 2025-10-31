import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'WeWork vs Industrious: Which Coworking Space is Better? | CoworkingNYC',
  description: 'Detailed comparison of WeWork and Industrious coworking spaces in NYC. Compare pricing, amenities, locations, and vibes to find the best fit.',
}

export default function WeWorkVsIndustrious() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-4">
            WeWork vs Industrious: Which is Better in NYC?
          </h1>
          <p className="text-gray-400 mb-8">Last updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Verdict</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Choose WeWork If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ You want maximum location options (74+ in NYC)</li>
                    <li>✓ Networking and community events are important</li>
                    <li>✓ You prefer a vibrant, social atmosphere</li>
                    <li>✓ You need flexible day passes ($29-39/day)</li>
                    <li>✓ Budget is a consideration ($$ vs $$$)</li>
                    <li>✓ You're a startup or entrepreneur</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Choose Industrious If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ You need a quiet, professional environment</li>
                    <li>✓ Reception services and hospitality matter</li>
                    <li>✓ You're an established business or executive</li>
                    <li>✓ Premium amenities justify higher cost</li>
                    <li>✓ You prefer boutique spaces over large networks</li>
                    <li>✓ Client impressions are critical</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Head-to-Head Comparison</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white font-semibold">Feature</th>
                      <th className="text-left py-3 px-4 text-blue-400 font-semibold">WeWork</th>
                      <th className="text-left py-3 px-4 text-purple-400 font-semibold">Industrious</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">NYC Locations</td>
                      <td className="py-3 px-4">74+ locations</td>
                      <td className="py-3 px-4">25+ locations</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Price Range</td>
                      <td className="py-3 px-4">$$</td>
                      <td className="py-3 px-4">$$$</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Day Pass</td>
                      <td className="py-3 px-4">$29-39/day</td>
                      <td className="py-3 px-4">Not offered</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Hot Desk</td>
                      <td className="py-3 px-4">$200-300/month</td>
                      <td className="py-3 px-4">Contact for pricing</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Vibe</td>
                      <td className="py-3 px-4">Corporate & Community</td>
                      <td className="py-3 px-4">Premium & Professional</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">24/7 Access</td>
                      <td className="py-3 px-4">✓ Yes</td>
                      <td className="py-3 px-4">✓ Yes</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Coffee</td>
                      <td className="py-3 px-4">✓ Standard</td>
                      <td className="py-3 px-4">✓ Premium</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Beer/Alcohol</td>
                      <td className="py-3 px-4">✓ On tap</td>
                      <td className="py-3 px-4">✗ No</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Reception Services</td>
                      <td className="py-3 px-4">✗ Limited</td>
                      <td className="py-3 px-4">✓ Full service</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Community Events</td>
                      <td className="py-3 px-4">✓ Frequent</td>
                      <td className="py-3 px-4">○ Occasional</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Phone Booths</td>
                      <td className="py-3 px-4">✓ Yes</td>
                      <td className="py-3 px-4">✓ Yes</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white font-medium">Target Audience</td>
                      <td className="py-3 px-4">Startups, freelancers, remote teams</td>
                      <td className="py-3 px-4">Established businesses, executives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Detailed Breakdown</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Location Coverage</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-blue-400 mb-2">WeWork: 74+ Locations</h4>
                      <p className="text-sm mb-2">
                        WeWork dominates NYC with locations in virtually every neighborhood. You'll find multiple WeWorks
                        within walking distance in areas like Midtown, Soho, and the Financial District.
                      </p>
                      <p className="text-xs text-gray-400">
                        Advantage: Maximum flexibility, easy to switch locations, high likelihood of one near you or your clients
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-purple-400 mb-2">Industrious: 25+ Locations</h4>
                      <p className="text-sm mb-2">
                        Industrious takes a more curated approach with fewer, higher-quality locations in prime areas like
                        Rockefeller Center, Union Square, and Soho.
                      </p>
                      <p className="text-xs text-gray-400">
                        Advantage: Every location is premium, less crowded, more exclusive feel
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Pricing & Value</h3>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-3">
                    <h4 className="font-semibold text-blue-400 mb-2">WeWork: More Affordable</h4>
                    <p className="text-sm mb-2">
                      WeWork's transparent pricing makes it easier to budget. Day passes ($29-39) let you test the space before committing.
                      Hot desks at $200-300/month are competitive with other coworking brands. Meeting rooms from $8-10/hour.
                    </p>
                    <p className="text-sm text-green-400 font-medium mb-1">Best Value For:</p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• Freelancers and solopreneurs on a budget</li>
                      <li>• Startups watching burn rate</li>
                      <li>• Anyone wanting to try before buying (day passes)</li>
                      <li>• Remote teams needing flexible short-term solutions</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-purple-400 mb-2">Industrious: Premium Experience</h4>
                    <p className="text-sm mb-2">
                      Industrious doesn't publish pricing - you need to contact them for quotes. This typically means higher prices,
                      but you're paying for hospitality, quieter environments, and a more professional atmosphere.
                    </p>
                    <p className="text-sm text-green-400 font-medium mb-1">Best Value For:</p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• Established businesses that need to impress clients</li>
                      <li>• Executives who value quiet, focused work</li>
                      <li>• Companies where reception services add value</li>
                      <li>• Teams willing to pay more for premium experience</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Atmosphere & Culture</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-blue-400 mb-2">WeWork: Social & Energetic</h4>
                      <p className="text-sm mb-3">
                        WeWork spaces buzz with energy. Open layouts encourage interaction, and beer on tap fuels afternoon networking.
                        Community events happen weekly - from yoga classes to pitch nights to happy hours.
                      </p>
                      <p className="text-xs italic text-gray-400">
                        "The community aspect is huge. I've found clients, hired team members, and made friends through WeWork events." - Sarah, Marketing Consultant
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-purple-400 mb-2">Industrious: Quiet & Professional</h4>
                      <p className="text-sm mb-3">
                        Industrious spaces feel more like a boutique hotel than a bustling coworking scene. Hospitality staff greet you,
                        noise levels stay low, and the focus is on productive work rather than socializing.
                      </p>
                      <p className="text-xs italic text-gray-400">
                        "When I need to focus or take client calls, Industrious is perfect. No distractions, just professional workspace." - Michael, Financial Advisor
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Amenities Comparison</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">☕</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">Coffee Quality</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-blue-400">WeWork:</span> Standard drip coffee, cold brew. Gets the job done.
                            </div>
                            <div>
                              <span className="text-purple-400">Industrious:</span> Premium beans, espresso machines, specialty drinks.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🍺</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">Social Perks</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-blue-400">WeWork:</span> Beer on tap, kombucha, frequent networking events.
                            </div>
                            <div>
                              <span className="text-purple-400">Industrious:</span> Water, tea, occasional member events.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📞</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">Reception & Services</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-blue-400">WeWork:</span> Self-service model. Community team helps but not concierge-level.
                            </div>
                            <div>
                              <span className="text-purple-400">Industrious:</span> Full reception services, mail handling, guest management.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎧</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">Noise Level</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-blue-400">WeWork:</span> Can be lively. Bring headphones for focus time.
                            </div>
                            <div>
                              <span className="text-purple-400">Industrious:</span> Consistently quiet. Library-like atmosphere.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Who Uses Each Space?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-blue-400 mb-2">Typical WeWork Member</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Startup founders and early-stage teams</li>
                        <li>• Freelancers and independent consultants</li>
                        <li>• Remote employees of larger companies</li>
                        <li>• Digital nomads and travelers (day passes)</li>
                        <li>• Creative professionals (designers, writers, marketers)</li>
                        <li>• Anyone seeking community and networking</li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-purple-400 mb-2">Typical Industrious Member</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Established businesses (5-50 employees)</li>
                        <li>• Financial services and consulting firms</li>
                        <li>• Executives and senior professionals</li>
                        <li>• Law firms and medical practices</li>
                        <li>• Client-facing businesses needing polish</li>
                        <li>• Anyone prioritizing quiet and professionalism</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Common Questions</h2>

              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Can I switch between locations?</h3>
                  <p className="text-sm mb-1"><strong className="text-blue-400">WeWork:</strong> Yes! Most memberships include access to any WeWork globally. This is huge if you travel or want flexibility.</p>
                  <p className="text-sm"><strong className="text-purple-400">Industrious:</strong> Access typically limited to your home location. Some memberships include network access for a fee.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Which has better meeting rooms?</h3>
                  <p className="text-sm mb-1"><strong className="text-blue-400">WeWork:</strong> More availability due to sheer number of rooms. Rooms are modern but can book up quickly during peak hours.</p>
                  <p className="text-sm"><strong className="text-purple-400">Industrious:</strong> Higher-end finishes and furnishings. Better for impressive client meetings. Usually easier to book last-minute.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">What about internet speed?</h3>
                  <p className="text-sm">Both offer enterprise-grade WiFi. WeWork can experience slowdowns during peak hours in busy locations. Industrious tends to be more consistent due to fewer members per space. Both have backup connections and wired ethernet available upon request.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Which is better for teams?</h3>
                  <p className="text-sm mb-1"><strong className="text-blue-400">WeWork:</strong> Better for startups and growing teams that need flexibility to scale up/down monthly.</p>
                  <p className="text-sm"><strong className="text-purple-400">Industrious:</strong> Better for established teams that need privacy, professional image, and don't expect frequent size changes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Bottom Line</h2>
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-gray-700">
                <p className="text-lg mb-4">
                  Neither WeWork nor Industrious is objectively "better" - they serve different needs:
                </p>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong className="text-white">Choose WeWork</strong> if you value community, networking, flexibility, and affordability.
                    It's ideal for startups, freelancers, and anyone who wants to be part of an energetic coworking culture.
                    The massive network of locations and day pass options make it easy to try risk-free.
                  </p>
                  <p>
                    <strong className="text-white">Choose Industrious</strong> if you need a quiet, professional environment with hospitality-level service.
                    It's worth the premium for established businesses, client-facing professionals, and anyone who can't afford
                    distractions in their workspace.
                  </p>
                  <p className="text-white font-medium mt-4">
                    Pro tip: Many professionals have tried both. Use WeWork's day pass to test their vibe, then contact Industrious
                    for a tour. The right choice becomes obvious once you experience each space firsthand.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Compare More Coworking Spaces</h2>
              <p className="mb-4">
                Explore all NYC coworking options to find your perfect match:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/brands"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                >
                  View All 14 Brands
                </a>
                <a
                  href="/locations"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                >
                  Browse 400+ Locations
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Data compiled from public sources. Last updated: October 2025
            </p>
            <div className="flex gap-6 text-sm">
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
