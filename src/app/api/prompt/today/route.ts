import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import type { TodayPromptResponse } from '@/types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const supabase = getAdminClient()

    // Get today's date in YYYY-MM-DD format (America/New_York timezone)
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/New_York'
    })

    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('prompt_date', today)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'prompt not found for today' },
        { status: 404 }
      )
    }

    const response: TodayPromptResponse = {
      promptDate: data.prompt_date,
      text: data.text
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching today\'s prompt:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
