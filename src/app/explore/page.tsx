'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import FeedCard from '@/components/FeedCard'
import Button from '@/components/Button'
import { StoryListResponse } from '@/types'

type SortType = 'hottest' | 'newest'

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const initialSort = (searchParams.get('sort') as SortType) || 'hottest'
  const initialDate = searchParams.get('date')

  const [sort, setSort] = useState<SortType>(initialSort)
  const [date, setDate] = useState(initialDate || '')
  const [stories, setStories] = useState<StoryListResponse | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [mono, setMono] = useState(false)

  useEffect(() => {
    loadStories(1)
  }, [sort, date])

  const loadStories = async (pageNum: number) => {
    if (pageNum === 1) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const params = new URLSearchParams({
        sort,
        page: String(pageNum),
      })

      if (date) {
        params.set('date', date)
      }

      const res = await fetch(`/api/stories?${params}`)
      if (res.ok) {
        const data = await res.json()

        if (pageNum === 1) {
          setStories(data)
          setPage(1)
        } else {
          setStories(prev => ({
            stories: [...(prev?.stories || []), ...data.stories],
            hasMore: data.hasMore
          }))
          setPage(pageNum)
        }
      }
    } catch (error) {
      console.error('Failed to load stories:', error)
    }

    setLoading(false)
    setLoadingMore(false)
  }

  const handleVote = async (chainId: string) => {
    try {
      const res = await fetch(`/api/stories/${chainId}/vote`, {
        method: 'POST',
      })

      if (res.ok) {
        const data = await res.json()
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

  const loadMore = () => {
    loadStories(page + 1)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container-app pb-20">
        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-bold">explore stories</h1>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex gap-4">
              <button
                onClick={() => setSort('hottest')}
                className={`text-base transition-colors ${
                  sort === 'hottest'
                    ? 'font-medium text-black'
                    : 'text-[#999] hover:text-black'
                }`}
              >
                🔥 hottest
              </button>
              <button
                onClick={() => setSort('newest')}
                className={`text-base transition-colors ${
                  sort === 'newest'
                    ? 'font-medium text-black'
                    : 'text-[#999] hover:text-black'
                }`}
              >
                🕓 newest
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input text-sm"
                placeholder="filter by date"
              />
              {date && (
                <button
                  onClick={() => setDate('')}
                  className="text-sm text-[#666] hover:text-black"
                >
                  clear
                </button>
              )}
              <button
                onClick={() => setMono(!mono)}
                className="ml-auto text-xs text-[#999] hover:text-black"
              >
                {mono ? 'sans' : 'mono'}
              </button>
            </div>
          </div>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="py-12 text-center text-[#999]">loading...</div>
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
                <Button
                  variant="secondary"
                  onClick={loadMore}
                  loading={loadingMore}
                >
                  load more
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-[#999]">
            {date ? 'no stories found for this date' : 'no stories yet'}
          </div>
        )}
      </main>
    </div>
  )
}
