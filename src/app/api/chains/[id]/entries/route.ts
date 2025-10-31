import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { validatePenName, validateEmail } from '@/lib/validation'
import { getFingerprint, createFingerprintCookie } from '@/lib/fingerprint'
import { config } from '@/lib/config'
import type { AddEntryRequest, AddEntryResponse } from '@/types'

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
    const body: AddEntryRequest = await req.json()
    const { drawing, penName, anonymous, email } = body

    // Validate drawing data
    if (!drawing || !Array.isArray(drawing) || drawing.length === 0) {
      return NextResponse.json(
        { error: 'drawing data is required' },
        { status: 400 }
      )
    }

    // Validate pen name
    let authorName = 'anonymous'
    if (penName && !anonymous) {
      const nameValidation = validatePenName(penName)
      if (!nameValidation.valid) {
        return NextResponse.json(
          { error: nameValidation.error },
          { status: 400 }
        )
      }
      authorName = nameValidation.filtered
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'invalid email' },
        { status: 400 }
      )
    }

    const fingerprint = getFingerprint(req)
    const supabase = getAdminClient()

    // Get chain and check status
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
        { error: 'chain is already complete' },
        { status: 400 }
      )
    }

    // Get existing entries
    const { data: entries, error: entriesError } = await supabase
      .from('entries')
      .select('*')
      .eq('chain_id', chainId)
      .order('turn_index', { ascending: true })

    if (entriesError) {
      console.error('Error fetching entries:', entriesError)
      return NextResponse.json(
        { error: 'failed to fetch entries' },
        { status: 500 }
      )
    }

    const currentTurnIndex = entries?.length || 0

    if (currentTurnIndex >= chain.max_contributors) {
      return NextResponse.json(
        { error: 'chain is full' },
        { status: 400 }
      )
    }

    // Check if user already contributed
    const alreadyContributed = entries?.some(e => e.author_fingerprint === fingerprint)
    if (alreadyContributed) {
      return NextResponse.json(
        { error: 'you already contributed to this chain' },
        { status: 400 }
      )
    }

    // Add entry
    const { error: insertError } = await supabase
      .from('entries')
      .insert({
        chain_id: chainId,
        turn_index: currentTurnIndex,
        drawing_data: drawing,
        author_name: authorName,
        author_fingerprint: fingerprint
      })

    if (insertError) {
      console.error('Error inserting entry:', insertError)
      return NextResponse.json(
        { error: 'failed to add entry' },
        { status: 500 }
      )
    }

    // Add notification if email provided
    if (email) {
      await supabase.from('notifs').insert({
        chain_id: chainId,
        email: email.toLowerCase().trim()
      })
    }

    const isFinalTurn = currentTurnIndex + 1 === chain.max_contributors
    let batonUrl: string | null = null

    if (!isFinalTurn) {
      batonUrl = `${config.appUrl}/c/${chainId}`
    }

    const response: AddEntryResponse = {
      isFinalTurn,
      batonUrl,
      followUrl: `${config.appUrl}/c/${chainId}`
    }

    return NextResponse.json(response, {
      headers: {
        'Set-Cookie': createFingerprintCookie(fingerprint)
      }
    })
  } catch (error) {
    console.error('Error in POST /api/chains/[id]/entries:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
