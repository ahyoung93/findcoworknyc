import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { validateEmail } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { chainId, email } = body

    if (!chainId || !email) {
      return NextResponse.json(
        { error: 'chainId and email required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'invalid email' },
        { status: 400 }
      )
    }

    const supabase = getAdminClient()

    // Check if chain exists
    const { data: chain } = await supabase
      .from('chains')
      .select('id')
      .eq('id', chainId)
      .single()

    if (!chain) {
      return NextResponse.json(
        { error: 'chain not found' },
        { status: 404 }
      )
    }

    // Insert notification (will fail silently if already exists due to unique constraint)
    const { error } = await supabase
      .from('notifs')
      .insert({
        chain_id: chainId,
        email: email.toLowerCase().trim()
      })

    // Ignore unique constraint violations
    if (error && !error.message.includes('duplicate')) {
      console.error('Error inserting notification:', error)
      return NextResponse.json(
        { error: 'failed to add notification' },
        { status: 500 }
      )
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error in POST /api/notifs:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
