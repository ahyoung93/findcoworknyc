import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import type { ChainDetailResponse } from '@/types'

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
    const supabase = getAdminClient()

    // Get chain
    const { data: chain, error: chainError } = await supabase
      .from('chains')
      .select('*')
      .eq('id', id)
      .single()

    if (chainError || !chain) {
      return NextResponse.json(
        { error: 'chain not found' },
        { status: 404 }
      )
    }

    // Get prompt
    const { data: prompt } = await supabase
      .from('prompts')
      .select('text')
      .eq('prompt_date', chain.prompt_date)
      .single()

    // Get entries
    const { data: entries, error: entriesError } = await supabase
      .from('entries')
      .select('*')
      .eq('chain_id', id)
      .order('turn_index', { ascending: true })

    if (entriesError) {
      console.error('Error fetching entries:', entriesError)
      return NextResponse.json(
        { error: 'failed to fetch entries' },
        { status: 500 }
      )
    }

    const textSoFar = entries?.map(e => e.text).join(' ') || ''
    const turnsFilled = entries?.length || 0
    const isFinalTurn = turnsFilled === chain.max_contributors - 1

    const response: ChainDetailResponse = {
      status: chain.status,
      promptDate: chain.prompt_date,
      promptText: prompt?.text || '',
      wordsPerTurn: chain.words_per_turn,
      turnsFilled,
      textSoFar,
      isFinalTurn
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/chains/[id]:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
