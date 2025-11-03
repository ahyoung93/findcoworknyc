'use client'

import { useState, useMemo, useEffect } from 'react'
import { locations, brands } from '../../../coworkingData'
import CoworkingNav from '@/components/CoworkingNav'

type SortBy = 'brand' | 'name' | 'neighborhood' | 'price' | 'rating'

export default function CardLayoutExperiment() {
  const [sortBy, setSortBy] = useState<SortBy>('rating')
  const [sortAsc, setSortAsc] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Filters
  const [selectedBrandsFilter, setSelectedBrandsFilter] = useState<string[]>([])
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])
  const [selectedWorkspaceTypes, setSelectedWorkspaceTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFilterModalOpen])

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

  const clearAllFilters = () => {
    setSelectedBrandsFilter([])
    setSelectedNeighborhoods([])
    setSelectedWorkspaceTypes([])
    setSelectedAmenities([])
  }

  const activeFilterCount = selectedBrandsFilter.length + selectedNeighborhoods.length + selectedWorkspaceTypes.length + selectedAmenities.length

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

        {/* Filters Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-300 transition-all shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Modal/Drawer */}
        {isFilterModalOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-50 transition-opacity"
              onClick={() => setIsFilterModalOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-6">
                {/* Brand Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Brand</h3>
                    {selectedBrandsFilter.length > 0 && (
                      <button
                        onClick={() => setSelectedBrandsFilter([])}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueBrands.map(brand => {
                      const count = locations.filter(loc => loc.brand === brand).length
                      return (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedBrandsFilter.includes(brand)}
                            onChange={() => toggleBrandFilter(brand)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {brand} <span className="text-gray-400">({count})</span>
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Neighborhood Filter */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Neighborhood</h3>
                    {selectedNeighborhoods.length > 0 && (
                      <button
                        onClick={() => setSelectedNeighborhoods([])}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueNeighborhoods.map(neighborhood => (
                      <label key={neighborhood} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedNeighborhoods.includes(neighborhood)}
                          onChange={() => toggleNeighborhood(neighborhood)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{neighborhood}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Workspace Types Filter */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Workspace Type</h3>
                    {selectedWorkspaceTypes.length > 0 && (
                      <button
                        onClick={() => setSelectedWorkspaceTypes([])}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {uniqueWorkspaceTypes.map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedWorkspaceTypes.includes(type)}
                          onChange={() => toggleWorkspaceType(type)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{getWorkspaceTypeLabel(type)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Amenities</h3>
                    {selectedAmenities.length > 0 && (
                      <button
                        onClick={() => setSelectedAmenities([])}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 space-y-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Show {filteredLocations.length} {filteredLocations.length === 1 ? 'Location' : 'Locations'}
                </button>
              </div>
            </div>
          </>
        )}

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

        {/* Sleek Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLocations.map((location, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              {/* Card Content */}
              <div className="p-5 space-y-4">
                {/* Name and Neighborhood */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-snug">
                    {location.name}
                  </h3>
                  <p className="text-base text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location.neighborhood}
                  </p>
                </div>

                {/* Google Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Google Rating</span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-base font-semibold text-gray-900">
                      {location.rating ? location.rating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                {location.amenities && location.amenities.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {location.amenities.slice(0, 4).map((amenity, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1.5 rounded-md text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          {amenity}
                        </span>
                      ))}
                      {location.amenities.length > 4 && (
                        <span className="inline-block px-3 py-1.5 rounded-md text-sm text-gray-500 bg-gray-50">
                          +{location.amenities.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Address */}
                <div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors line-clamp-1 block"
                  >
                    {location.address}
                  </a>
                </div>

                {/* Website Link */}
                <div className="pt-2">
                  <a
                    href={`https://${location.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-base font-medium rounded-lg transition-all"
                  >
                    Visit Website
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
