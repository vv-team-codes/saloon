import Reveal from './ui/Reveal'
import { IconHourglass, IconMoon, IconPhoneMissed } from './ui/icons'

const PROBLEMS = [
  {
    n: '01',
    icon: IconMoon,
    title: 'The Emirates don’t keep office hours',
    line: 'Dinner at 9, shopping at 10, messages at midnight. Your customers reach out when it suits them — evenings, weekends, holidays — long after your front desk has gone home.',
  },
  {
    n: '02',
    icon: IconHourglass,
    title: 'Slow replies quietly lose the booking',
    line: 'A customer who messages three salons books the one that answers first. Every unanswered minute is business handed to the competitor down the road.',
  },
  {
    n: '03',
    icon: IconPhoneMissed,
    title: 'No-shows and phone tag eat your week',
    line: 'Chasing confirmations, re-booking missed appointments, answering the same questions again and again — hours your team should spend on the customers in front of them.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[10%] h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-[5%] h-72 w-72 rounded-full bg-violet-brand/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-600">
              Why ZYNA
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              Every missed message is a booking that went{' '}
              <span className="text-gradient">somewhere else.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <article className="card-lift group relative h-full overflow-hidden rounded-[26px] border border-navy-950/8 bg-white p-7 shadow-[0_18px_40px_-24px_rgba(5,8,28,0.25)] hover:shadow-[0_30px_60px_-24px_rgba(5,8,28,0.35)]">
                <span aria-hidden="true" className="font-display pointer-events-none absolute -right-2 -top-4 text-[92px] font-bold leading-none text-navy-950/4 transition-colors duration-500 group-hover:text-gold-500/12">
                  {p.n}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-gold-300">
                  <p.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-display relative mt-5 text-[20px] font-semibold leading-snug text-navy-950">
                  {p.title}
                </h3>
                <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-navy-950/60">
                  {p.line}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
