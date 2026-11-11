import type { CSSProperties, ReactNode } from 'react'
import Logo from './ui/Logo'
import { IconArrowRight } from './ui/icons'

/**
 * Site footer — a real footer section in normal page flow (v18
 * redesign). Brand + tagline, the social profiles as static tiles,
 * Explore links to the homepage sections, a contact block, and —
 * wording unchanged — the © line, the emirates list and the zyna.ae
 * link along the bottom. Since v8 the Explore links are plain anchors
 * on the normal B2B homepage (the journey film is parked).
 */

const EXPLORE: { label: string; href: string }[] = [
  { label: 'What We Do', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Salons', href: '#for-salons' },
  { label: 'For Spas', href: '#for-spas' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '#demo' },
]

// Brand icons (lucide paths, as used by the retired SocialFloat) on
// static 44px rounded-xl tiles in full brand colours — not floating,
// not draggable.
const SOCIALS: { label: string; href: string; style: CSSProperties; icon: ReactNode }[] = [
  {
    label: 'ZYNA on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61595756175259',
    style: { backgroundColor: '#1877F2' },
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: 'ZYNA on Instagram',
    href: 'https://www.instagram.com/zyna_ae/',
    style: {
      backgroundImage: 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)',
    },
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
]

const headingCls =
  'text-[12px] font-bold uppercase tracking-[0.28em] text-sky-500'

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#F0F9FF] text-slate-600">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <span className="inline-flex rounded-xl bg-white px-3 py-1.5 ring-1 ring-slate-200">
            <Logo className="h-8" />
          </span>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-500">
            The 24/7 AI receptionist for salons &amp; spas in the UAE.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)] ring-1 ring-slate-900/10 transition-transform duration-300 hover:scale-[1.06]"
                style={s.style}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[22px] w-[22px]"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer" className="lg:col-span-3">
          <h3 className={headingCls}>EXPLORE</h3>
          <ul className="mt-5 space-y-3">
            {EXPLORE.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[15px] text-slate-600 transition-colors duration-300 hover:text-sky-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-4">
          <h3 className={headingCls}>GET IN TOUCH</h3>
          <p className="mt-5">
            <a
              href="mailto:sales@zyna.ae"
              className="text-[15px] font-medium text-navy-950 transition-colors duration-300 hover:text-sky-500"
            >
              sales@zyna.ae
            </a>
          </p>
          <p className="mt-2 text-[15px] text-slate-500">Dubai, United Arab Emirates</p>
          <a
            href="#demo"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-teal-300 px-6 py-3 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(56,189,248,0.55)] transition duration-300 hover:brightness-110"
          >
            Book a Demo
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Bottom row — the old bar's three items, wording unchanged. */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-1.5 px-5 py-5 text-[13px] text-slate-500 sm:px-8">
          <p className="order-1">© 2026 ZYNA. All rights reserved.</p>
          <p className="order-3 w-full text-center text-slate-400 sm:order-2 sm:w-auto sm:flex-1">
            Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain
          </p>
          <p className="order-2 sm:order-3">
            <a href="https://zyna.ae/" className="transition-colors hover:text-sky-500">
              zyna.ae
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
