import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const DEMO_URL = "#contact";
export const START_URL = "#contact";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        const e = es[0];
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold uppercase tracking-[0.3em] text-primary", className)}>{children}</p>;
}

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/zyna-logo.png"
      alt="ZYNA — AI that works for you"
      className={cn("select-none", className)}
      width={1207}
      height={294}
    />
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  dark:
    "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ink-foreground transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground hover:text-background",
};

export function Bubble({ out, children, time, className }: { out?: boolean; children: ReactNode; time?: string; className?: string }) {
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-snug shadow-sm",
          out ? "bg-bubble-out text-foreground" : "bg-card text-foreground",
        )}
      >
        {children}
        {time && <div className="mt-1 text-right text-[10px] text-muted-foreground">{time}</div>}
      </div>
    </div>
  );
}
