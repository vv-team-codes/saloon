import Reveal from './ui/Reveal'

const INDUSTRIES = [
  {
    img: 'images/salon.jpg',
    alt: 'Barber tools arranged on a salon counter',
    name: 'Salons & Barbers',
    line: 'Appointments that fill themselves — cuts, colours and last-minute slots.',
  },
  {
    img: 'images/cafe.jpg',
    alt: 'A cosy café interior with tables and sofa seating',
    name: 'Restaurants & Cafés',
    line: 'Table bookings and takeaway questions, answered before they go cold.',
  },
  {
    img: 'images/clinic.jpg',
    alt: 'A bright, modern clinic waiting room',
    name: 'Clinics & Wellness',
    line: 'Patient enquiries and appointment reminders, handled with care.',
  },
  {
    img: 'images/hotel.jpg',
    alt: 'A resort swimming pool surrounded by palm trees',
    name: 'Hotels & Resorts',
    line: 'Guest questions at midnight, answered like your best front desk.',
  },
  {
    img: 'images/estate.jpg',
    alt: 'Modern residential buildings on a quiet street',
    name: 'Real Estate',
    line: 'Viewing requests captured and booked while you are out showing homes.',
  },
  {
    img: 'images/fitness.jpg',
    alt: 'Treadmills in a modern gym with large windows',
    name: 'Fitness Studios',
    line: 'Trial bookings and class reminders that keep your floor full.',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="relative bg-[#f6f7fd] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gradient">
              Who it’s for
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              Made for businesses that run on{' '}
              <span className="text-gradient">conversations.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-navy-950/60">
              If your customers book, ask and decide through messages, ZYNA was built for you —
              whatever your front desk looks like.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 110}>
              <article className="group relative h-72 overflow-hidden rounded-[26px] shadow-[0_18px_40px_-22px_rgba(5,8,28,0.45)]">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent transition-opacity duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-[21px] font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 max-w-[95%] text-[13.5px] leading-relaxed text-white/75 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0">
                    {item.line}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/75 sm:hidden">
                    {item.line}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100"
                >
                  →
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
