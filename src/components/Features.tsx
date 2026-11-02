import Reveal from './ui/Reveal'
import { IconBell, IconBolt, IconCalendar, IconInbox, IconMessage, IconMoon } from './ui/icons'

export default function Features() {
  return (
    <section id="features" className="relative bg-[#f6f7fd] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-600">
              Features
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              A front desk that <span className="text-gradient">never clocks out.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {/* 24/7 — wide dark tile */}
          <Reveal className="md:col-span-2">
            <article className="relative h-full overflow-hidden rounded-[26px] bg-navy-950 p-8 text-white sm:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-brand/30 blur-3xl animate-aurora" />
                <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-electric-500/20 blur-3xl" />
              </div>
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-gold-300">
                  <IconMoon className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-display mt-5 text-[24px] font-semibold">Always available — 24/7</h3>
                <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-white/60">
                  Nights, weekends and UAE public holidays included. When Dubai is awake, ZYNA is
                  awake — and when the city sleeps, ZYNA keeps watch.
                </p>
                <p className="mt-6 flex flex-wrap gap-2">
                  {['Nights', 'Weekends', 'Public holidays', 'Peak hours'].map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/75">
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Bilingual — gold tile */}
          <Reveal delay={110}>
            <article className="relative h-full overflow-hidden rounded-[26px] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 p-8 text-navy-950 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950/12 text-navy-950">
                <IconMessage className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display mt-5 text-[24px] font-semibold">English & العربية</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-navy-950/70">
                Your customers write in the language they’re comfortable in. ZYNA answers in the
                same one — naturally, every time.
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className="card-lift h-full rounded-[26px] border border-navy-950/8 bg-white p-8 shadow-[0_18px_40px_-24px_rgba(5,8,28,0.25)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-500/12 text-electric-500">
                <IconBolt className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display mt-5 text-[20px] font-semibold text-navy-950">Replies in seconds</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/60">
                First reply in under 30 seconds — while the customer is still deciding, not after
                they’ve booked elsewhere.
              </p>
            </article>
          </Reveal>

          <Reveal delay={110}>
            <article className="card-lift h-full rounded-[26px] border border-navy-950/8 bg-white p-8 shadow-[0_18px_40px_-24px_rgba(5,8,28,0.25)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-brand/12 text-violet-brand">
                <IconCalendar className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display mt-5 text-[20px] font-semibold text-navy-950">Bookings, handled</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/60">
                Appointments booked, confirmed and added to your calendar — no phone tag, no
                double-bookings, no missed slots.
              </p>
            </article>
          </Reveal>

          <Reveal delay={220}>
            <article className="card-lift h-full rounded-[26px] border border-navy-950/8 bg-white p-8 shadow-[0_18px_40px_-24px_rgba(5,8,28,0.25)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-brand/15 text-cyan-600">
                <IconBell className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display mt-5 text-[20px] font-semibold text-navy-950">Smart reminders</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/60">
                Automatic confirmations and reminders before every appointment — fewer no-shows,
                fuller diaries.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-8 flex items-center justify-center gap-2.5 text-center text-[14px] font-medium text-navy-950/55">
            <IconInbox className="h-4.5 w-4.5 text-gold-600" />
            Every enquiry captured and followed up — nothing slips through, ever.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
