import ConsoleDemo from './ConsoleDemo'
import Reveal from './ui/Reveal'
import { IconArrowRight, IconCheck, IconMoon } from './ui/icons'

const PROOF = ['Replies in under 30 seconds', 'English & العربية', 'Awake 24/7 — even on UAE holidays']

const STATS = [
  { value: '<30s', label: 'first reply, day or night' },
  { value: '24/7', label: 'coverage, 365 days a year' },
  { value: '0', label: 'bookings left unanswered' },
  { value: '7', label: 'Emirates, one receptionist' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 pb-24 pt-36 sm:pt-44">
      {/* Dubai Marina at night — full-bleed backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/marina-night.jpg"
          alt=""
          className="h-full w-full object-cover object-center animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_50%_0%,rgba(124,58,237,0.22),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-navy-950/50 py-1.5 pl-2 pr-4 text-[12.5px] font-semibold text-gold-300 shadow-sm backdrop-blur">
              <span className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-950">
                UAE
              </span>
              The 24/7 AI receptionist for Emirates businesses
            </span>
          </Reveal>

          <Reveal delay={110}>
            <h1 className="font-display mt-7 text-[42px] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[68px]">
              Your business never sleeps. Neither should your{' '}
              <span className="text-gold-grad">receptionist.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65 sm:text-lg">
              ZYNA helps businesses manage customer conversations, enquiries and bookings around
              the clock.
            </p>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-[15px] font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_22px_44px_-12px_rgba(201,162,75,0.75)] sm:w-auto"
              >
                Get Started
                <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                <IconMoon className="h-4.5 w-4.5 text-gold-300" />
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={430}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {PROOF.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13.5px] font-medium text-white/70">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20">
                    <IconCheck className="h-3 w-3 text-gold-300" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={380} className="mt-16 sm:mt-20">
          <ConsoleDemo />
        </Reveal>

        <Reveal delay={150}>
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-display text-4xl font-bold text-gold-grad sm:text-[42px]">{s.value}</dd>
                <dt className="mt-1.5 text-[13px] font-medium leading-snug text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
