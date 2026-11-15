/* Seb Saathi — messages from the admin (admin → Broadcast), shown as a banner at the top of the site.
   Only the growers the message is meant for see it: everyone / signed-in / Free / paid, and optionally only near a place
   or with a village name (from the grower's own orchard record). A grower can close it; it stays closed on that phone.
   Table public.announcements (supabase/brief_broadcast.sql). Also opens the disease check for links like sebsaathi.com/?go=diag. */
(function () {
  if (typeof sb === "undefined" || !sb) return;
  let LIST = null, shown = "", last = "";
  const closed = () => { try { return JSON.parse(localStorage.getItem("ann-closed") || "[]"); } catch (e) { return []; } };
  const km = (a, b, c, d) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
  const e = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const L = o => { o = o || {}; const l = typeof lang !== "undefined" ? lang : "hn"; return o[l] || (l === "hl" ? o.hn : "") || o.hn || o.hi || o.en || ""; };
  function fits(a) {
    const au = a.audience || {}, signed = typeof user !== "undefined" && !!user;
    const paid = typeof myPlanState === "function" ? !!myPlanState().paid : false;
    if (au.who === "growers" && !signed) return false;
    if (au.who === "free" && (!signed || paid)) return false;
    if (au.who === "paid" && !paid) return false;
    if (au.near || au.words) {
      if (!signed || typeof S === "undefined" || !S || !Array.isArray(S.orchards)) return false;
      const O = S.orchards.filter(o => o && !o.ex);
      return O.some(o => { const p = o.profile || {};
        return (au.near && p.lat != null && p.lat !== "" && km(+p.lat, +p.lon, au.near.lat, au.near.lon) <= au.near.km) ||
          (au.words && String(p.village || "").toLowerCase().indexOf(String(au.words).toLowerCase()) >= 0); });
    }
    return true;
  }
  function pick() {
    if (!LIST) return null;
    const c = closed(), order = { alert: 0, offer: 1, info: 2 };
    return LIST.filter(a => c.indexOf(a.id) < 0 && fits(a)).sort((x, y) => order[x.kind] - order[y.kind])[0] || null;
  }
  function draw() {
    const a = pick(), key = a ? a.id + "|" + (typeof lang !== "undefined" ? lang : "") : "";
    let el = document.getElementById("annBar");
    if (!a) { if (el) el.remove(); last = ""; return; }
    if (key === last && el) return;
    last = key;
    if (!el) {
      el = document.createElement("div"); el.id = "annBar"; el.setAttribute("role", "region"); el.setAttribute("aria-label", "Seb Saathi");
      const h = document.querySelector("header.top"); if (h && h.parentNode) h.parentNode.insertBefore(el, h.nextSibling); else document.body.prepend(el);
    }
    const ic = a.kind === "alert" ? "⚠️" : a.kind === "offer" ? "🎁" : "🍎", lab = L(a.link_label) || "OK";
    const btn = !a.link ? "" : /^lgo:/.test(a.link) ? '<button type="button" class="annbtn" data-lgo="' + e(a.link.slice(4)) + '" data-annclick="1">' + e(lab) + "</button>"
      : '<a class="annbtn" data-annclick="1" href="' + e(a.link) + '"' + (/^https?:/.test(a.link) && a.link.indexOf(location.host) < 0 ? ' target="_blank" rel="noopener"' : "") + ">" + e(lab) + "</a>";
    el.className = "annbar ann-" + a.kind;
    el.innerHTML = '<div class="annin"><span class="annic" aria-hidden="true">' + ic + '</span><div class="anntx">' + (L(a.title) ? "<b>" + e(L(a.title)) + "</b>" : "") + (L(a.body) ? "<span>" + e(L(a.body)) + "</span>" : "") + "</div>" + btn +
      '<button type="button" class="annx" aria-label="Close" data-annx="1">✕</button></div>';
    el.dataset.id = a.id;
    if (shown.indexOf(a.id) < 0) { shown += a.id + ","; let s = ""; try { s = sessionStorage.getItem("ann-seen") || ""; } catch (x) {}
      if (s.indexOf(a.id) < 0) { try { sessionStorage.setItem("ann-seen", s + a.id + ","); } catch (x) {} sb.rpc("ann_seen", { aid: a.id, what: "view" }).then(() => {}, () => {}); } }
  }
  async function load() {
    try { const r = await sb.from("announcements").select("id,kind,title,body,link,link_label,audience,starts_at,ends_at").order("starts_at", { ascending: false }).limit(20); LIST = r && !r.error ? (r.data || []) : []; }
    catch (x) { LIST = []; }
    draw();
  }
  document.addEventListener("click", ev => {
    const x = ev.target.closest && ev.target.closest("#annBar [data-annx], #annBar [data-annclick]"); if (!x) return;
    const bar = document.getElementById("annBar"), id = bar && bar.dataset.id; if (!id) return;
    if (x.dataset.annclick) { sb.rpc("ann_seen", { aid: id, what: "click" }).then(() => {}, () => {}); return; }
    const c = closed(); c.push(id); try { localStorage.setItem("ann-closed", JSON.stringify(c.slice(-50))); } catch (y) {}
    last = ""; draw();
  });
  const css = document.createElement("style");
  css.textContent = ".annbar{margin:0 auto 6px;max-width:1100px;padding:0 14px}.annin{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-radius:14px;padding:10px 12px;background:#E8F4E6;border:1px solid #B9DDB4;color:#123222}" +
    ".ann-alert .annin{background:#FDE7E4;border-color:#F3B4AE;color:#5A120D}.ann-offer .annin{background:#FFF4D6;border-color:#F2C14E;color:#4A3500}" +
    ".annic{font-size:1.4rem}.anntx{flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:2px;line-height:1.35}.anntx b{font-size:1.02rem}" +
    ".annbtn{background:#2F8F3A;color:#fff;border:0;border-radius:10px;padding:9px 14px;font:600 .95rem inherit;cursor:pointer;text-decoration:none;min-height:40px}.ann-alert .annbtn{background:#B5301F}" +
    ".annx{background:none;border:0;font-size:1.1rem;cursor:pointer;color:inherit;opacity:.7;min-width:40px;min-height:40px}";
  document.head.appendChild(css);
  load();
  /* growers' plan, orchards and language arrive a little later: check again now and then */
  setInterval(draw, 2500);
  setInterval(load, 10 * 60 * 1000);
  /* links in WhatsApp messages: sebsaathi.com/?go=diag opens the disease check */
  try {
    const go = new URLSearchParams(location.search).get("go");
    if (go && /^(diag|chat|calc|rec)$/.test(go)) setTimeout(() => { const b = document.querySelector('[data-lgo="' + go + '"]'); if (b) b.click(); history.replaceState(null, "", location.pathname + location.hash); }, 1200);
  } catch (x) {}
})();
