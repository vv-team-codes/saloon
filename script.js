/* ZYNA — page interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (id) => `<svg class="i"><use href="#i-${id}"/></svg>`;

  function bubble(text, { out = false, time = "", pop = false, cls = "" } = {}) {
    return `<div class="bubble-row${out ? " out" : ""}${pop ? " pop" : ""}${cls ? " " + cls : ""}">
      <div class="bubble">${esc(text)}${time ? `<time>${esc(time)}</time>` : ""}</div></div>`;
  }

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- Navbar: mobile menu + active link ---------- */
  const header = $("#header");
  const menuBtn = $("#menuBtn");
  const setMenu = (open) => {
    header.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const navLinks = $$(".nav-links a");
  const navIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["how", "features", "compare", "pricing", "faq", "contact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) navIO.observe(el);
  });

  /* ---------- Hero phone: typed-out conversation loop ---------- */
  const heroScript = [
    { out: false, text: "Hi, do you have Saturday at 4 for a haircut? 💇‍♀️", time: "11:47 PM" },
    { out: true, text: "Hi! Saturday 4:00 pm is free with Maya. Shall I book it for you?", time: "11:47 PM" },
    { out: false, text: "Yes please!", time: "11:48 PM" },
    { out: true, text: "Done ✓ Haircut, Sat 4:00 pm with Maya. See you then!", time: "11:48 PM" },
  ];
  const heroChat = $("#heroChat");
  let heroN = 1;
  const renderHero = () => {
    const shown = Math.min(heroN, heroScript.length);
    $$(".bubble-row", heroChat).forEach((b) => b.remove());
    heroScript.slice(0, shown).forEach((m) => {
      heroChat.insertAdjacentHTML("beforeend", bubble(m.text, { out: m.out, time: m.time, pop: true }));
    });
  };
  renderHero();
  setInterval(() => {
    const prev = Math.min(heroN, heroScript.length);
    heroN = heroN >= heroScript.length + 2 ? 1 : heroN + 1;
    const now = Math.min(heroN, heroScript.length);
    if (now === prev) return;                     // hold the finished chat
    if (now > prev) {                             // append only the new message
      const m = heroScript[now - 1];
      heroChat.insertAdjacentHTML("beforeend", bubble(m.text, { out: m.out, time: m.time, pop: true }));
    } else renderHero();                          // restart loop
  }, 1600);

  /* ---------- Dashboard mock tabs ---------- */
  const dashTitle = $("#dashTitle");
  $$(".dash-tab").forEach((btn) => btn.addEventListener("click", () => {
    $$(".dash-tab").forEach((b) => b.classList.toggle("active", b === btn));
    dashTitle.textContent = btn.textContent;
  }));

  /* ---------- Language card ---------- */
  const langs = {
    "English": ["Hi! Can I book a manicure for Friday?", "Of course! 3:00 or 5:30 pm?"],
    "Español": ["¡Hola! ¿Puedo reservar una manicura el viernes?", "¡Claro! ¿A las 15:00 o 17:30?"],
    "Français": ["Bonjour ! Une manucure vendredi ?", "Bien sûr ! 15h ou 17h30 ?"],
  };
  const langChat = $("#langChat");
  const setLang = (l) => {
    $$("#langTabs .lang-tab").forEach((t) => t.setAttribute("aria-selected", String(t.textContent === l)));
    langChat.innerHTML = `<div class="pop">${bubble(langs[l][0], { out: true })}${bubble(langs[l][1], { cls: "mt-2" })}</div>`;
  };
  $$("#langTabs .lang-tab").forEach((t) => t.addEventListener("click", () => setLang(t.textContent)));
  setLang("English");

  /* ---------- Waitlist replay demo ---------- */
  const day = [
    { t: "1:00 pm", n: "Hana", s: "Cut & finish · 60 min" },
    { t: "2:30 pm", n: "Aisha", s: "Root colour · 90 min" },
    { t: "4:30 pm", n: "Noor", s: "Blowdry · 45 min" },
    { t: "5:30 pm", n: "Priya", s: "Gloss · 60 min" },
  ];
  const waitlistEl = $("#waitlist");
  const panel = (title, right, body) =>
    `<div class="panel"><div class="panel-head"><span>${esc(title)}</span><span>${esc(right)}</span></div>${body}</div>`;
  let step = 0, lastStep = -1, wlTimer = null;

  function renderWaitlist() {
    const slotName = step < 1 ? "Noor" : step < 4 ? null : "Sara";
    const newly = (s) => step >= s && lastStep < s;   // animate only messages that just appeared

    const chatNoor = `<div class="chat-pattern">
      ${bubble("Hi Noor, a reminder of your blowdry tomorrow at 4:30 pm. Reply to reschedule or cancel.", { out: true, time: "7:00 PM" })}
      ${step >= 1 ? bubble("Something came up, I need to cancel, sorry!", { time: "7:12 PM", pop: newly(1) }) : ""}
      ${step >= 1 ? bubble("No problem, it's cancelled ✓", { out: true, pop: newly(1) }) : ""}
    </div>`;

    const schedule = day.map((d) => {
      const isSlot = d.t === "4:30 pm";
      const name = isSlot ? slotName : d.n;
      return `<div class="slot"><span>${d.t}</span>
        <div class="slot-box${name ? "" : " open"}">
          <p>${esc(name || "Open slot")}</p>
          <p>${esc(isSlot && !name ? "Offering to waitlist…" : d.s)}</p>
        </div></div>`;
    }).join("");

    const queue = ["Sara", "Fatima", "Meera"].map((n, i) => {
      let cls = "wl";
      if (i === 0 && step >= 2 && step < 4) cls += " offered";
      if (i === 0 && step >= 4) cls += " done";
      return `<div class="${cls}"><span class="n">${i + 1}</span>
        <div><p>${n}</p><p>Blowdry · ${i === 2 ? "7:00" : "4:30"} pm</p></div></div>`;
    }).join("");

    const chatSara = `<div class="chat-pattern">
      ${bubble("Any chance of a blowdry tomorrow at 4:30?", { time: "2:05 PM" })}
      ${bubble("It's booked, but I've added you to the waitlist — 1st in line.", { out: true, time: "2:06 PM" })}
      ${step >= 2 ? bubble("Good news! 4:30 pm just opened up. Reply YES to take it.", { out: true, time: "7:13 PM", pop: newly(2) }) : ""}
      ${step >= 3 ? bubble("YES!", { time: "7:14 PM", pop: newly(3) }) : ""}
      ${step >= 4 ? bubble("Booked ✓ See you at 4:30 pm.", { out: true, pop: newly(4) }) : ""}
    </div>`;

    waitlistEl.innerHTML =
      panel("Chat", "Noor", chatNoor) +
      panel("Tomorrow", "Mia · Stylist", schedule) +
      panel("Waitlist", `${step >= 4 ? 2 : 3} waiting`, queue) +
      panel("Chat", "Sara", chatSara);
    lastStep = step;
  }

  function runWaitlist() {
    clearInterval(wlTimer);
    step = 0; lastStep = -1;
    renderWaitlist();
    wlTimer = setInterval(() => {
      if (step < 4) { step++; renderWaitlist(); } else clearInterval(wlTimer);
    }, 1500);
  }
  $("#replayBtn").addEventListener("click", runWaitlist);
  // start the demo when it scrolls into view
  const wlIO = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { runWaitlist(); wlIO.disconnect(); }
  }, { threshold: 0.2 });
  renderWaitlist();
  wlIO.observe(waitlistEl);

  /* ---------- FAQ accordion ---------- */
  const faqs = [
    { g: "Channels", q: [
      ["Which messaging channels does ZYNA work with?", "ZYNA is designed to work inside the messaging apps your customers already use. The supported channel list is being finalised — contact us to confirm yours."],
      ["How are rescheduling and cancellations handled?", "Customers reply in the same conversation. ZYNA checks availability, frees the original slot and updates the booking."],
    ]},
    { g: "General & setup", q: [
      ["Do customers need to download an app?", "No. Customers simply send a message — no app, account or password needed."],
      ["How long does setup take?", "You add your services, staff and opening hours, then connect your channel. Exact setup times will be confirmed during onboarding."],
    ]},
    { g: "Integrations", q: [
      ["Does ZYNA sync with my calendar?", "Calendar integrations are planned. The list of supported calendars and booking systems is to be confirmed."],
      ["Can ZYNA handle multiple staff and locations?", "ZYNA is designed to assign bookings to the right staff member. Location limits per plan will be announced with pricing."],
    ]},
    { g: "Pricing & support", q: [
      ["How much does ZYNA cost?", "Pricing hasn't been announced yet. Get in touch and we'll share details as soon as they're available."],
      ["What if a customer asks something ZYNA can't answer?", "The conversation is flagged in your dashboard so your team can take over. A human always has the final word."],
    ]},
  ];
  const faqList = $("#faqList");
  let qi = 0;
  faqList.innerHTML = faqs.map((g) => `<div><h3>${esc(g.g)}</h3>${g.q.map(([q, a]) => {
    const id = "faq-" + qi++;
    return `<div class="faq-item${id === "faq-0" ? " open" : ""}">
      <button class="faq-q" aria-expanded="${id === "faq-0"}" aria-controls="${id}">${esc(q)}${icon("chev")}</button>
      <div class="faq-a" id="${id}" role="region"><div><p>${esc(a)}</p></div></div>
    </div>`;
  }).join("")}</div>`).join("");
  $$(".faq-q", faqList).forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const willOpen = !item.classList.contains("open");
    $$(".faq-item", faqList).forEach((it) => {
      it.classList.remove("open");
      $(".faq-q", it).setAttribute("aria-expanded", "false");
    });
    if (willOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
  }));

  /* ---------- Contact form ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const s = $("#formStatus");
    s.classList.remove("show"); void s.offsetWidth; s.classList.add("show");
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
