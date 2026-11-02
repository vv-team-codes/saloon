import ConsoleDemo from './ConsoleDemo'
import Reveal from './ui/Reveal'
import { IconArrowRight, IconCheck, IconMoon } from './ui/icons'

const PROOF = ['Replies in seconds', 'Awake 24/7, even on holidays', 'Zero missed bookings']

const INDUSTRIES = [
  'Clinics & Salons',
  'Restaurants',
  'Real Estate',
  'Car Rentals',
  'Home Services',
  'Fitness Studios',
  'Hotels',
  'Consultancies',
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.13),transparent_70%)]" />
        <div className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-violet-brand/20 blur-3xl animate-aurora" />
        <div className="absolute -top-20 right-[6%] h-[420px] w-[420px] rounded-full bg-electric-500/15 blur-3xl animate-aurora" />
        <div className="absolute left-1/2 top-64 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-brand/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,8,28,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,8,28,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-navy-950/10 bg-white/80 py-1.5 pl-2 pr-4 text-[12.5px] font-semibold text-navy-950/70 shadow-sm">
              <span className="rounded-full bg-gradient-to-r from-violet-brand to-electric-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                New
              </span>
              The 24/7 AI receptionist for your business
            </span>
          </Reveal>

          <Reveal delay={110}>
            <h1 className="font-display mt-7 text-[42px] font-bold leading-[1.06] tracking-tight text-navy-950 sm:text-6xl lg:text-[68px]">
              Your business never sleeps. Neither should your{' '}
              <span className="text-gradient">receptionist.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-navy-950/60 sm:text-lg">
              ZYNA helps businesses manage customer conversations, enquiries and bookings around
              the clock.
            </p>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy-950 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-royal-500 hover:shadow-[0_22px_44px_-14px_rgba(79,70,229,0.7)] sm:w-auto"
              >
                Get Started
                <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-navy-950/12 bg-white/70 px-8 py-4 text-[15px] font-semibold text-navy-950 transition-all duration-300 hover:border-navy-950/25 hover:bg-white sm:w-auto"
              >
                <IconMoon className="h-4.5 w-4.5 text-violet-brand" />
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={430}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {PROOF.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13.5px] font-medium text-navy-950/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <IconCheck className="h-3 w-3 text-emerald-600" />
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
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-center text-[11.5px] font-bold uppercase tracking-[0.24em] text-navy-950/35">
              Built for businesses that live on conversations
            </p>
            <div className="mask-fade-x mt-6 overflow-hidden">
              <div className="flex w-max animate-marquee gap-4 pr-4">
                {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="whitespace-nowrap rounded-full border border-navy-950/8 bg-white px-5 py-2.5 text-[13.5px] font-semibold text-navy-950/55"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
