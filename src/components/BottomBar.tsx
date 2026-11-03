/**
 * Slim bottom bar that closes the homepage (replaces the old Footer).
 * Navbar-style: dark navy strip, three segments in a row on desktop
 * (left / centre / right), stacked and centred on mobile.
 * Text is exactly as Techie specified — nothing else lives in this bar.
 */
export default function BottomBar() {
  return (
    <div className="relative bg-navy-950 text-white">
      <div aria-hidden="true" className="gold-hr absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-5 py-4 text-center text-[13px] text-white/45 sm:px-8 lg:flex-row lg:justify-between lg:gap-4 lg:text-left">
        <p>© 2026 ZYNA. All rights reserved.</p>
        <p className="text-white/35">
          Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain
        </p>
        <p>
          <a href="https://www.zyna.ae" className="transition-colors hover:text-white">
            www.zyna.ae
          </a>
        </p>
      </div>
    </div>
  )
}
