import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { sendCompletionEmail } from '@/lib/email'
import { formatSentence } from '@/lib/validation'
import { config } from '@/lib/config'
import type { FinishChainRequest, FinishChainResponse } from '@/types'

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
    const { id: chainId } = params
    const body: FinishChainRequest = await req.json()

    if (!body.confirm) {
      return NextResponse.json(
        { error: 'confirm required' },
        { status: 400 }
      )
    }

    const supabase = getAdminClient()

    // Get chain
    const { data: chain, error: chainError } = await supabase
      .from('chains')
      .select('*')
      .eq('id', chainId)
      .single()

    if (chainError || !chain) {
      return NextResponse.json(
        { error: 'chain not found' },
        { status: 404 }
      )
    }

    if (chain.status !== 'open') {
      return NextResponse.json(
        { error: 'chain already finished' },
        { status: 400 }
      )
    }

    // Get all entries
    const { data: entries, error: entriesError } = await supabase
      .from('entries')
      .select('*')
      .eq('chain_id', chainId)
      .order('turn_index', { ascending: true })

    if (entriesError || !entries || entries.length < chain.max_contributors) {
      return NextResponse.json(
        { error: 'chain not ready to finish' },
        { status: 400 }
      )
    }

    const text = entries.map(e => e.text).join(' ')
    const contributors = entries.map(e => e.author_name)
    const finishedAt = new Date().toISOString()

    // Update chain status
    const { error: updateError } = await supabase
      .from('chains')
      .update({
        status: 'complete',
        finished_at: finishedAt
      })
      .eq('id', chainId)

    if (updateError) {
      console.error('Error updating chain:', updateError)
      return NextResponse.json(
        { error: 'failed to finish chain' },
        { status: 500 }
      )
    }

    // Create story
    const { error: storyError } = await supabase
      .from('stories')
      .insert({
        chain_id: chainId,
        prompt_date: chain.prompt_date,
        text,
        contributors,
        finished_at: finishedAt
      })

    if (storyError) {
      console.error('Error creating story:', storyError)
    }

    // Send notifications
    const { data: notifs } = await supabase
      .from('notifs')
      .select('*')
      .eq('chain_id', chainId)
      .eq('notified', false)

    if (notifs && notifs.length > 0) {
      const formattedSentence = formatSentence(text)

      // Send emails in parallel
      await Promise.all(
        notifs.map(async (notif) => {
          await sendCompletionEmail({
            to: notif.email,
            chainId,
            sentence: formattedSentence,
            contributors
          })

          // Mark as notified
          await supabase
            .from('notifs')
            .update({ notified: true })
            .eq('id', notif.id)
        })
      )
    }

    const response: FinishChainResponse = {
      storyUrl: `${config.appUrl}/s/${chainId}`
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in POST /api/chains/[id]/finish:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
