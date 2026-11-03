import { useState, type FormEvent } from 'react'
import { IconArrowRight, IconCheck } from './ui/icons'

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Outside the UAE']

/**
 * The enquiry form card. Since the v4 rework this renders ONLY as the final
 * scene inside the journey's sticky stage (see src/journey/Journey.tsx) —
 * there is no standalone contact section anywhere on the page. The scene
 * layer in Journey owns the entrance animation and pointer-events gating.
 */
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

  // text-base (16px) on every field: anything smaller makes iOS Safari
  // auto-zoom on focus, which would fight the scroll-driven stage.
  const inputCls =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-4.5 py-2.5 text-base text-white placeholder:text-white/35 outline-none transition-all duration-300 hover:bg-white/8 focus:border-gold-400 focus:ring-4 focus:ring-gold-500/25'

  const labelCls = 'mb-1 block text-[13px] font-medium text-white/85'

  return (
    <div
      id="form"
      style={{ colorScheme: 'dark' }}
      className="w-full rounded-[32px] border border-white/12 bg-navy-900/85 p-5 shadow-[0_36px_80px_-36px_rgba(0,0,0,0.65)] sm:p-6 sm:backdrop-blur-md"
    >
      {sent ? (
        <div className="flex min-h-[264px] flex-col items-center justify-center rounded-[24px] border border-white/12 bg-white/5 px-6 text-center sm:px-12">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 shadow-lg">
            <IconCheck className="h-8 w-8" />
          </span>
          <h4 className="font-display mt-6 text-3xl font-semibold text-white">
            Thank you, {form.name.split(' ')[0] || 'friend'}.
          </h4>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
            Your message is with us. The ZYNA team will get back to you shortly — usually
            within one business day.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-7 rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {/* Wide landscape composition (v11): one grid for all six fields.
              lg — three columns: name / salon / email, then phone / where /
              message (textarea in the third column). Below lg the fields
              pair up in two columns with the wide fields spanning both;
              on phones everything stacks in the original order. */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className={labelCls}>Your name *</span>
              <input required value={form.name} onChange={update('name')} placeholder="Full name" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Salon name</span>
              <input value={form.business} onChange={update('business')} placeholder="Your salon" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Email *</span>
              <input required type="email" value={form.email} onChange={update('email')} placeholder="you@business.com" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Phone / WhatsApp</span>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 …" className={inputCls} />
            </label>
            <label className="block sm:col-span-2 lg:col-span-1">
              <span className={labelCls}>Where is your business?</span>
              <select value={form.emirate} onChange={update('emirate')} className={inputCls}>
                {EMIRATES.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2 lg:col-span-1">
              <span className={labelCls}>How can ZYNA help? *</span>
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us about your salon and the client conversations you'd like ZYNA to handle…"
                className={`${inputCls} resize-none`}
              />
            </label>
          </div>
          {/* Closing row: footnote left, Send Message right-aligned at its
              natural width. On phones it stacks with the button on top,
              as before. */}
          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-snug text-white/55 sm:max-w-[55%]">
              By sending this form you agree to be contacted about ZYNA. We never share your
              details.
            </p>
            <button
              type="submit"
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3 text-[15px] font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_20px_40px_-14px_rgba(169,134,58,0.65)] sm:w-auto"
            >
              Send Message
              <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
