'use client'

import { usePathname } from 'next/navigation'
import CoworkingNav from './CoworkingNav'

interface Article {
  title: string
  path: string
  description: string
}

const articles: Article[] = [
  {
    title: 'NYC Coworking Statistics 2025',
    path: '/articles/nyc-coworking-stats',
    description: 'Data-driven analysis of NYC\'s coworking market'
  },
  {
    title: 'Best Day Passes in NYC',
    path: '/articles/day-pass-coworking',
    description: 'Find the best day pass options for flexible coworking'
  },
  {
    title: 'Coworking for Freelancers',
    path: '/articles/coworking-for-freelancers',
    description: 'The real story on coworking for freelance professionals'
  },
  {
    title: 'What\'s the Hype Around Industrious?',
    path: '/articles/industrious-coworking-nyc',
    description: 'Honest review of Industrious premium coworking'
  },
  {
    title: 'Complete NYC Coworking Guide',
    path: '/articles/guide',
    description: 'Everything you need to know about coworking in NYC'
  },
  {
    title: 'Midtown Coworking Guide',
    path: '/articles/midtown',
    description: 'Best coworking spaces in Midtown Manhattan'
  },
  {
    title: 'WeWork vs Industrious',
    path: '/articles/wework-vs-industrious',
    description: 'Head-to-head comparison of NYC\'s top coworking brands'
  },
]

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-950">
      <CoworkingNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">Articles & Guides</h2>
              <nav className="space-y-1">
                {articles.map((article) => {
                  const isActive = pathname === article.path
                  return (
                    <a
                      key={article.path}
                      href={article.path}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="font-bold mb-1">{article.title}</div>
                      <div className="text-xs opacity-80">{article.description}</div>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              Data compiled from public sources and member reviews. Last updated: November 2025
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
