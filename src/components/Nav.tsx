import { useEffect, useState } from 'react'
import Logo from './ui/Logo'
import { IconArrowRight } from './ui/icons'

const LINKS = [
  { label: 'Why ZYNA', href: '#problem' },
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Results', href: '#results' },
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
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-500 ${
          scrolled
            ? 'glass border border-navy-950/8 shadow-[0_18px_40px_-18px_rgba(5,8,28,0.35)]'
            : 'border border-transparent bg-white/40'
        }`}
      >
        <a href="#top" aria-label="ZYNA — home" className="flex shrink-0 items-center">
          <Logo className="h-8 sm:h-9" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[14px] font-medium text-navy-950/65 transition-colors duration-300 hover:bg-navy-950/5 hover:text-navy-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-navy-950 py-2.5 pl-5 pr-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-royal-500 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] sm:inline-flex"
          >
            Get Started
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-950/10 bg-white/70 text-navy-950 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-all duration-500 lg:hidden ${
          open ? 'mt-2 max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="glass rounded-3xl border border-navy-950/8 p-3 shadow-xl">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-navy-950/80 transition-colors hover:bg-navy-950/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-navy-950 px-4 py-3.5 text-[15px] font-semibold text-white"
          >
            Get Started
            <IconArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
