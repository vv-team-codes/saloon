import { useEffect, useRef, useState } from 'react'
import Reveal from './ui/Reveal'
import { IconBolt, IconCalendar, IconClock, IconSpark } from './ui/icons'

function useCountUp(target: number, duration = 1500) {
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
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
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

function Stat({
  target,
  prefix = '',
  suffix,
  label,
}: {
  target: number
  prefix?: string
  suffix: string
  label: string
}) {
  const { ref, value } = useCountUp(target)
  return (
    <div className="text-center">
      <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
        <span ref={ref}>
          {prefix}
          {value}
        </span>
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="mt-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>
    </div>
  )
}

const BENEFITS = [
  {
    icon: IconBolt,
    title: 'Respond faster',
    text: 'Seconds instead of hours. Your answer is the first one your customer reads — at noon and at midnight alike.',
  },
  {
    icon: IconClock,
    title: 'Save time',
    text: 'Repetitive questions, booking steps and reminders run themselves. Your team’s hours go back to real work.',
  },
  {
    icon: IconCalendar,
    title: 'Capture more opportunities',
    text: 'Every enquiry answered is a booking that can happen. ZYNA makes sure none of them slip away unanswered.',
  },
  {
    icon: IconSpark,
    title: 'Improve customer experience',
    text: 'Fast, friendly, consistent answers — customers feel looked after from the very first message.',
  },
]

export default function Benefits() {
  return (
    <section id="results" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
                Benefits & results
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
                What changes when no conversation is{' '}
                <span className="text-gradient">ever missed?</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-navy-950/60">
                It isn’t one big moment. It’s hundreds of small ones — every quick reply, every
                confirmed booking, every reminder that lands — adding up week after week.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <article className="card-lift group h-full rounded-[26px] border border-navy-950/8 bg-white p-7 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:border-electric-500/30 hover:shadow-[0_28px_50px_-24px_rgba(47,123,255,0.35)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-brand/12 to-electric-500/12 text-royal-500 transition-transform duration-500 group-hover:scale-110">
                    <b.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-display mt-4.5 text-[19px] font-semibold text-navy-950">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-navy-950/58">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* stats band */}
        <Reveal delay={120}>
          <div className="relative mt-20 overflow-hidden rounded-[36px] bg-navy-950 px-6 py-14 sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-brand/35 blur-3xl animate-aurora"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-electric-500/30 blur-3xl"
            />
            <div className="relative grid gap-12 sm:grid-cols-3">
              <Stat target={30} prefix="<" suffix="s" label="First response time" />
              <Stat target={24} suffix="/7" label="Always on duty" />
              <Stat target={0} suffix="" label="Missed conversations" />
            </div>
            <p className="relative mx-auto mt-12 max-w-xl text-center text-[14.5px] leading-relaxed text-white/50">
              The goal is simple: a customer should never have to wonder whether anyone heard
              them. With ZYNA, someone always has.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
