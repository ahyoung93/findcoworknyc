'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function CoworkingNav() {
  const pathname = usePathname()
  const [showGuidesDropdown, setShowGuidesDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => pathname === path

  const getSubtitle = () => {
    return 'Compare all coworking brands and locations across NYC'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGuidesDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowGuidesDropdown(!showGuidesDropdown)}
                className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-1 text-sm sm:text-base"
              >
                Resources
                <span className="text-xs">▼</span>
              </button>
              {showGuidesDropdown && (
                <div className="absolute top-full mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl right-0 z-50">
                  <div className="py-2">
                    <a
                      href="/articles/day-pass-coworking"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      Best Day Passes
                    </a>
                    <a
                      href="/articles/coworking-for-freelancers"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      For Freelancers
                    </a>
                    <a
                      href="/articles/industrious-coworking-nyc"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      What's the Hype Around Industrious?
                    </a>
                    <a
                      href="/articles/guide"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      Complete NYC Guide
                    </a>
                    <a
                      href="/articles/midtown"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      Midtown Guide
                    </a>
                    <a
                      href="/articles/wework-vs-industrious"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowGuidesDropdown(false)}
                    >
                      WeWork vs Industrious
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
