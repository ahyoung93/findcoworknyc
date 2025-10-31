'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { ChainDetailResponse } from '@/types'

type ViewState = 'loading' | 'writing' | 'success' | 'complete'

export default function ChainPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const chainId = params.id as string
  const shouldShare = searchParams.get('share') === 'true'

  const [viewState, setViewState] = useState<ViewState>('loading')
  const [chain, setChain] = useState<ChainDetailResponse | null>(null)

  const [text, setText] = useState('')
  const [penName, setPenName] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [batonUrl, setBatonUrl] = useState('')
  const [copying, setCopying] = useState(false)
  const [notifying, setNotifying] = useState(false)

  useEffect(() => {
    loadChain()
  }, [])

  const loadChain = async () => {
    try {
      const res = await fetch(`/api/chains/${chainId}`)
      if (res.ok) {
        const data = await res.json()
        setChain(data)
        setBatonUrl(`${window.location.origin}/c/${chainId}`)

        if (data.status === 'complete') {
          setViewState('complete')
        } else if (shouldShare) {
          // Show share state if redirected from /start
          setViewState('success')
        } else {
          setViewState('writing')
        }
      } else {
        setError('chain not found')
      }
    } catch (error) {
      console.error('Failed to load chain:', error)
      setError('failed to load chain')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!text.trim()) {
      setError('please enter some words')
      return
    }

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    const maxWords = chain?.wordsPerTurn || 4
    if (wordCount > maxWords) {
      setError(`must be ${maxWords} words or fewer`)
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/chains/${chainId}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          penName: anonymous ? undefined : penName,
          anonymous,
          email: email || undefined
        })
      })

      if (res.ok) {
        const data = await res.json()
        setBatonUrl(data.batonUrl || '')

        if (data.isFinalTurn) {
          // Reload to show finish button
          await loadChain()
        } else {
          setViewState('success')
        }
      } else {
        const data = await res.json()
        setError(data.error || 'failed to add entry')
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      setError('something went wrong')
    }

    setSubmitting(false)
  }

  const handleFinish = async () => {
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/chains/${chainId}/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true })
      })

      if (res.ok) {
        const data = await res.json()
        router.push(data.storyUrl.replace(window.location.origin, ''))
      } else {
        const data = await res.json()
        setError(data.error || 'failed to finish chain')
      }
    } catch (error) {
      console.error('Failed to finish:', error)
      setError('something went wrong')
    }

    setSubmitting(false)
  }

  const copyBatonLink = async () => {
    setCopying(true)
    try {
      const url = batonUrl || `${window.location.origin}/c/${chainId}`
      const message = `join me in completing my story! ${url}`
      await navigator.clipboard.writeText(message)
      setTimeout(() => setCopying(false), 1000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopying(false)
    }
  }

  const handleShare = async () => {
    const url = batonUrl || `${window.location.origin}/c/${chainId}`

    if (navigator.share) {
      try {
        await navigator.share({
          text: 'join me in completing my story!',
          url
        })
      } catch (error) {
        // User cancelled
      }
    } else {
      copyBatonLink()
    }
  }

  const handleNotifyMe = async () => {
    if (!email || !email.trim()) {
      setError('please enter an email')
      return
    }

    setNotifying(true)
    setError('')

    try {
      const res = await fetch('/api/notifs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chainId, email })
      })

      if (res.ok) {
        setEmail('')
        alert('got it. we\'ll email you when it\'s done.')
      } else {
        setError('failed to save email')
      }
    } catch (error) {
      console.error('Failed to save notification:', error)
      setError('something went wrong')
    }

    setNotifying(false)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maxWords = chain?.wordsPerTurn || 4
    const words = value.trim().split(/\s+/).filter(Boolean)

    if (words.length <= maxWords) {
      setText(value)
    } else {
      // Only keep first maxWords words
      const limitedWords = words.slice(0, maxWords)
      setText(limitedWords.join(' '))
    }
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const maxWords = chain?.wordsPerTurn || 4

  // Redirect if complete
  useEffect(() => {
    if (viewState === 'complete') {
      router.push(`/s/${chainId}`)
    }
  }, [viewState, chainId, router])

  if (viewState === 'loading') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-app py-12 text-center text-[#999]">
          loading...
        </main>
      </div>
    )
  }

  if (viewState === 'complete') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-app py-12 text-center text-[#999]">
          redirecting...
        </main>
      </div>
    )
  }

  // Check if this is the final turn (chain is full)
  const isFinalTurn = chain && chain.turnsFilled === chain.wordsPerTurn

  // Progress indicator helper
  const renderProgress = () => {
    if (!chain) return null
    const total = 4 // 4 people total
    const filled = chain.turnsFilled || 0
    const dots = Array.from({ length: total }, (_, i) => (
      i < filled ? '●' : '○'
    )).join('')
    return `${dots} ${filled}/${total}`
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container-app pb-20">
        {viewState === 'writing' ? (
          <>
            {/* Context reminder */}
            <div className="mb-6 text-center">
              <div className="mb-2 text-sm text-gray-600">
                add your 4 words to the chaos
              </div>
              <div className="text-xs text-gray-500">
                {renderProgress()}
              </div>
            </div>

            {/* Show existing text */}
            {chain && chain.textSoFar && (
              <div className="mb-8">
                <div className="mb-2 text-xs text-gray-500">
                  so far:
                </div>
                <div className="text-base leading-relaxed text-dark-brown">
                  {chain.textSoFar}
                </div>
                <div className="ascii-divider" />
              </div>
            )}

            {!isFinalTurn ? (
              <>
                <div className="mb-6">
                  <h2 className="mb-2 text-sm text-gray-500">
                    your turn{chain?.promptText && ` (theme: ${chain.promptText})`}
                  </h2>
                  <p className="text-xs text-gray-500">
                    up to {maxWords} words
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={text}
                      onChange={handleTextChange}
                      placeholder={`add your ${maxWords} words...`}
                      className="input"
                      autoFocus
                      disabled={submitting}
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      {wordCount}/{maxWords} words
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={penName}
                      onChange={(e) => setPenName(e.target.value)}
                      placeholder="pen name (optional)"
                      className="input"
                      disabled={anonymous || submitting}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      disabled={submitting}
                      className="accent-warm-brown"
                    />
                    <span>post as anonymous</span>
                  </label>

                  {error && (
                    <div className="border-2 border-red-600 bg-cream px-4 py-2 text-sm text-red-400">
                      <span className="text-red-600">error:</span> {error}
                    </div>
                  )}

                  <div className="sticky bottom-4">
                    <Button type="submit" loading={submitting} className="w-full">
                      lock it in
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="mb-2 text-sm text-gray-500">
                    you're finishing the thing. no pressure.
                  </h2>
                </div>

                {error && (
                  <div className="mb-4 border-2 border-red-600 bg-cream px-4 py-2 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="sticky bottom-4">
                  <Button
                    onClick={handleFinish}
                    loading={submitting}
                    className="w-full"
                  >
                    finish & notify
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          // Success state
          <div className="space-y-6">
            <div className="border-2 border-warm-brown bg-cream p-6">
              <div className="mb-2 text-sm text-dark-brown">
                locked in.
              </div>
              <div className="text-sm text-gray-500">
                pass it to someone equally chaotic.
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={copyBatonLink} loading={copying} className="w-full">
                {copying ? 'copied!' : 'copy baton link'}
              </Button>
              <Button onClick={handleShare} variant="secondary" className="w-full">
                share
              </Button>
            </div>

            <div className="ascii-divider pt-6">
              <div className="mb-4 text-xs text-gray-500">
                optional: get notified when this masterpiece gets finished
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email"
                  className="input flex-1"
                  disabled={notifying}
                />
                <Button
                  onClick={handleNotifyMe}
                  loading={notifying}
                  disabled={!email.trim()}
                >
                  notify me
                </Button>
              </div>

              {error && (
                <div className="mt-2 text-xs text-red-400">{error}</div>
              )}
            </div>

            <div className="pt-4">
              <a
                href={`/c/${chainId}`}
                className="block text-center text-xs text-warm-brown hover:underline"
              >
                follow progress
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
