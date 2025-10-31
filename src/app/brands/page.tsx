'use client'

import { useState, useMemo, useEffect } from 'react'
import { brands } from '../../../coworkingData'
import CoworkingNav from '@/components/CoworkingNav'

type SortBy = 'name' | 'vibe' | 'locations' | 'price'

export default function BrandsPage() {
  const [sortBy, setSortBy] = useState<SortBy>('name')
  const [sortAsc, setSortAsc] = useState(true)

  // Filters
  const [selectedWorkspaceTypes, setSelectedWorkspaceTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedPricingBadge, setSelectedPricingBadge] = useState<string | null>(null)

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

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(column)
      setSortAsc(true)
    }
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

  // Get unique values for filters
  const uniqueWorkspaceTypes = Array.from(
    new Set(brands.flatMap(brand => brand.workspaceTypes || []))
  ).sort()
  const uniqueAmenities = Array.from(
    new Set(brands.flatMap(brand => brand.amenities || []))
  ).sort()

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

  const filteredAndSortedBrands = useMemo(() => {
    let filtered = brands

    // Apply workspace type filter
    if (selectedWorkspaceTypes.length > 0) {
      filtered = filtered.filter(brand =>
        brand.workspaceTypes && brand.workspaceTypes.some(type => selectedWorkspaceTypes.includes(type))
      )
    }

    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(brand =>
        brand.amenities && selectedAmenities.every(amenity => brand.amenities.includes(amenity))
      )
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        case 'vibe':
          return sortAsc ? a.vibe.localeCompare(b.vibe) : b.vibe.localeCompare(a.vibe)
        case 'locations':
          return sortAsc ? (a.locationSummary || '').localeCompare(b.locationSummary || '') : (b.locationSummary || '').localeCompare(a.locationSummary || '')
        case 'price':
          return sortAsc ? a.priceRange.localeCompare(b.priceRange) : b.priceRange.localeCompare(a.priceRange)
        default:
          return 0
      }
    })
    return sorted
  }, [sortBy, sortAsc, selectedWorkspaceTypes, selectedAmenities])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <CoworkingNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 mb-6 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
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

            {/* Amenities Filter */}
            <div className="relative" data-dropdown-container>
              <label className="block text-lg font-bold text-white mb-3">
                Filter by amenities
              </label>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'amenities' ? null : 'amenities')}
                className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-left flex items-center justify-between ${
                  selectedAmenities.length > 0 ? 'border-blue-600 text-blue-400' : 'border-gray-700 text-gray-400'
                } hover:border-blue-600 transition-colors`}
              >
                <span>
                  {selectedAmenities.length > 0
                    ? `${selectedAmenities.length} amenities selected`
                    : 'All Amenities'}
                </span>
                <span className="text-xs">▼</span>
              </button>
              {openDropdown === 'amenities' && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {uniqueAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded border-gray-600"
                        />
                        <span className="text-sm text-white">{amenity}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAmenities.length > 0 && (
                    <div className="border-t border-gray-700 p-2">
                      <button
                        onClick={() => setSelectedAmenities([])}
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

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredAndSortedBrands.length} of {brands.length} brands
        </div>

        {/* Table View */}
        <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Brand Name
                      {sortBy === 'name' && (
                        <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('vibe')}
                  >
                    <div className="flex items-center gap-1">
                      Vibe
                      {sortBy === 'vibe' && (
                        <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('locations')}
                  >
                    <div className="flex items-center gap-1">
                      Locations
                      {sortBy === 'locations' && (
                        <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center gap-1">
                      Price Range
                      {sortBy === 'price' && (
                        <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Workspace Types (click for pricing)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {filteredAndSortedBrands.map((brand) => (
                  <tr key={brand.name} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`https://${brand.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {brand.name}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-800">
                        {brand.vibe}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{brand.locationSummary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-blue-400">{brand.priceRange}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {(brand.workspaceTypes || []).map((type, i) => {
                          const badgeId = `${brand.name}-${type}`;
                          const isSelected = selectedPricingBadge === badgeId;
                          const price = brand.pricing?.[type];

                          return (
                            <div key={i} className="flex flex-col gap-1">
                              <button
                                onClick={() => setSelectedPricingBadge(isSelected ? null : badgeId)}
                                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-all ${
                                  isSelected
                                    ? 'bg-purple-700 text-white border-purple-600'
                                    : 'bg-purple-900/50 text-purple-300 border-purple-800 hover:bg-purple-800/50'
                                } border cursor-pointer`}
                              >
                                {getWorkspaceTypeLabel(type)}
                              </button>
                              {isSelected && price && (
                                <div className="text-xs text-green-400 font-medium animate-fadeIn">
                                  {price}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
