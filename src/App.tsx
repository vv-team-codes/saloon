import Nav from './components/Nav'
import Journey from './journey/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Nav />
      <main>
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
