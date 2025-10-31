import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { formatSentence } from '@/lib/validation'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const chainId = searchParams.get('chain')

    if (!chainId) {
      return new Response('Missing chain parameter', { status: 400 })
    }

    const supabase = getAdminClient()

    // Get story
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('chain_id', chainId)
      .single()

    if (error || !story) {
      return new Response('Story not found', { status: 404 })
    }

    const sentence = formatSentence(story.text)
    const contributorsText = story.contributors.slice(0, 4).join(', ')

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '24px',
              padding: '60px',
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                fontSize: sentence.length > 80 ? '48px' : sentence.length > 50 ? '56px' : '64px',
                lineHeight: 1.3,
                textAlign: 'center',
                marginBottom: '40px',
                fontWeight: 600,
                color: '#111',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {sentence}
            </div>

            <div
              style={{
                fontSize: '24px',
                color: '#666',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              written by — {contributorsText}
            </div>

            <div
              style={{
                fontSize: '20px',
                color: '#999',
                marginTop: 'auto',
              }}
            >
              baton
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1080,
      }
    )
  } catch (error) {
    console.error('Error generating square image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
