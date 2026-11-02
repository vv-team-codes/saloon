import Logo from './ui/Logo'

const NAV = [
  { label: 'Why ZYNA', href: '#problem' },
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: '#', mark: 'in' },
  { label: 'Instagram', href: '#', mark: '◎' },
  { label: 'X', href: '#', mark: '𝕏' },
  { label: 'WhatsApp', href: '#', mark: '✆' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-violet-brand/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="rounded-2xl bg-white p-3.5 w-fit">
              {/* Official logo sits on a clean white tile so the exact artwork is untouched and legible on the dark footer. */}
              <Logo className="h-9" />
            </div>
            <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.24em] text-cyan-brand">
              AI THAT WORKS FOR YOU
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">
              The intelligent 24/7 AI receptionist that replies, books and reminds — so your
              business never misses a conversation that matters.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`${s.label} (placeholder)`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[14px] text-white/70 transition-all duration-300 hover:border-cyan-brand/60 hover:text-cyan-brand"
                >
                  {s.mark}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3.5">
            <p className="col-span-2 text-[12px] font-bold uppercase tracking-[0.22em] text-white/40">
              Explore
            </p>
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/40">
              Contact
            </p>
            <a
              href="mailto:hello@zyna.ae"
              className="mt-3.5 block text-[15px] text-white/70 transition-colors hover:text-white"
            >
              hello@zyna.ae
            </a>
            <a href="#contact" className="mt-2 block text-[15px] text-white/70 transition-colors hover:text-white">
              Talk to Us →
            </a>
            <p className="mt-2 text-[15px] text-white/70">United Arab Emirates</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[13px] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} ZYNA. All rights reserved.</p>
          <p>
            <a href="https://www.zyna.ae" className="transition-colors hover:text-white">
              www.zyna.ae
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
