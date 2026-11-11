#!/usr/bin/env node
/**
 * ZYNA blog builder.
 *
 * Turns Markdown posts in content/blog/*.md into fully static HTML pages:
 *   <outDir>/blog/index.html          — post index
 *   <outDir>/blog/<slug>/index.html   — one page per post
 * Also writes sitemap.xml + robots.txt into <outDir> and public/.
 *
 * Each post page ships its own <title>, meta description, canonical,
 * Open Graph tags and BlogPosting JSON-LD in the raw HTML (SEO-first,
 * no client-side rendering required).
 *
 * Runs as the last step of `npm run build`. No external dependencies.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://zyna.ae'
const SITE_NAME = 'ZYNA'

/* ---------- resolve the vite output directory ---------- */
function resolveOutDir() {
  for (const cfg of ['vite.config.ts', 'vite.config.js', 'vite.config.mjs']) {
    const p = join(root, cfg)
    if (existsSync(p)) {
      const m = readFileSync(p, 'utf8').match(/outDir:\s*['"]([^'"]+)['"]/)
      if (m) return join(root, m[1])
    }
  }
  return join(root, 'dist')
}
const outDir = resolveOutDir()

/* ---------- tiny frontmatter + markdown (subset) ---------- */
function parsePost(file) {
  const raw = readFileSync(file, 'utf8')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) return null
  const fm = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (kv) fm[kv[1]] = kv[2].trim()
  }
  if (!fm.title || !fm.slug) return null
  // Contact email changed to sales@zyna.ae (2026-11-06): normalise any
  // older post body that still ends with the old hello@ address at render
  // time, so every published page shows the current sales inbox.
  return { ...fm, body: m[2].trim().replaceAll('hello@zyna.ae', 'sales@zyna.ae') }
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function inline(md) {
  let s = esc(md)
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+|mailto:[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
  return s
}

function markdownToHtml(md) {
  const lines = md.split('\n')
  const out = []
  let para = []
  let list = null // 'ul' | 'ol'
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const flushList = () => {
    if (list) out.push(`</${list}>`)
    list = null
  }
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushPara()
      flushList()
      continue
    }
    const h = line.match(/^(#{2,4})\s+(.*)$/)
    if (h) {
      flushPara(); flushList()
      const level = h[1].length
      out.push(`<h${level}>${inline(h[2])}</h${level}>`)
      continue
    }
    if (/^---+$/.test(line)) {
      flushPara(); flushList()
      out.push('<hr />')
      continue
    }
    const ul = line.match(/^[-*]\s+(.*)$/)
    const ol = line.match(/^\d+[.)]\s+(.*)$/)
    if (ul || ol) {
      flushPara()
      const type = ul ? 'ul' : 'ol'
      if (list !== type) { flushList(); out.push(`<${type}>`); list = type }
      out.push(`<li>${inline((ul || ol)[1])}</li>`)
      continue
    }
    flushList()
    para.push(line)
  }
  flushPara(); flushList()
  return out.join('\n')
}

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

const readingTime = (body) => Math.max(1, Math.round(body.split(/\s+/).length / 200))

