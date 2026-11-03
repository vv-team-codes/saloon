import Nav from './components/Nav'
import Journey from './journey/Journey'
import Footer from './components/Footer'

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
      <Footer />
    </div>
  )
}
