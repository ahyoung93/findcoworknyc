'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Button from '@/components/Button'
import DrawingCanvas, { DrawingCanvasHandle } from '@/components/DrawingCanvas'
import DrawingTimer from '@/components/DrawingTimer'
import { TodayPromptResponse, DrawingStroke } from '@/types'

const COLORS = ['black', 'red', 'blue', 'green', 'yellow'] as const
const DRAWING_TIME = 30 // seconds

export default function StartPage() {
  const router = useRouter()
  const canvasRef = useRef<DrawingCanvasHandle>(null)

  const [prompt, setPrompt] = useState<TodayPromptResponse | null>(null)
  const [currentColor, setCurrentColor] = useState<typeof COLORS[number]>('black')
  const [penName, setPenName] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    loadPrompt()
  }, [])

  const loadPrompt = async () => {
    try {
      const res = await fetch('/api/prompt/today')
      if (res.ok) {
        const data = await res.json()
        setPrompt(data)
      }
    } catch (error) {
      console.error('Failed to load prompt:', error)
    }
  }

  const startDrawing = () => {
    setIsDrawing(true)
    setTimeUp(false)
  }

  const handleTimeUp = () => {
    setTimeUp(true)
  }

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleSubmit = async () => {
    setError('')

    if (!canvasRef.current) {
      setError('canvas not ready')
      return
    }

    const strokes = await canvasRef.current.getStrokes()

    if (strokes.length === 0) {
      setError('please draw something first')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/chains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initialDrawing: strokes,
          penName: anonymous ? undefined : penName,
          anonymous
        })
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/c/${data.chainId}?share=true`)
      } else {
        const data = await res.json()
        setError(data.error || 'failed to start chain')
        setSubmitting(false)
      }
    } catch (error) {
      console.error('Failed to start chain:', error)
      setError('something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header prompt={prompt || undefined} />

      <main className="container-app pb-20">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-draw-black mb-2">
            start your chain{prompt && ` · ${prompt.text}`}
          </h2>
          <p className="text-sm text-draw-black/60">
            you have 30 seconds to draw
          </p>
        </div>

        {!isDrawing ? (
          <div className="space-y-4">
            <Button onClick={startDrawing} className="w-full btn-primary">
              start drawing
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Timer */}
            <DrawingTimer
              duration={DRAWING_TIME}
              onComplete={handleTimeUp}
              isActive={!timeUp}
            />

            {/* Tool palette - colorful circles */}
            <div className="soft-panel flex gap-3 justify-center items-center flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`tool-btn ${currentColor === color ? 'active' : ''}`}
                  style={{
                    backgroundColor: color === 'black' ? '#2B2B2B' :
                                    color === 'red' ? '#FF5757' :
                                    color === 'blue' ? '#5B8FF9' :
                                    color === 'green' ? '#5FD35F' :
                                    '#FFD93D',
                    color: color === 'black' ? '#2B2B2B' :
                           color === 'red' ? '#FF5757' :
                           color === 'blue' ? '#5B8FF9' :
                           color === 'green' ? '#5FD35F' :
                           '#FFD93D',
                    border: currentColor === color ? '3px solid currentColor' : '3px solid transparent'
                  }}
                  disabled={timeUp}
                />
              ))}
              <Button
                onClick={handleUndo}
                variant="secondary"
                disabled={timeUp}
                className="ml-2"
              >
                undo
              </Button>
            </div>

            {/* Canvas */}
            <DrawingCanvas
              ref={canvasRef}
              currentColor={currentColor}
              disabled={timeUp}
            />

            {timeUp && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={penName}
                    onChange={(e) => setPenName(e.target.value)}
                    placeholder="pen name (optional)"
                    className="input"
                    disabled={anonymous || submitting}
                  />
                </div>

                <label className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="accent-warm-brown"
                    disabled={submitting}
                  />
                  <span className="text-sm">post as anonymous</span>
                </label>

                {error && (
                  <div className="mb-4 border-2 border-red-600 bg-cream px-4 py-2 text-sm text-red-400">
                    <span className="text-red-600">error:</span> {error}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  loading={submitting}
                  className="w-full btn-primary"
                >
                  lock it in
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
