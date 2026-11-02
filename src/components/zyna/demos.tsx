import { useEffect, useState } from "react";
import { Bubble, Logo } from "./ui";
import { cn } from "@/lib/utils";

/* Hero phone: conversation types out step by step */
const heroScript = [
  { out: false, text: "Hi, do you have Saturday at 4 for a haircut? 💇‍♀️", time: "11:47 PM" },
  { out: true, text: "Hi! Saturday 4:00 pm is free with Maya. Shall I book it for you?", time: "11:47 PM" },
  { out: false, text: "Yes please!", time: "11:48 PM" },
  { out: true, text: "Done ✓ Haircut, Sat 4:00 pm with Maya. See you then!", time: "11:48 PM" },
];

export function HeroPhone() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= heroScript.length + 2 ? 1 : v + 1)), 1600);
    return () => clearInterval(t);
  }, []);
  const shown = Math.min(n, heroScript.length);
  return (
    <div className="relative mx-auto w-[280px] sm:w-[310px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-primary/15 blur-3xl" />
      <div className="rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-2xl">
        <div className="overflow-hidden rounded-[2rem]">
          <div className="relative flex items-center gap-3 bg-chat-header px-4 pb-3 pt-8 text-primary-foreground">
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-sm font-bold">Z</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">ZYNA · Your Business</p>
              <p className="text-[11px] opacity-75">online</p>
            </div>
          </div>
          <div className="chat-pattern flex h-[440px] flex-col gap-2 p-3" aria-live="polite">
            <span className="mx-auto rounded-md bg-tint-butter px-2 py-0.5 text-[10px] font-semibold">TODAY</span>
            {heroScript.slice(0, shown).map((m, i) => (
              <Bubble key={i} out={m.out} time={m.time} className="animate-pop">
                {m.text}
              </Bubble>
            ))}
          </div>
        </div>
      </div>
      <div className="animate-float absolute -left-16 bottom-24 hidden rounded-full bg-card px-4 py-2 text-xs font-semibold shadow-xl sm:block">
        🌙 Booked at 11:48 PM
      </div>
      <div className="absolute -right-10 bottom-10 hidden rounded-full bg-card px-4 py-2 text-xs font-semibold shadow-xl lg:block">
        ⏱ Replied in seconds
      </div>
    </div>
  );
}

/* Dashboard mock */
const navGroups = [
  { label: "Overview", items: ["Dashboard", "AI Analytics"] },
  { label: "Manage", items: ["Bookings", "Services", "Customers", "Staff"] },
  { label: "Automation", items: ["Workflows", "Alerts"] },
];
const convos = [
  { name: "Aisha M.", text: "Booked a colour for Sunday", mood: "Happy", t: "2m", c: "bg-tint-pink" },
  { name: "Priya S.", text: "Rescheduled haircut to Monday", mood: "Happy", t: "14m", c: "bg-tint-peach" },
  { name: "Fatima K.", text: "Asked about highlights pricing", mood: "Needs reply", t: "38m", c: "bg-tint-sky" },
];

