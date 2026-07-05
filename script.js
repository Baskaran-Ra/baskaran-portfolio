/* ============================================
   BASKARAN R — PORTFOLIO INTERACTIONS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Loader ---------- */
  const loader = document.querySelector(".loader");
  window.setTimeout(() => loader && loader.classList.add("hidden"), 650);

  /* ---------- Scroll progress + nav state ---------- */
  const progress = document.querySelector(".scroll-progress");
  const nav = document.querySelector(".nav");
  const toTop = document.querySelector(".to-top");

  function onScroll() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + "%";
    if (nav) nav.classList.toggle("scrolled", h.scrollTop > 8);
    if (toTop) toTop.classList.toggle("show", h.scrollTop > 500);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle && navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  document.querySelectorAll(".nav-link").forEach((l) =>
    l.addEventListener("click", () => navLinks && navLinks.classList.remove("open"))
  );

  /* ---------- Scroll-spy active link ---------- */
  const sections = document.querySelectorAll("section[id]");
  const spyLinks = document.querySelectorAll(".nav-link");
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spyLinks.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          active && active.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => revealObserver.observe(el));

  /* ---------- Cursor spotlight (desktop only) ---------- */
  const spotlight = document.querySelector(".spotlight");
  if (spotlight && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      spotlight.style.setProperty("--x", e.clientX + "px");
      spotlight.style.setProperty("--y", e.clientY + "px");
    });
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- Code window typing ---------- */
  const codeBody = document.getElementById("codeBody");
  if (codeBody) {
    const lines = [
      { t: [["kw", "const"], ["pl", " engineer "], ["punc", "= {"]] },
      { t: [["key", "  name"], ["punc", ": "], ["str", '"Baskaran R"'], ["punc", ","]] },
      { t: [["key", "  role"], ["punc", ": "], ["str", '"Front-End Developer"'], ["punc", ","]] },
      { t: [["key", "  focus"], ["punc", ": "], ["punc", "["], ["str", '"React"'], ["punc", ", "], ["str", '"Next.js"'], ["punc", ", "], ["str", '"TypeScript"'], ["punc", "],"]] },
      { t: [["key", "  experience"], ["punc", ": "], ["num", "4"], ["pl", "+ "], ["str", '"years"'], ["punc", ","]] },
      { t: [["key", "  basedIn"], ["punc", ": "], ["str", '"Chennai, India"'], ["punc", ","]] },
      { t: [["key", "  currentlyBuilding"], ["punc", ": "], ["str", '"fast, accessible UIs"'], ["punc", ","]] },
      { t: [["key", "  available"], ["punc", ": "], ["kw", "true"]] },
      { t: [["punc", "};"]] },
      { t: [["com", "// let's build something great →"]] },
    ];
    let lineIndex = 0;

    function renderToken(tok) {
      const [cls, text] = tok;
      const map = { kw: "tok-kw", key: "tok-key", punc: "tok-punc", str: "tok-str", num: "tok-num", com: "tok-com", pl: "" };
      const span = document.createElement("span");
      span.className = map[cls] || "";
      span.textContent = text;
      return span;
    }

    function typeLine() {
      if (lineIndex >= lines.length) {
        const cursor = codeBody.querySelector(".cursor-blink");
        cursor && cursor.remove();
        return;
      }
      const lineWrap = document.createElement("div");
      const lnNum = document.createElement("span");
      lnNum.className = "ln";
      lnNum.textContent = lineIndex + 1;
      lineWrap.appendChild(lnNum);
      codeBody.appendChild(lineWrap);

      const tokens = lines[lineIndex].t;
      let tIndex = 0;

      function typeToken() {
        if (tIndex >= tokens.length) {
          lineIndex++;
          window.setTimeout(typeLine, 90);
          return;
        }
        lineWrap.appendChild(renderToken(tokens[tIndex]));
        tIndex++;
        window.setTimeout(typeToken, 14);
      }
      typeToken();
    }

    const cursor = document.createElement("span");
    cursor.className = "cursor-blink";
    codeBody.appendChild(cursor);
    window.setTimeout(typeLine, 500);
  }

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      projectCards.forEach((card) => {
        const show = f === "all" || card.dataset.tags.includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Contact form (Formbold) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending…";
      status.style.color = "var(--muted)";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          status.textContent = "Message sent — I'll get back to you soon.";
          status.style.color = "var(--green)";
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          status.textContent = data.errors ? data.errors.map((x) => x.message).join(", ") : "Something went wrong. Please try again.";
          status.style.color = "var(--red)";
        }
      } catch {
        status.textContent = "Network error — please email me directly instead.";
        status.style.color = "var(--red)";
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
