'use client'

import Link from 'next/link'
import BatonLogo from './BatonLogo'

interface HeaderProps {
  prompt?: {
    text: string
  }
}

export default function Header({ prompt }: HeaderProps) {
  return (
    <header className="py-8">
      <div className="container-app">
        <Link href="/" className="inline-block mb-4">
          <BatonLogo />
        </Link>

        <div className="mb-4 text-sm text-draw-black/70">
          three people. 30 seconds each. one chaotic drawing.
        </div>

        {prompt && (
          <div
            className="bg-gradient-to-r from-draw-yellow/20 to-draw-blue/20 text-center px-6 py-3 border-2 border-draw-black/10 relative overflow-hidden"
            style={{
              borderRadius: '30px 10px 30px 10px',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.05)'
            }}
          >
            <div className="text-sm">
              <span className="font-semibold">today's theme:</span>{' '}
              <span className="font-bold text-draw-red">{prompt.text}</span>
              <span className="text-xs text-gray-500 ml-2">→ resets midnight ET</span>
            </div>
            {/* Playful decorative dots */}
            <div className="absolute top-1 right-2 w-2 h-2 bg-draw-yellow rounded-full"></div>
            <div className="absolute bottom-1 left-2 w-2 h-2 bg-draw-blue rounded-full"></div>
          </div>
        )}
      </div>
    </header>
  )
}
