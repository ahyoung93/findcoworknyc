'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import coworkingData from '../../../coworking-data.json'
import CoworkingNav from '@/components/CoworkingNav'

type Space = typeof coworkingData.spaces[0]
type SortBy = 'price-low' | 'price-high' | 'name' | 'location' | 'amenities'
type MembershipType = 'day-pass-individual' | 'day-pass-team' | 'part-time' | 'hot-desk' | 'dedicated-desk'

export default function CoworkingComparison() {
  const [sortBy, setSortBy] = useState<SortBy>('name')
  const [sortAsc, setSortAsc] = useState(true)
  const [membershipType, setMembershipType] = useState<MembershipType>('day-pass-individual')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [amenitiesDropdownOpen, setAmenitiesDropdownOpen] = useState(false)
  const amenitiesDropdownRef = useRef<HTMLDivElement>(null)

  // Get all unique amenities
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>()
    coworkingData.spaces.forEach(space => {
      space.amenities.forEach(amenity => amenitiesSet.add(amenity))
    })
    return Array.from(amenitiesSet).sort()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (amenitiesDropdownRef.current && !amenitiesDropdownRef.current.contains(event.target as Node)) {
        setAmenitiesDropdownOpen(false)
      }
    }

    if (amenitiesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [amenitiesDropdownOpen])

  // Helper to get price for specific membership type
  const getPriceForType = (space: Space, type: MembershipType) => {
    for (const plan of space.pricing.plans) {
      const planName = plan.name.toLowerCase()

      // Individual day pass - match day/daily but exclude team
      if (type === 'day-pass-individual') {
        if ((planName.includes('day pass') || planName.includes('daily')) && !planName.includes('team')) {
          return plan.price
        }
      }

      // Team day pass - conference/meeting rooms for teams
      if (type === 'day-pass-team') {
        if (planName.includes('conference room') || planName.includes('meeting room')) {
          return plan.price
        }
      }

      // Part-time
      if (type === 'part-time') {
        if (planName.includes('part-time') || planName.includes('part time') ||
            planName.includes('flex') || planName.includes('flexible')) {
          return plan.price
        }
      }

      // Hot desk / Unlimited
      if (type === 'hot-desk') {
        if (planName.includes('hot desk') || planName.includes('hot-desk') ||
            planName.includes('coworking') || planName.includes('open coworking') ||
            planName.includes('unlimited') || planName.includes('full-time') ||
            planName.includes('full time')) {
          return plan.price
        }
      }

      // Dedicated desk
      if (type === 'dedicated-desk') {
        if (planName.includes('dedicated desk') || planName.includes('dedicated') ||
            planName.includes('standing desk')) {
          return plan.price
        }
      }
    }

    return null // No matching plan type
  }

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(column)
      setSortAsc(true)
    }
  }

  const filteredAndSortedSpaces = useMemo(() => {
    let filtered = coworkingData.spaces.filter((space) => {
      // Membership type filter - exclude if this space doesn't offer this type
      const priceForType = getPriceForType(space, membershipType)
      if (priceForType === null) {
        return false
      }

      // Amenities filter - space must have ALL selected amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity =>
          space.amenities.includes(amenity)
        )
        if (!hasAllAmenities) {
          return false
        }
      }

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      const priceA = getPriceForType(a, membershipType) || a.pricing.lowestMonthly
      const priceB = getPriceForType(b, membershipType) || b.pricing.lowestMonthly

      switch (sortBy) {
        case 'price-low':
          return sortAsc ? priceA - priceB : priceB - priceA
        case 'price-high':
          return sortAsc ? priceB - priceA : priceA - priceB
        case 'name':
          return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        case 'location':
          return sortAsc ? a.neighborhood.localeCompare(b.neighborhood) : b.neighborhood.localeCompare(a.neighborhood)
        case 'amenities':
          return sortAsc ? a.amenities.length - b.amenities.length : b.amenities.length - a.amenities.length
        default:
          return 0
      }
    })

    return filtered
  }, [sortBy, sortAsc, membershipType, selectedAmenities])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <CoworkingNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Primary Workspace Type Filter */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 mb-6 border border-gray-700">
          <label className="block text-lg font-bold text-white mb-3">
            Select workspace type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { value: 'day-pass-individual', label: 'Day Pass', icon: '☀️', subtitle: 'Single desk' },
              { value: 'day-pass-team', label: 'Day Pass', icon: '🏢', subtitle: 'Team meeting room' },
              { value: 'part-time', label: 'Flexible', icon: '✨', subtitle: 'Monthly · 10-15 days' },
              { value: 'hot-desk', label: 'Unlimited', icon: '∞', subtitle: 'Monthly · Any desk' },
              { value: 'dedicated-desk', label: 'Reserved', icon: '⭐', subtitle: 'Monthly · Your desk' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setMembershipType(type.value as MembershipType)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  membershipType === type.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-102 border border-gray-700'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-sm font-bold">{type.label}</div>
                <div className="text-xs opacity-80">{type.subtitle}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredAndSortedSpaces.length} of {coworkingData.spaces.length} spaces
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
                        Name
                        {sortBy === 'name' && (
                          <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleSort('location')}
                    >
                      <div className="flex items-center gap-1">
                        Location
                        {sortBy === 'location' && (
                          <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleSort('price-low')}
                    >
                      <div className="flex items-center gap-1">
                        Price
                        {(sortBy === 'price-low' || sortBy === 'price-high') && (
                          <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative">
                      <div className="flex items-center gap-2" ref={amenitiesDropdownRef}>
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-gray-300"
                          onClick={() => handleSort('amenities')}
                        >
                          Amenities
                          {sortBy === 'amenities' && (
                            <span className="text-blue-400">{sortAsc ? '↑' : '↓'}</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setAmenitiesDropdownOpen(!amenitiesDropdownOpen)
                          }}
                          className={`text-sm ${selectedAmenities.length > 0 ? 'text-blue-400' : 'text-gray-500'} hover:text-gray-300`}
                        >
                          ▼
                        </button>
                      </div>

                      {amenitiesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px] max-h-[400px] overflow-y-auto">
                          <div className="p-3">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
                              <span className="text-xs font-semibold text-white">Filter Amenities</span>
                              {selectedAmenities.length > 0 && (
                                <button
                                  onClick={() => setSelectedAmenities([])}
                                  className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            {allAmenities.map((amenity) => (
                              <label
                                key={amenity}
                                className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-700 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedAmenities.includes(amenity)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedAmenities([...selectedAmenities, amenity])
                                    } else {
                                      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
                                    }
                                  }}
                                  className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                                />
                                <span className="text-sm text-gray-300">{amenity}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Website
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {filteredAndSortedSpaces.map((space) => {
                    const displayPrice = getPriceForType(space, membershipType) || space.pricing.lowestMonthly
                    const priceLabel = (membershipType === 'day-pass-individual' || membershipType === 'day-pass-team') ? 'per day' : 'per month'

                    return (
                    <tr key={space.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{space.name}</div>
                        <div className="text-sm text-gray-400">{space.notes}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{space.neighborhood}</div>
                        <div className="text-sm text-gray-500">{space.borough}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-blue-400">
                          ${displayPrice}
                        </div>
                        <div className="text-sm text-gray-500">{priceLabel}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {[...space.amenities].sort().map((amenity, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a
                          href={`https://${space.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                          Visit →
                        </a>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>Data compiled from public sources. Prices may vary. Last updated: October 2025</p>
        </div>
      </footer>
    </div>
  )
}
