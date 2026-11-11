import { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import SiteFooter from './components/SiteFooter'

export default function App() {
  // Blog → homepage handoff: the blog template's header links point at
  // plain "/" and stash a destination key in sessionStorage, so the
  // homepage URL never carries a #hash or query param. On first load we
  // consume the key exactly once and scroll to the matching section of
  // the B2B homepage. A normal visit (no key) does nothing.
  useEffect(() => {
    let key: string | null = null
    try {
      key = window.sessionStorage.getItem('zyna-goto')
      if (key) window.sessionStorage.removeItem('zyna-goto')
    } catch {
      key = null
    }
    if (!key) return
    const target =
      key === 'what'
        ? 'product'
        : key === 'how'
          ? 'how-it-works'
          : key === 'about' || key === 'contact'
            ? 'demo'
            : null
    if (!target) return
    const raf = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        {/* Normal professional B2B homepage (v8). The scroll journey is
            parked: src/journey/ stays on disk untouched and is simply
            no longer rendered; BottomBar.tsx and SocialFloat.tsx are
            likewise unrendered. */}
        <Home />
      </main>
      <SiteFooter />
    </div>
  )
}
