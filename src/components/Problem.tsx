import Reveal from './ui/Reveal'
import { IconHourglass, IconPhoneMissed, IconRepeat, IconTrending } from './ui/icons'

const PROBLEMS = [
  {
    icon: IconPhoneMissed,
    title: 'Missed customer messages',
    text: 'Customers message at night, on weekends, mid-rush. Every unanswered chat is a customer quietly choosing someone else.',
    stat: 'After-hours enquiries go unanswered',
  },
  {
    icon: IconHourglass,
    title: 'Slow responses',
    text: 'People expect a reply in minutes, not hours. A delayed answer cools the interest — and the booking goes to whoever replied first.',
    stat: 'Speed wins the customer',
  },
  {
    icon: IconTrending,
    title: 'Lost opportunities',
    text: 'Missed messages become missed bookings, and missed bookings become lost revenue — most of it invisible, none of it recoverable.',
    stat: 'Revenue lost in silence',
  },
  {
    icon: IconRepeat,
    title: 'Repetitive admin work',
    text: 'The same questions, the same booking steps, the same reminders — hours of your team’s week spent on work that repeats itself.',
    stat: 'Hours lost every week',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
              The problem
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              Every missed message is a customer you{' '}
              <span className="text-gradient">never meet.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-navy-950/60">
              Your customers don’t stop when your team does. They ask, compare and decide in the
              evenings, on weekends, in the middle of your busiest hour — and they rarely wait.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <article className="card-lift group flex h-full flex-col rounded-[26px] border border-navy-950/8 bg-white p-7 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:border-violet-brand/30 hover:shadow-[0_28px_50px_-24px_rgba(124,58,237,0.35)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] text-rose-500 transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-5 text-[19px] font-semibold leading-snug text-navy-950">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-950/58">
                  {p.text}
                </p>
                <p className="mt-5 border-t border-dashed border-navy-950/10 pt-4 text-[12px] font-bold uppercase tracking-[0.14em] text-rose-500/90">
                  {p.stat}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[16px] leading-relaxed text-navy-950/55">
            None of this is a people problem — it’s a <strong className="font-semibold text-navy-950">presence problem</strong>.
            Your business simply can’t be awake everywhere, all the time.{' '}
            <span className="font-semibold text-gradient">ZYNA can.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
