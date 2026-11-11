import { useEffect, useRef, type ReactNode } from 'react'
import { IconArrowRight } from '../components/ui/icons'
import Contact from '../components/Contact'

/**
 * The ZYNA journey — an interactive architectural film controlled by scrolling.
 * Since v20 EVERY slide speaks the first slide's Clean Light Corporate
 * language: the scene photograph is composed (at build time, with PIL)
 * into a light #F7F8FA layout as a single rounded-corner card with a
 * soft shadow on one side — alternating left/right down the film — and
 * the story text sits in navy on the clean light panel beside it
 * (gold eyebrow, navy headline, slate support). The centred scenes
 * (the CTA, the skyline, the thank-you) carry a wide photo card across
 * the top with the centred text beneath it. No full-screen dark
 * photographs, no white text over photos, no dark scrims. Photographs
 * are real photographs from Pexels — free commercial use under the
 * Pexels License; the composed light layouts are logged in
 * public/images/scenes/CREDITS.md.
 * One continuous camera: every scene pushes in gently while the next
 * is revealed. All motion is computed in a rAF loop from scroll
 * progress — no re-renders.
 * The film has eleven scenes: the ten composed light layouts, with —
 * inside the sticky stage itself — the enquiry form card (scene 10)
 * arriving over a light, blurred salon backdrop, and finally the
 * thank-you layout (scene 11) that holds to the end of the track.
 * Scene order: light hero (salon card — the overlapping spa card was
 * removed at the owner's request, v21), ZYNA reception,
 * conversation, operations, the premium SALON (stylist & client), the
 * premium SPA (its own dedicated scene, added v17 so
 * spas get equal billing with salons — a plain light slide since v21,
 * its photograph removed at the owner's request), client journey (salon wide),
 * CTA (salon luxury), Dubai skyline, the enquiry form, and the
 * thank-you photograph.
 */

const N = 11

type SceneDef = {
  img: string
  /** 1080w variant served to viewports up to 768px via <picture>. */
  imgM: string
  alt: string
  objectPosition: string
  origin: string
  scaleFrom: number
  scaleTo: number
}

const SCENE_IMGS: SceneDef[] = [
  { img: 'images/scenes/photo-hero-light.jpg', imgM: 'images/scenes/m/photo-hero-light.jpg', alt: 'A premium salon interior', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-1.jpg', imgM: 'images/scenes/m/photo-light-1.jpg', alt: 'The ZYNA reception', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-2.jpg', imgM: 'images/scenes/m/photo-light-2.jpg', alt: 'A client messaging the salon or spa from her phone', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-3.jpg', imgM: 'images/scenes/m/photo-light-3.jpg', alt: 'A salon reception desk', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-4.jpg', imgM: 'images/scenes/m/photo-light-4.jpg', alt: 'A stylist at work with a client in a premium salon', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-5.jpg', imgM: 'images/scenes/m/photo-light-5.jpg', alt: 'The Premium Spa', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-6.jpg', imgM: 'images/scenes/m/photo-light-6.jpg', alt: 'A wide, elegant salon interior — every step connected', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-7.jpg', imgM: 'images/scenes/m/photo-light-7.jpg', alt: 'A luxury salon interior', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-8.jpg', imgM: 'images/scenes/m/photo-light-8.jpg', alt: 'The Dubai skyline and Burj Khalifa across the water', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
  { img: 'images/scenes/photo-light-10.jpg', imgM: 'images/scenes/m/photo-light-10.jpg', alt: 'Two happy clients sharing a joyful conversation in a warm, elegant salon', objectPosition: '50% 50%', origin: '50% 50%', scaleFrom: 1.0, scaleTo: 1.05 },
]

// Photo layers in slot order. Slot 9 is the enquiry form (a DOM layer, not
// a photograph), so the tenth photograph — the thank-you scene — is slot 10.
const PHOTO_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10]

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const sstep = (a: number, b: number, x: number) => {
  const k = clamp01((x - a) / (b - a))
  return k * k * (3 - 2 * k)
}
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11.5px] font-bold uppercase tracking-[0.32em] text-gold-600">{children}</p>
}
function Headline({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display mt-4 text-[34px] font-semibold leading-[1.12] tracking-tight text-navy-950 sm:text-[54px]">
      {children}
    </h2>
  )
}
function Support({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`${center ? 'mx-auto' : 'mx-auto sm:mx-0'} mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-600 sm:text-[17px]`}>
      {children}
    </p>
  )
}

