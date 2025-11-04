'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default function ScrollTracker() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let hasTracked10s = false
    let hasTracked25 = false
    let hasTracked50 = false
    let hasTracked75 = false
    let hasTracked90 = false

    // Track 10 seconds on page
    const tenSecondTimer = setTimeout(() => {
      if (window.gtag && !hasTracked10s) {
        window.gtag('event', 'time_on_page', {
          event_category: 'engagement',
          event_label: '10_seconds',
          value: 10
        })
        hasTracked10s = true
      }
    }, 10000)

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = window.scrollY
        const scrollPercent = (scrolled / scrollHeight) * 100

        if (window.gtag) {
          // Track scroll depth milestones
          if (scrollPercent >= 90 && !hasTracked90) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: '90_percent',
              value: 90
            })
            hasTracked90 = true
          } else if (scrollPercent >= 75 && !hasTracked75) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: '75_percent',
              value: 75
            })
            hasTracked75 = true
          } else if (scrollPercent >= 50 && !hasTracked50) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: '50_percent',
              value: 50
            })
            hasTracked50 = true
          } else if (scrollPercent >= 25 && !hasTracked25) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: '25_percent',
              value: 25
            })
            hasTracked25 = true
          }
        }
      }, 100) // Debounce scroll events
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      clearTimeout(tenSecondTimer)
    }
  }, [])

  return null // This component doesn't render anything
}
