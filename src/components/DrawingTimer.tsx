'use client'

import { useState, useEffect } from 'react'

interface DrawingTimerProps {
  duration: number // in seconds
  onComplete: () => void
  isActive: boolean
}

export default function DrawingTimer({ duration, onComplete, isActive }: DrawingTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration)
      return
    }

    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isActive, onComplete, duration])

  const percentage = (timeLeft / duration) * 100
  const isUrgent = timeLeft <= 10

  return (
    <div className="soft-panel">
      {/* Timer display */}
      <div className={`text-center text-3xl font-bold mb-3 transition-colors ${
        isUrgent ? 'text-draw-red' : 'text-draw-blue'
      }`}>
        {timeLeft}s
      </div>

      {/* Progress bar - smooth */}
      <div className="h-3 w-full bg-soft-gray rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 rounded-full ${
            isUrgent ? 'bg-draw-red' : 'bg-draw-blue'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
