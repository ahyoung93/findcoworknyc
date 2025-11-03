'use client'

import { useState, useMemo, useEffect } from 'react'
import { locations, brands } from '../../../coworkingData'
import CoworkingNav from '@/components/CoworkingNav'

type SortBy = 'brand' | 'name' | 'neighborhood' | 'price' | 'rating'

export default function CardLayoutExperiment() {
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [sortAsc, setSortAsc] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Excel-style filters
  const [selectedBrandsFilter, setSelectedBrandsFilter] = useState<string[]>([])
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])
  const [selectedWorkspaceTypes, setSelectedWorkspaceTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown-container]')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(column)
      setSortAsc(column === 'rating' ? false : true)
    }
  }

  const filteredAndSortedLocations = useMemo(() => {
    let filtered = locations

    if (selectedBrandsFilter.length > 0) {
      filtered = filtered.filter(loc => selectedBrandsFilter.includes(loc.brand))
    }

    if (selectedNeighborhoods.length > 0) {
      filtered = filtered.filter(loc => selectedNeighborhoods.includes(loc.neighborhood))
    }

    if (selectedWorkspaceTypes.length > 0) {
      filtered = filtered.filter(loc =>
        loc.workspaceTypes && loc.workspaceTypes.some(type => selectedWorkspaceTypes.includes(type))
      )
    }

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(loc =>
        selectedAmenities.every(amenity => loc.amenities.includes(amenity))
      )
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'brand':
          return sortAsc ? a.brand.localeCompare(b.brand) : b.brand.localeCompare(a.brand)
        case 'name':
          return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        case 'neighborhood':
          return sortAsc ? a.neighborhood.localeCompare(b.neighborhood) : b.neighborhood.localeCompare(a.neighborhood)
        case 'price':
          return sortAsc ? a.price.localeCompare(b.price) : b.price.localeCompare(a.price)
        case 'rating':
          return sortAsc ? (a.rating || 0) - (b.rating || 0) : (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })
    return sorted
  }, [sortBy, sortAsc, selectedBrandsFilter, selectedNeighborhoods, selectedWorkspaceTypes, selectedAmenities])

  const filteredLocations = filteredAndSortedLocations

  // Get unique values for filters
  const uniqueBrands = Array.from(new Set(locations.map(loc => loc.brand))).sort()
  const uniqueNeighborhoods = Array.from(new Set(locations.map(loc => loc.neighborhood))).sort()
  const uniqueWorkspaceTypes = Array.from(
    new Set(locations.flatMap(loc => loc.workspaceTypes || []))
  ).sort()
  const uniqueAmenities = Array.from(
    new Set(locations.flatMap(loc => loc.amenities))
  ).sort()

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrandsFilter(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const toggleNeighborhood = (neighborhood: string) => {
    setSelectedNeighborhoods(prev =>
      prev.includes(neighborhood)
        ? prev.filter(n => n !== neighborhood)
        : [...prev, neighborhood]
    )
  }

  const toggleWorkspaceType = (type: string) => {
    setSelectedWorkspaceTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const getWorkspaceTypeLabel = (type: string) => {
    switch (type) {
      case 'day-pass':
        return 'Day pass'
      case 'hot-desk':
        return 'Hot desk'
      case 'dedicated-desk':
        return 'Dedicated desk'
      case 'private-office':
        return 'Private office'
      case 'meeting-rooms':
        return 'Meeting rooms'
      case 'event-space':
        return 'Event space'
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <CoworkingNav />

      {/* Experimental Banner */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-blue-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-blue-300 text-center">
            🧪 Experimental Card Layout - Testing new design patterns
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Find Your Perfect Workspace
          </h1>
          <p className="text-gray-400 text-lg">
            Explore {locations.length} coworking locations across NYC
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Brand
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'brands' ? null : 'brands')}
                className={`w-full px-4 py-2.5 bg-gray-800/80 border rounded-lg text-left flex items-center justify-between ${
                  selectedBrandsFilter.length > 0 ? 'border-blue-500 text-blue-300 ring-1 ring-blue-500/50' : 'border-gray-600 text-gray-300'
                } hover:border-blue-500 transition-all`}
              >
                <span className="text-sm">
                  {selectedBrandsFilter.length > 0
                    ? `${selectedBrandsFilter.length} selected`
                    : 'All Brands'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'brands' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueBrands.map(brand => {
                      const count = locations.filter(loc => loc.brand === brand).length
                      return (
                        <label key={brand} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedBrandsFilter.includes(brand)}
                            onChange={() => toggleBrandFilter(brand)}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-white">{brand} <span className="text-gray-400">({count})</span></span>
                        </label>
                      )
                    })}
                  </div>
                  {selectedBrandsFilter.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedBrandsFilter([])}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Neighborhood Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Neighborhood
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'neighborhoods' ? null : 'neighborhoods')}
                className={`w-full px-4 py-2.5 bg-gray-800/80 border rounded-lg text-left flex items-center justify-between ${
                  selectedNeighborhoods.length > 0 ? 'border-purple-500 text-purple-300 ring-1 ring-purple-500/50' : 'border-gray-600 text-gray-300'
                } hover:border-purple-500 transition-all`}
              >
                <span className="text-sm">
                  {selectedNeighborhoods.length > 0
                    ? `${selectedNeighborhoods.length} selected`
                    : 'All Neighborhoods'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'neighborhoods' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueNeighborhoods.map(neighborhood => (
                      <label key={neighborhood} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedNeighborhoods.includes(neighborhood)}
                          onChange={() => toggleNeighborhood(neighborhood)}
                          className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-white">{neighborhood}</span>
                      </label>
                    ))}
                  </div>
                  {selectedNeighborhoods.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedNeighborhoods([])}
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Workspace Types Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Workspace Type
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'workspaceTypes' ? null : 'workspaceTypes')}
                className={`w-full px-4 py-2.5 bg-gray-800/80 border rounded-lg text-left flex items-center justify-between ${
                  selectedWorkspaceTypes.length > 0 ? 'border-green-500 text-green-300 ring-1 ring-green-500/50' : 'border-gray-600 text-gray-300'
                } hover:border-green-500 transition-all`}
              >
                <span className="text-sm">
                  {selectedWorkspaceTypes.length > 0
                    ? `${selectedWorkspaceTypes.length} selected`
                    : 'All Types'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'workspaceTypes' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueWorkspaceTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedWorkspaceTypes.includes(type)}
                          onChange={() => toggleWorkspaceType(type)}
                          className="rounded border-gray-600 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-white">{getWorkspaceTypeLabel(type)}</span>
                      </label>
                    ))}
                  </div>
                  {selectedWorkspaceTypes.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedWorkspaceTypes([])}
                        className="text-xs text-green-400 hover:text-green-300"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Amenities Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Amenities
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'amenities' ? null : 'amenities')}
                className={`w-full px-4 py-2.5 bg-gray-800/80 border rounded-lg text-left flex items-center justify-between ${
                  selectedAmenities.length > 0 ? 'border-orange-500 text-orange-300 ring-1 ring-orange-500/50' : 'border-gray-600 text-gray-300'
                } hover:border-orange-500 transition-all`}
              >
                <span className="text-sm">
                  {selectedAmenities.length > 0
                    ? `${selectedAmenities.length} selected`
                    : 'All Amenities'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'amenities' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded border-gray-600 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-white">{amenity}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAmenities.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedAmenities([])}
                        className="text-xs text-orange-400 hover:text-orange-300"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count and Sort Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-base text-gray-300 font-medium">
            {filteredLocations.length === locations.length ? (
              <>Showing all <span className="text-blue-400">{locations.length}</span> locations</>
            ) : (
              <>Showing <span className="text-blue-400">{filteredLocations.length}</span> of {locations.length} locations</>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleSort('rating')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'rating'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Rating {sortBy === 'rating' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('brand')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'brand'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Brand {sortBy === 'brand' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('neighborhood')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'neighborhood'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Neighborhood {sortBy === 'neighborhood' && (sortAsc ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {/* Mobile-Friendly Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-200"
            >
              {/* Name and Neighborhood Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h3 className="font-bold text-lg text-white mb-1 leading-tight">
                  {location.name}
                </h3>
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  <span>📍</span>
                  {location.neighborhood}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                {/* Rating */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-900">
                      {location.rating ? location.rating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                {location.amenities && location.amenities.length > 0 && (
                  <div className="pb-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-600 mb-2">Amenities</div>
                    <div className="flex flex-wrap gap-1.5">
                      {location.amenities.slice(0, 5).map((amenity, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {amenity}
                        </span>
                      ))}
                      {location.amenities.length > 5 && (
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          +{location.amenities.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-600 mb-1">Address</div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {location.address}
                  </a>
                </div>

                {/* Website Link */}
                <div className="pt-1">
                  <a
                    href={`https://${location.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No locations found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more results</p>
          </div>
        )}
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 mt-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
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
              <a href="/locations" className="text-blue-400 hover:text-blue-300 transition-colors">
                Standard View
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
