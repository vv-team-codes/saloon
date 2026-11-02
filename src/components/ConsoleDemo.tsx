import { useEffect, useRef, useState } from 'react'
import { IconBell, IconBolt, IconCalendar, IconCheck } from './ui/icons'

/**
 * The hero visual: a lightweight "ZYNA console" built with plain code and CSS.
 * Dark glass edition for the Midnight Emirates theme. Left: a live conversation
 * that plays itself. Right: bookings filling up in real time.
 */

type Msg = { from: 'customer' | 'zyna'; text: string }

const SCRIPT: { msg?: Msg; typing?: boolean; booking?: number; wait: number }[] = [
  { msg: { from: 'customer', text: 'Hi! Do you have any appointments available tomorrow morning?' }, wait: 500 },
  { typing: true, wait: 950 },
  { msg: { from: 'zyna', text: 'Good evening! Yes — we have 9:30 AM and 11:00 AM open tomorrow. Which suits you best?' }, wait: 1250 },
  { msg: { from: 'customer', text: '9:30 works perfectly 🙏' }, wait: 900 },
  { typing: true, wait: 850 },
  { msg: { from: 'zyna', text: "You're booked for tomorrow at 9:30 AM. I've sent a confirmation, and I'll remind you an hour before." }, booking: 0, wait: 1400 },
  { msg: { from: 'customer', text: 'That was fast, thank you!' }, wait: 1100 },
  { msg: { from: 'zyna', text: 'Anytime! ZYNA is here 24/7 if you need anything else.' }, booking: 1, wait: 1600 },
]

const BOOKINGS = [
  { name: 'New booking', detail: 'Tomorrow · 9:30 AM · JLT salon', tag: 'Confirmed' },
  { name: 'Reminder sent', detail: 'Today · 6:00 PM visit', tag: 'On track' },
  { name: 'Follow-up done', detail: 'Yesterday’s enquiry', tag: 'Closed' },
]

const HOLD_MS = 4600

export default function ConsoleDemo() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const [booked, setBooked] = useState(0)
  const timers = useRef<number[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const run = () => {
      setShown(0)
      setTyping(false)
      setBooked(0)
      let t = 350
      SCRIPT.forEach((step) => {
        t += step.wait
        timers.current.push(
          window.setTimeout(() => {
            if (step.typing) {
              setTyping(true)
            } else {
              setTyping(false)
              if (step.msg) setShown((s) => s + 1)
              if (typeof step.booking === 'number') setBooked(step.booking + 1)
            }
          }, t),
        )
      })
      timers.current.push(window.setTimeout(run, t + HOLD_MS))
    }
    run()
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [shown, typing])

  const messages = SCRIPT.filter((s) => s.msg).map((s) => s.msg!) as Msg[]

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[48px] bg-gradient-to-tr from-violet-brand/30 via-electric-500/20 to-gold-500/25 blur-2xl"
      />
      <div className="glass-dark relative overflow-hidden rounded-[28px] border border-white/12 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 hidden items-center gap-2 text-[12.5px] font-semibold text-white/60 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-ring" />
            ZYNA Console — live
          </span>
          <span className="ml-auto rounded-full bg-white/6 px-3 py-1 text-[11px] font-semibold text-white/55">
            11:42 PM · after hours · Dubai
          </span>
        </div>

        <div className="grid md:grid-cols-[1.25fr_1fr]">
          <div className="flex h-[380px] flex-col p-5 sm:p-6">
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-hidden scroll-smooth">
              {messages.slice(0, shown).map((m, i) =>
                m.from === 'customer' ? (
                  <div key={i} className="chat-msg flex justify-end">
                    <div className="max-w-[82%] rounded-3xl rounded-br-lg bg-gradient-to-br from-violet-brand to-electric-500 px-4 py-3 text-[13.5px] leading-relaxed text-white shadow-md">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="chat-msg flex items-end gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display text-[13px] font-bold text-navy-950">
                      Z
                    </span>
                    <div className="max-w-[82%] rounded-3xl rounded-bl-lg bg-white/8 px-4 py-3 text-[13.5px] leading-relaxed text-white">
                      {m.text}
                    </div>
                  </div>
                ),
              )}
              {typing && (
                <div className="chat-msg flex items-end gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display text-[13px] font-bold text-navy-950">
                    Z
                  </span>
                  <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg bg-white/8 px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 rounded-full bg-white/60 animate-typing-dot"
                        style={{ animationDelay: `${d * 0.18}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-3 text-[13px] text-white/45">
              <span className="flex-1">ZYNA is handling this conversation…</span>
              <IconBolt className="h-4 w-4 text-gold-400" />
            </div>
          </div>

          <div className="border-t border-white/8 bg-white/3 p-5 sm:p-6 md:border-l md:border-t-0">
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-white/45">
              <IconCalendar className="h-4 w-4 text-gold-400" />
              Happening for you
            </p>
            <div className="mt-4 space-y-3">
              {BOOKINGS.map((b, i) => (
                <div
                  key={b.name}
                  className={`rounded-2xl border px-4 py-3.5 transition-all duration-700 ${
                    i < booked
                      ? 'translate-y-0 border-emerald-300/30 bg-white/8 opacity-100 shadow-sm'
                      : 'translate-y-1 border-white/8 bg-white/3 opacity-45'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-white">{b.name}</p>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
                        i < booked ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/8 text-white/40'
                      }`}
                    >
                      <IconCheck className="h-3 w-3" />
                      {b.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-white/50">{b.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-500/10 px-4 py-3.5 text-white">
              <IconBell className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-300" />
              <p className="text-[12.5px] leading-relaxed text-white/80">
                Smart reminders go out automatically — no-shows drop, your team does nothing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-dark absolute -left-4 top-16 hidden items-center gap-2.5 rounded-2xl border border-white/15 px-4 py-3 shadow-xl animate-float sm:flex lg:-left-14">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-brand to-electric-500">
          <IconBolt className="h-4.5 w-4.5 text-white" />
        </span>
        <span>
          <span className="block text-[13px] font-bold leading-tight text-white">Replied in 3s</span>
          <span className="block text-[11.5px] leading-tight text-white/55">at 11:42 PM</span>
        </span>
      </div>
      <div
        className="glass-dark absolute -right-3 bottom-14 hidden items-center gap-2.5 rounded-2xl border border-white/15 px-4 py-3 shadow-xl animate-float-slow sm:flex lg:-right-12"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600">
          <IconCalendar className="h-4.5 w-4.5 text-navy-950" />
        </span>
        <span>
          <span className="block text-[13px] font-bold leading-tight text-white">Booking confirmed</span>
          <span className="block text-[11.5px] leading-tight text-white/55">zero staff effort</span>
        </span>
      </div>
    </div>
  )
}
