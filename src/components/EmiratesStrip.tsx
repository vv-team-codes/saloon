const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']

export default function EmiratesStrip() {
  return (
    <div className="relative overflow-hidden border-y border-gold-500/25 bg-navy-950 py-4" aria-label="Serving all seven Emirates">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-0">
          {[...EMIRATES, ...EMIRATES].map((e, i) => (
            <span key={`${e}-${i}`} className="flex items-center whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-300/90">
              <span className="px-6">{e}</span>
              <span aria-hidden="true" className="text-gold-500">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