type TextDef = {
  from: number
  to: number
  content: ReactNode
  interactive?: boolean
  /** Light layout variant (v20 — every slide is light now): which panel
   *  the navy text occupies from sm up. 'left'/'right' = the side panel
   *  beside the photo card, left-aligned; 'center' = centred in the
   *  light space beneath a wide top photo card. On phones every block
   *  centres over the light space below the card. Light texts never
   *  carry the dark readability scrim. */
  light?: 'left' | 'right' | 'center'
}
const slot = (i: number, f: number) => (i + f) / N

const TEXTS: TextDef[] = [
  {
    from: 0,
    to: slot(0, 0.88),
    light: 'left',
    content: (
      <>
        <p className="text-[11.5px] font-bold uppercase tracking-[0.32em] text-gold-600">
          The 24/7 AI receptionist for salons &amp; spas
        </p>
        <h2 className="font-display mt-4 text-[34px] font-semibold leading-[1.12] tracking-tight text-navy-950 sm:text-[54px]">
          The smarter way to run your salon &amp; spa.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-slate-600 sm:mx-0 sm:text-[17px]">
          ZYNA answers every enquiry, manages bookings and sends reminders — day and night,
          for salons and spas across the UAE.
        </p>
        <p className="mt-7 text-[11.5px] font-bold uppercase tracking-[0.24em] text-slate-500">
          For Salons <span className="mx-1.5 text-gold-600">·</span> For Spas
        </p>
      </>
    ),
  },
  {
    from: slot(1, 0.1),
    to: slot(1, 0.88),
    light: 'right',
    content: (
      <>
        <Eyebrow>ZYNA Headquarters</Eyebrow>
        <Headline>Welcome to ZYNA.</Headline>
        <Support>
          <span className="font-semibold tracking-[0.18em] text-navy-950">Built for modern salons & spas.</span>
        </Support>
      </>
    ),
  },
  {
    from: slot(2, 0.1),
    to: slot(2, 0.9),
    light: 'left',
    content: (
      <>
        <Eyebrow>The Conversation Space</Eyebrow>
        <Headline>Every conversation matters.</Headline>
        <Support>Turn salon & spa enquiries into bookings — chairs and treatment rooms filled, and guests who keep coming back.</Support>
      </>
    ),
  },
  {
    from: slot(3, 0.1),
    to: slot(3, 0.9),
    light: 'right',
    content: (
      <>
        <Eyebrow>The Operations Space</Eyebrow>
        <Headline>Less complexity. More clarity.</Headline>
        <Support>One diary for stylists and therapists alike — spend less time managing the details and more time focusing on your clients and guests.</Support>
      </>
    ),
  },
  {
    from: slot(4, 0.1),
    to: slot(4, 0.9),
    light: 'left',
    content: (
      <>
        <Eyebrow>The Premium Salon</Eyebrow>
        <Headline>Built around better client experiences.</Headline>
        <Support>Hair, beauty and grooming appointments — chairs filled, stylists' diaries organised, clients rebooked before they leave.</Support>
      </>
    ),
  },
  {
    from: slot(5, 0.1),
    to: slot(5, 0.9),
    light: 'center',
    content: (
      <>
        <Eyebrow>The Premium Spa</Eyebrow>
        <Headline>Calm spaces. Fully booked treatment rooms.</Headline>
        <Support center>Massages, hammams, facials and wellness rituals — ZYNA answers every enquiry, books therapists and treatment rooms, and reminds guests, so every quiet room stays booked.</Support>
      </>
    ),
  },
  {
    from: slot(6, 0.1),
    to: slot(6, 0.9),
    light: 'left',
    content: (
      <>
        <Eyebrow>The Client Journey</Eyebrow>
        <Headline>Every step, connected.</Headline>
        <Support>Enquiry → Booking → Service → Repeat Client — one smooth path, guided by ZYNA.</Support>
      </>
    ),
  },
  {
    from: slot(7, 0.08),
    to: slot(7, 0.92),
    interactive: true,
    light: 'center',
    content: (
      <>
        <Headline>Ready to transform your salon or spa?</Headline>
        <Support center>
          Create better client experiences. Build a smoother business. Grow with confidence.
        </Support>
        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#form"
            onClick={(e) => {
              e.preventDefault()
              scrollToFormScene()
            }}
            className="inline-flex w-full items-center justify-center rounded-lg bg-navy-950 px-9 py-4 text-[15px] font-bold tracking-wide text-white transition-colors duration-300 hover:bg-navy-900 sm:w-auto"
          >
            Get Started
          </a>
          <a
            href="#form"
            onClick={(e) => {
              e.preventDefault()
              scrollToFormScene()
            }}
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-9 py-4 text-[15px] font-semibold tracking-wide text-navy-950 transition-colors duration-300 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
          >
            Talk to Our Team
          </a>
        </div>
      </>
    ),
  },
  {
    from: slot(8, 0.1),
    to: slot(8, 0.9),
    interactive: true,
    light: 'center',
    content: (
      <>
        <Eyebrow>Never miss a booking again</Eyebrow>
        <Headline>Every conversation matters.</Headline>
        <Support center>
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
            className="group inline-flex items-center gap-2.5 rounded-lg bg-navy-950 px-8 py-4 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-navy-900"
          >
            Talk to Us
            <IconArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </>
    ),
  },
  {
    // The final scene (slot 10): the thank-you layout — wide salon card on top, centred navy text beneath.
    // `to` beyond 1 means no fade-out — it holds to the end of the track.
    from: slot(10, 0.12),
    to: 1.05,
    light: 'center',
    content: (
      <>
        <Eyebrow>ZYNA · United Arab Emirates</Eyebrow>
        <Headline>Thank you for visiting.</Headline>
        <Support center>
          We're glad you stopped by — when you're ready, ZYNA is here to help your
          salon or spa never miss a booking again.
        </Support>
        <p className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.32em] text-gold-600">— Team ZYNA</p>
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
 * The form is scene 10 of 11 (slot 9). Its entrance completes at
 * slot(9, 0.55) ≈ 0.868 of track progress and its fade-out to the
 * thank-you scene begins at slot(9, 0.75) ≈ 0.886, so the fully-in,
 * fully-usable plateau is ≈0.868–0.886. 0.877 lands mid-plateau — the
 * form fully opaque, entrance transform removed, pinned and usable.
 */
export const FORM_FRACTION = 0.877

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

    // Follow rate: the gentle 0.06 glide that feels cinematic under a
    // mouse wheel feels delayed and floaty under a finger, so on coarse
    // pointers (touch) the film tracks the scroll much more closely —
    // 0.3 since v13 (0.18 still trailed a fast flick). A gap of 5% of
    // the track or more — anchor jumps, scrollbar drags, Page Up/Down —
    // snaps instantly, so programmatic scrolls (scrollToFormScene
    // included) never crawl toward their target.
    const COARSE = window.matchMedia('(pointer: coarse)').matches
    const FOLLOW = COARSE ? 0.3 : 0.06
    const SNAP = 0.05
    // On touch devices the push-in magnification is capped at 1.25:
    // past that the full-screen repaint buys nothing visually on a
    // phone and costs frames during crossfades. Desktop unchanged.
    const SCALE_CAP = COARSE ? 1.25 : Infinity

    // Layout reads are cached: the track's document top and its
    // scrollable range only change when the viewport resizes (the track
    // is a fixed 1650vh; mobile browser chrome collapsing also resizes
    // it, which the ResizeObserver catches). The per-frame cost is then
    // one window.scrollY read plus transform/opacity style writes — no
    // getBoundingClientRect / offsetHeight on every frame.
    let trackTop = 0
    let range = 1
    const measure = () => {
      range = Math.max(1, track.offsetHeight - window.innerHeight)
      trackTop = track.getBoundingClientRect().top + window.scrollY
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(track)

    // The loop idles while the track is off-screen: no layout reads, no
    // style writes — rAF just re-queues itself. When the track returns,
    // the cache is re-measured first so the very next frame computes
    // progress from fresh geometry (scrollToFormScene's own reads are
    // independent of this cache and work regardless).
    let inView = true
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const next = entries[0]?.isIntersecting ?? true
              if (next && !inView) measure()
              inView = next
            },
            { threshold: 0 },
          )
        : null
    io?.observe(track)

    // will-change is a scarce GPU-memory hint on mobile: only layers
    // actually on stage hold it (toggled below as fades come and go),
    // instead of all ten full-screen photographs at once.
    const wcOn = SCENE_IMGS.map(() => false)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!inView) return
      // Progress is measured over the camera track alone: p = 0 at the
      // film's first frame, p = 1 at the end of the final (thank-you) scene.
      const target = clamp01((window.scrollY - trackTop) / range)
      const delta = target - current
      if (Math.abs(delta) >= SNAP) current = target
      else current += delta * FOLLOW
      if (Math.abs(target - current) < 0.00005) current = target
      const p = current

      SCENE_IMGS.forEach((s, ai) => {
        const i = PHOTO_SLOTS[ai] ?? ai
        const layer = layerRefs.current[ai]
        const img = imgRefs.current[ai]
        if (!layer || !img) return
        const fadeIn = i === 0 ? 1 : sstep((i - 0.42) / N, (i + 0.04) / N, p)
        const fadeOut = i === N - 1 ? 1 : 1 - sstep((i + 0.58) / N, (i + 1.04) / N, p)
        const o = Math.min(fadeIn, fadeOut)
        layer.style.opacity = o.toFixed(3)
        layer.style.visibility = o <= 0.01 ? 'hidden' : 'visible'
        const wantWc = o > 0.001
        if (wcOn[ai] !== wantWc) {
          wcOn[ai] = wantWc
          img.style.willChange = wantWc ? 'transform' : 'auto'
        }
        const life = clamp01((p - (i - 0.42) / N) / (1.46 / N))
        const eased = 1 - Math.pow(1 - life, 2)
        const scale = lerp(s.scaleFrom, Math.min(s.scaleTo, SCALE_CAP), eased)
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

      // Scene 10 (slot 9): the enquiry form. It fades in across the first
      // half of its slot as the skyline layout hands over (that layer's
      // own fade-out ends at slot(9, 0.04)), rests fully in across the
      // plateau ≈0.868–0.886, then crossfades out (≈0.886–0.918) as the
      // thank-you layout takes over beneath it and its text arrives.
      // Pointer events are live only while the form is fully in
      // (k ≈ 1, before the fade-out begins), so a half-faded card can
      // never swallow clicks meant for a scene beneath it.
      if (formLayerRef.current) {
        const layer = formLayerRef.current
        const kin = sstep(slot(9, 0), slot(9, 0.55), p)
        const kout = 1 - sstep(slot(9, 0.75), slot(10, 0.1), p)
        const k = Math.min(kin, kout)
        layer.style.opacity = k.toFixed(3)
        layer.style.visibility = k <= 0.01 ? 'hidden' : 'visible'
        layer.style.pointerEvents = k >= 0.99 ? 'auto' : 'none'
        const card = formCardRef.current
        if (card) {
          // The entrance transform is driven by the fade-IN only and is
          // removed outright once the scene has arrived (kin = 1), so
          // while the form rests there is no transform on the card at
          // all — text stays crisp and input focus behaves. The fade-out
          // is pure layer opacity.
          card.style.transform =
            kin >= 1
              ? 'none'
              : `scale(${lerp(0.94, 1, kin).toFixed(4)}) translateY(${((1 - kin) * 26).toFixed(1)}px)`
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
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      ro?.disconnect()
      io?.disconnect()
    }
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="relative bg-[#F7F8FA]">
      {/* The camera track: 1650vh of scroll travel driving the film (11
          scenes at ~150vh each — the composed light layouts, the enquiry
          form, and the closing thank-you layout). The sticky stage lives
          inside it and releases when the track ends. */}
      <div ref={trackRef} data-journey-track className="relative" style={{ height: '1650vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F8FA]">
        {SCENE_IMGS.map((s, i) => (
          <div
            key={`${s.img}-${i}`}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className="absolute inset-0"
            style={{ zIndex: i + 1, opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
          >
            <picture className="block h-full w-full">
              <source media="(max-width: 768px)" srcSet={s.imgM} />
              <img
                ref={(el) => {
                  imgRefs.current[i] = el
                }}
                src={s.img}
                alt={s.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: s.objectPosition, transformOrigin: s.origin }}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
            {/* No overlays on the composed light layouts (v20): the card
                already sits on the clean #F7F8FA stage with its baked-in
                soft shadow — no top shade, no bottom scrim, no vignette. */}
          </div>
        ))}

        {/* entrance light bloom */}
        <div
          ref={bloomRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[8] opacity-0"
          style={{ background: 'radial-gradient(60% 55% at 47% 60%, rgba(255,236,200,0.95), rgba(255,220,170,0.35) 55%, transparent 75%)' }}
        />

        {/* story texts — v20: on phones (below sm) EVERY text block is
            vertically centred in the stage (base classes top-1/2
            -translate-y-1/2), sitting over the light space beneath the
            mobile photo card. That centring uses the standalone CSS
            `translate` property (Tailwind v4), which composes with the
            rAF loop's inline `transform` fade-rise instead of being
            overridden by it. From sm up, the side variants move into
            their light panel beside the photo card (left-aligned,
            vertically centred), and the centre variants (CTA, skyline,
            thank-you) anchor to the bottom of the stage, centred in the
            light space beneath their wide top card (sm:pb-24). All
            texts are navy on light — no readability scrim anywhere. */}
        {TEXTS.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el
            }}
            className={
              t.light === 'left'
                ? 'absolute inset-x-0 top-1/2 z-[9] -translate-y-1/2 px-5 text-center opacity-0 sm:inset-x-auto sm:left-0 sm:w-[56%] sm:px-0 sm:pl-14 sm:pr-4 sm:text-left'
                : t.light === 'right'
                  ? 'absolute inset-x-0 top-1/2 z-[9] -translate-y-1/2 px-5 text-center opacity-0 sm:inset-x-auto sm:left-auto sm:right-0 sm:w-[54%] sm:px-0 sm:pl-14 sm:pr-10 sm:text-left'
                  : 'absolute inset-x-0 top-1/2 z-[9] -translate-y-1/2 px-5 text-center opacity-0 sm:top-auto sm:bottom-0 sm:translate-y-0 sm:px-8 sm:pb-24'
            }
            style={{ visibility: 'hidden' }}
          >
            <div
              className={
                t.light === 'center'
                  ? 'scene-text relative mx-auto max-w-3xl'
                  : 'scene-text relative mx-auto max-w-xl sm:mx-0'
              }
            >
              {t.content}
            </div>
          </div>
        ))}

        {/* Scene 10: the enquiry form, inside the stage. The backdrop is
            a light, blurred salon interior, so the white card arrives as
            part of the film, not as a page section after it.
            The layer is pointer-events:none until the rAF loop judges the
            scene arrived; its own scroll well (overflow-y-auto, scrollbar
            hidden) holds the card below the fixed nav and keeps every field
            reachable on short viewports. */}
        <div
          id="contact"
          ref={formLayerRef}
          className="absolute inset-0 z-[10]"
          style={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          {/* Pre-blurred LIGHT asset (heavy blur + brightness lifted
              toward #EDF0F4, baked in at build time from the wide salon
              photograph): a full-screen CSS filter: blur() was a standing
              GPU cost on mobile for the whole form scene, so the layer
              now paints a plain image — no runtime filter. */}
          <picture>
            <source media="(max-width: 768px)" srcSet="images/scenes/m/photo-form-backdrop-light.jpg" />
            <img
              src="images/scenes/photo-form-backdrop-light.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: '50% 45%',
                transform: 'scale(1.08)',
              }}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-0 bg-white/30" />
          {/* Scroll well: top padding reserves the nav bar's height
              (~72px) + margin so the card can never slide under the fixed
              nav; bottom padding is a modest breathing margin (v18 — the
              old fixed bottom bar is gone, so no bar height to reserve).
              The inner min-h-full flex centres the card when it fits and
              lets it top-align (fully scrollable) when it doesn't. No
              m-auto — auto margins in a scrollable flex box push a too-tall
              card's top above the scroll origin, where it can never be
              reached. The well's own scrollbar is hidden (.no-scrollbar)
              so only the golden progress rail shows; wheel/touch scrolling
              still works. */}
          <div className="no-scrollbar absolute inset-0 overflow-y-auto pb-10 pt-[7rem] sm:pb-12 sm:pt-[8rem]">
            <div className="flex min-h-full items-center justify-center px-5 sm:px-8">
              <div ref={formCardRef} className="w-[min(94vw,64rem)] max-w-5xl will-change-transform">
                <Contact />
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint — low in the stage; no fixed chrome to clear (v18).
            It only shows over the light hero (p < 0.02), so since v19 it
            is drawn in navy on the light panel instead of white. */}
        <div ref={hintRef} className="pointer-events-none absolute bottom-10 left-1/2 z-[10] -translate-x-1/2 text-center transition-opacity duration-500 sm:bottom-12 sm:left-[26%]">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy-950/60">Scroll to enter</p>
          <div className="mx-auto mt-3 h-10 w-6 rounded-full border border-navy-950/30 p-1.5">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gold-500" />
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-[10] hidden h-44 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-navy-950/15 sm:block">
          <div ref={railRef} className="h-full w-full origin-top bg-gold-500" style={{ transform: 'scaleY(0)' }} />
        </div>
        </div>
      </div>

      {/* Nothing follows the stage inside this section: the film's last
          two scenes — the enquiry form, then the thank-you layout —
          both live inside the sticky stage above. After this section the
          page continues in normal flow with the site footer (SiteFooter
          in App) — there is no fixed bottom bar or floating chrome. */}
    </section>
  )
}
