import Reveal from './ui/Reveal'
import { IconBolt, IconCalendar, IconMessage, IconTrending } from './ui/icons'

const STEPS = [
  {
    icon: IconMessage,
    title: 'Customer Message',
    line: 'A customer messages you — on WhatsApp, your website or social — at 2 PM or 2 AM.',
  },
  {
    icon: IconBolt,
    title: 'ZYNA Responds',
    line: 'ZYNA replies in seconds, in English or Arabic, answers the question and offers the next step.',
  },
  {
    icon: IconCalendar,
    title: 'Booking Managed',
    line: 'The appointment is booked, confirmed and reminded — straight into your calendar.',
  },
  {
    icon: IconTrending,
    title: 'Business Grows',
    line: 'No enquiry slips away, your team focuses on service, and the diary stays full.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[820px] -translate-x-1/2 rounded-full bg-violet-brand/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(65%_60%_at_50%_40%,black,transparent)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-400">
              How it works
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              From first message to <span className="text-gold-grad">booked & reminded.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-white/60">
              Four steps, zero effort from your team — ZYNA carries the conversation the whole way.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-gold-500/30 lg:block" />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 130}>
                <li className="relative text-center lg:text-left">
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-gold-500/35 bg-navy-900 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.7)] lg:mx-0">
                    <s.icon className="h-6.5 w-6.5 text-gold-300" />
                    <span className="font-display absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-[11.5px] font-bold text-navy-950">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-[19px] font-semibold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[270px] text-[14px] leading-relaxed text-white/55 lg:mx-0">
                    {s.line}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
