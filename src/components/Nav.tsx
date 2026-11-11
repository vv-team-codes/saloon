import { useEffect, useState } from 'react'
import Logo from './ui/Logo'
import { IconArrowRight, IconX } from './ui/icons'

const LINKS: { label: string; href: string }[] = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Salons', href: '#for-salons' },
  { label: 'For Spas', href: '#for-spas' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '#demo' },
]

/**
 * Top navigation — white professional bar (v19, Clean Light Corporate;
 * anchor-based since v8 replaced the journey homepage with a normal
 * B2B page). Solid white with a slate hairline along its bottom edge.
 * The logo sits directly on the bar (its file is a white-background
 * JPEG, so it blends in with no tile). Desktop links are bare navy
 * uppercase labels with an animated violet underline; the primary
 * action is the Theme A gradient (violet → electric blue) "Book a
 * Demo" button (v9).
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls =
    'relative py-1 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-navy-950/70 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-300 hover:text-sky-600 hover:after:scale-x-100'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative flex h-[72px] items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 backdrop-blur transition-shadow duration-500 sm:px-10 ${
          scrolled ? 'shadow-[0_10px_36px_-16px_rgba(11,18,48,0.28)]' : ''
        }`}
      >
        <a href="/" aria-label="ZYNA — home" className="flex shrink-0 items-center">
          <Logo className="h-8 sm:h-9" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className={linkCls}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="mailto:sales@zyna.ae"
            className="hidden text-[13px] font-medium text-slate-500 transition-colors duration-300 hover:text-navy-950 md:inline-flex"
          >
            sales@zyna.ae
          </a>
          <a
            href="#demo"
            className="group hidden items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-teal-300 px-5 py-2.5 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(56,189,248,0.55)] transition duration-300 hover:brightness-110 sm:inline-flex"
          >
            Book a Demo
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-navy-950 lg:hidden"
          >
            {open ? (
              <IconX className="h-5 w-5" />
            ) : (
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-[2px] w-full rounded bg-navy-950" />
                <span className="h-[2px] w-full rounded bg-navy-950" />
                <span className="h-[2px] w-full rounded bg-navy-950" />
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-white px-8 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 text-navy-950"
          >
            <IconX className="h-5 w-5" />
          </button>
          <div className="w-full divide-y divide-slate-200">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex w-full items-baseline gap-4 py-4 text-left"
              >
                <span className="text-[13px] font-bold tracking-[0.2em] text-sky-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl font-semibold text-navy-950 transition-colors group-hover:text-sky-600">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center gap-2 self-start rounded-lg bg-gradient-to-r from-sky-400 to-teal-300 px-8 py-4 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(56,189,248,0.55)] transition hover:brightness-110"
          >
            Book a Demo <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  )
}
