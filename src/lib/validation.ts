// Token regex: word starts with letter, can contain letters, apostrophes, hyphens
const TOKEN_REGEX = /^[A-Za-z][A-Za-z'\-]*$/

// Basic slur list (expand as needed)
const SLUR_LIST = [
  'fuck',
  'shit',
  'bitch',
  'ass',
  // Add more as needed - be comprehensive for production
]

/**
 * Validates turn text: 1-4 words matching token regex
 */
export function validateTurnText(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim()

  if (!trimmed) {
    return { valid: false, error: 'text cannot be empty' }
  }

  // Split by whitespace
  const tokens = trimmed.split(/\s+/)

  const wordsPerTurn = parseInt(process.env.WORDS_PER_TURN || '4', 10)

  if (tokens.length < 1 || tokens.length > wordsPerTurn) {
    return { valid: false, error: `must be 1-${wordsPerTurn} words` }
  }

  // Check each token against regex
  for (const token of tokens) {
    if (!TOKEN_REGEX.test(token)) {
      return { valid: false, error: `invalid word: ${token}` }
    }
  }

  return { valid: true }
}

/**
 * Masks profanity: replaces inner letters with asterisks
 */
function maskWord(word: string): string {
  if (word.length <= 2) return word
  const first = word[0]
  const last = word[word.length - 1]
  const middle = '*'.repeat(word.length - 2)
  return `${first}${middle}${last}`
}

/**
 * Checks for slurs/profanity and applies policy
 */
export function checkProfanity(text: string): { clean: boolean; filtered: string } {
  const policy = process.env.PROFANITY_POLICY || 'mask'
  const lowerText = text.toLowerCase()

  // Check for exact slurs
  for (const slur of SLUR_LIST) {
    if (lowerText.includes(slur)) {
      if (policy === 'reject') {
        return { clean: false, filtered: text }
      }
    }
  }

  if (policy === 'mask') {
    // Mask words that contain slurs
    const words = text.split(/\s+/)
    const masked = words.map(word => {
      const lowerWord = word.toLowerCase()
      for (const slur of SLUR_LIST) {
        if (lowerWord.includes(slur)) {
          return maskWord(word)
        }
      }
      return word
    })
    return { clean: true, filtered: masked.join(' ') }
  }

  return { clean: true, filtered: text }
}

/**
 * Validates and filters pen name
 */
export function validatePenName(name: string): { valid: boolean; filtered: string; error?: string } {
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: true, filtered: 'anonymous' }
  }

  if (trimmed.length > 20) {
    return { valid: false, filtered: trimmed, error: 'pen name too long (max 20 chars)' }
  }

  const { clean, filtered } = checkProfanity(trimmed)

  if (!clean && process.env.PROFANITY_POLICY === 'reject') {
    return { valid: false, filtered, error: 'inappropriate pen name' }
  }

  return { valid: true, filtered }
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(trimmed)
}

/**
 * Auto-capitalize sentences for display
 */
export function autoCapitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Add punctuation if missing
 */
export function autoPunctuate(text: string): string {
  if (!text) return text
  const trimmed = text.trim()
  const lastChar = trimmed[trimmed.length - 1]

  // If already ends with punctuation, return as is
  if (['.', '!', '?'].includes(lastChar)) {
    return trimmed
  }

  // Default to period
  return `${trimmed}.`
}

/**
 * Format full sentence for display
 */
export function formatSentence(text: string): string {
  return autoPunctuate(autoCapitalize(text))
}
