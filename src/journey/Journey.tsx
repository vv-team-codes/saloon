import { useEffect, useRef, type ReactNode } from 'react'
import { IconArrowRight } from '../components/ui/icons'
import Contact from '../components/Contact'

/**
 * The ZYNA journey — an interactive architectural film controlled by scrolling.
 * The film opens OUTSIDE the ZYNA office — a photorealistic AI-generated
 * exterior of the building, its fascia carrying the official ZYNA logo
 * composited unmodified as the building's sign — then moves
 * inside: the brand's own reception photograph carries the welcome scene;
 * the remaining scenes are real photographs (a client
 * messaging, salon reception, stylist and client, salon interiors and
 * the Dubai skyline) from Pexels — free commercial
 * use under the Pexels License; sources in public/images/scenes/CREDITS.md.
 * One continuous camera: every scene pushes in while the next is revealed,
 * including a zoom-through-the-entrance transition into the reception.
 * All motion is computed in a rAF loop from scroll progress — no re-renders.
 * The film has nine scenes: the eight photographs, then — as the final
 * scene inside the sticky stage itself — the enquiry form card, arriving
 * over a dimmed, blurred continuation of the Dubai skyline frame.
 */

const N = 9

type SceneDef = {
  img: string
  alt: string
  objectPosition: string
  origin: string
  scaleFrom: number
  scaleTo: number
}

