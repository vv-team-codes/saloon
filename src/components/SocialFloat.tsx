import type { ReactNode } from 'react'

/**
 * Permanent floating social buttons — fixed bottom-right, visible at every
 * scroll position (below the nav header z-50 and its mobile menu overlay).
 * Icons only, no labels; the exact profile URLs Techie provided.
 */
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'ZYNA on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61595756175259',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: 'ZYNA on Instagram',
    href: 'https://www.instagram.com/zyna_ae/',
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
]

export default function SocialFloat() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex gap-2.5">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-navy-900/85 text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {s.icon}
          </svg>
        </a>
      ))}
    </div>
  )
}
