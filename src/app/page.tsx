'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import FeedCard from '@/components/FeedCard'
import Button from '@/components/Button'
import { TodayPromptResponse, StoryListResponse } from '@/types'

type TabType = 'hottest' | 'newest'

export default function HomePage() {
  const [prompt, setPrompt] = useState<TodayPromptResponse | null>(null)
  const [tab, setTab] = useState<TabType>('hottest')
  const [stories, setStories] = useState<StoryListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [mono, setMono] = useState(false)
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    loadPrompt()
  }, [])

  useEffect(() => {
    loadStories()
  }, [tab])

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

  const loadStories = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/stories?sort=${tab}&page=1`)
      if (res.ok) {
        const data = await res.json()
        setStories(data)
      }
    } catch (error) {
      console.error('Failed to load stories:', error)
    }
    setLoading(false)
  }

  const handleVote = async (chainId: string) => {
    try {
      const res = await fetch(`/api/stories/${chainId}/vote`, {
        method: 'POST',
      })

      if (res.ok) {
        const data = await res.json()
        // Update local state
        setStories(prev => {
          if (!prev) return null
          return {
            ...prev,
            stories: prev.stories.map(s =>
              s.chainId === chainId
                ? { ...s, score: data.score, hasVoted: data.hasVoted }
                : s
            )
          }
        })
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const startChain = () => {
    setStarting(true)
    // Navigate to a new chain creation flow
    // For simplicity, we'll just redirect to the explore page
    // In a real app, you'd open a modal or navigate to a creation page
    window.location.href = '/start'
  }

  return (
    <div className="min-h-screen">
      <Header prompt={prompt || undefined} />

      <main className="container-app pb-20">
        {/* Actions */}
        <div className="mb-12">
          <Button onClick={startChain} loading={starting} className="w-full btn-primary">
            start a chain
          </Button>
        </div>

        {/* Section header */}
        <div className="mb-4">
          <div className="relative inline-block">
            <h2 className="text-lg font-bold text-draw-black relative z-10">daily wall of chaos</h2>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-draw-yellow/40 -z-0" style={{ transform: 'skew(-2deg)' }}></div>
          </div>
        </div>

        {/* Feed tabs */}
        <div className="mb-8 inline-flex gap-6">
          <button
            onClick={() => setTab('hottest')}
            className={`relative px-2 py-1 text-sm font-bold transition-all duration-200 ${
              tab === 'hottest' ? 'text-draw-black' : 'text-draw-black/50 hover:text-draw-black/70'
            }`}
          >
            hottest
            {tab === 'hottest' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-2 bg-draw-red/60 -z-10"
                style={{ transform: 'skew(-2deg) translateY(2px)' }}
              />
            )}
          </button>
          <button
            onClick={() => setTab('newest')}
            className={`relative px-2 py-1 text-sm font-bold transition-all duration-200 ${
              tab === 'newest' ? 'text-draw-black' : 'text-draw-black/50 hover:text-draw-black/70'
            }`}
          >
            newest
            {tab === 'newest' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-2 bg-draw-blue/60 -z-10"
                style={{ transform: 'skew(2deg) translateY(2px)' }}
              />
            )}
          </button>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="py-12 text-center text-gray-600">loading...</div>
        ) : stories && stories.stories.length > 0 ? (
          <div>
            {stories.stories.map((story) => (
              <a
                key={story.chainId}
                href={`/s/${story.chainId}`}
                className="block transition-opacity hover:opacity-70"
              >
                <FeedCard story={story} onVote={handleVote} mono={mono} />
              </a>
            ))}

            {stories.hasMore && (
              <div className="mt-6 text-center">
                <Button variant="secondary" onClick={loadStories}>
                  load more
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative overflow-hidden bg-gradient-to-br from-draw-yellow/10 via-draw-red/10 to-draw-blue/10 rounded-3xl p-12 text-center border-2 border-dashed border-draw-black/20">
            <div className="text-2xl font-bold text-draw-black/60 mb-4" style={{ transform: 'rotate(-2deg)' }}>
              no drawings yet
            </div>
            <a
              href="/start"
              className="inline-block bg-draw-green text-white font-bold px-6 py-3 hover:scale-105 transition-transform"
              style={{
                borderRadius: '25px 10px 25px 10px',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
                transform: 'rotate(1deg)'
              }}
            >
              start the first one
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
