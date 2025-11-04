import CoworkingNav from '@/components/CoworkingNav'
import Link from 'next/link'

export const metadata = {
  title: 'NYC Coworking Articles & Guides | FindCoworkNYC',
  description: 'Read the latest on NYC coworking trends, culture, and spaces. In-depth guides, reviews, and analysis of coworking in New York City.',
}

interface Article {
  title: string
  path: string
  description: string
  category: string
}

const articles: Article[] = [
  {
    title: 'NYC Coworking Statistics 2025',
    path: '/articles/nyc-coworking-stats',
    description: 'Data-driven analysis of NYC\'s coworking market',
    category: 'Research'
  },
  {
    title: 'Best Day Passes in NYC',
    path: '/articles/day-pass-coworking',
    description: 'Find the best day pass options for flexible coworking',
    category: 'Guide'
  },
  {
    title: 'Coworking for Freelancers',
    path: '/articles/coworking-for-freelancers',
    description: 'The real story on coworking for freelance professionals',
    category: 'Guide'
  },
  {
    title: 'What\'s the Hype Around Industrious?',
    path: '/articles/industrious-coworking-nyc',
    description: 'Honest review of Industrious premium coworking',
    category: 'Review'
  },
  {
    title: 'Complete NYC Coworking Guide',
    path: '/articles/guide',
    description: 'Everything you need to know about coworking in NYC',
    category: 'Guide'
  },
  {
    title: 'Midtown Coworking Guide',
    path: '/articles/midtown',
    description: 'Best coworking spaces in Midtown Manhattan',
    category: 'Guide'
  },
  {
    title: 'WeWork vs Industrious',
    path: '/articles/wework-vs-industrious',
    description: 'Head-to-head comparison of NYC\'s top coworking brands',
    category: 'Comparison'
  },
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            NYC Coworking Articles & Guides
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl">
            Read the latest on NYC coworking trends, culture, and spaces. We cover everything from statistical deep dives to practical guides for finding your perfect workspace in New York City.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.path}
              href={article.path}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              Data compiled from public sources and member reviews. Last updated: November 2025
            </p>
            <div className="flex gap-4 sm:gap-6 text-sm">
              <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
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
