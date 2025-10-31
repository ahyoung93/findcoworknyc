'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading, disabled, children, className = '', ...props }, ref) => {
    const baseClass = 'btn'
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
    const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${disabledClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? 'loading...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
