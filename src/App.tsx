import { useEffect } from 'react'
import Nav from './components/Nav'
import Journey, { scrollToFormScene, scrollToJourneyFraction } from './journey/Journey'
import BottomBar from './components/BottomBar'
import SocialFloat from './components/SocialFloat'

export default function App() {
  // Blog → homepage handoff (v16): the blog template's header links
  // (What We Do / How It Works / About / Contact / Get Started) point at
  // plain "/" and stash a destination key in sessionStorage, so the
  // homepage URL never carries a #hash or query param. On first load we
  // consume the key exactly once and, once the journey is mounted,
  // scroll to the same film moments the homepage nav uses. A normal
  // visit (no key) does nothing.
  useEffect(() => {
    let key: string | null = null
    try {
      key = window.sessionStorage.getItem('zyna-goto')
      if (key) window.sessionStorage.removeItem('zyna-goto')
    } catch {
      key = null
    }
    if (!key) return
    const dest = key
    const raf = requestAnimationFrame(() => {
      if (dest === 'what') scrollToJourneyFraction(0.324)
      else if (dest === 'how') scrollToJourneyFraction(0.45)
      else if (dest === 'about' || dest === 'contact') scrollToFormScene()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="min-h-screen bg-navy-950">
      <Nav />
      <main>
        {/* The journey is the whole homepage film — its final scene, inside
            the scroll-driven stage itself, is the enquiry form. There is no
            separate Contact section. */}
        <Journey />
      </main>
      {/* The old Footer is gone: a slim bottom bar floats fixed at the
          page bottom (v11) and the social icons float permanently just
          above it at the bottom-right. Both are always-on chrome. */}
      <BottomBar />
      <SocialFloat />
    </div>
  )
}
