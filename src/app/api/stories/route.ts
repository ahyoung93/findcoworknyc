import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { getFingerprint } from '@/lib/fingerprint'
import type { StoryListResponse, StoryListItem } from '@/types'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const sort = searchParams.get('sort') || 'newest'
    const date = searchParams.get('date')
    const page = parseInt(searchParams.get('page') || '1', 10)

    const fingerprint = getFingerprint(req)
    const supabase = getAdminClient()

    let query = supabase
      .from('stories')
      .select('*', { count: 'exact' })

    // Filter by date if provided
    if (date) {
      query = query.eq('prompt_date', date)
    }

    // Pagination
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)

    // Sorting
    if (sort === 'newest') {
      query = query.order('finished_at', { ascending: false })
    }
    // For hottest, we'll need to join with votes
    // For simplicity, we'll fetch stories and then get vote counts

    const { data: stories, error, count } = await query

    if (error) {
      console.error('Error fetching stories:', error)
      return NextResponse.json(
        { error: 'failed to fetch stories' },
        { status: 500 }
      )
    }

    if (!stories) {
      return NextResponse.json({
        stories: [],
        hasMore: false
      })
    }

    // Get vote counts and user votes for each story
    const storyIds = stories.map(s => s.chain_id)

    const { data: votes } = await supabase
      .from('votes')
      .select('story_id, voter_fingerprint')
      .in('story_id', storyIds)

    // Aggregate votes
    const voteCounts = new Map<string, number>()
    const userVotes = new Set<string>()

    votes?.forEach(vote => {
      voteCounts.set(vote.story_id, (voteCounts.get(vote.story_id) || 0) + 1)
      if (vote.voter_fingerprint === fingerprint) {
        userVotes.add(vote.story_id)
      }
    })

    // Build response
    let items: StoryListItem[] = stories.map(story => ({
      chainId: story.chain_id,
      text: story.text,
      contributors: story.contributors,
      finishedAt: story.finished_at,
      score: voteCounts.get(story.chain_id) || 0,
      hasVoted: userVotes.has(story.chain_id)
    }))

    // Sort by hottest if needed (score desc, then recency)
    if (sort === 'hottest') {
      items.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
      })
    }

    const response: StoryListResponse = {
      stories: items,
      hasMore: count ? from + PAGE_SIZE < count : false
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/stories:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
