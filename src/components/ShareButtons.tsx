'use client'

import { useState } from 'react'
import Button from './Button'
import { config } from '@/lib/config'

interface ShareButtonsProps {
  chainId: string
}

export default function ShareButtons({ chainId }: ShareButtonsProps) {
  const [copying, setCopying] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)

  const storyUrl = `${config.appUrl}/s/${chainId}`
  const squareImageUrl = `${config.appUrl}/api/og/square?chain=${chainId}`
  const storyImageUrl = `${config.appUrl}/api/og/story?chain=${chainId}`

  const copyLink = async () => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(storyUrl)
      // Show toast or feedback
      setTimeout(() => setCopying(false), 1000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopying(false)
    }
  }

  const downloadImage = async (url: string, filename: string) => {
    setDownloading(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Failed to download:', error)
    }
    setDownloading(false)
  }

  const share = async () => {
    setSharing(true)
    try {
      // Try Web Share API with file
      if (navigator.share && navigator.canShare) {
        const response = await fetch(squareImageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'baton-story.png', { type: 'image/png' })

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
          })
          setSharing(false)
          return
        }
      }

      // Fallback: download image and show message
      await downloadImage(squareImageUrl, 'baton-story.png')
      alert('saved — open instagram and post from recents.')
    } catch (error) {
      console.error('Failed to share:', error)
      // Fallback to download
      await downloadImage(squareImageUrl, 'baton-story.png')
    }
    setSharing(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          onClick={share}
          loading={sharing}
          className="flex-1"
        >
          share
        </Button>
        <Button
          onClick={copyLink}
          variant="secondary"
          loading={copying}
        >
          {copying ? 'copied!' : 'copy link'}
        </Button>
      </div>

      <div className="flex gap-2 text-sm">
        <button
          onClick={() => downloadImage(squareImageUrl, 'baton-square.png')}
          disabled={downloading}
          className="text-[#666] hover:text-cobalt disabled:opacity-50"
        >
          download square
        </button>
        <span className="text-[#999]">·</span>
        <button
          onClick={() => downloadImage(storyImageUrl, 'baton-story.png')}
          disabled={downloading}
          className="text-[#666] hover:text-cobalt disabled:opacity-50"
        >
          download story
        </button>
      </div>
    </div>
  )
}
