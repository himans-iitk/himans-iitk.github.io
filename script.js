// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the nav link for the section currently in view
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute("href") === `#${id}` ? "" : "";
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

/* ============ Beyond Research: click-to-reveal ============ */
(function beyondToggle() {
  const btn = document.getElementById("beyondToggle");
  const panel = document.getElementById("beyondPanel");
  if (!btn || !panel) return;

  const open = () => {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "Hide the human side";
  };
  const close = () => {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Show the human side";
  };

  btn.addEventListener("click", () => {
    panel.hidden ? open() : close();
  });

  // If someone lands via the "Beyond Research" nav link, reveal it for them.
  document.querySelectorAll('a[href="#beyond"]').forEach((link) => {
    link.addEventListener("click", open);
  });
})();

/* ============ Next-token prediction easter egg ============ */
(function tokenPrediction() {
  const tokens = document.querySelectorAll(".token");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Descending "probabilities" for the top-k list (chosen word gets the highest).
  const PROBS = [0.71, 0.14, 0.09, 0.06];

  tokens.forEach((el) => {
    const original = el.textContent.trim();
    const alts = (el.getAttribute("data-alts") || "").split("|").map((s) => s.trim()).filter(Boolean);
    const vocab = [original, ...alts];

    // Build the hover "logits" popover once.
    const pop = document.createElement("span");
    pop.className = "token-popover";
    pop.setAttribute("aria-hidden", "true");
    pop.innerHTML =
      '<div class="pop-head">next-token · top-k</div>' +
      vocab
        .map((w, i) => {
          const p = PROBS[i] ?? 0.03;
          return (
            `<div class="pop-row${i === 0 ? " is-top" : ""}">` +
            `<span class="pop-word">${w}</span>` +
            `<span class="pop-bar"><span style="width:${Math.round(p * 100)}%"></span></span>` +
            `<span class="pop-prob">${p.toFixed(2)}</span>` +
            "</div>"
          );
        })
        .join("");
    el.appendChild(pop);

    if (reduce || vocab.length < 2) return;

    // Occasionally "resample" the word: brief caret, swap, then settle back.
    let idx = 0;
    const swap = () => {
      el.classList.add("sampling");
      setTimeout(() => {
        idx = (idx + 1) % vocab.length;
        el.firstChild.textContent = vocab[idx];
        el.classList.remove("sampling");
      }, 320);
    };

    // Stagger each token so they don't all flip in unison.
    const period = 3600 + Math.random() * 2600;
    setTimeout(() => setInterval(swap, period), Math.random() * 2000);
  });
})();
