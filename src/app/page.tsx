import Link from 'next/link'
import CoworkingNav from '@/components/CoworkingNav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'FindCoworkNYC - Find the Best Coworking Spaces in New York City',
  description: 'Compare over 400 coworking locations across NYC. Find the perfect workspace by brand, neighborhood, pricing, and amenities.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Perfect<br />Coworking Space in NYC
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Compare over 400 coworking locations across New York City. Search by brand, neighborhood, pricing, and amenities.
          </p>
          <Link
            href="/best-coworking-spaces-nyc"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Explore All Spaces
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Link href="/brands" className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold text-white mb-2">Browse by Brand</h2>
            <p className="text-gray-400">Compare WeWork, Industrious, and 20+ other coworking brands</p>
          </Link>

          <Link href="/locations" className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold text-white mb-2">All Locations</h2>
            <p className="text-gray-400">Search 400+ coworking spaces across all NYC neighborhoods</p>
          </Link>

          <Link href="/articles" className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold text-white mb-2">Guides & Articles</h2>
            <p className="text-gray-400">Read our in-depth guides and NYC coworking insights</p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
