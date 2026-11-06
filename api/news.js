// Seb Saathi — apple news bulletins (Vercel serverless function)
// GET /api/news?lang=en|hi  →  { items: [{ title, url, source, date }], at }
// Reads Google News search feeds about apple growing in Himachal, Kashmir and Uttarakhand,
// drops Apple-the-company stories, and caches the result for 30 minutes on Vercel's edge.
// No keys or settings needed.

const FEEDS = {
  en: [
    '"apple growers" OR "apple orchards" OR "apple orchardists" OR "apple farmers" OR "apple crop" OR "apple mandi" OR "apple season" OR "apple prices" Himachal OR Kashmir OR Shimla OR Kinnaur OR Kullu OR Uttarakhand',
    '"Himachal apple" OR "Kashmir apple" OR "apple economy" OR "apple belt" OR "apple boxes" OR "apple scab" OR "apple import duty"'
  ],
  hi: [
    'सेब बागवान OR सेब बागवानों OR सेब मंडी OR सेब सीजन OR सेब की फसल OR सेब के दाम OR सेब उत्पादक',
    'हिमाचल सेब OR कश्मीर सेब OR शिमला सेब OR किन्नौर सेब'
  ]
};
const HL = { en: "hl=en-IN&gl=IN&ceid=IN:en", hi: "hl=hi&gl=IN&ceid=IN:hi" };
// Apple the company, and other noise
const NOISE = /\b(iphone|ipad|ipados|macbook|imac|mac\s?os|macos|ios\s?\d|airpods|apple\s?watch|vision\s?pro|apple\s?(inc|tv|music|pay|store|intelligence|card|arcade|event|stock|shares)|tim\s?cook|aapl|cupertino|app\s?store|wwdc|siri)\b|आईफोन|आईफ़ोन|मैकबुक|एप्पल\s?(स्टोर|वॉच)/i;

function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .trim();
}
const tag = (xml, t) => { const m = new RegExp("<" + t + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + t + ">", "i").exec(xml); return m ? decode(m[1]) : ""; };

function parse(xml) {
  const out = [];
  const items = String(xml).match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const it of items) {
    let title = tag(it, "title");
    const source = tag(it, "source");
    const url = tag(it, "link");
    const date = Date.parse(tag(it, "pubDate")) || 0;
    if (source && title.endsWith(" - " + source)) title = title.slice(0, -(source.length + 3));
    title = title.replace(/<[^>]+>/g, "").trim();
    if (!title || !/^https?:\/\//.test(url)) continue;
    out.push({ title, url, source, date });
  }
  return out;
}

async function feed(q, lang) {
  const url = "https://news.google.com/rss/search?q=" + encodeURIComponent(q + " when:30d") + "&" + HL[lang];
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { "User-Agent": "Mozilla/5.0 (compatible; SebSaathiNews/1.0)", Accept: "application/rss+xml,application/xml,text/xml" } });
    if (!r.ok) return [];
    return parse(await r.text());
  } catch (e) {
    return [];
  } finally { clearTimeout(timer); }
}

function send(res, code, obj, cache) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache || "no-store");
  res.end(JSON.stringify(obj));
}

module.exports = async (req, res) => {
  if (req.method !== "GET") return send(res, 405, { error: "method" });
  const q = new URL(req.url, "http://x").searchParams;
  const lang = q.get("lang") === "hi" || q.get("lang") === "hn" ? "hi" : "en";
  const lists = await Promise.all(FEEDS[lang].map(f => feed(f, lang)));
  const seen = new Set(), items = [];
  for (const x of lists.flat().sort((a, b) => b.date - a.date)) {
    if (NOISE.test(x.title)) continue;
    const key = x.title.toLowerCase().replace(/[^a-z0-9ऀ-ॿ]+/g, " ").trim().slice(0, 70);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ title: x.title, url: x.url, source: x.source, date: x.date ? new Date(x.date).toISOString() : null });
    if (items.length >= 15) break;
  }
  if (!items.length) return send(res, 502, { error: "nonews", items: [] }, "s-maxage=120");
  send(res, 200, { items, at: new Date().toISOString() }, "public, s-maxage=1800, stale-while-revalidate=86400");
};
