import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Eyebrow, Logo, Reveal, btn } from "./ui";
import { cn } from "@/lib/utils";

const wrap = "mx-auto w-full max-w-[1280px] px-5 sm:px-6";

export const posts = [
  {
    to: "/blog/salon-no-shows",
    title: "3 quick ways UAE salons can cut no-shows",
    excerpt: "Empty chairs cost more than you think. Three simple habits that keep your calendar full.",
    date: "2026-11-02",
    readTime: "1 min read",
    tag: "Salons · Tips",
  },
  {
    to: "/blog/uae-salons-guide",
    title: "Running a salon in the UAE: how to win more bookings in 2026",
    excerpt:
      "WhatsApp-first clients, late-night enquiries, Ramadan and wedding-season peaks — a practical guide to what makes UAE salons different, and how to turn more messages into appointments.",
    date: "2026-11-01",
    readTime: "8 min read",
    tag: "Salons · UAE",
  },
] as const;

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogHeader() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <nav aria-label="Main" className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border bg-card/85 py-2 pl-5 pr-2 shadow-soft backdrop-blur-md">
        <Link to="/" aria-label="ZYNA home" className="shrink-0">
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/blog" className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition hover:text-primary">
            Blog
          </Link>
          <a href="/#contact" className={cn(btn.primary, "px-5 py-2.5")}>
            Book a demo
          </a>
        </div>
      </nav>
    </header>
  );
}

