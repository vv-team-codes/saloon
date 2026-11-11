import type { ReactNode } from 'react'
import Reveal from '../components/ui/Reveal'
import Contact from '../components/Contact'
import {
  IconArrowRight,
  IconBell,
  IconCalendar,
  IconCheck,
  IconClock,
  IconHourglass,
  IconMoon,
  IconPhone,
  IconPhoneMissed,
} from '../components/ui/icons'

/**
 * Homepage — normal professional B2B SaaS page (v8). The scroll-journey
 * film is parked (src/journey stays on disk, unrendered). Audience is
 * salon & spa OWNERS: bookings, no-shows, front-desk time, demos.
 * White base, alternating pale-sky sections, deep-teal-navy text.
 * Light Theme 2 "Sky Aqua" (v10, Techie's pick 2026-11-11): sky →
 * teal primary gradient, sky eyebrows and accents, light outcomes
 * band and light footer; gold stays retired on this page.
 * No statistics, testimonials or client logos — qualitative claims only.
 */

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8'
const eyebrowCls = 'text-[12px] font-bold uppercase tracking-[0.24em] text-sky-500'
const h2Cls = 'font-display mt-4 text-3xl font-semibold leading-[1.15] text-navy-950 sm:text-4xl lg:text-[42px]'
const leadCls = 'mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600'
const cardCls =
  'rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_-24px_rgba(11,18,48,0.18)]'

function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <Reveal>
      <p className={eyebrowCls}>{eyebrow}</p>
      <h2 className={h2Cls}>{title}</h2>
      {lead ? <p className={leadCls}>{lead}</p> : null}
    </Reveal>
  )
}

type BadgeTone = 'violet' | 'blue' | 'cyan'

const badgeTones: Record<BadgeTone, string> = {
  violet: 'bg-[#F0F9FF] text-[#0284C7]',
  blue: 'bg-[#ECFEFF] text-[#0891B2]',
  cyan: 'bg-[#F0FDF9] text-[#0D9488]',
}