/* ---------- shared page chrome (matches the main site: Sky Aqua light theme, Sora/Inter, glass header + real footer) ---------- */
const CSS = `
:root{--ink:#17384f;--body:#475569;--mut:#64748b;--sky:#0284c7;--sky400:#38bdf8;--teal:#2dd4bf;--tint:#f0f9ff;--line:#e2e8f0}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:#fff;color:var(--body);font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:var(--sky);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:0 20px}
body{padding-top:84px}
header.site{position:fixed;inset:0 0 auto 0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(226,232,240,.9);transition:box-shadow .3s ease}
header.site.scrolled{box-shadow:0 14px 34px -18px rgba(23,56,79,.25)}
.nav-in{max-width:1152px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px}
@media(min-width:640px){.nav-in{padding:12px 24px}}
.logo-link{display:inline-flex;align-items:center;flex-shrink:0}
.logo-link img{height:30px;width:auto;display:block}
@media(min-width:640px){.logo-link img{height:34px}}
.nav-links{display:none;align-items:center;gap:2px}
@media(min-width:1024px){.nav-links{display:flex}}
.nav-links a{color:rgba(23,56,79,.72);font-size:14px;font-weight:500;padding:8px 14px;border-radius:999px;transition:background .3s ease,color .3s ease}
.nav-links a:hover{color:var(--ink);background:var(--tint);text-decoration:none}
.nav-links a[aria-current="page"]{color:var(--sky);background:var(--tint)}
.nav-right{display:flex;align-items:center;gap:10px}
.btn-start{display:none;align-items:center;gap:8px;border-radius:10px;background:linear-gradient(to right,var(--sky400),var(--teal));color:#fff;font-size:14px;font-weight:700;padding:10px 20px;transition:filter .3s ease,box-shadow .3s ease}
@media(min-width:640px){.btn-start{display:inline-flex}}
.btn-start:hover{text-decoration:none;color:#fff;filter:brightness(1.06);box-shadow:0 14px 30px -12px rgba(56,189,248,.55)}
.menu-btn{display:flex;height:40px;width:40px;align-items:center;justify-content:center;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--ink);font-size:18px;line-height:1;cursor:pointer}
@media(min-width:1024px){.menu-btn{display:none}}
.mobile-menu{display:none;position:fixed;inset:0;z-index:60;background:rgba(255,255,255,.97);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);flex-direction:column;align-items:center;justify-content:center}
.mobile-menu.open{display:flex}
.mobile-menu a.mlink{font-family:Sora,Inter,system-ui,sans-serif;font-size:30px;font-weight:600;color:var(--ink);padding:13px 0;transition:color .3s ease}
.mobile-menu a.mlink:hover{color:var(--sky);text-decoration:none}
.mobile-menu .btn-start{display:inline-flex;margin-top:30px;font-size:15px;padding:15px 30px}
.menu-close{position:absolute;top:24px;right:24px;height:44px;width:44px;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--ink);font-size:17px;cursor:pointer}
h1,h2,h3{font-family:Sora,Inter,system-ui,sans-serif;color:var(--ink);line-height:1.25}
.eyebrow{letter-spacing:.24em;text-transform:uppercase;font-size:12px;font-weight:700;color:var(--sky)}
.hero{padding:38px 0 10px}
.hero h1{font-size:clamp(30px,5vw,44px);font-weight:800;margin:10px 0 12px}
.hero p.lede{font-size:17.5px;color:var(--mut);max-width:640px;margin:0}
.card{display:block;background:#fff;border:1px solid var(--line);border-radius:18px;padding:26px 26px 22px;margin:22px 0;box-shadow:0 16px 40px -28px rgba(23,56,79,.25);transition:transform .35s ease,border-color .35s ease}
.card:hover{transform:translateY(-4px);border-color:#7dd3fc;text-decoration:none}
.card .meta,.meta{font-size:13px;color:var(--mut);text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.card .meta .cat,article .cat{color:var(--sky)}
.card h2{font-size:23px;margin:10px 0 8px}
.card p{margin:0 0 12px;color:var(--body)}
.read{font-weight:600;font-size:15px;color:var(--sky)}
article{padding:20px 0 8px}
article h1{font-size:clamp(28px,4.6vw,40px);font-weight:800;margin:12px 0 14px}
article h2{font-size:24px;margin:34px 0 10px}
article h3{font-size:19px;margin:26px 0 8px}
article p{margin:0 0 16px;font-size:16.5px}
article ul,article ol{margin:0 0 16px;padding-left:24px}
article li{margin-bottom:8px;font-size:16.5px}
article strong{color:var(--ink)}
article hr{border:none;height:1px;background:linear-gradient(to right,transparent,rgba(56,189,248,.65),transparent);margin:30px 0}
.cta{background:var(--tint);border:1px solid #bae6fd;border-radius:18px;padding:26px;margin:36px 0 8px}
.cta h2{margin-top:0;font-size:21px}
.cta p{margin-bottom:0}
.btn{display:inline-block;margin-top:14px;background:linear-gradient(to right,var(--sky400),var(--teal));color:#fff;font-weight:700;padding:11px 22px;border-radius:999px}
.btn:hover{text-decoration:none;color:#fff;filter:brightness(1.06)}
.sky-hr{height:2px;background:linear-gradient(to right,var(--sky400),#22d3ee,var(--teal))}
footer.site-footer{position:relative;background:var(--tint);color:var(--body);margin-top:56px}
footer.site-footer .foot-grid{max-width:1152px;margin:0 auto;display:grid;gap:40px;padding:52px 20px 40px}
@media(min-width:640px){footer.site-footer .foot-grid{padding:52px 32px 40px}}
@media(min-width:1024px){footer.site-footer .foot-grid{grid-template-columns:5fr 3fr 4fr}}
footer.site-footer .foot-logo{display:inline-flex;border-radius:12px;background:#fff;padding:6px 12px;box-shadow:inset 0 0 0 1px var(--line)}
footer.site-footer .foot-logo img{height:32px;width:auto;display:block}
footer.site-footer .tagline{margin:18px 0 0;max-width:340px;font-size:15px;line-height:1.65;color:var(--mut)}
footer.site-footer .socials{display:flex;gap:12px;margin-top:22px}
footer.site-footer .socials a{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border-radius:12px;color:#fff;transition:transform .3s ease}
footer.site-footer .socials a:hover{transform:scale(1.06);text-decoration:none}
footer.site-footer .socials svg{width:22px;height:22px}
footer.site-footer .socials a.fb{background:#1877F2}
footer.site-footer .socials a.ig{background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)}
footer.site-footer h3{font-family:Inter,system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--sky);margin:0 0 18px}
footer.site-footer ul{list-style:none;margin:0;padding:0}
footer.site-footer ul li{margin-bottom:12px}
footer.site-footer ul a{color:var(--body);font-size:15px;transition:color .3s ease}
footer.site-footer ul a:hover{color:var(--sky);text-decoration:none}
footer.site-footer .mail{color:var(--ink);font-size:15px;font-weight:500;transition:color .3s ease}
footer.site-footer .mail:hover{color:var(--sky);text-decoration:none}
footer.site-footer .loc{margin:8px 0 0;font-size:15px;color:var(--mut)}
footer.site-footer .btn-start{display:inline-flex;margin-top:22px}
footer.site-footer .foot-bottom{border-top:1px solid var(--line)}
footer.site-footer .foot-bottom-in{max-width:1152px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 32px;padding:18px 20px;font-size:13px;color:var(--mut)}
@media(min-width:640px){footer.site-footer .foot-bottom-in{padding:18px 32px}}
footer.site-footer .foot-bottom p{margin:0}
footer.site-footer .emirates{color:#94a3b8}
@media(max-width:639px){footer.site-footer .emirates{order:3;flex:0 0 100%;text-align:center}}
@media(min-width:640px){footer.site-footer .emirates{flex:1;text-align:center}}
footer.site-footer .foot-bottom a{color:var(--mut)}
footer.site-footer .foot-bottom a:hover{color:var(--sky);text-decoration:none}
.back{display:inline-block;margin-top:26px;font-size:15px;font-weight:600}
::selection{background:rgba(56,189,248,.25)}
`

