// Seb Saathi offline helper.
// The main page ("/"): open the saved copy straight away (fast on slow hill networks), fetch the latest in the background,
// and tell the page when a newer version has arrived so it can offer "Refresh". First visit: from the internet.
// Other pages (login, admin, privacy): internet first, saved copy only when offline.
// Versioned site code (?v=…): saved copy first, refreshed in the background. Other site code: internet first.
// Fonts, icons and the sign-in library: saved copy, refreshed in the background.
// Never touches sign-in, saving, or the photo check (/api, supabase.co): those always need the internet.
const CACHE = "seb-saathi-v6";
const CORE = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png"];
let pendingUpdate = false;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* the page asks on load whether a newer copy came in while it was opening */
self.addEventListener("message", e => {
  if (e.data && e.data.type === "check" && pendingUpdate && e.source) { e.source.postMessage({type: "sw-updated"}); pendingUpdate = false; }
});

const STATIC_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net"];

async function sameBody(a, b) {
  const ea = a.headers.get("etag"), eb = b.headers.get("etag");
  if (ea && eb) return ea === eb;
  try { return (await a.clone().text()) === (await b.clone().text()); } catch (err) { return true; }
}
async function tellPages() {
  pendingUpdate = true;
  const cs = await self.clients.matchAll({type: "window"});
  cs.forEach(c => c.postMessage({type: "sw-updated"}));
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (same && url.pathname.startsWith("/api/")) return;
  if (!same && !STATIC_HOSTS.includes(url.hostname)) return;

  if (req.mode === "navigate") {
    const main = same && (url.pathname === "/" || url.pathname === "/index.html");
    if (main) {
      e.respondWith(caches.open(CACHE).then(async c => {
        const hit = await c.match("/"), old = hit ? hit.clone() : null;   /* a copy to compare with: the page uses up "hit" */
        const net = fetch(url.href, {cache: "no-cache", credentials: "same-origin"}).then(async res => {
          if (res.ok && res.type === "basic") {
            const changed = old ? !(await sameBody(old, res)) : false;
            await c.put("/", res.clone());
            if (changed) tellPages();
          }
          return res;
        });
        if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
        return net.catch(() => Response.error());
      }));
      return;
    }
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(url.pathname, copy)); }
        return res;
      }).catch(() => caches.match(url.pathname).then(r => r || caches.match("/")).then(r => r || Response.error()))
    );
    return;
  }

  // Site code with a version in the address (?v=…): a new version gets a new address, so the saved copy is safe to use first.
  if (same && /\.(js|css|json)$/.test(url.pathname) && url.searchParams.has("v")) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; });
        if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
        return net.catch(() => Response.error());
      })
    );
    return;
  }

  // Other site code (.js, .css, .json): internet first so updates show straight away; saved copy only when offline.
  if (same && /\.(js|css|json)$/.test(url.pathname)) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then(r => r || Response.error()))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
