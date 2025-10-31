'use client'

import { useEffect, useState } from 'react'

interface Space {
  id: string
  name: string
  neighborhood: string
  borough: string
  location: { lat: number; lng: number }
  pricing: {
    lowestMonthly: number
    plans: Array<{ name: string; price: number; description: string }>
  }
  amenities: string[]
  website: string
  notes: string
}

interface CoworkingMapProps {
  spaces: Space[]
}

export default function CoworkingMap({ spaces }: CoworkingMapProps) {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-800 bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-bold text-white mb-2">Map View</h3>
        <p className="text-gray-400 mb-4">
          Showing {spaces.length} coworking spaces across NYC
        </p>
        <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
          {spaces.slice(0, 5).map((space) => (
            <div key={space.id} className="text-sm text-gray-300 text-left bg-gray-900 p-3 rounded-lg border border-gray-800">
              <span className="font-semibold text-white">{space.name}</span> - {space.neighborhood}
            </div>
          ))}
          {spaces.length > 5 && (
            <div className="text-sm text-gray-500">
              +{spaces.length - 5} more spaces
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
