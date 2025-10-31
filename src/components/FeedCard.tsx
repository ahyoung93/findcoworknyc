'use client'

import { formatSentence } from '@/lib/validation'
import { StoryListItem } from '@/types'
import { useState } from 'react'

interface FeedCardProps {
  story: StoryListItem
  onVote?: (chainId: string) => void
  mono?: boolean
}

export default function FeedCard({ story, onVote, mono = false }: FeedCardProps) {
  const [voting, setVoting] = useState(false)

  const handleVote = async () => {
    if (voting || !onVote) return
    setVoting(true)
    await onVote(story.chainId)
    setVoting(false)
  }

  const formattedDate = new Date(story.finishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="border-b-2 border-dashed border-border py-4">
      <div className="mb-3 text-sm leading-relaxed text-dark-brown">
        {formatSentence(story.text)}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <button
          onClick={handleVote}
          disabled={voting}
          className={`flex items-center gap-1 transition-colors ${
            story.hasVoted ? 'text-warm-brown' : 'hover:text-warm-brown'
          }`}
        >
          <span>↑</span>
          <span>{story.score}</span>
        </button>

        <div className="flex items-center gap-1">
          <span>👥</span>
          <span>{story.contributors.length}</span>
        </div>

        <div className="text-gray-500">{formattedDate}</div>
      </div>
    </div>
  )
}
