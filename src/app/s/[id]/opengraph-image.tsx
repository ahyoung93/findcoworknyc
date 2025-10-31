import { ImageResponse } from '@vercel/og'
import { getAdminClient } from '@/lib/supabase'
import { formatSentence } from '@/lib/validation'

export const runtime = 'edge'
export const alt = 'baton story'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface Props {
  params: {
    id: string
  }
}

export default async function Image({ params }: Props) {
  try {
    const supabase = getAdminClient()

    const { data: story } = await supabase
      .from('stories')
      .select('*')
      .eq('chain_id', params.id)
      .single()

    if (!story) {
      return new ImageResponse(
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
          }}
        >
          <div style={{ fontSize: 48 }}>Story not found</div>
        </div>
      )
    }

    const sentence = formatSentence(story.text)

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
            padding: '60px',
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
                fontSize: sentence.length > 100 ? '36px' : sentence.length > 60 ? '42px' : '48px',
                lineHeight: 1.3,
                textAlign: 'center',
                marginBottom: '30px',
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
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        <div style={{ fontSize: 48 }}>baton</div>
      </div>
    )
  }
}
