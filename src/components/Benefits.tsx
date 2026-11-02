import { useEffect, useRef, useState } from 'react'
import Reveal from './ui/Reveal'
import { IconCheck } from './ui/icons'

function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration)
            setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, value }
}

function Stat({ target, prefix = '', suffix = '', label }: { target: number; prefix?: string; suffix?: string; label: string }) {
  const { ref, value } = useCountUp(target)
  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-5xl font-bold text-white sm:text-6xl">
        {prefix}
        {value}
        <span className="text-gold-grad">{suffix}</span>
      </span>
      <p className="mt-2 text-[13.5px] font-medium text-white/50">{label}</p>
    </div>
  )
}

const BENEFITS = [
  {
    title: 'Never miss a booking again',
    line: 'Every message gets a fast, helpful answer — so the customer books with you, not the next name on their list.',
  },
  {
    title: 'Your team, back on the floor',
    line: 'No more phone tag, inbox duty or reminder chasing. Your people serve the customers in front of them.',
  },
  {
    title: 'Customers feel looked after',
    line: 'Instant, polite, consistent replies in their own language — the kind of service the UAE is famous for, at any hour.',
  },
  {
    title: 'A fuller diary, on autopilot',
    line: 'Confirmations, reminders and follow-ups run themselves, so slots stay filled and no-shows keep falling.',
  },
]

export default function Benefits() {
  return (
    <section id="results" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-600">
                Results
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
                What changes when ZYNA answers <span className="text-gradient">for you.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-navy-950/60">
                Not another tool to manage — a quiet, tireless front desk that turns conversations
                into bookings while you run the business.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <article className="card-lift flex gap-4.5 rounded-[24px] border border-navy-950/8 bg-white p-6.5 shadow-[0_16px_36px_-22px_rgba(5,8,28,0.25)] sm:p-7">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                    <IconCheck className="h-4 w-4 text-navy-950" />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] font-semibold text-navy-950">{b.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-950/60">{b.line}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="relative mt-20 overflow-hidden rounded-[36px] bg-navy-950 px-6 py-14 sm:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-brand/25 blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
            </div>
            <div className="relative grid gap-10 sm:grid-cols-3">
              <Stat target={30} prefix="<" suffix="s" label="first reply, day or night" />
              <Stat target={24} suffix="/7" label="coverage — nights, weekends, holidays" />
              <Stat target={0} label="bookings left unanswered" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
