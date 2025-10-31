import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soft, playful palette
        'cream': '#FFFEF7',
        'soft-gray': '#E8E8E8',
        'border-gray': '#D0D0D0',
        // Drawing colors (slightly softer)
        'draw-black': '#2B2B2B',
        'draw-red': '#FF5757',
        'draw-blue': '#5B8FF9',
        'draw-green': '#5FD35F',
        'draw-yellow': '#FFD93D',
        'draw-purple': '#B57FF0',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '13px',
        base: '14px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
}
export default config