function pageShell({ title, description, canonical, ogType, extraHead = '', body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/jpeg" href="/zyna-logo.jpg" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <meta name="theme-color" content="#F0F9FF" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>${CSS}</style>
    ${extraHead}
  </head>
  <body>
    <header class="site" id="site-header">
      <div class="nav-in">
        <a class="logo-link" href="/" aria-label="ZYNA — home"><img src="/zyna-logo.jpg" alt="ZYNA — AI THAT WORKS FOR YOU" /></a>
        <nav class="nav-links" aria-label="Main">
          <a href="/#product">What We Do</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#for-salons">For Salons</a>
          <a href="/#for-spas">For Spas</a>
          <a href="/blog/" aria-current="page">Blog</a>
          <a href="/#demo">Contact</a>
        </nav>
        <div class="nav-right">
          <a class="btn-start" href="/#demo">Book a Demo <span aria-hidden="true">→</span></a>
          <button class="menu-btn" id="mopen" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>
      <div class="mobile-menu" id="mmenu">
        <button class="menu-close" id="mclose" type="button" aria-label="Close menu">✕</button>
        <a class="mlink" href="/#product">What We Do</a>
        <a class="mlink" href="/#how-it-works">How It Works</a>
        <a class="mlink" href="/#for-salons">For Salons</a>
        <a class="mlink" href="/#for-spas">For Spas</a>
        <a class="mlink" href="/blog/">Blog</a>
        <a class="mlink" href="/#demo">Contact</a>
        <a class="btn-start" href="/#demo">Book a Demo <span aria-hidden="true">→</span></a>
      </div>
    </header>
    <main class="wrap">
      ${body}
    </main>
    <footer class="site-footer">
      <div class="sky-hr" aria-hidden="true"></div>
      <div class="foot-grid">
        <div>
          <span class="foot-logo"><img src="/zyna-logo.jpg" alt="ZYNA — AI THAT WORKS FOR YOU" /></span>
          <p class="tagline">The 24/7 AI receptionist for salons &amp; spas in the UAE.</p>
          <div class="socials">
            <a class="fb" href="https://www.facebook.com/profile.php?id=61595756175259" target="_blank" rel="noopener noreferrer" aria-label="ZYNA on Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            <a class="ig" href="https://www.instagram.com/zyna_ae/" target="_blank" rel="noopener noreferrer" aria-label="ZYNA on Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <h3>Explore</h3>
          <ul>
            <li><a href="/#product">What We Do</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="/#for-salons">For Salons</a></li>
            <li><a href="/#for-spas">For Spas</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/#demo">Contact</a></li>
          </ul>
        </nav>
        <div>
          <h3>Get in Touch</h3>
          <p style="margin:0"><a class="mail" href="mailto:sales@zyna.ae">sales@zyna.ae</a></p>
          <p class="loc">Dubai, United Arab Emirates</p>
          <a class="btn-start" href="/#demo">Book a Demo <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="foot-bottom">
        <div class="foot-bottom-in">
          <p>© 2026 ZYNA. All rights reserved.</p>
          <p class="emirates">Dubai · Abu Dhabi · Sharjah · Ajman · Ras Al Khaimah · Fujairah · Umm Al Quwain</p>
          <p><a href="https://zyna.ae/">zyna.ae</a></p>
        </div>
      </div>
    </footer>
    <script>
      (function () {
        var h = document.getElementById('site-header')
        var on = function () { h.classList.toggle('scrolled', window.scrollY > 24) }
        window.addEventListener('scroll', on, { passive: true }); on()
        var m = document.getElementById('mmenu'), o = document.getElementById('mopen'), c = document.getElementById('mclose')
        o.addEventListener('click', function () { m.classList.add('open'); o.setAttribute('aria-expanded', 'true') })
        c.addEventListener('click', function () { m.classList.remove('open'); o.setAttribute('aria-expanded', 'false') })
        m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.classList.remove('open') }) })
      })()
    </script>
  </body>
