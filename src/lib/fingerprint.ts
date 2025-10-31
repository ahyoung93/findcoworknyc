/**
 * Simple device fingerprint for rate-limiting
 * Combines user agent + forwarded IP
 * Not cryptographically secure, just for basic protection
 */
export function generateFingerprint(req: Request): string {
  const ua = req.headers.get('user-agent') || 'unknown'
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  // Simple hash (for production, use a proper hash function)
  const combined = `${ua}:${ip}`
  return Buffer.from(combined).toString('base64').slice(0, 32)
}

/**
 * Get fingerprint from cookies or headers (client-side fallback)
 */
export function getFingerprint(req: Request): string {
  // Try cookie first
  const cookieHeader = req.headers.get('cookie')
  if (cookieHeader) {
    const match = cookieHeader.match(/baton_fp=([^;]+)/)
    if (match) {
      return match[1]
    }
  }

  // Fallback to generating from headers
  return generateFingerprint(req)
}

/**
 * Create fingerprint cookie header
 */
export function createFingerprintCookie(fingerprint: string): string {
  const maxAge = 60 * 60 * 24 * 365 // 1 year
  return `baton_fp=${fingerprint}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
}
