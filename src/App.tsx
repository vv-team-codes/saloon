import Nav from './components/Nav'
import Journey from './journey/Journey'
import BottomBar from './components/BottomBar'
import SocialFloat from './components/SocialFloat'

export default function App() {
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