const SCENE_IMGS: SceneDef[] = [
  { img: 'images/scenes/photo-office-exterior.jpg', alt: 'The ZYNA office building in Dubai, seen from outside', objectPosition: '50% 72%', origin: '50% 34%', scaleFrom: 1.0, scaleTo: 1.15 },
  { img: 'images/scenes/scene-2-reception.jpg', alt: 'The ZYNA reception', objectPosition: '50% 45%', origin: '50% 50%', scaleFrom: 1.22, scaleTo: 1.36 },
  { img: 'images/scenes/photo-chat-typing.jpg', alt: 'A client messaging the salon from her phone', objectPosition: '50% 50%', origin: '58% 48%', scaleFrom: 1.14, scaleTo: 1.32 },
  { img: 'images/scenes/photo-salon-reception.jpg', alt: 'A salon reception desk', objectPosition: '50% 40%', origin: '66% 45%', scaleFrom: 1.14, scaleTo: 1.32 },
  { img: 'images/scenes/photo-stylist-client.jpg', alt: 'A stylist at work with a client in a premium salon', objectPosition: '38% 50%', origin: '34% 48%', scaleFrom: 1.12, scaleTo: 1.3 },
  { img: 'images/scenes/photo-salon-wide.jpg', alt: 'A wide, elegant salon interior — every step connected', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.08, scaleTo: 1.22 },
  { img: 'images/scenes/photo-salon-luxury.jpg', alt: 'A luxury salon interior', objectPosition: '45% 50%', origin: '50% 50%', scaleFrom: 1.18, scaleTo: 1.03 },
  { img: 'images/scenes/photo-dubai-skyline.jpg', alt: 'The Dubai skyline and Burj Khalifa across the water', objectPosition: '50% 45%', origin: '50% 50%', scaleFrom: 1.1, scaleTo: 1.24 },
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

type TextDef = { from: number; to: number; content: ReactNode; interactive?: boolean; center?: boolean; lift?: boolean }
const slot = (i: number, f: number) => (i + f) / N

const TEXTS: TextDef[] = [
  {
    from: 0,
    to: slot(0, 0.88),
    lift: true,
    content: (
      <>
        <Eyebrow>ZYNA · United Arab Emirates</Eyebrow>
        <Headline>
          THE SMARTER WAY TO <span className="text-white">RUN YOUR SALON.</span>
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
          EVERY CONVERSATION <span className="text-white">MATTERS.</span>
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
          LESS COMPLEXITY. <span className="text-white">MORE CLARITY.</span>
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
          BUILT AROUND BETTER <span className="text-white">CLIENT EXPERIENCES.</span>
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
          EVERY STEP, <span className="text-white">CONNECTED.</span>
        </Headline>
        <Support>Enquiry → Booking → Service → Repeat Client — one smooth path, guided by ZYNA.</Support>
      </>
    ),
  },
  {
    from: slot(6, 0.08),
    to: slot(6, 0.92),
    interactive: true,
    center: true,
    content: (
      <>
        <Headline>
          READY TO TRANSFORM <span className="text-white">YOUR SALON?</span>
        </Headline>
        <Support>
          Create better client experiences. Build a smoother business. Grow with confidence.
        </Support>
        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#form"
            onClick={(e) => {
              e.preventDefault()
              scrollToFormScene()
            }}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-9 py-4 text-[15px] font-bold tracking-wide text-navy-950 transition-all duration-300 hover:shadow-[0_22px_44px_-12px_rgba(201,162,75,0.8)] sm:w-auto"
          >
            GET STARTED
          </a>
          <a
            href="#form"
            onClick={(e) => {
              e.preventDefault()
              scrollToFormScene()
            }}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/5 px-9 py-4 text-[15px] font-semibold tracking-wide text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            TALK TO OUR TEAM
          </a>
        </div>
      </>
    ),
  },
  {
    from: slot(7, 0.1),
    to: slot(7, 0.9),
    interactive: true,
    center: true,
    content: (
      <>
        <Eyebrow>Never miss a booking again</Eyebrow>
        <Headline>
          Every conversation <span className="text-white">matters.</span>
        </Headline>
        <Support>
          Your next client could message tonight at midnight. Make sure someone brilliant
          is there to answer. Start with ZYNA — and let every conversation turn into an
          opportunity.
        </Support>
        <div className="mt-9">
          <a
            href="#form"
            onClick={(e) => {
              e.preventDefault()
              scrollToFormScene()
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-[15px] font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_20px_44px_-12px_rgba(201,162,75,0.8)]"
          >
            Talk to Us
            <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </>
    ),
  },
]

export function scrollToJourneyFraction(frac: number) {
  const el = document.getElementById('journey')
  if (!el) return
  // Fractions address the camera track: progress 0 is the track top (film
  // start) and progress 1 is the track end (final scene fully arrived).
  const track = el.querySelector<HTMLElement>('[data-journey-track]') ?? el
  const top = track.getBoundingClientRect().top + window.scrollY
  const range = track.offsetHeight - window.innerHeight
  window.scrollTo({ top: top + frac * range, behavior: 'smooth' })
}

/**
 * The form is the film's final scene (slot 8 of 9). Its entrance completes
 * at slot(8, 0.55) = 0.95 of track progress; 0.97 lands just past that —
 * the form fully opaque, entrance transform removed, pinned and usable,
 * with a little scroll room still in hand before the stage releases.
 */
export const FORM_FRACTION = 0.97

export function scrollToFormScene() {
  scrollToJourneyFraction(FORM_FRACTION)
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const bloomRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const formLayerRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    let raf = 0
    let current = 0

    const frame = () => {
      raf = requestAnimationFrame(frame)
      // Progress is measured over the camera track alone: p = 0 at the
      // film's first frame, p = 1 at the end of the final (form) scene.
      const rect = track.getBoundingClientRect()
      const range = track.offsetHeight - window.innerHeight
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

      // The final scene (index 8): the enquiry form. It fades in across the
      // first half of its slot as the Dubai photograph hands over (that
      // layer's own fade-out ends at slot(8, 0.04)), and then holds — no
      // fade-out — pinned for the rest of the track. It accepts pointer
      // events only once it has essentially arrived, so a half-faded card
      // can never swallow clicks meant for the CTA scene beneath it.
      if (formLayerRef.current) {
        const layer = formLayerRef.current
        const k = sstep(slot(8, 0), slot(8, 0.55), p)
        layer.style.opacity = k.toFixed(3)
        layer.style.visibility = k <= 0.01 ? 'hidden' : 'visible'
        layer.style.pointerEvents = k >= 0.85 ? 'auto' : 'none'
        const card = formCardRef.current
        if (card) {
          // The entrance transform is removed outright once the scene has
          // arrived (k = 1), so while pinned there is no transform on the
          // card at all — text stays crisp and input focus behaves.
          card.style.transform =
            k >= 1
              ? 'none'
              : `scale(${lerp(0.94, 1, k).toFixed(4)}) translateY(${((1 - k) * 26).toFixed(1)}px)`
        }
      }

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
    <section id="journey" ref={sectionRef} className="relative bg-navy-950">
      {/* The camera track: 1350vh of scroll travel driving the film (9 scenes
          at ~150vh each — eight photographs plus the enquiry form as the
          final scene). The sticky stage lives inside it and releases when
          the track ends. */}
      <div ref={trackRef} data-journey-track className="relative" style={{ height: '1350vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-navy-950">
        {SCENE_IMGS.map((s, i) => (
          <div
            key={`${s.img}-${i}`}
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
              t.center ? 'top-1/2 -translate-y-1/2' : t.lift ? 'bottom-0 pb-36 sm:pb-40' : 'bottom-0 pb-24 sm:pb-28'
            }`}
            style={{ visibility: 'hidden' }}
          >
            {/* localized readability scrim: a soft dark cloud behind the text block only,
                so bright scene areas (glass facades, lit interiors) never wash out the words.
                Fades to transparent at its edges — the rest of the scene stays untouched. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[165%] w-[min(94vw,62rem)] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(5,8,28,0.62) 0%, rgba(5,8,28,0.44) 52%, rgba(5,8,28,0) 76%)',
              }}
            />
            <div className="relative mx-auto max-w-3xl [text-shadow:0_2px_34px_rgba(5,8,28,0.65),0_1px_10px_rgba(5,8,28,0.6)]">
              {t.content}
            </div>
          </div>
        ))}

        {/* The film's final scene: the enquiry form, inside the stage. The
            backdrop is the Dubai frame again — dimmed and blurred — so the
            card arrives as part of the film, not as a page section after it.
            The layer is pointer-events:none until the rAF loop judges the
            scene arrived; its own scroll well (overflow-y-auto) exists only
            so the card stays reachable on short viewports. */}
        <div
          id="contact"
          ref={formLayerRef}
          className="absolute inset-0 z-[10]"
          style={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <img
            src="images/scenes/photo-dubai-skyline.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: '50% 45%',
              filter: 'blur(7px) brightness(0.5) saturate(1.05)',
              transform: 'scale(1.08)',
            }}
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-navy-950/40" />
          <div aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_180px_rgba(5,8,28,0.55)]" />
          <div className="absolute inset-0 overflow-y-auto">
            <div className="flex min-h-full px-5 py-20 sm:px-8">
              <div ref={formCardRef} className="m-auto w-[min(92vw,36rem)] max-w-xl will-change-transform">
                <Contact />
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div ref={hintRef} className="pointer-events-none absolute bottom-7 left-1/2 z-[10] -translate-x-1/2 text-center transition-opacity duration-500">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/75 [text-shadow:0_1px_12px_rgba(5,8,28,0.8)]">Scroll to enter</p>
          <div className="mx-auto mt-3 h-10 w-6 rounded-full border border-white/40 p-1.5">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gold-300" />
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-[10] hidden h-44 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20 sm:block">
          <div ref={railRef} className="h-full w-full origin-top bg-gradient-to-b from-gold-300 to-gold-600" style={{ transform: 'scaleY(0)' }} />
        </div>
        </div>
      </div>

      {/* Nothing follows the stage inside this section: the film's final
          scene IS the enquiry form (inside the sticky stage above), and the
          page footer comes next. */}
    </section>
  )
}
