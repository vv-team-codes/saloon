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
      {/* The old Footer is gone: a slim bottom bar closes the journey and
          the social icons float permanently at the bottom-right. */}
      <BottomBar />
      <SocialFloat />
    </div>
  )
}
