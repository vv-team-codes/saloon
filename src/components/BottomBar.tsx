/**
 * Slim bottom bar that closes the homepage (replaces the old Footer).
 * Full-bleed strip — no max-width container, no segment boxes — with the
 * content spread edge to edge on the site's deep navy so it melts into
 * the page: © line left, emirates centre, site link right. On narrow
 * screens the centre line wraps to its own full-width line rather than
 * overflowing or being clipped.
 * Text is exactly as Techie specified — nothing else lives in this bar.
 */
export default function BottomBar() {
  return (
    <div className="relative bg-navy-950 text-white">
      <div aria-hidden="true" className="gold-hr absolute inset-x-0 top-0" />
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1.5 px-5 py-4 text-[13px] text-white/45 sm:px-8">
        <p className="order-1">© 2026 ZYNA. All rights reserved.</p>
        <p className="order-3 w-full text-center text-white/35 sm:order-2 sm:w-auto sm:flex-1">
          Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain
        </p>
        <p className="order-2 sm:order-3">
          <a href="https://www.zyna.ae" className="transition-colors hover:text-white">
            www.zyna.ae
          </a>
        </p>
      </div>
    </div>
  )
}