export function DashboardMock() {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl">
      <div className="flex items-center gap-2 border-b bg-cream px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/80" />
        <span className="h-3 w-3 rounded-full bg-tint-butter" />
        <span className="h-3 w-3 rounded-full bg-success" />
        <span className="ml-4 truncate font-mono text-xs text-muted-foreground">app.zyna.ai/dashboard (preview)</span>
      </div>
      <div className="grid md:grid-cols-[260px_1fr]">
        <aside className="hidden border-r bg-cream p-5 md:block">
          <Logo className="mb-6 h-7 w-auto" />
          {navGroups.map((g) => (
            <div key={g.label} className="mb-5">
              <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">{g.label}</p>
              {g.items.map((it) => (
                <button
                  key={it}
                  onClick={() => setActive(it)}
                  className={cn(
                    "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
                    active === it ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {it}
                </button>
              ))}
            </div>
          ))}
        </aside>
        <div className="min-w-0 p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-2xl">{active}</h4>
              <p className="text-xs text-muted-foreground">Sample data for illustration</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tint-mint px-3 py-1 text-xs font-semibold text-success">
              <span className="h-2 w-2 rounded-full bg-success" /> ZYNA is online
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Today", "12", "bookings", "bg-secondary"],
              ["After hours", "5", "since 7pm", "bg-tint-violet"],
              ["Resolved", "—", "by ZYNA", "bg-tint-mint"],
              ["Sentiment", "—", "happy", "bg-tint-peach"],
            ].map(([a, b, c, bg]) => (
              <div key={a} className={cn("rounded-xl p-4", bg)}>
                <p className="text-xs text-muted-foreground">{a}</p>
                <p className="font-display text-3xl">{b}</p>
                <p className="text-[11px] text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-cream p-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold">Recent conversations</span>
              <span className="text-primary">View all →</span>
            </div>
            {convos.map((c) => (
              <div key={c.name} className="flex items-center gap-3 border-b py-3 last:border-0">
                <span className={cn("h-8 w-8 shrink-0 rounded-full", c.c)} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.text}</p>
                </div>
                <span className="hidden rounded-full bg-tint-mint px-2 py-0.5 text-[11px] sm:inline">{c.mood}</span>
                <span className="text-xs text-muted-foreground">{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Waitlist replay */
const day = [
  { t: "1:00 pm", n: "Hana", s: "Cut & finish · 60 min" },
  { t: "2:30 pm", n: "Aisha", s: "Root colour · 90 min" },
  { t: "4:30 pm", n: "Noor", s: "Blowdry · 45 min" },
  { t: "5:30 pm", n: "Priya", s: "Gloss · 60 min" },
];

export function WaitlistDemo() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    setStep(0);
    const t = setInterval(() => setStep((s) => (s < 4 ? s + 1 : s)), 1500);
    return () => clearInterval(t);
  }, [run]);
  const slotName = step < 1 ? "Noor" : step < 4 ? null : "Sara";
  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button onClick={() => setRun((r) => r + 1)} className="rounded-full border-2 border-foreground px-5 py-2 text-sm font-semibold transition hover:bg-foreground hover:text-background">
          ↻ Replay
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="Chat" right="Noor">
          <div className="chat-pattern flex min-h-[220px] flex-col gap-2 rounded-xl p-3">
            <Bubble out time="7:00 PM">Hi Noor, a reminder of your blowdry tomorrow at 4:30 pm. Reply to reschedule or cancel.</Bubble>
            {step >= 1 && <Bubble time="7:12 PM" className="animate-pop">Something came up, I need to cancel, sorry!</Bubble>}
            {step >= 1 && <Bubble out className="animate-pop">No problem, it's cancelled ✓</Bubble>}
          </div>
        </Panel>
        <Panel title="Tomorrow" right="Mia · Stylist">
          {day.map((d) => {
            const isSlot = d.t === "4:30 pm";
            const name = isSlot ? slotName : d.n;
            return (
              <div key={d.t} className="mb-2 flex items-center gap-3">
                <span className="w-14 shrink-0 text-xs text-muted-foreground">{d.t}</span>
                <div className={cn("flex-1 rounded-lg px-3 py-2 transition-all", name ? "bg-tint-violet" : "border-2 border-dashed border-primary/40 bg-card")}>
                  <p className="text-sm font-medium">{name ?? "Open slot"}</p>
                  <p className="text-[11px] text-muted-foreground">{isSlot && !name ? "Offering to waitlist…" : d.s}</p>
                </div>
              </div>
            );
          })}
        </Panel>
        <Panel title="Waitlist" right={`${step >= 4 ? 2 : 3} waiting`}>
          {["Sara", "Fatima", "Meera"].map((n, i) => (
            <div key={n} className={cn("mb-2 flex items-center gap-3 rounded-lg border px-3 py-2 transition", i === 0 && step >= 2 && step < 4 && "border-primary bg-primary-soft", i === 0 && step >= 4 && "opacity-40 line-through")}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-xs">{i + 1}</span>
              <div>
                <p className="text-sm font-medium">{n}</p>
                <p className="text-[11px] text-muted-foreground">Blowdry · {i === 2 ? "7:00" : "4:30"} pm</p>
              </div>
            </div>
          ))}
        </Panel>
        <Panel title="Chat" right="Sara">
          <div className="chat-pattern flex min-h-[220px] flex-col gap-2 rounded-xl p-3">
            <Bubble time="2:05 PM">Any chance of a blowdry tomorrow at 4:30?</Bubble>
            <Bubble out time="2:06 PM">It's booked, but I've added you to the waitlist — 1st in line.</Bubble>
            {step >= 2 && <Bubble out time="7:13 PM" className="animate-pop">Good news! 4:30 pm just opened up. Reply YES to take it.</Bubble>}
            {step >= 3 && <Bubble time="7:14 PM" className="animate-pop">YES!</Bubble>}
            {step >= 4 && <Bubble out className="animate-pop">Booked ✓ See you at 4:30 pm.</Bubble>}
          </div>
        </Panel>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">Illustrative example — business, clients and times are fictional.</p>
    </div>
  );
}

function Panel({ title, right, children }: { title: string; right: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
        <span className="text-sm font-medium">{right}</span>
      </div>
      {children}
    </div>
  );
}
