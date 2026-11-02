import Reveal from './ui/Reveal'
import {
  IconBell,
  IconBolt,
  IconCalendar,
  IconClock,
  IconInbox,
  IconSpark,
} from './ui/icons'

const TILE =
  'flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3'

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
              Features
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              A receptionist that never <span className="text-gradient">clocks out.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-navy-950/60">
              Everything a great front desk does — answering, booking, reminding, organizing —
              running quietly around the clock.
            </p>
          </Reveal>
        </div>

        {/* bento grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <article className="card-lift group relative h-full overflow-hidden rounded-[28px] border border-navy-950/8 bg-navy-950 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-brand/40 blur-3xl animate-aurora"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-cyan-brand/25 blur-3xl"
              />
              <div className="relative">
                <span className={`${TILE} bg-gradient-to-br from-violet-brand to-electric-500`}>
                  <IconClock className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-semibold sm:text-[28px]">
                  Always Available — 24/7
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
                  Nights, weekends, holidays, your busiest hour and your quietest one. ZYNA is on
                  duty through all of it, so a customer is never met with silence.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {['3 AM enquiries', 'Weekend bookings', 'Holiday rush'].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-medium text-white/75"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="card-lift group h-full rounded-[28px] border border-navy-950/8 bg-white p-8 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:shadow-[0_28px_50px_-24px_rgba(47,123,255,0.4)]">
              <span className={`${TILE} bg-gradient-to-br from-electric-500 to-cyan-brand`}>
                <IconBolt className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-6 text-[21px] font-semibold text-navy-950">
                Instant Responses
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/58">
                Replies in seconds, not hours. The first answer wins the customer — ZYNA makes
                sure it’s yours.
              </p>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="card-lift group h-full rounded-[28px] border border-navy-950/8 bg-white p-8 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:shadow-[0_28px_50px_-24px_rgba(34,211,238,0.4)]">
              <span className={`${TILE} bg-gradient-to-br from-cyan-brand to-electric-500`}>
                <IconCalendar className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-6 text-[21px] font-semibold text-navy-950">
                Booking Assistance
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/58">
                Checks availability, offers slots, confirms the booking and keeps everything in
                order — end to end.
              </p>
            </article>
          </Reveal>

          <Reveal delay={160}>
            <article className="card-lift group h-full rounded-[28px] border border-navy-950/8 bg-white p-8 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:shadow-[0_28px_50px_-24px_rgba(124,58,237,0.4)]">
              <span className={`${TILE} bg-gradient-to-br from-violet-brand to-royal-500`}>
                <IconBell className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-6 text-[21px] font-semibold text-navy-950">
                Smart Reminders
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/58">
                Friendly reminders and follow-ups go out on time, every time — fewer no-shows,
                fewer forgotten appointments.
              </p>
            </article>
          </Reveal>

          <Reveal delay={240}>
            <article className="card-lift group h-full rounded-[28px] border border-navy-950/8 bg-white p-8 shadow-[0_10px_30px_-18px_rgba(5,8,28,0.18)] hover:shadow-[0_28px_50px_-24px_rgba(5,8,28,0.35)]">
              <span className={`${TILE} bg-gradient-to-br from-navy-800 to-royal-600`}>
                <IconInbox className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-6 text-[21px] font-semibold text-navy-950">
                Organized Conversations
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-950/58">
                Every conversation in one clear place — nothing scattered, nothing buried, nothing
                lost between team members.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="group mt-5 flex flex-col items-start gap-5 rounded-[28px] border border-dashed border-violet-brand/35 bg-gradient-to-r from-violet-brand/6 via-electric-500/6 to-cyan-brand/6 p-8 sm:flex-row sm:items-center sm:p-9">
            <span className={`${TILE} shrink-0 bg-gradient-to-br from-violet-brand via-electric-500 to-cyan-brand`}>
              <IconSpark className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-[21px] font-semibold text-navy-950">
                More Time for Your Business
              </h3>
              <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-navy-950/60">
                When the repetitive work runs itself, your team gets its hours back — for the
                customers in front of them and the business ahead of them.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
