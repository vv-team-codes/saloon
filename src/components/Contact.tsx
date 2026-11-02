import { useState, type FormEvent } from 'react'
import Reveal from './ui/Reveal'
import { IconArrowRight, IconCheck } from './ui/icons'

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Outside the UAE']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', emirate: 'Dubai', message: '' })

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Front-end handoff point: wire this to the ZYNA CRM / email endpoint before launch.
    setSent(true)
  }

  const inputCls =
    'w-full rounded-2xl border border-navy-950/10 bg-white px-4.5 py-3.5 text-[15px] text-navy-950 placeholder:text-navy-950/35 outline-none transition-all duration-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15'

  return (
    <section id="contact" className="relative overflow-hidden pb-24 pt-4 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA band — Burj Khalifa at sunset */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <img
              src="/images/dubai-skyline.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/78 via-navy-950/62 to-navy-950/85" />
            <div className="relative">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.24em] text-gold-300">
                Never miss a booking again
              </p>
              <h2 className="font-display mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[54px]">
                Every conversation <span className="text-gold-grad">matters.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/70">
                Your next client could message tonight at midnight. Make sure someone brilliant
                is there to answer. Start with ZYNA — and let every conversation turn into an
                opportunity.
              </p>
              <a
                href="#form"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-[15px] font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_20px_44px_-12px_rgba(201,162,75,0.8)]"
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
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-600">
              Get in touch
            </p>
            <h3 className="font-display mt-4 text-4xl font-semibold leading-[1.12] tracking-tight text-navy-950">
              Let’s put ZYNA to work for your salon.
            </h3>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-navy-950/60">
              Tell us a little about your salon and what you would like ZYNA to handle. We will
              reply with the next steps — usually within one business day.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                'A walkthrough of ZYNA on your own salon scenario',
                'Honest advice on what to automate first',
                'No pressure — just a clear plan',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-navy-950/75">
                  <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                    <IconCheck className="h-3 w-3 text-navy-950" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@zyna.ae"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-navy-950/10 px-5 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:border-gold-500/50 hover:text-gold-600"
            >
              Prefer email? hello@zyna.ae
            </a>
            <p className="mt-4 text-[13.5px] font-medium text-navy-950/45">Dubai · United Arab Emirates</p>
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
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">Your name *</span>
                    <input required value={form.name} onChange={update('name')} placeholder="Full name" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">Salon name</span>
                    <input value={form.business} onChange={update('business')} placeholder="Your salon" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">Email *</span>
                    <input required type="email" value={form.email} onChange={update('email')} placeholder="you@business.com" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">Phone / WhatsApp</span>
                    <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 …" className={inputCls} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[13px] font-semibold text-navy-950">Where is your business?</span>
                    <select value={form.emirate} onChange={update('emirate')} className={inputCls}>
                      {EMIRATES.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="mb-2 block text-[13px] font-semibold text-navy-950">How can ZYNA help? *</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your salon and the client conversations you'd like ZYNA to handle…"
                    className={`${inputCls} resize-none`}
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy-950 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-gold-600 hover:shadow-[0_20px_40px_-14px_rgba(169,134,58,0.65)] sm:w-auto"
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
