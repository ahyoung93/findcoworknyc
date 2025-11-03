'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { locations, brands } from '../../../coworkingData'
import CoworkingNav from '@/components/CoworkingNav'

type SortBy = 'brand' | 'name' | 'neighborhood' | 'price' | 'rating'

export default function LocationsPage() {
  const [sortBy, setSortBy] = useState<SortBy>('brand')
  const [sortAsc, setSortAsc] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

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
      setSortAsc(true)
    }
  }

  const filteredAndSortedLocations = useMemo(() => {
    let filtered = locations

    // Apply brand filter
    if (selectedBrandsFilter.length > 0) {
      filtered = filtered.filter(loc => selectedBrandsFilter.includes(loc.brand))
    }

    // Apply neighborhood filter
    if (selectedNeighborhoods.length > 0) {
      filtered = filtered.filter(loc => selectedNeighborhoods.includes(loc.neighborhood))
    }

    // Apply workspace type filter
    if (selectedWorkspaceTypes.length > 0) {
      filtered = filtered.filter(loc =>
        loc.workspaceTypes && loc.workspaceTypes.some(type => selectedWorkspaceTypes.includes(type))
      )
    }

    // Apply amenities filter (must have ALL selected amenities)
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

  // Workspace type display helpers
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
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <CoworkingNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 text-sm font-normal rounded-md border border-gray-200 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="text-xs text-gray-500">
                ({activeFilterCount})
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
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {filteredLocations.length} of {locations.length} locations
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleSort('rating')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'rating'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Google Rating {sortBy === 'rating' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('brand')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'brand'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Brand {sortBy === 'brand' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('name')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Name {sortBy === 'name' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('neighborhood')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'neighborhood'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Neighborhood {sortBy === 'neighborhood' && (sortAsc ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all hover:shadow-lg"
            >
              {/* Header with name and rating */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white mb-1">{location.name}</h3>
                  <div className="text-sm text-gray-400">{location.brand}</div>
                </div>
                <div className="flex items-center gap-1 text-sm text-yellow-400">
                  <span>⭐</span>
                  <span className="font-medium">{location.rating ? location.rating.toFixed(1) : 'N/A'}</span>
                </div>
              </div>

              {/* Neighborhood */}
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-800">
                  {location.neighborhood}
                </span>
              </div>

              {/* Address */}
              <div className="mb-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                >
                  📍 {location.address}
                </a>
              </div>

              {/* Amenities */}
              {location.amenities && location.amenities.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2">Amenities</div>
                  <div className="flex flex-wrap gap-1">
                    {location.amenities.sort().map((amenity, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Website Link */}
              <div className="pt-3 border-t border-gray-800">
                <a
                  href={`https://${location.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm inline-flex items-center gap-1"
                >
                  Visit Website
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No locations found for the selected brand.
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
