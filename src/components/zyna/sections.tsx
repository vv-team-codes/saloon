import { useEffect, useState, type FormEvent } from "react";
import { Menu, X, Check, Minus, ChevronDown, Clock, Hourglass, Gauge, Phone, BookOpen, Zap } from "lucide-react";
import { Bubble, Eyebrow, Logo, Reveal, btn, DEMO_URL, START_URL } from "./ui";
import { DashboardMock, HeroPhone, WaitlistDemo } from "./demos";
import { cn } from "@/lib/utils";

const nav = [
  ["How it works", "how"],
  ["Product", "features"],
  ["Why ZYNA", "compare"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
] as const;

const wrap = "mx-auto w-full max-w-[1280px] px-5 sm:px-6";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <nav aria-label="Main" className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border bg-card/85 py-2 pl-5 pr-2 shadow-soft backdrop-blur-md">
        <a href="#top" aria-label="ZYNA home" className="shrink-0">
          <Logo className="h-7 w-auto sm:h-8" />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, id]) => (
            <li key={id}>
              <a href={`#${id}`} className={cn("rounded-full px-3.5 py-2 text-sm transition hover:text-primary", active === id ? "bg-primary-soft text-primary" : "text-muted-foreground")}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="/blog" className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition hover:text-primary">
              Blog
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <a href={START_URL} className={cn(btn.primary, "hidden px-5 py-2.5 sm:inline-flex")}>
            Get started →
          </a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="animate-pop mx-auto mt-2 max-w-[1120px] rounded-3xl border bg-card p-4 shadow-xl lg:hidden">
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base hover:bg-secondary">
              {label}
            </a>
          ))}
          <a href="/blog" className="block rounded-xl px-4 py-3 text-base hover:bg-secondary">
            Blog
          </a>
          <a href={START_URL} onClick={() => setOpen(false)} className={cn(btn.primary, "mt-2 w-full")}>
            Get started →
          </a>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream pb-24 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-tint-violet blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-tint-peach blur-3xl" />
      <div className={cn(wrap, "relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]")}>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> Always on, 24/7
          </span>
          <h1 className="mt-6 text-5xl font-light leading-[1.02] sm:text-6xl lg:text-[76px]">
            The AI receptionist that <em className="text-gradient font-normal">never</em> misses a booking.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Meet ZYNA. She answers customer messages, books and reschedules appointments, and keeps your calendar up to date — so no enquiry goes unanswered, even at midnight.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className={btn.dark}>Book a demo</a>
            <a href={START_URL} className={btn.primary}>Get started</a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Setup time and trial terms to be confirmed.</p>
        </Reveal>
        <Reveal delay={150}>
          <HeroPhone />
        </Reveal>
      </div>
    </section>
  );
}

