/* Seb Saathi admin — the wide-screen layout (computer and tablet screens, 1100 pixels and wider)
   On a phone nothing changes. On a big screen:
   - the tabs become a menu down the left side,
   - sections that start with a small heading (Overview, Growth, AI quality, Site health, Today) become cards, side by side,
   - Social handler: Today, Results and Settings show their sections in two columns; while you make something in Create,
     your Saved library sits on the right.
   The cards are made after each screen is drawn, so the code that draws each tab stays the same. Loaded last. */
(function () {
  const WIDE = window.matchMedia("(min-width:1100px)");
  const HOSTS = ["ovTab", "ovSoc", "grBody", "aqBody", "opBody", "tdBody"];
  const isHead = el => el.matches("h5.ovsub, details.svdays") || el.id === "ovSoc";
  const busy = new WeakSet();

  /* a card is wide (whole row) when it holds a chart or a table with many columns */
  const isWide = card => !!card.querySelector(".svchart, #ovSoc") || card.id === "ovSoc" ||
    Array.from(card.querySelectorAll("table")).some(t => (t.tHead && t.tHead.rows[0] ? t.tHead.rows[0].cells.length : 0) > 5);

  function cardify(host) {
    if (!host || busy.has(host)) return;
    const kids = Array.from(host.children);
    if (!kids.some(k => !k.classList.contains("wcard") && !k.classList.contains("wpre"))) return;   /* already done */
    busy.add(host);
    try {
      host.classList.add("wgrid");
      let cur = null;
      kids.forEach(k => {
        if (k.classList.contains("wcard")) { cur = null; return; }
        if (k.id === "ovSoc") { k.classList.add("wcard", "wfull"); cur = null; return; }   /* the social stats: a grid of their own */
        if (isHead(k)) { cur = document.createElement("div"); cur.className = "wcard"; host.insertBefore(cur, k); }
        if (cur) cur.appendChild(k); else k.classList.add("wpre");   /* anything before the first heading stays full width */
      });
      host.querySelectorAll(":scope > .wcard").forEach(c => c.classList.toggle("wfull", isWide(c)));
    } finally { setTimeout(() => busy.delete(host), 0); }
  }
  function uncardify(host) {
    if (!host || !host.classList.contains("wgrid")) return;
    busy.add(host);
    host.classList.remove("wgrid");
    Array.from(host.children).forEach(c => {
      c.classList.remove("wpre");
      if (c.classList.contains("wcard") && c.id !== "ovSoc") { while (c.firstChild) host.insertBefore(c.firstChild, c); c.remove(); }
      else c.classList.remove("wcard", "wfull");
    });
    setTimeout(() => busy.delete(host), 0);
  }
  /* each host is watched: when its tab draws new content, the cards are made again */
  const seen = new WeakSet();
  const obs = new MutationObserver(list => {
    if (!WIDE.matches) return;
    const hosts = new Set(list.map(m => m.target).filter(t => HOSTS.indexOf(t.id) >= 0));
    hosts.forEach(cardify);
    watchAll();
  });
  function watchAll() {
    HOSTS.forEach(id => { const h = document.getElementById(id); if (h && !seen.has(h)) { seen.add(h); obs.observe(h, { childList: true }); } if (h && WIDE.matches) cardify(h); });
  }

  /* Social handler */
  function mkLayout() {
    const wrap = document.getElementById("mkWrap"); if (!wrap) return;
    const sub = typeof mkSub !== "undefined" ? mkSub : "", make = typeof mkMake !== "undefined" ? mkMake : "";
    wrap.dataset.sub = sub;
    const side = WIDE.matches && sub === "create" && make !== "saved" && make !== "week" && typeof svHtml === "function";
    wrap.classList.toggle("wside", side);
    let box = document.getElementById("wideSide");
    if (!side) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement("aside"); box.id = "wideSide"; wrap.appendChild(box); }
    box.innerHTML = svHtml();
  }
  if (typeof renderMk === "function") {
    const wRM0 = renderMk;
    renderMk = function () { wRM0.apply(this, arguments); try { mkLayout(); } catch (e) { console.error("wide", e); } };
  }

  function apply() {
    document.documentElement.classList.toggle("wide", WIDE.matches);
    if (WIDE.matches) watchAll(); else HOSTS.forEach(id => uncardify(document.getElementById(id)));
    try { mkLayout(); } catch (e) {}
  }
  if (WIDE.addEventListener) WIDE.addEventListener("change", apply); else if (WIDE.addListener) WIDE.addListener(apply);
  apply();
  /* hosts drawn later (a tab opened for the first time) */
  document.addEventListener("click", e => { if (e.target.closest && e.target.closest(".admtabs .tab")) setTimeout(watchAll, 50); });
})();