function IconBadge({ children, tone = 'violet' }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-xl ${badgeTones[tone]}`}
    >
      {children}
    </span>
  )
}

/* ------------------------------- Hero ---------------------------------- */

function HeroMock() {
  return (
    <div className="relative">
      {/* Theme A glow: a soft violet/blue halo behind the panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 rounded-[36px] bg-gradient-to-br from-sky-400/25 via-cyan-300/20 to-teal-300/20 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_70px_-28px_rgba(11,18,48,0.35)]">
        {/* Panel header — Theme A navy → violet gradient bar */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-sky-400 to-teal-300 px-5 py-4">
          <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[15px] font-bold text-white">
            Z
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-tight text-white">ZYNA · Reception</p>
            <p className="flex items-center gap-1.5 text-[12.5px] leading-tight text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
              Answering now — 24/7
            </p>
          </div>
          <span className="ml-auto rounded-full border border-white/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
            WhatsApp
          </span>
        </div>
        {/* Conversation */}
        <div className="space-y-3 bg-[#F0F9FF] px-5 py-5">
          <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[14.5px] leading-relaxed text-navy-950">
            Hi, do you have a haircut slot tomorrow morning?
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-navy-950 px-4 py-3 text-[14.5px] leading-relaxed text-white">
            Yes — 10:30 AM with Sara is available. Shall I book it?
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[14.5px] leading-relaxed text-navy-950">
            Yes please
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-teal-300/60 bg-teal-50 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400 text-white">
              <IconCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[14.5px] font-semibold leading-tight text-navy-950">Booking confirmed</p>
              <p className="truncate text-[13px] text-slate-500">Tomorrow · 10:30 AM · Haircut · Sara</p>
            </div>
          </div>
        </div>
      </div>
      {/* New-booking chip */}
      <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_20px_44px_-18px_rgba(11,18,48,0.4)] sm:-left-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
          <IconBell className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold leading-tight text-navy-950">New booking</p>
          <p className="text-[12.5px] leading-tight text-slate-500">Haircut · Tomorrow 10:30 AM</p>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="bg-white pb-28 pt-32 sm:pt-36 lg:pb-32 lg:pt-44">
      <div className={`${container} grid items-center gap-16 lg:grid-cols-2 lg:gap-12`}>
        <Reveal>
          <p className={eyebrowCls}>AI receptionist for salons &amp; spas in the UAE</p>
          <h1 className="font-display mt-5 text-[42px] font-semibold leading-[1.08] text-navy-950 sm:text-5xl lg:text-[56px]">
            Never miss a{' '}
            <span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
              booking
            </span>{' '}
            again.
          </h1>
          <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-slate-600">
            ZYNA answers every call and message for your salon or spa — 24/7 — books
            appointments, sends reminders and keeps your chairs and treatment rooms full,
            even after hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-teal-300 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(56,189,248,0.6)] transition duration-300 hover:brightness-110"
            >
              Book a Demo
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-7 py-3.5 text-[15px] font-bold text-navy-950 transition-colors duration-300 hover:border-navy-950"
            >
              See How It Works
            </a>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <HeroMock />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------- Trust strip ------------------------------ */

function TrustStrip() {
  return (
    <section className="relative border-b border-slate-200 bg-sky-50 py-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300"
      />
      <div className={`${container} text-center`}>
        <p className="text-[15px] font-semibold text-navy-950">
          Built for salons and spas across the UAE
        </p>
        <p className="mt-2.5 text-[13px] uppercase tracking-[0.18em] text-slate-500">
          Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain
        </p>
      </div>
    </section>
  )
}

/* ------------------------------ Problem -------------------------------- */

const PROBLEMS = [
  {
    icon: <IconPhoneMissed className="h-6 w-6" />,
    title: 'Calls after closing',
    body: 'Enquiries that come in the evening are gone by morning — clients book whoever answers first.',
  },
  {
    icon: <IconClock className="h-6 w-6" />,
    title: 'Front desk overload',
    body: 'Your team stops mid-service to answer the phone — or lets it ring.',
  },
  {
    icon: <IconHourglass className="h-6 w-6" />,
    title: 'No-shows and gaps',
    body: 'Forgotten appointments leave chairs and treatment rooms empty.',
  },
]

function Problem() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className={container}>
        <SectionHead eyebrow="The Problem" title="Every missed call is a missed booking." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <div className={`${cardCls} h-full`}>
                <IconBadge>{p.icon}</IconBadge>
                <h3 className="font-display mt-5 text-xl font-semibold text-navy-950">{p.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-slate-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Product -------------------------------- */

const FEATURES = [
  {
    icon: <IconPhone className="h-6 w-6" />,
    title: '24/7 call & message answering',
    body: 'Every call and WhatsApp message answered in seconds, day or night, in your business\u2019s name.',
  },
  {
    icon: <IconCalendar className="h-6 w-6" />,
    title: 'Instant appointment booking',
    body: 'Bookings go straight into your diary with the right stylist or therapist — no back-and-forth, no double bookings.',
  },
  {
    icon: <IconBell className="h-6 w-6" />,
    title: 'Reminders that cut no-shows',
    body: 'Confirmations and reminders go out automatically before every appointment, so clients show up.',
  },
  {
    icon: <IconMoon className="h-6 w-6" />,
    title: 'After-hours lead capture',
    body: 'Every late enquiry is answered and booked by morning — before a competitor takes it.',
  },
]

function Product() {
  return (
    <section id="product" className="scroll-mt-20 bg-[#F0F9FF] py-20 lg:py-24">
      <div className={container}>
        <SectionHead
          eyebrow="The Product"
          title="One receptionist that never sleeps, never misses."
          lead="ZYNA works with your existing number, your services and your team's diary — your clients simply get answered, every time."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className={`${cardCls} h-full transition-colors duration-300 hover:border-sky-200`}>
                <IconBadge tone={(['violet', 'blue', 'cyan', 'violet'] as BadgeTone[])[i]}>
                  {f.icon}
                </IconBadge>
                <h3 className="font-display mt-5 text-[19px] font-semibold leading-snug text-navy-950">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- How it works ----------------------------- */

const STEPS = [
  {
    n: '01',
    title: 'A client reaches out',
    body: 'Call or WhatsApp — ZYNA answers in seconds, day or night.',
  },
  {
    n: '02',
    title: 'ZYNA handles the booking',
    body: 'Checks availability, books the right stylist or therapist, confirms with the client.',
  },
  {
    n: '03',
    title: 'You stay in control',
    body: 'Reminders go out automatically; you get the bookings and a clear summary.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className={container}>
        <SectionHead eyebrow="How It Works" title="Set up once. Answered always." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7">
                <p className="font-display bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-[15px] font-bold tracking-[0.2em] text-transparent">{s.n}</p>
                <h3 className="font-display mt-4 text-xl font-semibold text-navy-950">{s.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-slate-600">{s.body}</p>
                {i < STEPS.length - 1 ? (
                  <IconArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-sky-300 md:block" />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Salons / Spas ----------------------------- */

function AudienceSection({
  id,
  tinted,
  eyebrow,
  title,
  bullets,
  cta,
  imgDesktop,
  imgMobile,
  imgAlt,
  flip = false,
}: {
  id: string
  tinted?: boolean
  eyebrow: string
  title: string
  bullets: string[]
  cta: string
  imgDesktop: string
  imgMobile: string
  imgAlt: string
  flip?: boolean
}) {
  const text = (
    <Reveal>
      <p className={eyebrowCls}>{eyebrow}</p>
      <h2 className={h2Cls}>{title}</h2>
      <ul className="mt-7 space-y-4">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[16px] leading-relaxed text-slate-600">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-600">
              <IconCheck className="h-4 w-4" />
            </span>
            {b}
          </li>
        ))}
      </ul>
      <a
        href="#demo"
        className="group mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-sky-600"
      >
        <span className="border-b-2 border-sky-300 pb-0.5 transition-colors group-hover:border-sky-500">
          {cta}
        </span>
        <IconArrowRight className="h-4 w-4 text-sky-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-teal-500" />
      </a>
    </Reveal>
  )
  const photo = (
    <Reveal delay={120}>
      <picture>
        <source media="(max-width: 768px)" srcSet={imgMobile} />
        <img
          src={imgDesktop}
          alt={imgAlt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover shadow-[0_28px_60px_-28px_rgba(11,18,48,0.35)]"
        />
      </picture>
    </Reveal>
  )
  return (
    <section id={id} className={`scroll-mt-20 py-20 lg:py-24 ${tinted ? 'bg-[#F0F9FF]' : 'bg-white'}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {flip ? (
          <>
            {photo}
            {text}
          </>
        ) : (
          <>
            {text}
            {photo}
          </>
        )}
      </div>
    </section>
  )
}

