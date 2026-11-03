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
  return { ...fm, body: m[2].trim() }
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

/* ---------- shared page chrome (matches the main site: navy, gold, Sora/Inter, logo on white) ---------- */
const CSS = `
:root{--navy:#05081c;--navy2:#0a0f2e;--gold:#c9a24b;--gold2:#dcb95c;--cyan:#22d3ee;--ink:rgba(255,255,255,.82);--mut:rgba(255,255,255,.55)}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--navy);color:var(--ink);font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:var(--cyan);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:0 20px}
header.site{padding:26px 0 8px}
.logo-tile{display:inline-flex;background:#fff;border-radius:14px;padding:10px 14px}
.logo-tile img{height:34px;width:auto;display:block}
header.site nav{float:right;margin-top:14px}
header.site nav a{color:rgba(255,255,255,.75);font-size:14.5px;font-weight:500;margin-left:22px}
header.site nav a:hover{color:#fff;text-decoration:none}
h1,h2,h3{font-family:Sora,Inter,system-ui,sans-serif;color:#fff;line-height:1.25}
.eyebrow{letter-spacing:.24em;text-transform:uppercase;font-size:12px;font-weight:700;color:var(--cyan)}
.hero{padding:38px 0 10px}
.hero h1{font-size:clamp(30px,5vw,44px);font-weight:800;margin:10px 0 12px}
.hero p.lede{font-size:17.5px;color:var(--mut);max-width:640px;margin:0}
.card{display:block;background:var(--navy2);border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:26px 26px 22px;margin:22px 0;transition:transform .35s ease,border-color .35s ease}
.card:hover{transform:translateY(-4px);border-color:rgba(201,162,75,.55);text-decoration:none}
.card .meta,.meta{font-size:13px;color:var(--mut);text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.card .meta .cat,article .cat{color:var(--gold2)}
.card h2{font-size:23px;margin:10px 0 8px}
.card p{margin:0 0 12px;color:var(--ink)}
.read{font-weight:600;font-size:15px}
article{padding:20px 0 8px}
article h1{font-size:clamp(28px,4.6vw,40px);font-weight:800;margin:12px 0 14px}
article h2{font-size:24px;margin:34px 0 10px}
article h3{font-size:19px;margin:26px 0 8px}
article p{margin:0 0 16px;font-size:16.5px}
article ul,article ol{margin:0 0 16px;padding-left:24px}
article li{margin-bottom:8px;font-size:16.5px}
article strong{color:#fff}
article hr{border:none;height:1px;background:linear-gradient(to right,transparent,rgba(201,162,75,.65),transparent);margin:30px 0}
.cta{background:var(--navy2);border:1px solid rgba(201,162,75,.4);border-radius:18px;padding:26px;margin:36px 0 8px}
.cta h2{margin-top:0;font-size:21px}
.cta p{margin-bottom:0}
.btn{display:inline-block;margin-top:14px;background:linear-gradient(to right,var(--gold2),#a9863a);color:#05081c;font-weight:700;padding:11px 22px;border-radius:999px}
.btn:hover{text-decoration:none;filter:brightness(1.07)}
footer.site{margin-top:56px;border-top:1px solid rgba(255,255,255,.1);padding:26px 0 40px;font-size:13.5px;color:var(--mut)}
footer.site a{color:rgba(255,255,255,.7)}
.back{display:inline-block;margin-top:26px;font-size:15px;font-weight:600}
::selection{background:rgba(124,58,237,.35)}
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
    <meta name="theme-color" content="#05081c" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>${CSS}</style>
    ${extraHead}
  </head>
  <body>
    <header class="site">
      <div class="wrap">
        <a class="logo-tile" href="/" aria-label="ZYNA — home"><img src="/zyna-logo.jpg" alt="ZYNA — AI THAT WORKS FOR YOU" /></a>
        <nav aria-label="Main">
          <a href="/">Home</a>
          <a href="/blog/">Blog</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
    <main class="wrap">
      ${body}
    </main>
    <footer class="site">
      <div class="wrap">
        <p>© ${new Date().getFullYear()} ZYNA — The 24/7 AI receptionist for salons &amp; beauty businesses in the UAE. <a href="mailto:hello@zyna.ae">hello@zyna.ae</a> · Dubai, United Arab Emirates</p>
      </div>
    </footer>
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
          <p>ZYNA is the 24/7 AI receptionist for salons &amp; beauty businesses in the UAE — it replies, books and reminds, day and night.</p>
          <a class="btn" href="/#contact">Get Started</a>
          <p style="margin-top:14px">Or write to us: <a href="mailto:hello@zyna.ae">hello@zyna.ae</a></p>
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
  description: 'Practical ideas for salon and beauty business owners in the UAE: bookings, no-shows, client retention and front-desk systems.',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/` },
}
const indexHtml = pageShell({
  title: 'Blog | ZYNA — Ideas for Salon Owners in the UAE',
  description:
    'Practical ideas for salon and beauty business owners in the UAE: cutting no-shows, winning bookings on WhatsApp, client retention and smarter front-desk systems.',
  canonical: `${SITE}/blog/`,
  ogType: 'website',
  extraHead: `<script type="application/ld+json">${JSON.stringify(indexJsonLd)}</script>`,
  body: `
      <section class="hero">
        <p class="eyebrow">The ZYNA Blog</p>
        <h1>Ideas that fill chairs.</h1>
        <p class="lede">Practical, no-hype advice for salon &amp; beauty business owners in the UAE — bookings, no-shows, retention and the systems behind a fully-booked diary.</p>
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
