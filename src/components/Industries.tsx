import Reveal from './ui/Reveal'

const INDUSTRIES = [
  {
    img: '/images/salon.jpg',
    alt: 'Barber tools arranged on a salon counter',
    name: 'Salons & Grooming',
    line: 'Ladies’ salons, barbers and spas — appointments that fill themselves, even on weekends.',
  },
  {
    img: '/images/cafe.jpg',
    alt: 'A cosy café interior with tables and sofa seating',
    name: 'Restaurants & Cafés',
    line: 'Table bookings and takeaway questions, answered before they go cold.',
  },
  {
    img: '/images/clinic.jpg',
    alt: 'A bright, modern clinic waiting room',
    name: 'Clinics & Aesthetics',
    line: 'Dental, derma and wellness enquiries — booked, reminded and handled with care.',
  },
  {
    img: '/images/hotel.jpg',
    alt: 'A resort swimming pool surrounded by palm trees',
    name: 'Hotels & Holiday Homes',
    line: 'Guest questions at midnight, answered like your best front desk.',
  },
  {
    img: '/images/estate.jpg',
    alt: 'Glass residential towers in Dubai',
    name: 'Real Estate',
    line: 'Viewing requests from JLT to Business Bay, captured while you are out on showings.',
  },
  {
    img: '/images/fitness.jpg',
    alt: 'Treadmills in a modern gym with large windows',
    name: 'Fitness & Wellness',
    line: 'Trial bookings and class reminders that keep your floor full.',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[15%] h-80 w-80 rounded-full bg-electric-500/12 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Who it’s for
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Made for businesses that run on <span className="text-gold-grad">conversations.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-white/60">
              If your customers book, ask and decide through messages, ZYNA was built for you —
              anywhere in the Emirates.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 110}>
              <article className="group relative h-80 overflow-hidden rounded-[26px] ring-1 ring-white/10 transition-shadow duration-500 hover:ring-gold-500/50">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span aria-hidden="true" className="mb-3 block h-0.5 w-9 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-display text-[21px] font-semibold text-white">{item.name}</h3>
                  <p className="mt-1.5 max-w-[95%] text-[13.5px] leading-relaxed text-white/75 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0">
                    {item.line}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/75 sm:hidden">{item.line}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
