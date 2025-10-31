import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { getFingerprint, createFingerprintCookie } from '@/lib/fingerprint'
import type { VoteResponse } from '@/types'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id: storyId } = params
    const fingerprint = getFingerprint(req)
    const supabase = getAdminClient()

    // Check if story exists
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('chain_id')
      .eq('chain_id', storyId)
      .single()

    if (storyError || !story) {
      return NextResponse.json(
        { error: 'story not found' },
        { status: 404 }
      )
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('votes')
      .select('*')
      .eq('story_id', storyId)
      .eq('voter_fingerprint', fingerprint)
      .single()

    let hasVoted = false

    if (existingVote) {
      // Remove vote (toggle off)
      const { error: deleteError } = await supabase
        .from('votes')
        .delete()
        .eq('story_id', storyId)
        .eq('voter_fingerprint', fingerprint)

      if (deleteError) {
        console.error('Error removing vote:', deleteError)
        return NextResponse.json(
          { error: 'failed to remove vote' },
          { status: 500 }
        )
      }
      hasVoted = false
    } else {
      // Add vote (toggle on)
      const { error: insertError } = await supabase
        .from('votes')
        .insert({
          story_id: storyId,
          voter_fingerprint: fingerprint
        })

      if (insertError) {
        console.error('Error adding vote:', insertError)
        return NextResponse.json(
          { error: 'failed to add vote' },
          { status: 500 }
        )
      }
      hasVoted = true
    }

    // Get updated vote count
    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('story_id', storyId)

    const response: VoteResponse = {
      score: count || 0,
      hasVoted
    }

    return NextResponse.json(response, {
      headers: {
        'Set-Cookie': createFingerprintCookie(fingerprint)
      }
    })
  } catch (error) {
    console.error('Error in POST /api/stories/[id]/vote:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
