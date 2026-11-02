import { useEffect, useRef, type ReactNode } from 'react'
import Logo from '../components/ui/Logo'

/**
 * The ZYNA journey — an interactive architectural film controlled by scrolling.
 * Built from the brand's own visual assets (the ZYNA headquarters, reception,
 * conversation space, operations space, salon, client-journey wall and rooftop).
 * One continuous camera: every scene pushes in while the next is revealed,
 * including a zoom-through-the-entrance transition from exterior to reception.
 * All motion is computed in a rAF loop from scroll progress — no re-renders.
 */

const N = 7

type SceneDef = {
  img: string
  alt: string
  objectPosition: string
  origin: string
  scaleFrom: number
  scaleTo: number
}

const SCENE_IMGS: SceneDef[] = [
  { img: 'images/scenes/scene-1-exterior.jpg', alt: 'The ZYNA headquarters in the UAE at dusk', objectPosition: '50% 62%', origin: '47% 63%', scaleFrom: 1.06, scaleTo: 2.05 },
  { img: 'images/scenes/scene-2-reception.jpg', alt: 'The ZYNA reception', objectPosition: '50% 45%', origin: '50% 50%', scaleFrom: 1.22, scaleTo: 1.36 },
  { img: 'images/scenes/scene-3-conversation.jpg', alt: 'The ZYNA conversation space', objectPosition: '50% 50%', origin: '58% 48%', scaleFrom: 1.14, scaleTo: 1.32 },
  { img: 'images/scenes/scene-4-operations.jpg', alt: 'The ZYNA operations space', objectPosition: '50% 40%', origin: '66% 45%', scaleFrom: 1.14, scaleTo: 1.32 },
  { img: 'images/scenes/scene-5-salon.jpg', alt: 'A premium salon powered by ZYNA', objectPosition: '38% 50%', origin: '34% 48%', scaleFrom: 1.12, scaleTo: 1.3 },
  { img: 'images/scenes/scene-6-journey.jpg', alt: 'The client journey — enquiry, booking, service, repeat client', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.08, scaleTo: 1.22 },
  { img: 'images/scenes/scene-7-rooftop.jpg', alt: 'The ZYNA rooftop overlooking the Dubai skyline', objectPosition: '45% 50%', origin: '50% 50%', scaleFrom: 1.18, scaleTo: 1.03 },
]

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const sstep = (a: number, b: number, x: number) => {
  const k = clamp01((x - a) / (b - a))
  return k * k * (3 - 2 * k)
}
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11.5px] font-bold uppercase tracking-[0.32em] text-gold-300">{children}</p>
}
function Headline({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display mt-4 text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
      {children}
    </h2>
  )
}
function Support({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/75 sm:text-[17px]">{children}</p>
}

type TextDef = { from: number; to: number; content: ReactNode; interactive?: boolean; center?: boolean }
const slot = (i: number, f: number) => (i + f) / N

const TEXTS: TextDef[] = [
  {
    from: 0,
    to: slot(0, 0.88),
    content: (
      <>
        <Eyebrow>ZYNA · United Arab Emirates</Eyebrow>
        <Headline>
          THE SMARTER WAY TO <span className="text-gold-grad">RUN YOUR SALON.</span>
        </Headline>
        <Support>
          ZYNA helps salons create better client conversations, manage enquiries, and build
          smoother business experiences.
        </Support>
      </>
    ),
  },
  {
    from: slot(1, 0.1),
    to: slot(1, 0.88),
    content: (
      <>
        <Eyebrow>ZYNA Headquarters</Eyebrow>
        <Headline>WELCOME TO ZYNA.</Headline>
        <Support>
          <span className="font-semibold tracking-[0.18em] text-white">BUILT FOR MODERN SALONS.</span>
        </Support>
      </>
    ),
  },
  {
    from: slot(2, 0.1),
    to: slot(2, 0.9),
    content: (
      <>
        <Eyebrow>The Conversation Space</Eyebrow>
        <Headline>
          EVERY CONVERSATION <span className="text-gold-grad">MATTERS.</span>
        </Headline>
        <Support>Turn salon enquiries into meaningful client relationships and opportunities.</Support>
      </>
    ),
  },
  {
    from: slot(3, 0.1),
    to: slot(3, 0.9),
    content: (
      <>
        <Eyebrow>The Operations Space</Eyebrow>
        <Headline>
          LESS COMPLEXITY. <span className="text-gold-grad">MORE CLARITY.</span>
        </Headline>
        <Support>Spend less time managing the details and more time focusing on your clients.</Support>
      </>
    ),
  },
  {
    from: slot(4, 0.1),
    to: slot(4, 0.9),
    content: (
      <>
        <Eyebrow>The Premium Salon</Eyebrow>
        <Headline>
          BUILT AROUND BETTER <span className="text-gold-grad">CLIENT EXPERIENCES.</span>
        </Headline>
        <Support>Create a smoother journey from the first enquiry to every salon visit.</Support>
      </>
    ),
  },
  {
    from: slot(5, 0.1),
    to: slot(5, 0.9),
    content: (
      <>
        <Eyebrow>The Client Journey</Eyebrow>
        <Headline>
          EVERY STEP, <span className="text-gold-grad">CONNECTED.</span>
        </Headline>
        <Support>Enquiry → Booking → Service → Repeat Client — one smooth path, guided by ZYNA.</Support>
      </>
    ),
  },
  {
    from: slot(6, 0.08),
    to: 1.01,
    interactive: true,
    center: true,
    content: (
      <>
        <div className="mx-auto w-fit rounded-3xl bg-white px-5 py-3 shadow-2xl">
          <Logo className="h-10" />
        </div>
        <Headline>
          READY TO TRANSFORM <span className="text-gold-grad">YOUR SALON?</span>
        </Headline>
        <Support>
          Create better client experiences. Build a smoother business. Grow with confidence.
        </Support>
        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-9 py-4 text-[15px] font-bold tracking-wide text-navy-950 transition-all duration-300 hover:shadow-[0_22px_44px_-12px_rgba(201,162,75,0.8)] sm:w-auto"
          >
            GET STARTED
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/5 px-9 py-4 text-[15px] font-semibold tracking-wide text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            TALK TO OUR TEAM
          </a>
        </div>
      </>
    ),
  },
]

export function scrollToJourneyFraction(frac: number) {
  const el = document.getElementById('journey')
  if (!el) return
  const top = el.offsetTop
  const range = el.offsetHeight - window.innerHeight
  window.scrollTo({ top: top + frac * range, behavior: 'smooth' })
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const bloomRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    let current = 0

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const rect = section.getBoundingClientRect()
      const range = section.offsetHeight - window.innerHeight
      const target = clamp01(-rect.top / Math.max(1, range))
      current += (target - current) * 0.06
      if (Math.abs(target - current) < 0.00005) current = target
      const p = current

      SCENE_IMGS.forEach((s, i) => {
        const layer = layerRefs.current[i]
        const img = imgRefs.current[i]
        if (!layer || !img) return
        const fadeIn = i === 0 ? 1 : sstep((i - 0.42) / N, (i + 0.04) / N, p)
        const fadeOut = i === N - 1 ? 1 : 1 - sstep((i + 0.58) / N, (i + 1.04) / N, p)
        const o = Math.min(fadeIn, fadeOut)
        layer.style.opacity = o.toFixed(3)
        layer.style.visibility = o <= 0.01 ? 'hidden' : 'visible'
        const life = clamp01((p - (i - 0.42) / N) / (1.46 / N))
        const eased = 1 - Math.pow(1 - life, 2)
        const scale = lerp(s.scaleFrom, s.scaleTo, eased)
        img.style.transform = `scale(${scale.toFixed(4)}) translateY(${((0.5 - life) * 10).toFixed(2)}px)`
      })

      TEXTS.forEach((t, i) => {
        const el = textRefs.current[i]
        if (!el) return
        const fadeIn = t.from === 0 ? 1 : sstep(t.from, t.from + 0.035, p)
        const fadeOut = t.to > 1 ? 1 : 1 - sstep(t.to - 0.035, t.to, p)
        const o = Math.min(fadeIn, fadeOut)
        el.style.opacity = o.toFixed(3)
        el.style.transform = `translateY(${(1 - o) * 22}px)`
        el.style.pointerEvents = t.interactive && o > 0.55 ? 'auto' : 'none'
        el.style.visibility = o <= 0.01 ? 'hidden' : 'visible'
      })

      // warm light bloom as the camera passes through the entrance glass
      if (bloomRef.current) {
        const doorP = 1 / N
        const bloom = Math.max(0, 1 - Math.abs(p - doorP) / 0.028)
        bloomRef.current.style.opacity = (bloom * 0.55).toFixed(3)
      }
      if (hintRef.current) hintRef.current.style.opacity = p < 0.02 ? '1' : '0'
      if (railRef.current) railRef.current.style.transform = `scaleY(${p})`
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="relative" style={{ height: '1050vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-navy-950">
        {SCENE_IMGS.map((s, i) => (
          <div
            key={s.img}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className="absolute inset-0"
            style={{ zIndex: i + 1, opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
          >
            <img
              ref={(el) => {
                imgRefs.current[i] = el
              }}
              src={s.img}
              alt={s.alt}
              className="h-full w-full object-cover will-change-transform"
              style={{ objectPosition: s.objectPosition, transformOrigin: s.origin }}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            {/* cinematic depth: top shade for the nav, bottom scrim for the story text */}
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-950/55 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-navy-950/78 via-navy-950/28 to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_180px_rgba(5,8,28,0.5)]" />
          </div>
        ))}

        {/* entrance light bloom */}
        <div
          ref={bloomRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[8] opacity-0"
          style={{ background: 'radial-gradient(60% 55% at 47% 60%, rgba(255,236,200,0.95), rgba(255,220,170,0.35) 55%, transparent 75%)' }}
        />

        {/* story texts */}
        {TEXTS.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el
            }}
            className={`absolute inset-x-0 z-[9] px-5 text-center opacity-0 sm:px-8 ${
              t.center ? 'top-1/2 -translate-y-1/2' : 'bottom-0 pb-24 sm:pb-28'
            }`}
            style={{ visibility: 'hidden' }}
          >
            <div className="mx-auto max-w-3xl [text-shadow:0_2px_34px_rgba(5,8,28,0.65)]">{t.content}</div>
          </div>
        ))}

        {/* scroll hint */}
        <div ref={hintRef} className="absolute bottom-7 left-1/2 z-[10] -translate-x-1/2 text-center transition-opacity duration-500">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/75">Scroll to enter</p>
          <div className="mx-auto mt-3 h-10 w-6 rounded-full border border-white/40 p-1.5">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gold-300" />
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute right-5 top-1/2 z-[10] hidden h-44 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20 sm:block">
          <div ref={railRef} className="h-full w-full origin-top bg-gradient-to-b from-gold-300 to-gold-600" style={{ transform: 'scaleY(0)' }} />
        </div>
      </div>
    </section>
  )
}
