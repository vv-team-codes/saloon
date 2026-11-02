import { useState, type FormEvent } from 'react'
import Reveal from './ui/Reveal'
import { IconArrowRight, IconCheck } from './ui/icons'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' })

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Front-end handoff point: wire this to the ZYNA CRM / email endpoint before launch.
    setSent(true)
  }

  const inputCls =
    'w-full rounded-2xl border border-navy-950/10 bg-white px-4.5 py-3.5 text-[15px] text-navy-950 placeholder:text-navy-950/35 outline-none transition-all duration-300 focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15'

  return (
    <section id="contact" className="relative overflow-hidden pb-24 pt-4 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA band */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-navy-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-brand/35 blur-3xl animate-aurora" />
              <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-electric-500/30 blur-3xl animate-aurora" />
              <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-brand/15 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
            </div>
            <div className="relative">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.24em] text-cyan-brand">
                Never miss a booking again
              </p>
              <h2 className="font-display mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[54px]">
                Every conversation <span className="text-shimmer">matters.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/65">
                Your next customer could message tonight at midnight. Make sure someone brilliant
                is there to answer. Start with ZYNA — and let every conversation turn into an
                opportunity.
              </p>
              <a
                href="#form"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-navy-950 transition-all duration-300 hover:shadow-[0_20px_44px_-14px_rgba(255,255,255,0.45)]"
              >
                Talk to Us
                <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Contact form */}
        <div id="form" className="mx-auto mt-24 grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
              Get in touch
            </p>
            <h3 className="font-display mt-4 text-4xl font-semibold leading-[1.12] tracking-tight text-navy-950">
              Let’s put ZYNA to work for your business.
            </h3>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-navy-950/60">
              Tell us a little about your business and what you would like ZYNA to handle. We will
              reply with the next steps — usually within one business day.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                'A walkthrough of ZYNA on your own business scenario',
                'Honest advice on what to automate first',
                'No pressure — just a clear plan',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-navy-950/75">
                  <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-brand to-electric-500">
                    <IconCheck className="h-3 w-3 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@zyna.ae"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-navy-950/10 px-5 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:border-electric-500/40 hover:text-royal-500"
            >
              Prefer email? hello@zyna.ae
            </a>
          </Reveal>

          <Reveal delay={140}>
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-emerald-200 bg-emerald-50/60 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                  <IconCheck className="h-8 w-8" />
                </span>
                <h4 className="font-display mt-6 text-3xl font-semibold text-navy-950">
                  Thank you, {form.name.split(' ')[0] || 'friend'}.
                </h4>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-navy-950/60">
                  Your message is with us. The ZYNA team will get back to you shortly — usually
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-7 rounded-full border border-navy-950/15 px-6 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:bg-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-[32px] border border-navy-950/8 bg-white p-7 shadow-[0_30px_60px_-30px_rgba(5,8,28,0.25)] sm:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">
                      Your name *
                    </span>
                    <input required value={form.name} onChange={update('name')} placeholder="Full name" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">
                      Business name
                    </span>
                    <input value={form.business} onChange={update('business')} placeholder="Your business" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">
                      Email *
                    </span>
                    <input required type="email" value={form.email} onChange={update('email')} placeholder="you@business.com" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">
                      Phone / WhatsApp
                    </span>
                    <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 …" className={inputCls} />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="mb-2 block text-[13px] font-semibold text-navy-950">
                    How can ZYNA help? *
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your business and the conversations you'd like ZYNA to handle…"
                    className={`${inputCls} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy-950 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-royal-500 hover:shadow-[0_20px_40px_-14px_rgba(79,70,229,0.65)] sm:w-auto"
                >
                  Send Message
                  <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-4 text-[12.5px] text-navy-950/45">
                  By sending this form you agree to be contacted about ZYNA. We never share your
                  details.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
