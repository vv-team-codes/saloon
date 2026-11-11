import { useState, type FormEvent } from 'react'
import { IconArrowRight, IconCheck } from './ui/icons'

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Other UAE location']

/**
 * The enquiry form card. Since v8 it renders in the homepage's "Book
 * your demo" section (src/pages/Home.tsx); before that it was the final
 * scene inside the journey's sticky stage. Field logic and the mailto
 * delivery behaviour below are unchanged throughout.
 *
 * The optional `gradientSubmit` prop is pure styling for the homepage
 * (Sky Aqua, v10): sky focus rings and a sky → teal
 * gradient submit button. Default (journey) rendering is unchanged.
 */
export const SALES_EMAIL = 'sales@zyna.ae'

export default function Contact({ gradientSubmit = false }: { gradientSubmit?: boolean }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', businessType: 'Salon', email: '', phone: '', emirate: 'Dubai', message: '' })

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Interim delivery (2026-11-06): the third-party form service route
    // failed its activation and showed visitors a dead error, so until the
    // Web3Forms access key is wired in, submitting opens the visitor's own
    // email app with the enquiry fully written out and addressed to
    // sales@zyna.ae — they press Send there and it lands in the sales
    // inbox. No error state is reachable from this form anymore.
    const subject = encodeURIComponent(`New ZYNA website enquiry — ${form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Business: ${form.business || '—'}`,
        `Business type: ${form.businessType}`,
        `Email: ${form.email}`,
        `Phone / WhatsApp: ${form.phone || '—'}`,
        `Location: ${form.emirate}`,
        '',
        'How can ZYNA help?',
        form.message,
      ].join('\n'),
    )
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  // text-base (16px) on every field: anything smaller makes iOS Safari
  // auto-zoom on focus, which would fight the scroll-driven stage.
  // Light professional card since v19 (Clean Light Corporate): white
  // surface, slate borders, navy text — the dark blurred Dubai backdrop
  // behind it makes the card read as a clean modal.
  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-4.5 py-2.5 text-base text-navy-950 placeholder:text-slate-400 outline-none transition-all duration-300 ' +
    (gradientSubmit
      ? 'focus:border-sky-400 focus:ring-4 focus:ring-sky-400/25'
      : 'focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20')

  const labelCls = 'mb-1 block text-[13px] font-medium text-slate-600'

  return (
    <div
      id="form"
      style={{ colorScheme: 'light' }}
      className="w-full rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,18,48,0.35)] sm:p-6"
    >
      {sent ? (
        <div className="flex min-h-[264px] flex-col items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 px-6 text-center sm:px-12">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              gradientSubmit
                ? 'bg-gradient-to-r from-sky-400 to-teal-300 text-white'
                : 'bg-gold-500 text-navy-950'
            }`}
          >
            <IconCheck className="h-8 w-8" />
          </span>
          <h4 className="font-display mt-6 text-3xl font-semibold text-navy-950">
            Thank you, {form.name.split(' ')[0] || 'friend'}.
          </h4>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-600">
            Your email app should now open with your enquiry already written and addressed
            to {SALES_EMAIL} — just press Send there and it reaches us directly. If nothing
            opened, please email us at {SALES_EMAIL}.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-7 rounded-lg border border-slate-300 px-6 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:bg-slate-100"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {/* Wide landscape composition (v11): one grid for all seven fields.
              lg — three columns: name / business / business type, then
              email / phone / where, then the message spanning all three
              columns so the grid stays a balanced rectangle. Below lg the
              fields pair up in two columns with the message spanning both;
              on phones everything stacks in the original order. */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className={labelCls}>Your name *</span>
              <input required value={form.name} onChange={update('name')} placeholder="Full name" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Business name</span>
              <input value={form.business} onChange={update('business')} placeholder="Your salon or spa" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Business type</span>
              <select value={form.businessType} onChange={update('businessType')} className={`${inputCls} dark-select`}>
                {['Salon', 'Spa', 'Salon & Spa', 'Other beauty business'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Email *</span>
              <input required type="email" value={form.email} onChange={update('email')} placeholder="you@business.com" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Phone / WhatsApp</span>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 …" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Where is your business?</span>
              <select value={form.emirate} onChange={update('emirate')} className={`${inputCls} dark-select`}>
                {EMIRATES.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2 lg:col-span-3">
              <span className={labelCls}>How can ZYNA help? *</span>
              <textarea
                required
                rows={2}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us about your salon or spa and the client conversations you'd like ZYNA to handle…"
                className={`${inputCls} resize-none`}
              />
            </label>
          </div>
          {/* Closing row: footnote left, Send Message right-aligned at its
              natural width. On phones it stacks with the button on top,
              as before. */}
          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-snug text-slate-500 sm:max-w-[55%]">
              By sending this form you agree to be contacted about ZYNA. We never share your
              details. Or write to us directly:{' '}
              <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-navy-900 transition-colors hover:text-navy-950">
                {SALES_EMAIL}
              </a>
            </p>
            <button
              type="submit"
              className={`group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-lg px-8 py-3 text-[15px] font-bold text-white sm:w-auto ${
                gradientSubmit
                  ? 'bg-gradient-to-r from-sky-400 to-teal-300 shadow-[0_14px_30px_-12px_rgba(56,189,248,0.6)] transition duration-300 hover:brightness-110'
                  : 'bg-navy-950 transition-colors duration-300 hover:bg-navy-900'
              }`}
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
