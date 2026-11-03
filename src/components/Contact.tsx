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
    // The journey's closing panel: the CTA ("Every conversation matters") and
    // the get-in-touch content are scenes inside the scroll film itself, so
    // what follows the stage is the enquiry form alone — on a light ivory
    // sheet, in normal document flow right after the final scene.
    <section id="contact" className="relative overflow-hidden bg-navy-950 pb-24 pt-20 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Contact form — on a light ivory sheet, the journey's closing frame */}
        <div
          id="form"
          className="mx-auto max-w-6xl scroll-mt-28 rounded-[40px] bg-[#f6f4ef] p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] sm:p-10 lg:p-14"
        >
          <Reveal>
            {sent ? (
              <div className="mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-center rounded-[32px] border border-emerald-200 bg-emerald-50/60 px-8 text-center">
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
                className="mx-auto max-w-3xl rounded-[32px] border border-navy-950/8 bg-white p-7 shadow-[0_30px_60px_-30px_rgba(5,8,28,0.25)] sm:p-9"
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
