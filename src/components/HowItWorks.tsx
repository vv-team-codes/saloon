import Reveal from './ui/Reveal'
import { IconCalendar, IconMessage, IconSpark, IconTrending } from './ui/icons'

const STEPS = [
  {
    n: '01',
    icon: IconMessage,
    title: 'Customer Message',
    text: 'A customer writes in — a question, an enquiry, a booking request — at any hour, from wherever they already talk to you.',
  },
  {
    n: '02',
    icon: IconSpark,
    title: 'ZYNA Responds',
    text: 'ZYNA replies in seconds with a natural, on-brand answer — checking availability, answering questions, guiding the customer.',
  },
  {
    n: '03',
    icon: IconCalendar,
    title: 'Booking Managed',
    text: 'The booking is confirmed, organized and followed up with smart reminders — no spreadsheets, no chasing, no no-show chaos.',
  },
  {
    n: '04',
    icon: IconTrending,
    title: 'Business Grows',
    text: 'More conversations answered, more bookings captured, more time back for your team. Growth, quietly compounding daily.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-[#f6f7fd] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[820px] -translate-x-1/2 rounded-full bg-electric-500/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
              How ZYNA works
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              From first message to booked —{' '}
              <span className="text-gradient">automatically.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-navy-950/60">
              No new apps for your customers. No extra work for your team. ZYNA simply steps in
              where conversations begin.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* connector line (desktop) */}
          <svg
            aria-hidden="true"
            className="absolute left-0 right-0 top-10 hidden w-full lg:block"
            height="2"
            preserveAspectRatio="none"
          >
            <line x1="12%" y1="1" x2="88%" y2="1" stroke="url(#flowGrad)" strokeWidth="2" className="flow-line" />
            <defs>
              <linearGradient id="flowGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#2f7bff" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 130}>
                <li className="group relative text-center lg:text-left">
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center lg:mx-0">
                    <span className="ring-conic absolute inset-0 rounded-[26px] opacity-90 transition-transform duration-500 group-hover:rotate-6" />
                    <span className="absolute inset-[3px] rounded-[23px] bg-white" />
                    <step.icon className="relative h-8 w-8 text-royal-500 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="font-display mt-5 text-[13px] font-bold tracking-[0.3em] text-navy-950/30">
                    {step.n}
                  </p>
                  <h3 className="font-display mt-1.5 text-[21px] font-semibold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2.5 max-w-xs text-[14.5px] leading-relaxed text-navy-950/58 lg:mx-0">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200}>
          <p className="mt-16 text-center font-display text-[15px] font-semibold tracking-wide text-navy-950/70 sm:text-base">
            Customer Message <span className="mx-1.5 text-cyan-brand">→</span> ZYNA Responds{' '}
            <span className="mx-1.5 text-cyan-brand">→</span> Booking Managed{' '}
            <span className="mx-1.5 text-cyan-brand">→</span>{' '}
            <span className="text-gradient">Business Grows</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
