import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import ScrollTracker from '@/components/ScrollTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'FindCoworkNYC - Compare NYC Coworking Spaces',
  description: 'Compare 400+ coworking spaces across NYC. Find the best coworking in Manhattan, Brooklyn, and Queens. Updated monthly.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="iyxFwBPF2TIRthuhNl8XkPgkMxzcnHcSOaP8rdnu1CA" />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense - Add your AdSense publisher ID here when ready */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans pb-14 sm:pb-10">
        <ScrollTracker />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
