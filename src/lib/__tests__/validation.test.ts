// Basic test examples for validation utilities
// To run: install jest or vitest and run tests

import {
  validateTurnText,
  validatePenName,
  validateEmail,
  formatSentence,
  checkProfanity
} from '../validation'

describe('validateTurnText', () => {
  it('should accept valid 1-4 word input', () => {
    expect(validateTurnText('hello').valid).toBe(true)
    expect(validateTurnText('hello world').valid).toBe(true)
    expect(validateTurnText('hello world foo bar').valid).toBe(true)
  })

  it('should reject empty input', () => {
    expect(validateTurnText('').valid).toBe(false)
    expect(validateTurnText('   ').valid).toBe(false)
  })

  it('should reject >4 words', () => {
    expect(validateTurnText('one two three four five').valid).toBe(false)
  })

  it('should accept words with apostrophes and hyphens', () => {
    expect(validateTurnText("don't").valid).toBe(true)
    expect(validateTurnText('well-being').valid).toBe(true)
  })

  it('should reject words with invalid characters', () => {
    expect(validateTurnText('hello123').valid).toBe(false)
    expect(validateTurnText('hello!').valid).toBe(false)
  })
})

describe('validatePenName', () => {
  it('should accept valid pen names', () => {
    const result = validatePenName('alice')
    expect(result.valid).toBe(true)
    expect(result.filtered).toBe('alice')
  })

  it('should default to anonymous for empty input', () => {
    const result = validatePenName('')
    expect(result.valid).toBe(true)
    expect(result.filtered).toBe('anonymous')
  })

  it('should reject names >20 chars', () => {
    const result = validatePenName('a'.repeat(21))
    expect(result.valid).toBe(false)
  })
})

describe('validateEmail', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user+tag@domain.co')).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(validateEmail('notanemail')).toBe(false)
    expect(validateEmail('missing@domain')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})

describe('formatSentence', () => {
  it('should capitalize first letter', () => {
    expect(formatSentence('hello world')).toBe('Hello world.')
  })

  it('should add period if missing', () => {
    expect(formatSentence('hello')).toBe('Hello.')
  })

  it('should not double-punctuate', () => {
    expect(formatSentence('hello!')).toBe('Hello!')
    expect(formatSentence('really?')).toBe('Really?')
  })
})

describe('checkProfanity', () => {
  it('should mask profanity when policy is mask', () => {
    process.env.PROFANITY_POLICY = 'mask'
    const result = checkProfanity('this is shit')
    expect(result.clean).toBe(true)
    expect(result.filtered).toContain('s**t')
  })
})