</html>
`
}

/* ---------- load posts ---------- */
const blogDir = join(root, 'content', 'blog')
const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md') && f !== 'TOPIC-QUEUE.md')
  .map((f) => parsePost(join(blogDir, f)))
  .filter(Boolean)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

if (!posts.length) {
  console.error('[blog] No posts found in content/blog — nothing to build.')
  process.exit(1)
}

/* ---------- post pages ---------- */
const blogOut = join(outDir, 'blog')
mkdirSync(blogOut, { recursive: true })

for (const post of posts) {
  const url = `${SITE}/blog/${post.slug}/`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/` },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/zyna-logo.jpg` },
    },
    image: `${SITE}/og-image.jpg`,
  }
  const body = `
      <article>
        <p class="meta"><span class="cat">${esc(post.category)}</span> · ${fmtDate(post.date)} · ${readingTime(post.body)} min read</p>
        <h1>${esc(post.title)}</h1>
        ${markdownToHtml(post.body)}
        <div class="cta">
          <h2>Never miss a booking again</h2>
          <p>ZYNA is the 24/7 AI receptionist for salons, spas &amp; beauty businesses in the UAE — it replies, books and reminds, day and night.</p>
          <a class="btn" href="/#demo">Book a Demo</a>
          <p style="margin-top:14px">Or write to us: <a href="mailto:sales@zyna.ae">sales@zyna.ae</a></p>
        </div>
        <a class="back" href="/blog/">← All articles</a>
      </article>`
  const html = pageShell({
    title: `${post.title} | ZYNA Blog`,
    description: post.description,
    canonical: url,
    ogType: 'article',
    extraHead: `<meta property="article:published_time" content="${post.date}" />\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    body,
  })
  const dir = join(blogOut, post.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`[blog] post  /blog/${post.slug}/`)
}