export function Problem() {
  const cards = [
    { icon: Clock, t: "After-hours demand", d: "Customers message at 9pm, 11pm and 6am — long after you close.", c: "bg-tint-violet text-primary" },
    { icon: Hourglass, t: "Limited availability", d: "Your team can't, and shouldn't, be replying at those hours.", c: "bg-tint-pink text-primary" },
    { icon: Gauge, t: "Speed wins bookings", d: "The business that replies first is usually the one that gets booked.", c: "bg-tint-sky text-primary" },
  ];
  return (
    <section className="bg-background py-28">
      <div className={cn(wrap, "max-w-[900px] text-center")}>
        <Reveal>
          <Eyebrow>The reality</Eyebrow>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Every unanswered message is a booking <em className="text-gradient">someone else</em> got.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="h-full rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-soft">
                <div className={cn("grid h-14 w-14 place-items-center rounded-full", c.c)}>
                  <c.icon size={24} />
                </div>
                <h3 className="mt-5 text-xl">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidCta() {
  return (
    <section className="bg-cream py-24">
      <Reveal className={cn(wrap, "max-w-[1000px]")}>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-tint-violet via-tint-pink to-tint-peach px-6 py-20 text-center">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Don't take our word for it — <em>put ZYNA to work.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Set up your business details and let ZYNA start answering your customers.</p>
          <a href={START_URL} className={cn(btn.primary, "mt-8 px-8 py-4 text-base")}>Get started</a>
        </div>
      </Reveal>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: Phone, t: "Connect your channel", d: "Link ZYNA to the number or channel your customers already message.", c: "bg-tint-violet text-primary" },
    { icon: BookOpen, t: "ZYNA learns your business", d: "Services, prices, hours and staff — so answers are specific, not generic.", c: "bg-tint-peach text-primary" },
    { icon: Zap, t: "She starts working", d: "ZYNA replies, books and reminds around the clock. You see it all in one dashboard.", c: "bg-tint-mint text-primary" },
  ];
  return (
    <section id="how" className="scroll-mt-24 bg-sand py-28">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-4xl sm:text-5xl">Set up quickly. <em>Working tonight.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="h-full rounded-3xl bg-card p-8 transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between">
                  <div className={cn("grid h-12 w-12 place-items-center rounded-xl", s.c)}><s.icon size={20} /></div>
                  <span className="font-display text-6xl font-light text-primary/20">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-background py-28">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Built for appointments. <em>Not a generic chatbot.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard bg="bg-tint-violet" emoji="💬" t="24/7 messaging AI" d="ZYNA books, reschedules and answers questions while you sleep.">
            <p className="mb-2 text-xs text-muted-foreground">2:14 AM · business closed</p>
            <Bubble>Hi! Any slots Saturday morning?</Bubble>
            <Bubble out className="mt-2">Yes! 10:30 or 11:15. Which suits you?</Bubble>
          </FeatureCard>
          <LanguageCard />
          <FeatureCard bg="bg-tint-mint" emoji="📱" t="Nothing to install" d="Customers message you the way they already do. No app, no signup.">
            {["Download an app", "Create an account", "Remember a password"].map((x) => (
              <div key={x} className="mb-2 flex justify-between rounded-lg bg-card/70 px-3 py-2 text-xs"><span>{x}</span><X size={14} /></div>
            ))}
            <div className="flex justify-between rounded-lg bg-card px-3 py-2 text-xs font-semibold text-success"><span>Just send a message</span><Check size={14} /></div>
          </FeatureCard>
          <FeatureCard bg="bg-tint-pink" emoji="⏰" t="Smart reminders" d="Automatic reminders before each appointment. Customers reply to reschedule or cancel.">
            <div className="rounded-xl bg-card p-3 text-xs shadow-sm"><b>📅 Appointment reminder</b><br />Hi Aisha! Your appointment is today at 4:00 pm. Reply to reschedule.</div>
            <Bubble className="mt-2">Can I come at 5 instead?</Bubble>
          </FeatureCard>
          <FeatureCard bg="bg-tint-butter" emoji="📊" t="Unified inbox" d="Every chat, booking and customer in one dashboard. Take over any conversation yourself.">
            {[["Aisha · Booked a colour", "2m"], ["Priya · Rescheduled", "14m"], ["Fatima · Bridal package", "Taken over"]].map(([a, b]) => (
              <div key={a} className="mb-2 flex justify-between rounded-lg bg-card/80 px-3 py-2 text-xs"><span>{a}</span><span className="text-muted-foreground">{b}</span></div>
            ))}
          </FeatureCard>
          <FeatureCard bg="bg-tint-sky" emoji="✨" t="Knows your services" d="ZYNA knows your menu, prices and availability. No vague answers.">
            <Bubble out>How much is a root colour?</Bubble>
            <div className="mt-2 flex justify-between rounded-lg bg-card px-3 py-2 text-xs"><span>Root colour</span><span>[price] · 90 min</span></div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ bg, emoji, t, d, children }: { bg: string; emoji: string; t: string; d: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <article className={cn("group flex h-full min-h-[380px] flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-soft", bg)}>
        <span className="text-3xl" aria-hidden>{emoji}</span>
        <h3 className="mt-4 text-2xl">{t}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
        <div className="mt-auto pt-6 transition group-hover:scale-[1.02]">{children}</div>
      </article>
    </Reveal>
  );
}

function LanguageCard() {
  const langs = {
    English: ["Hi! Can I book a manicure for Friday?", "Of course! 3:00 or 5:30 pm?"],
    Español: ["¡Hola! ¿Puedo reservar una manicura el viernes?", "¡Claro! ¿A las 15:00 o 17:30?"],
    Français: ["Bonjour ! Une manucure vendredi ?", "Bien sûr ! 15h ou 17h30 ?"],
  } as const;
  const [l, setL] = useState<keyof typeof langs>("English");
  return (
    <FeatureCard bg="bg-tint-peach" emoji="🌏" t="Speaks their language" d="Replies in the language each customer writes in. Full language list to be confirmed.">
      <div className="mb-3 flex flex-wrap gap-2" role="tablist">
        {(Object.keys(langs) as (keyof typeof langs)[]).map((k) => (
          <button key={k} role="tab" aria-selected={l === k} onClick={() => setL(k)} className={cn("rounded-full border px-3 py-1 text-xs transition", l === k ? "bg-ink text-ink-foreground" : "bg-card hover:border-foreground")}>
            {k}
          </button>
        ))}
      </div>
      <div key={l} className="animate-pop">
        <Bubble out>{langs[l][0]}</Bubble>
        <Bubble className="mt-2">{langs[l][1]}</Bubble>
      </div>
    </FeatureCard>
  );
}

export function Waitlist() {
  return (
    <section className="bg-cream py-28">
      <div className={wrap}>
        <Reveal>
          <Eyebrow>Waitlist</Eyebrow>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Cancelled at 7:12pm.<br /><em>Refilled by 7:14.</em></h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            When a slot is taken, ZYNA can offer customers a place on the waitlist. If it's cancelled, she messages the next person in line and books it when they confirm. Nobody has to chase it.
          </p>
        </Reveal>
        <Reveal className="mt-4"><WaitlistDemo /></Reveal>
      </div>
    </section>
  );
}

export function Results() {
  const stats: [string, string][] = [["[X]", "bookings captured after hours"], ["[X]s", "average response time"], ["[X]%", "fewer no-shows with reminders"]];
  return (
    <section className="bg-sand py-28">
      <div className={cn(wrap, "text-center")}>
        <Reveal>
          <Eyebrow>Results</Eyebrow>
          <h2 className="mt-4 text-4xl sm:text-5xl">Real businesses. <em>Real results.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map(([n, l], i) => (
            <Reveal key={l} delay={i * 100}>
              <div className="rounded-3xl bg-card p-10">
                <p className="text-gradient font-display text-6xl">{n}</p>
                <p className="mt-3 text-sm text-muted-foreground">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Placeholder figures — ZYNA customer metrics to be added once verified.</p>
      </div>
    </section>
  );
}

export function Comparison() {
  const rows: [string, string, string][] = [
    ["Booking channel", "Inside the chat customers already use", "External web portals or app downloads"],
    ["Customer questions", "Conversational answers, day and night", "Static FAQ pages or delayed staff replies"],
    ["No-show prevention", "Two-way reminders with easy rescheduling", "One-way SMS or email notifications"],
    ["Team visibility", "One inbox with human takeover", "Messages spread across phones"],
    ["Calendar", "Bookings kept in sync (integrations TBC)", "Manual entry or separate tools"],
  ];
  return (
    <section id="compare" className="scroll-mt-24 bg-cream py-28">
      <div className={cn(wrap, "max-w-[1120px]")}>
        <Reveal className="text-center">
          <Eyebrow>Comparison</Eyebrow>
          <h2 className="mt-4 text-4xl sm:text-5xl">Why businesses switch <em>to ZYNA</em></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">How an AI receptionist compares with traditional booking apps.</p>
        </Reveal>
        <Reveal className="mt-14">
          <div className="overflow-x-auto rounded-3xl border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-sand text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="p-6 font-semibold text-muted-foreground">Feature</th>
                  <th className="p-6 font-semibold text-primary">ZYNA AI receptionist</th>
                  <th className="p-6 font-semibold text-muted-foreground">Traditional booking apps</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([f, z, o]) => (
                  <tr key={f} className="border-t transition hover:bg-cream">
                    <th scope="row" className="p-6 font-display text-lg font-normal">{f}</th>
                    <td className="p-6"><Check size={14} className="mr-2 inline text-primary" />{z}</td>
                    <td className="p-6 text-muted-foreground">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    { name: "Starter", sub: "For single-location businesses", feats: [["AI messaging & booking", 1], ["Unified inbox", 1], ["Appointment reminders", 1], ["Analytics", 1], ["Waitlist automation", 0], ["Email support", 1]] },
    { name: "Growth", sub: "For growing or multi-location teams", pop: true, feats: [["Everything in Starter", 1], ["Waitlist automation", 1], ["More reminders & workflows", 1], ["Advanced analytics", 1], ["Multiple locations", 1], ["Priority support", 1]] },
  ];
  return (
    <section id="pricing" className="scroll-mt-24 bg-sand py-28">
      <div className={cn(wrap, "max-w-[900px] text-center")}>
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 text-4xl sm:text-5xl">Simple pricing. <em>No surprises.</em></h2>
          <p className="mt-4 text-lg text-muted-foreground">Final plans and prices to be announced.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 text-left md:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={cn("relative h-full rounded-3xl bg-card p-8 transition hover:-translate-y-1", p.pop ? "border-2 border-primary shadow-soft" : "border")}>
                {p.pop && <span className="absolute -top-3 right-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most popular</span>}
                <p className="text-sm font-semibold uppercase tracking-widest">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.sub}</p>
                <p className="mt-5 font-display text-5xl">$[TBD]<span className="font-sans text-base text-muted-foreground">/mo</span></p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.feats.map(([f, ok]) => (
                    <li key={f as string} className={cn("flex gap-3", !ok && "text-muted-foreground/60")}>
                      {ok ? <Check size={16} className="text-primary" /> : <Minus size={16} />}{f}
                    </li>
                  ))}
                </ul>
                <a href={START_URL} className={cn(p.pop ? btn.primary : btn.outline, "mt-8 w-full")}>Get started</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs: { g: string; q: [string, string][] }[] = [
  { g: "Channels", q: [
    ["Which messaging channels does ZYNA work with?", "ZYNA is designed to work inside the messaging apps your customers already use. The supported channel list is being finalised — contact us to confirm yours."],
    ["How are rescheduling and cancellations handled?", "Customers reply in the same conversation. ZYNA checks availability, frees the original slot and updates the booking."],
  ]},
  { g: "General & setup", q: [
    ["Do customers need to download an app?", "No. Customers simply send a message — no app, account or password needed."],
    ["How long does setup take?", "You add your services, staff and opening hours, then connect your channel. Exact setup times will be confirmed during onboarding."],
  ]},
  { g: "Integrations", q: [
    ["Does ZYNA sync with my calendar?", "Calendar integrations are planned. The list of supported calendars and booking systems is to be confirmed."],
    ["Can ZYNA handle multiple staff and locations?", "ZYNA is designed to assign bookings to the right staff member. Location limits per plan will be announced with pricing."],
  ]},
  { g: "Pricing & support", q: [
    ["How much does ZYNA cost?", "Pricing hasn't been announced yet. Get in touch and we'll share details as soon as they're available."],
    ["What if a customer asks something ZYNA can't answer?", "The conversation is flagged in your dashboard so your team can take over. A human always has the final word."],
  ]},
];

export function Faq() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.q[0]?.[0] ?? null);
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-28">
      <div className={cn(wrap, "grid gap-14 lg:grid-cols-[1fr_0.9fr]")}>
        <div>
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl">Questions business owners <em>ask us.</em></h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {faqs.map((g) => (
              <div key={g.g}>
                <h3 className="mb-3 text-xl text-primary">{g.g}</h3>
                <div className="space-y-3">
                  {g.q.map(([q, a]) => {
                    const isOpen = open === q;
                    const id = q.replace(/\W+/g, "-");
                    return (
                      <div key={q} className={cn("rounded-2xl border bg-card transition", isOpen && "border-primary/40 shadow-soft")}>
                        <button aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : q)} className="flex w-full items-center justify-between gap-4 p-6 text-left font-display text-lg">
                          {q}
                          <ChevronDown size={18} className={cn("shrink-0 transition-transform", isOpen && "rotate-180")} />
                        </button>
                        <div id={id} role="region" className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                          <p className="overflow-hidden px-6 text-sm leading-relaxed text-muted-foreground">
                            <span className="block pb-6">{a}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-tint-butter" />
            <div className="relative rounded-3xl border-4 border-ink bg-card p-6 shadow-[12px_12px_0_var(--ink)]">
              <p className="font-semibold">AI Analytics</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[["Conversations", "128"], ["Resolved by ZYNA", "—"], ["Handed to team", "—"], ["After-hours", "41"]].map(([a, b]) => (
                  <div key={a} className="rounded-xl border p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{a}</p><p className="mt-2 text-2xl font-semibold">{b}</p></div>
                ))}
              </div>
              <div className="mt-4 space-y-3 rounded-xl border p-4">
                {[["Booking", "80%"], ["Pricing", "55%"], ["Reschedule", "35%"]].map(([a, w]) => (
                  <div key={a}><p className="text-xs">{a}</p><div className="mt-1 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-gradient-brand" style={{ width: w }} /></div></div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">Sample data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-cream py-32 text-center">
      <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-tint-peach blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-tint-violet blur-3xl" />
      <Reveal className={cn(wrap, "relative max-w-[820px]")}>
        <h2 className="text-5xl leading-[1.05] sm:text-7xl">Your next booking could come in <em className="text-gradient">tonight.</em></h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">Book a short demo and we'll show you how ZYNA would work for your business.</p>
        <a href={DEMO_URL} className={cn(btn.dark, "mt-8 px-8 py-4 text-base")}>Book a demo →</a>
      </Reveal>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  const input = "w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  return (
    <section id="contact" className="scroll-mt-24 bg-sand py-28">
      <div className={cn(wrap, "max-w-[640px]")}>
        <Reveal className="text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mt-4 text-4xl sm:text-5xl">Let's set up <em>your demo</em></h2>
          <p className="mt-4 text-muted-foreground">Tell us a little about your business.</p>
        </Reveal>
        <Reveal className="mt-10">
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-card p-8">
            <label className="block text-sm font-medium">Name<input required name="name" className={cn(input, "mt-1.5")} /></label>
            <label className="block text-sm font-medium">Email<input required type="email" name="email" className={cn(input, "mt-1.5")} /></label>
            <label className="block text-sm font-medium">Message<textarea name="message" rows={4} className={cn(input, "mt-1.5")} /></label>
            <button type="submit" className={cn(btn.primary, "w-full")}>Send message</button>
            {sent && (
              <p role="status" className="animate-pop rounded-xl bg-tint-butter p-3 text-center text-sm">
                Thanks! This form isn't connected yet, so your message wasn't sent. Contact details coming soon.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-background py-14">
      <div className={cn(wrap, "grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]")}>
        <div>
          <Logo className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">The AI receptionist for businesses that run on appointments.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Product</p>
          {nav.slice(0, 4).map(([l, id]) => <a key={id} href={`/#${id}`} className="block py-1 text-sm text-muted-foreground hover:text-primary">{l}</a>)}
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Company</p>
          <a href="/blog" className="block py-1 text-sm text-muted-foreground hover:text-primary">Blog</a>
          <a href="/#faq" className="block py-1 text-sm text-muted-foreground hover:text-primary">FAQ</a>
          <a href="/#contact" className="block py-1 text-sm text-muted-foreground hover:text-primary">Contact</a>
          <p className="py-1 text-sm text-muted-foreground">[email address TBC]</p>
        </div>
      </div>
      <p className={cn(wrap, "mt-10 text-xs text-muted-foreground")}>© {new Date().getFullYear()} ZYNA. All rights reserved.</p>
    </footer>
  );
}
