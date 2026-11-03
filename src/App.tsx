import Nav from './components/Nav'
import Journey from './journey/Journey'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Nav />
      <main>
        {/* The journey renders the CTA + contact segment inside its own scroll
            container as the closing act — there is no separate Contact section. */}
        <Journey />
      </main>
      <Footer />
    </div>
  )
}
