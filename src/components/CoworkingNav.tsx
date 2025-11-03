'use client'

import { usePathname } from 'next/navigation'

export default function CoworkingNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const getSubtitle = () => {
    return 'Compare all coworking brands and locations across NYC'
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start sm:items-center gap-4 sm:gap-8 py-4 flex-col sm:flex-row">
          <div className="flex-shrink-0">
            <a href="/best-coworking-spaces-nyc" className="text-xl sm:text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              CoworkingNYC
            </a>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden md:block">{getSubtitle()}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-6 sm:ml-auto">
            <a
              href="/brands"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                isActive('/brands')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Brands
            </a>
            <a
              href="/locations"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                isActive('/locations')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Locations
            </a>
            <a
              href="/articles/coworking-for-freelancers"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                pathname?.startsWith('/articles')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Articles & Guides
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
