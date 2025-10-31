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
    const remaining = story.contributors.length - 4
    const creditText = remaining > 0
      ? `${contributorsText}, and ${remaining} others`
      : contributorsText

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              background: 'white',
              borderRadius: '32px',
              padding: '80px',
              justifyContent: 'space-between',
            }}
          >
            {/* Top: App name */}
            <div
              style={{
                fontSize: '32px',
                color: '#999',
                marginBottom: '60px',
              }}
            >
              baton
            </div>

            {/* Middle: Sentence */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: sentence.length > 100 ? '56px' : sentence.length > 60 ? '64px' : '72px',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  color: '#111',
                  marginBottom: '60px',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {sentence}
              </div>

              <div
                style={{
                  fontSize: '28px',
                  color: '#666',
                }}
              >
                written by — {creditText}
              </div>
            </div>

            {/* Bottom: Tagline */}
            <div
              style={{
                fontSize: '24px',
                color: '#999',
                marginTop: '60px',
              }}
            >
              democracy, but for nonsense.
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    )
  } catch (error) {
    console.error('Error generating story image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
