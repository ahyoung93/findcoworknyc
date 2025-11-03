'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { locations, brands } from '../../../coworkingData'
import CoworkingNav from '@/components/CoworkingNav'

type SortBy = 'brand' | 'name' | 'neighborhood' | 'price' | 'rating'

export default function LocationsPage() {
  const [sortBy, setSortBy] = useState<SortBy>('brand')
  const [sortAsc, setSortAsc] = useState(true)

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
      // Close dropdown if clicking outside any dropdown container
      if (!target.closest('[data-dropdown-container]')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 mb-6 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Brand Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-lg font-bold text-white mb-3">
                Filter by brand
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'brands' ? null : 'brands')}
                className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-left flex items-center justify-between ${
                  selectedBrandsFilter.length > 0 ? 'border-blue-600 text-blue-400' : 'border-gray-700 text-gray-400'
                } hover:border-blue-600 transition-colors`}
              >
                <span>
                  {selectedBrandsFilter.length > 0
                    ? `${selectedBrandsFilter.length} brands selected`
                    : 'All Brands'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'brands' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueBrands.map(brand => {
                      const count = locations.filter(loc => loc.brand === brand).length
                      return (
                        <label key={brand} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrandsFilter.includes(brand)}
                            onChange={() => toggleBrandFilter(brand)}
                            className="rounded border-gray-600"
                          />
                          <span className="text-sm text-white">{brand} ({count})</span>
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
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Workspace Types Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-lg font-bold text-white mb-3">
                Filter by workspace type
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'workspaceTypes' ? null : 'workspaceTypes')}
                className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-left flex items-center justify-between ${
                  selectedWorkspaceTypes.length > 0 ? 'border-blue-600 text-blue-400' : 'border-gray-700 text-gray-400'
                } hover:border-blue-600 transition-colors`}
              >
                <span>
                  {selectedWorkspaceTypes.length > 0
                    ? `${selectedWorkspaceTypes.length} types selected`
                    : 'All Workspace Types'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'workspaceTypes' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueWorkspaceTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedWorkspaceTypes.includes(type)}
                          onChange={() => toggleWorkspaceType(type)}
                          className="rounded border-gray-600"
                        />
                        <span className="text-sm text-white">{getWorkspaceTypeLabel(type)}</span>
                      </label>
                    ))}
                  </div>
                  {selectedWorkspaceTypes.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedWorkspaceTypes([])}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count and Sort Controls */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {filteredLocations.length} of {locations.length} locations
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2 flex-wrap">
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
            <button
              onClick={() => handleSort('rating')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'rating'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Rating {sortBy === 'rating' && (sortAsc ? '↑' : '↓')}
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
