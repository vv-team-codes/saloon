import { useState } from 'react'

type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Official ZYNA logo.
 * The exact file supplied by the brand owner lives at /public/zyna-logo.jpg
 * and is rendered untouched — never redrawn, recoloured or replaced.
 * Until that file is present, a plain text fallback keeps the layout intact.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`font-display text-[26px] font-semibold tracking-[0.18em] ${
          variant === 'light' ? 'text-white' : 'text-navy-950'
        } ${className}`}
        aria-label="ZYNA"
      >
        ZYNA
      </span>
    )
  }

  return (
    <img
      src="/zyna-logo.jpg"
      alt="ZYNA"
      className={`h-9 w-auto object-contain ${className}`}
      onError={() => setFailed(true)}
      loading="eager"
      decoding="async"
    />
  )
}
