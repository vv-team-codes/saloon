/**
 * Slim bottom bar — FIXED chrome since v11: it floats at the bottom of
 * the viewport from the first screen to the last, exactly like the
 * social icons, instead of closing the page in flow. Full-bleed strip —
 * no max-width container, no segment boxes — with the content spread
 * edge to edge on the site's deep navy so it melts into the page:
 * © line left, emirates centre, site link right. On narrow screens the
 * centre line wraps to its own full-width line rather than overflowing
 * or being clipped. z-30 keeps it below the nav (z-50) and its menu.
 * Text is exactly as Techie specified — nothing else lives in this bar.
 * Rendered height ≈ 45px single-row (sm+), ≈ 71px wrapped on phones;
 * the social cluster's default corner and the form well's bottom
 * padding are sized against those numbers.
 */
export default function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 bg-navy-950 text-white">
      <div aria-hidden="true" className="gold-hr absolute inset-x-0 top-0" />
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1.5 px-5 py-3 text-[13px] text-white/45 sm:px-8">
        <p className="order-1">© 2026 ZYNA. All rights reserved.</p>
        <p className="order-3 w-full text-center text-white/35 sm:order-2 sm:w-auto sm:flex-1">
          Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain
        </p>
        <p className="order-2 sm:order-3">
          <a href="https://www.zyna.ae" className="transition-colors hover:text-white">
            zyna.ae
          </a>
        </p>
      </div>
    </div>
  )
}