export function BlogIndex() {
  return (
    <section className="relative overflow-hidden bg-cream pb-24 pt-36">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-tint-violet blur-3xl" />
      <div className={cn(wrap, "relative max-w-[900px]")}>
        <Reveal>
          <Eyebrow>The ZYNA blog</Eyebrow>
          <h1 className="mt-4 text-5xl font-light leading-[1.05] sm:text-6xl">
            Ideas for businesses that run on <em className="text-gradient font-normal">appointments.</em>
          </h1>
        </Reveal>
        <div className="mt-14 space-y-6">
          {posts.map((p) => (
            <Reveal key={p.to}>
              <Link
                to={p.to}
                className="block rounded-3xl border bg-card p-8 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{p.tag}</p>
                <h2 className="mt-3 text-3xl leading-tight">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <p className="mt-5 text-sm text-muted-foreground">
                  {formatDate(p.date)} · {p.readTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 text-3xl leading-tight sm:text-4xl">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-lg leading-relaxed text-foreground/85">{children}</p>;
}

function Tip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-3xl bg-tint-violet p-7">
      <p className="font-display text-xl">{title}</p>
      <div className="mt-2 leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

export function NoShowsArticle() {
  const post = posts[0];
  return (
    <article>
      <header className="relative overflow-hidden bg-cream pb-16 pt-36">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-tint-peach blur-3xl" />
        <div className={cn(wrap, "relative max-w-[780px]")}>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
            ← All articles
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.tag}</p>
          <h1 className="mt-4 text-4xl font-light leading-[1.08] sm:text-6xl">
            3 quick ways UAE salons can cut <em className="text-gradient font-normal">no-shows</em>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </header>

      <div className={cn(wrap, "max-w-[780px] pb-24 pt-6")}>
        <P>
          An empty chair is revenue you never get back. Send a WhatsApp reminder the day before every appointment.
          Let clients reschedule with a single reply instead of a call. Keep a waitlist so a cancelled slot is
          offered to someone else within minutes. ZYNA does all three for you, day and night.
        </P>
        <a href="/#contact" className={cn(btn.primary, "mt-10")}>
          Book a demo →
        </a>
      </div>
    </article>
  );
}

export function UaeSalonsArticle() {
  const post = posts[1];
  return (
    <article>
      <header className="relative overflow-hidden bg-cream pb-16 pt-36">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-tint-peach blur-3xl" />
        <div className={cn(wrap, "relative max-w-[780px]")}>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
            ← All articles
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.tag}</p>
          <h1 className="mt-4 text-4xl font-light leading-[1.08] sm:text-6xl">
            Running a salon in the UAE: how to win <em className="text-gradient font-normal">more bookings</em>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </header>

      <div className={cn(wrap, "max-w-[780px] pb-24 pt-6")}>
        <P>
          From the ladies' salons of Al Barsha and Khalidiya to the barbershops of Deira, Sharjah and Al Ain, the
          UAE has one of the most competitive beauty and grooming scenes in the region. Clients have plenty of
          choice — which means the salon that answers first, books smoothly and remembers its regulars is usually
          the one that wins. Here's what makes salons in the Emirates different, and what the busiest ones do well.
        </P>

        <H2>1. Your clients book on WhatsApp — not on your website</H2>
        <P>
          In the UAE, WhatsApp is the default way to talk to a business. Most clients would rather send a quick
          "Hi, any slot for gel nails tomorrow evening?" than fill in a form or call. Instagram DMs come a close
          second, especially for younger clients who discover you through your reels.
        </P>
        <P>
          That convenience cuts both ways. A message feels instant to the client, so they expect an instant reply.
          If they don't hear back, they simply message the next salon on their list.
        </P>
        <Tip title="Quick win">
          Put a WhatsApp click-to-chat link in your Instagram bio, Google Business Profile and on your shopfront.
          Then make sure someone — or something — is actually answering it.
        </Tip>

        <H2>2. Demand peaks when your team has gone home</H2>
        <P>
          UAE life runs late. Clients finish work, beat the traffic, have dinner and then plan tomorrow — which
          means a lot of booking enquiries arrive between 9pm and midnight. Early-morning messages before the
          school run are common too. Your stylists are rightly off the clock, but those messages are still sitting
          there, getting colder by the hour.
        </P>
        <P>
          The salons that grow fastest treat after-hours messages as their busiest "shift", not an afterthought.
        </P>

        <H2>3. Plan for the UAE's seasonal rhythm</H2>
        <P>Salon demand in the Emirates follows a calendar of its own:</P>
        <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
          <li>
            <strong>Ramadan</strong> shifts opening hours and pushes demand into the evenings, with a strong rush
            in the final days before Eid.
          </li>
          <li>
            <strong>Eid al-Fitr and Eid al-Adha</strong> bring some of the busiest days of the year — hair, henna,
            nails and grooming appointments fill up fast.
          </li>
          <li>
            <strong>Wedding season</strong> (roughly the cooler months, October to April) drives bridal packages,
            trials and group bookings for families and bridal parties.
          </li>
          <li>
            <strong>Summer</strong> is quieter as many residents travel, making it the right time for promotions,
            loyalty offers and staff training.
          </li>
          <li>
            <strong>National Day, Diwali, Christmas and New Year</strong> each create their own pre-event rush
            across the UAE's diverse communities.
          </li>
        </ul>
        <Tip title="Quick win">
          Open your Eid and bridal calendars early and message your regulars first. Fully booked salons are
          usually the ones that asked weeks ahead.
        </Tip>

        <H2>4. Speak your clients' language</H2>
        <P>
          Few markets are as multicultural as the UAE. On any given day a salon might hear from Emirati, Arab,
          South Asian, Filipino, European and Russian-speaking clients. Replying in Arabic or English is the
          baseline; being able to respond comfortably in a client's own language builds trust immediately and
          makes them far more likely to book.
        </P>
        <P>
          Cultural details matter too: clear options for female-only services and staff, privacy for ladies'
          salons, and respectful communication around religious holidays all shape how clients feel about you.
        </P>

        <H2>5. No-shows are a silent revenue leak</H2>
        <P>
          A missed 90-minute colour appointment is an empty chair you can't resell. Most no-shows aren't
          malicious — clients simply forget, get stuck in traffic or double-book. A friendly reminder the day
          before, plus an easy way to reschedule, recovers a surprising number of these slots.
        </P>
        <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
          <li>Send a reminder 24 hours before, and a short one on the morning of the appointment.</li>
          <li>Make rescheduling a one-message reply, not a phone call.</li>
          <li>For long or high-value services, consider a small deposit — clearly explained up front.</li>
          <li>Keep a waitlist so cancelled slots can be offered to someone else straight away.</li>
        </ul>

        <H2>6. Reviews and Google Maps decide who gets found</H2>
        <P>
          When someone searches "salon near me" in Dubai Marina or Abu Dhabi's Corniche, your Google Business
          Profile is your shop window. Keep your hours accurate (especially during Ramadan), add fresh photos of
          your work, and ask happy clients for a review right after their appointment — while they're still
          admiring their new look.
        </P>

        <H2>7. Keep your licences and hygiene standards visible</H2>
        <P>
          Salons in the UAE operate under licensing and health-and-safety requirements set by each emirate's
          economic department and municipality. Requirements change, so check the current rules with the relevant
          authority where you operate. Clients notice clean stations, sterilised tools and clear pricing —
          and they mention it in reviews.
        </P>

        <H2>Where an AI receptionist fits in</H2>
        <P>
          Most of the habits above come down to one thing: replying quickly and consistently, at any hour. That's
          exactly what ZYNA is built for. She answers client messages around the clock, books and reschedules
          appointments straight into your calendar, and sends reminders — so the 11pm "any slot tomorrow?" becomes
          a confirmed booking instead of a lost one.
        </P>
        <P>Your team gets to focus on clients in the chair. ZYNA looks after the ones still in the inbox.</P>

        <div className="mt-16 rounded-3xl bg-ink p-10 text-center text-ink-foreground">
          <h2 className="text-3xl leading-tight sm:text-4xl">
            Ready to stop missing <em className="text-gradient">late-night bookings?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-foreground/75">
            Book a short demo and we'll show you how ZYNA would work for your salon.
          </p>
          <a href="/#contact" className={cn(btn.primary, "mt-8 px-8 py-4 text-base")}>
            Book a demo →
          </a>
        </div>
      </div>
    </article>
  );
}
