import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { getFingerprint } from '@/lib/fingerprint'
import type { StoryDetailResponse } from '@/types'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params
    const fingerprint = getFingerprint(req)
    const supabase = getAdminClient()

    // Get story
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('*')
      .eq('chain_id', id)
      .single()

    if (storyError || !story) {
      return NextResponse.json(
        { error: 'story not found' },
        { status: 404 }
      )
    }

    // Get prompt
    const { data: prompt } = await supabase
      .from('prompts')
      .select('text')
      .eq('prompt_date', story.prompt_date)
      .single()

    // Get vote count
    const { count: voteCount } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('story_id', id)

    // Check if user voted
    const { data: userVote } = await supabase
      .from('votes')
      .select('*')
      .eq('story_id', id)
      .eq('voter_fingerprint', fingerprint)
      .single()

    const response: StoryDetailResponse = {
      chainId: story.chain_id,
      text: story.text,
      contributors: story.contributors,
      finishedAt: story.finished_at,
      score: voteCount || 0,
      hasVoted: !!userVote,
      promptDate: story.prompt_date,
      promptText: prompt?.text || ''
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/stories/[id]:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
