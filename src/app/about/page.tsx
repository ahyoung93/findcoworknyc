import CoworkingNav from '@/components/CoworkingNav'

export const metadata = {
  title: 'About FindCoworkNYC - NYC Coworking Space Directory',
  description: 'FindCoworkNYC helps professionals find the perfect coworking space in New York City. Compare 400+ locations across Manhattan, Brooklyn, and Queens.',
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <article className="bg-gray-900 rounded-xl p-6 sm:p-8 lg:p-12 border border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            About FindCoworkNYC
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              <strong>FindCoworkNYC is the most comprehensive directory of coworking spaces in New York City.</strong> We help freelancers, remote workers, and small businesses find their perfect workspace across Manhattan, Brooklyn, Queens, and the Bronx.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">What We Do</h2>

            <p className="leading-relaxed">
              We've compiled data on over 400 coworking locations across NYC, making it easy to compare spaces by neighborhood, price, amenities, and ratings. Whether you need a $18/day hot desk in SoHo or a private office in Midtown, we help you find it.
            </p>

            <p className="leading-relaxed">
              Our site provides:
            </p>

            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Comprehensive database of 400+ NYC coworking locations</li>
              <li>Detailed comparisons of 14 major coworking brands</li>
              <li>In-depth guides on choosing the right workspace</li>
              <li>Real pricing data and member reviews</li>
              <li>Neighborhood-specific recommendations</li>
              <li>Up-to-date market statistics and trends</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Who We Are</h2>

            <p className="leading-relaxed">
              We're a team of NYC tech workers who work remotely and are total coworking space junkies. We've tried dozens of spaces across Manhattan, Brooklyn, and Queens—from $18 day passes in SoHo to premium offices in Midtown.
            </p>

            <p className="leading-relaxed">
              After years of bouncing between coworking spaces, we realized finding the right workspace shouldn't be this hard. So we built the resource we wish existed when we started.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Why We Built This</h2>

            <p className="leading-relaxed">
              Finding a coworking space in NYC is harder than it should be. Pricing isn't transparent. Reviews are scattered across different sites. Comparing options takes hours of research.
            </p>

            <p className="leading-relaxed">
              We built FindCoworkNYC to solve this problem. All the information you need in one place—real pricing, honest reviews, and detailed comparisons. No fluff, just data that helps you make the right decision.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Our Mission</h2>

            <p className="leading-relaxed">
              To help every remote worker, freelancer, and small business in NYC find workspace that fits their needs and budget. We believe flexible workspace should be accessible and easy to find.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">How We Maintain Our Data</h2>

            <p className="leading-relaxed">
              Our database is compiled from:
            </p>

            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Public information from coworking space websites</li>
              <li>Member reviews and testimonials</li>
              <li>Industry reports and market research</li>
              <li>Regular updates to ensure accuracy</li>
            </ul>

            <p className="leading-relaxed">
              We update our data monthly to ensure pricing, locations, and amenities stay current.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Contact Us</h2>

            <p className="leading-relaxed">
              Have questions, suggestions, or want to report outdated information? We'd love to hear from you.
            </p>

            <p className="leading-relaxed">
              <strong>Email:</strong> <a href="mailto:hello@findcoworknyc.com" className="text-blue-400 hover:text-blue-300">hello@findcoworknyc.com</a>
            </p>

            <p className="leading-relaxed text-sm text-gray-400 mt-8 pt-8 border-t border-gray-800">
              FindCoworkNYC is an independent directory service. We are not affiliated with or endorsed by any of the coworking brands listed on our site.
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
