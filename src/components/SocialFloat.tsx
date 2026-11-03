import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

/**
 * Floating social buttons — colourful, lively and DRAGGABLE.
 *
 * Full brand colours (Facebook blue, the Instagram gradient), a gentle
 * bob + pulsing halo so the cluster feels alive, and visitors can drag
 * the whole cluster anywhere on screen and drop it; the dropped spot is
 * kept in localStorage and restored on the next visit. A press that
 * moves less than the drag threshold is a plain click and opens the
 * link; a real drag suppresses that click. Default home (nothing saved)
 * is the bottom-right corner. Icons only — the exact profile URLs
 * Techie provided.
 *
 * On small screens the buttons shrink to 42px and the default corner
 * tucks to a 16px side offset, so at phone sizes the cluster clears the
 * journey form card's Send button and footnote. Since v11 the default
 * corner also sits ABOVE the fixed bottom bar (bar ≈71px tall wrapped
 * on phones → 96px default bottom; ≈45px at sm+ → 70px), while a saved
 * or dragged position can still go anywhere, the bar included.
 */
const STORAGE_KEY = 'zyna-social-pos'
const DRAG_THRESHOLD = 6

type Pos = { x: number; y: number }

// Button size follows the sm breakpoint (42px below, 46px above).
const clusterDims = () =>
  window.innerWidth < 640 ? { w: 42 * 2 + 10, h: 42 } : { w: 46 * 2 + 10, h: 46 }

const clampPos = (p: Pos): Pos => {
  const d = clusterDims()
  return {
    x: Math.min(Math.max(4, p.x), Math.max(4, window.innerWidth - d.w - 4)),
    y: Math.min(Math.max(4, p.y), Math.max(4, window.innerHeight - d.h - 4)),
  }
}

const SOCIALS: { label: string; href: string; style: CSSProperties; delay: string; icon: ReactNode }[] = [
  {
    label: 'ZYNA on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61595756175259',
    style: { backgroundColor: '#1877F2', ['--halo' as string]: 'rgba(24,119,242,0.55)', ['--halo-delay' as string]: '0s' },
    delay: '0s',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: 'ZYNA on Instagram',
    href: 'https://www.instagram.com/zyna_ae/',
    style: {
      backgroundImage: 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)',
      ['--halo' as string]: 'rgba(214,41,118,0.5)',
      ['--halo-delay' as string]: '1.6s',
    },
    delay: '1.1s',
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
]

export default function SocialFloat() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null)
  const suppressClickRef = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState<Pos | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const p = JSON.parse(raw) as Pos
        if (typeof p?.x === 'number' && typeof p?.y === 'number') return clampPos(p)
      }
    } catch {
      /* no saved position — use the default corner */
    }
    return null
  })

  // Keep a restored/dropped cluster on screen if the viewport shrinks.
  useEffect(() => {
    const onResize = () => setPos((p) => (p ? clampPos(p) : p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== undefined && e.button !== 0) return
    const rect = clusterRef.current?.getBoundingClientRect()
    if (!rect) return
    dragRef.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: rect.left, oy: rect.top, moved: false }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d || e.pointerId !== d.id) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      d.moved = true
      setDragging(true)
      // Capture only once this is a real drag, so plain clicks still
      // land on the anchor itself (capture would retarget them).
      try {
        clusterRef.current?.setPointerCapture(e.pointerId)
      } catch {
        /* capture is a nicety, not a requirement */
      }
    }
    setPos(clampPos({ x: d.ox + dx, y: d.oy + dy }))
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d || e.pointerId !== d.id) return
    dragRef.current = null
    setDragging(false)
    if (d.moved) {
      suppressClickRef.current = true
      setPos((p) => {
        if (p) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
          } catch {
            /* storage unavailable — the drop still holds for this page */
          }
        }
        return p
      })
    }
  }

  return (
    <div
      ref={clusterRef}
      className={`fixed z-30 flex touch-none select-none gap-2.5 ${pos ? '' : 'bottom-24 right-4 sm:bottom-[4.375rem] sm:right-5'} ${dragging ? 'social-dragging cursor-grabbing' : 'cursor-grab'}`}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (suppressClickRef.current) {
          e.preventDefault()
          e.stopPropagation()
          suppressClickRef.current = false
        }
      }}
    >
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="social-btn group relative flex h-[42px] w-[42px] items-center justify-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/20 sm:h-[46px] sm:w-[46px]"
          style={{ ...s.style, animationDelay: s.delay }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-[1.08] sm:h-[22px] sm:w-[22px]"
            aria-hidden="true"
          >
            {s.icon}
          </svg>
        </a>
      ))}
    </div>
  )
}
