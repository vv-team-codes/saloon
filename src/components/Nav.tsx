import { useEffect, useState } from 'react'
import Logo from './ui/Logo'
import { IconArrowRight, IconX } from './ui/icons'

import { scrollToJourneyFraction } from '../journey/Journey'

const LINKS: { label: string; frac?: number; href?: string }[] = [
  { label: 'What We Do', frac: 0.36 },
  { label: 'How It Works', frac: 0.5 },
  { label: 'About', frac: 0.9 },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-3 pr-2.5 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border border-white/12 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.65)]'
            : 'border border-white/8 bg-navy-950/25 backdrop-blur-md'
        }`}
      >
        <a href="#top" aria-label="ZYNA — home" className="flex shrink-0 items-center">
          <span className="rounded-full bg-white px-3 py-1.5">
            <Logo className="h-7 sm:h-8" />
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => (link.href ? document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }) : scrollToJourneyFraction(link.frac ?? 0))}
              className="rounded-full px-4 py-2 text-[14px] font-medium text-white/75 transition-colors duration-300 hover:bg-white/8 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-5 py-2.5 text-[14px] font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_14px_30px_-10px_rgba(201,162,75,0.8)] sm:inline-flex"
          >
            Get Started
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <IconX className="h-5 w-5" /> : <span className="text-lg leading-none">☰</span>}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy-950/92 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <IconX className="h-5 w-5" />
          </button>
          {LINKS.map((link, i) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                setOpen(false)
                if (link.href) document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                else scrollToJourneyFraction(link.frac ?? 0)
              }}
              className="font-display py-3.5 text-3xl font-semibold text-white/90 transition-colors hover:text-gold-300"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-[15px] font-bold text-navy-950"
          >
            Get Started <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  )
}
