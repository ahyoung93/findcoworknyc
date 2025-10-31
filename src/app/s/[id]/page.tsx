'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Button from '@/components/Button'
import ShareButtons from '@/components/ShareButtons'
import { StoryDetailResponse } from '@/types'
import { formatSentence } from '@/lib/validation'

export default function StoryPage() {
  const params = useParams()
  const chainId = params.id as string

  const [loading, setLoading] = useState(true)
  const [story, setStory] = useState<StoryDetailResponse | null>(null)
  const [error, setError] = useState('')
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    loadStory()
  }, [])

  const loadStory = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/stories/${chainId}`)
      if (res.ok) {
        const data = await res.json()
        setStory(data)
      } else {
        setError('story not found')
      }
    } catch (error) {
      console.error('Failed to load story:', error)
      setError('failed to load story')
    }
    setLoading(false)
  }

  const handleVote = async () => {
    if (voting) return
    setVoting(true)

    try {
      const res = await fetch(`/api/stories/${chainId}/vote`, {
        method: 'POST'
      })

      if (res.ok) {
        const data = await res.json()
        setStory(prev => prev ? { ...prev, score: data.score, hasVoted: data.hasVoted } : null)
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }

    setVoting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-app py-12 text-center text-gray-600">
          loading...
        </main>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-app py-12 text-center text-red-400">
          <div className="text-red-600">error:</div>
          {error || 'story not found'}
        </main>
      </div>
    )
  }

  const sentence = formatSentence(story.text)
  const contributorsText = story.contributors.slice(0, 4).join(', ')
  const remaining = story.contributors.length - 4
  const creditLine = remaining > 0
    ? `${contributorsText}, and ${remaining} others`
    : contributorsText

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container-app pb-20">
        {/* Banner */}
        <div className="mb-8 border-2 border-warm-brown bg-cream px-6 py-4 text-center">
          <div className="text-sm text-dark-brown">
            it's done. somehow.
          </div>
        </div>

        {/* Sentence */}
        <div className="mb-8">
          <div className="mb-6 text-xl font-normal leading-tight text-dark-brown md:text-2xl">
            {sentence}
          </div>

          <div className="text-xs text-gray-500">
            written by — {creditLine}
          </div>
        </div>

        {/* Share buttons */}
        <div className="mb-8">
          <ShareButtons chainId={chainId} />
        </div>

        {/* Stats */}
        <div className="mb-8 flex items-center gap-4 text-xs text-gray-500">
          <button
            onClick={handleVote}
            disabled={voting}
            className={`flex items-center gap-1 transition-colors ${
              story.hasVoted ? 'text-warm-brown' : 'hover:text-warm-brown'
            }`}
          >
            <span>↑</span>
            <span>{story.score} {story.score === 1 ? 'vote' : 'votes'}</span>
          </button>

          <div className="flex items-center gap-1">
            <span>👥</span>
            <span>{story.contributors.length} contributors</span>
          </div>
        </div>

        {/* CTA */}
        <div className="ascii-divider pt-8">
          <a href="/">
            <Button variant="secondary" className="w-full">
              start a new chain
            </Button>
          </a>
        </div>
      </main>
    </div>
  )
}
