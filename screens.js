/* Seb Saathi admin — real website screens for videos
   The video maker can show the real Seb Saathi website on a phone instead of drawn pictures.
   The site is opened in a hidden frame in "screens mode" (index.html ?shots=1): a pretend grower with example records,
   nothing real is read or saved. Each screen is turned into a picture by the browser itself, so it looks exactly like the site.
   Used by "Create a video for me" (Pictures → Real Seb Saathi screens) and by the picture chooser of each scene in the Video Studio.
   Loaded after studio.js and autovid.js. */
Object.assign(T.en, {
  av_p_screens: "📱 Real Seb Saathi screens",
  av_p_screens_p: "Each scene shows the real website on a phone, scrolling gently, with example records (never a grower's real numbers). Scenes no screen fits get a drawn picture.",
  av_s_scr: "Taking pictures of the website screens…", scr_err: "Website screens could not be taken ({m}), so drawn pictures were used.",
  scr_grp: "📱 Seb Saathi screens", scr_busy: "Taking the screen…",
  scr_home: "Home", scr_orchard: "Orchard Record", scr_profit: "Profit (Munafa)", scr_sales: "Season sales record", scr_expenses: "Expenses (Kharche)",
  scr_diagnose: "Disease check result", scr_spray: "Spray schedule", scr_calendar: "Season calendar"
});
Object.assign(T.hi, {
  av_p_screens: "📱 सेब साथी की असली स्क्रीन",
  av_p_screens_p: "हर सीन में फ़ोन पर असली वेबसाइट दिखेगी, धीरे-धीरे स्क्रॉल होती हुई, उदाहरण रिकॉर्ड के साथ (किसी बागवान के असली आँकड़े नहीं)। जिस सीन पर कोई स्क्रीन नहीं बैठती, उसमें बना हुआ चित्र लगेगा।",
  av_s_scr: "वेबसाइट की स्क्रीन की तस्वीरें ली जा रही हैं…", scr_err: "वेबसाइट की स्क्रीन नहीं ली जा सकीं ({m}), इसलिए बने हुए चित्र लगाए गए।",
  scr_grp: "📱 सेब साथी की स्क्रीन", scr_busy: "स्क्रीन ली जा रही है…",
  scr_home: "होम", scr_orchard: "बाग़ रिकॉर्ड", scr_profit: "मुनाफ़ा", scr_sales: "सीज़न बिक्री रिकॉर्ड", scr_expenses: "ख़र्चे",
  scr_diagnose: "रोग जाँच का नतीजा", scr_spray: "स्प्रे सूची", scr_calendar: "सीज़न कैलेंडर"
});

const SCR_KEYS = ["home", "orchard", "profit", "sales", "expenses", "diagnose", "spray", "calendar"];
/* when the AI gave no screen: the screen that goes with the drawn picture */
const SCR_ART = { chart: "profit", money: "profit", crate: "sales", leaf_spots: "diagnose", camera: "diagnose", bug: "diagnose", spray: "spray", calendar: "calendar", tree: "orchard", soil: "orchard", phone: "home", family: "orchard" };
const SCR = { frame: null, lang: "", cache: {}, lock: Promise.resolve() };
const scrLang = l => l === "hl" ? "hn" : ["hi", "hn", "en"].indexOf(l) >= 0 ? l : "hi";
const scrSleep = ms => new Promise(r => setTimeout(r, ms));

/* the hidden frame with the site in screens mode, in the video's language */
async function scrFrame(lang) {
  const ok = () => { try { const w = SCR.frame.contentWindow; return w && w.shotsReady && w.shotsOk && w.shotsOk(); } catch (e) { return false; } };
  if (SCR.frame && SCR.lang === lang && ok()) return SCR.frame.contentWindow;
  if (SCR.frame) SCR.frame.remove();
  const f = document.createElement("iframe");
  f.setAttribute("aria-hidden", "true"); f.tabIndex = -1; f.title = "screens";
  f.style.cssText = "position:fixed;left:-3000px;top:0;width:390px;height:844px;border:0;opacity:0;pointer-events:none";
  f.src = "/?shots=1&lang=" + lang + "&t=" + Date.now();
  document.body.appendChild(f); SCR.frame = f; SCR.lang = lang;
  const t0 = Date.now();
  while (!ok()) { if (Date.now() - t0 > 30000) throw new Error("the website did not open"); await scrSleep(250); }
  await scrSleep(500);
  return f.contentWindow;
}
/* one screen as a picture, ready for the video (kept for the rest of the visit) */
function scrGet(key, lang) {
  lang = scrLang(lang);
  const id = lang + ":" + key;
  if (SCR.cache[id]) return SCR.cache[id];
  const job = SCR.lock.then(async () => {
    const w = await scrFrame(lang);
    const r = await w.shotsGrab(key);
    if (!r || !r.blob) throw new Error("no picture");
    const el = new Image(); el.src = URL.createObjectURL(r.blob); await el.decode();
    return { type: "scr", el, bar: r.barH || 0, key, name: tr("scr_" + key) };
  });
  SCR.lock = job.catch(() => {});
  SCR.cache[id] = job;
  job.catch(() => { delete SCR.cache[id]; });
  return job;
}
const scrKeyOf = s => SCR_KEYS.indexOf(s.screen) >= 0 ? s.screen : s.screen === "none" ? "" : SCR_ART[s.art] || "";
/* "Create a video for me": a screen for every scene that has one (in scene order; empty where a drawing fits better) */
async function scrForScenes(scenes, lang) {
  if (typeof avStep === "function") avStep("av_s_scr");
  const out = [];
  try { for (const s of scenes) { const k = scrKeyOf(s); out.push(k ? await scrGet(k, lang) : null); } }
  catch (e) { AV.note = (AV.note ? AV.note + " " : "") + tr("scr_err").replace("{m}", String(e.message || e)); return []; }
  return out;
}

/* Video Studio: the screens as choices in each scene's picture list */
if (typeof vsArtSelect === "function") {
  const scrAS0 = vsArtSelect;
  vsArtSelect = function (s, i) {
    const h = scrAS0.apply(this, arguments);
    return h.replace("</select>", '<optgroup label="' + esc(tr("scr_grp")) + '">' + SCR_KEYS.map(k => '<option value="scr:' + k + '">' + esc(tr("scr_" + k)) + "</option>").join("") + "</optgroup></select>");
  };
}
document.addEventListener("change", async e => {
  const t = e.target;
  if (!t || !t.dataset || t.dataset.vsf !== "art" || !/^scr:/.test(t.value)) return;
  const i = +String(t.id || "").replace("vs-art-", ""), sc = VS.scenes[i], key = t.value.slice(4);
  if (!sc) return;
  sc.art = "phone"; t.disabled = true;
  const opt = t.options[t.selectedIndex]; if (opt) opt.textContent = tr("scr_busy");
  try { sc.media = await scrGet(key, VS.vlang); VS.err = ""; }
  catch (x) { VS.err = tr("scr_err").replace("{m}", String(x.message || x)); }
  if (typeof vsSave === "function") vsSave();
  renderStudio(); if (typeof vsSelect === "function") vsSelect(i); if (typeof vsStill === "function") vsStill();
});
if (typeof avRender === "function" && typeof AV !== "undefined" && !AV.busy) avRender();
