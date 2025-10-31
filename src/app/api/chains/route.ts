import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { validateTurnText, validatePenName, checkProfanity, validateEmail } from '@/lib/validation'
import { getFingerprint, createFingerprintCookie } from '@/lib/fingerprint'
import { config } from '@/lib/config'
import type { CreateChainRequest, CreateChainResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body: CreateChainRequest = await req.json()
    const { initialText, penName, anonymous, email } = body

    // Validate turn text
    const textValidation = validateTurnText(initialText)
    if (!textValidation.valid) {
      return NextResponse.json(
        { error: textValidation.error },
        { status: 400 }
      )
    }

    // Check profanity
    const { clean, filtered: filteredText } = checkProfanity(initialText)
    if (!clean && config.profanityPolicy === 'reject') {
      return NextResponse.json(
        { error: 'inappropriate content' },
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

    // Get today's prompt date
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: config.timezone
    })

    // Create chain
    const { data: chain, error: chainError } = await supabase
      .from('chains')
      .insert({
        prompt_date: today,
        max_contributors: config.maxContributors,
        words_per_turn: config.wordsPerTurn,
        status: 'open'
      })
      .select()
      .single()

    if (chainError || !chain) {
      console.error('Error creating chain:', chainError)
      return NextResponse.json(
        { error: 'failed to create chain' },
        { status: 500 }
      )
    }

    // Add first entry
    const { error: entryError } = await supabase
      .from('entries')
      .insert({
        chain_id: chain.id,
        turn_index: 0,
        text: filteredText,
        author_name: authorName,
        author_fingerprint: fingerprint
      })

    if (entryError) {
      console.error('Error creating entry:', entryError)
      // Clean up chain if entry fails
      await supabase.from('chains').delete().eq('id', chain.id)
      return NextResponse.json(
        { error: 'failed to create entry' },
        { status: 500 }
      )
    }

    // Add notification if email provided
    if (email) {
      await supabase.from('notifs').insert({
        chain_id: chain.id,
        email: email.toLowerCase().trim()
      })
    }

    const response: CreateChainResponse = {
      chainId: chain.id,
      batonUrl: `${config.appUrl}/c/${chain.id}`,
      followUrl: `${config.appUrl}/c/${chain.id}`
    }

    return NextResponse.json(response, {
      headers: {
        'Set-Cookie': createFingerprintCookie(fingerprint)
      }
    })
  } catch (error) {
    console.error('Error in POST /api/chains:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