/* ---------- index page ---------- */
const cards = posts
  .map(
    (p) => `
        <a class="card" href="/blog/${p.slug}/">
          <p class="meta"><span class="cat">${esc(p.category)}</span> · ${fmtDate(p.date)} · ${readingTime(p.body)} min read</p>
          <h2>${esc(p.title)}</h2>
          <p>${esc(p.description)}</p>
          <span class="read">Read article →</span>
        </a>`,
  )
  .join('\n')
const indexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'ZYNA Blog',
  url: `${SITE}/blog/`,
  description: 'Practical ideas for salon, spa and beauty business owners in the UAE: bookings, no-shows, client retention and front-desk systems.',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/` },
}
const indexHtml = pageShell({
  title: 'Blog | ZYNA — Ideas for Salon & Spa Owners in the UAE',
  description:
    'Practical ideas for salon, spa and beauty business owners in the UAE: cutting no-shows, winning bookings on WhatsApp, client retention and smarter front-desk systems.',
  canonical: `${SITE}/blog/`,
  ogType: 'website',
  extraHead: `<script type="application/ld+json">${JSON.stringify(indexJsonLd)}</script>`,
  body: `
      <section class="hero">
        <p class="eyebrow">The ZYNA Blog</p>
        <h1>Ideas that fill chairs.</h1>
        <p class="lede">Practical, no-hype advice for salon, spa &amp; beauty business owners in the UAE — bookings, no-shows, retention and the systems behind a fully-booked diary.</p>
      </section>
      <section>
        ${cards}
      </section>`,
})
writeFileSync(join(blogOut, 'index.html'), indexHtml)
console.log('[blog] index /blog/')

/* ---------- sitemap.xml + robots.txt ---------- */
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${SITE}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/blog/`, lastmod: posts[0].date, changefreq: 'weekly', priority: '0.8' },
  ...posts.map((p) => ({
    loc: `${SITE}/blog/${p.slug}/`,
    lastmod: p.date,
    changefreq: 'monthly',
    priority: '0.7',
  })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`

for (const target of [outDir, join(root, 'public')]) {
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, 'sitemap.xml'), sitemap)
  writeFileSync(join(target, 'robots.txt'), robots)
}
console.log(`[blog] sitemap.xml (${urls.length} URLs) + robots.txt → ${outDir} & public/`)
console.log(`[blog] Done — ${posts.length} post(s) built.`)