/* ------------------------------ Outcomes ------------------------------- */

const OUTCOMES = [
  {
    label: 'Time',
    title: 'Time',
    body: 'Your front desk is freed for the clients in the chair — not tied to a ringing phone.',
  },
  {
    label: 'Revenue',
    title: 'Revenue',
    body: 'After-hours and missed enquiries turn into confirmed bookings instead of lost clients.',
  },
  {
    label: 'Peace of mind',
    title: 'Peace of mind',
    body: 'Every client answered, every booking confirmed — whether you are open or closed.',
  },
]

function Outcomes() {
  return (
    <section className="bg-[#EFF8FF] py-20 lg:py-24">
      <div className={container}>
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-sky-500">Outcomes</p>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-[1.15] text-navy-950 sm:text-4xl lg:text-[42px]">
            What owners get back
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} delay={i * 110}>
              <div className="relative pt-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300"
                />
                <h3 className="font-display text-xl font-semibold text-navy-950">{o.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-slate-600">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- FAQ ---------------------------------- */

const FAQS = [
  {
    q: 'How does ZYNA answer my clients?',
    a: 'By phone and WhatsApp, in your business\u2019s name, using your services, prices and availability.',
  },
  {
    q: 'How long does setup take?',
    a: 'We set ZYNA up with your menu, team and diary — book a demo and we\u2019ll walk you through it.',
  },
  {
    q: 'Does it work for a single branch?',
    a: 'Yes — ZYNA works for single salons and spas as well as multi-branch businesses.',
  },
  {
    q: 'What happens to my existing number?',
    a: 'Keep it — ZYNA works with the number your clients already know.',
  },
]

function Faq() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className={container}>
        <SectionHead eyebrow="FAQ" title="Questions owners ask us" />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 90}>
              <details className="group h-full rounded-2xl border border-slate-200 bg-white px-7 py-6 open:shadow-[0_16px_40px_-24px_rgba(11,18,48,0.18)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[17px] font-semibold text-navy-950">{f.q}</span>
                  <span className="font-display text-xl leading-none text-sky-500 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3.5 text-[15.5px] leading-relaxed text-slate-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Demo --------------------------------- */

function Demo() {
  return (
    <section id="demo" className="scroll-mt-20 bg-[#F0F9FF] py-20 lg:py-24">
      <div className={container}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className={eyebrowCls}>Get Started</p>
          <h2 className={h2Cls}>Book your demo.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-slate-600">
            See ZYNA answer for your business. Tell us about your salon or spa and we\u2019ll
            get back to you.
          </p>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
          <Contact gradientSubmit />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------- Page --------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Product />
      <HowItWorks />
      <AudienceSection
        id="for-salons"
        tinted
        eyebrow="For Salons"
        title="Full chairs. Calm front desk."
        bullets={[
          'Hair, beauty and grooming appointments booked around your stylists\u2019 diaries',
          'Rebooking and reminders handled automatically',
          'Walk-in enquiries answered even at peak hours',
        ]}
        cta="Book a salon demo"
        imgDesktop="images/scenes/photo-salon-luxury.jpg"
        imgMobile="images/scenes/m/photo-salon-luxury.jpg"
        imgAlt="A premium salon interior with styling chairs and mirrors"
      />
      <AudienceSection
        id="for-spas"
        eyebrow="For Spas"
        title="Quiet rooms. Fully booked."
        bullets={[
          'Massages, hammams, facials and wellness rituals booked by therapist and treatment room',
          'Guests reminded before every appointment',
          'Premium, unhurried experience — every enquiry answered with care',
        ]}
        cta="Book a spa demo"
        imgDesktop="images/scenes/photo-spa-interior.jpg"
        imgMobile="images/scenes/m/photo-spa-interior.jpg"
        imgAlt="A calm spa setting with candles, folded towels and spa stones"
        flip
      />
      <Outcomes />
      <Faq />
      <Demo />
    </>
  )
}
