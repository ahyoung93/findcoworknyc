'use client'

// Hand-drawn "Baton" logo in Paint style with 5 colors
export default function BatonLogo() {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pixelated"
    >
      {/* B - black */}
      <path
        d="M 10 15 L 10 45 L 25 45 C 30 45 32 42 32 38 C 32 35 30 33 28 33 C 30 33 32 31 32 27 C 32 23 30 20 25 20 L 10 20 M 15 20 L 23 20 C 26 20 27 22 27 25 C 27 28 26 30 23 30 L 15 30 M 15 33 L 24 33 C 27 33 28 35 28 38 C 28 41 27 43 24 43 L 15 43"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* a - red */}
      <path
        d="M 50 35 C 50 28 53 25 58 25 C 63 25 66 28 66 35 L 66 45 M 66 32 C 66 28 63 25 58 25 C 53 25 50 28 50 32 C 50 36 53 38 58 38 C 63 38 66 36 66 32"
        stroke="#FF0000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* t - blue */}
      <path
        d="M 78 20 L 78 42 C 78 45 80 46 83 46 M 73 25 L 88 25"
        stroke="#0000FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* o - green */}
      <path
        d="M 100 35 C 100 28 103 25 108 25 C 113 25 116 28 116 35 C 116 42 113 45 108 45 C 103 45 100 42 100 35 Z"
        stroke="#00FF00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* n - yellow */}
      <path
        d="M 130 45 L 130 25 M 130 25 C 130 25 135 25 138 25 C 143 25 146 28 146 33 L 146 45"
        stroke="#FFFF00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
