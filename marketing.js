/* Seb Saathi admin: Marketing tab.
   The season plan with ticks, video ideas, ready-to-send messages, the social media setup kit,
   links to the plan doc and the poster/images canvas, and who has invited friends.
   Ticks and links are saved in public.admin_marketing (supabase/marketing.sql); until that
   table exists they are kept on this device only. Invite numbers need supabase/referrals.sql. */

Object.assign(T.en, {
  adm_t_mk: "Marketing",
  mk_h: "Marketing plan 2026–27", mk_p: "Goal: 1,000 active growers by end of June 2027. Tick tasks as you finish them.",
  mk_links_h: "Files", mk_doc: "Plan doc (edit and share)", mk_design: "Poster and social media images",
  mk_inv_h: "Invites", mk_inv_p: "Growers whose friends joined with their invite link. Every 3 friends = 1 free month.",
  mk_inv_none: "No friends have joined through invite links yet.", mk_inv_setup: "Run supabase/referrals.sql in Supabase to see invites.",
  mk_c_grower: "Grower", mk_c_joined: "Friends joined", mk_c_claimed: "Free months taken",
  mk_s_total: "Friends joined", mk_s_inviters: "Growers inviting", mk_s_months: "Free months given",
  mk_plan_h: "Season plan", mk_done_n: "{d} of {n} done",
  mk_vid_h: "First month of videos", mk_vid_p: "3 a week, under 60 seconds, filmed in your own orchards. End each one: \"Seb Saathi free hai. Link description mein.\"",
  mk_c_week: "Week", mk_c_video: "Video", mk_c_hook: "First 3 seconds", mk_c_show: "What to show", mk_c_posted: "Posted",
  mk_msg_h: "Ready-to-send messages", mk_msg_p: "Your invite link is added at the end when you copy or send.",
  mk_copy: "Copy", mk_copied: "Copied", mk_wa: "WhatsApp",
  mk_soc_h: "Social media setup", mk_soc_p: "Same name and handle everywhere: Seb Saathi, @sebsaathi. Sign up with admin@sebsaathi.com. Paste each page's link here once it is made.",
  mk_c_platform: "Platform", mk_c_link: "Your page link", mk_save: "Save", mk_saved: "Saved",
  mk_bio_s: "Short bio (Instagram)", mk_bio_l: "Long description (Facebook, YouTube, WhatsApp channel)",
  mk_bud_h: "Budget (rough, about ₹60,000 for the season)", mk_c_item: "Item", mk_c_when: "When", mk_c_cost: "Rough cost",
  mk_watch_h: "Cautions",
  mk_local: "Ticks are saved on this device only. Run supabase/marketing.sql in Supabase to keep them everywhere."
});
Object.assign(T.hi, {
  adm_t_mk: "मार्केटिंग",
  mk_h: "मार्केटिंग प्लान 2026–27", mk_p: "लक्ष्य: जून 2027 के अंत तक 1,000 सक्रिय बागवान। काम पूरा होते ही टिक करें।",
  mk_links_h: "फ़ाइलें", mk_doc: "प्लान डॉक (बदलें और शेयर करें)", mk_design: "पोस्टर और सोशल मीडिया तस्वीरें",
  mk_inv_h: "न्योते", mk_inv_p: "जिन बागवानों के न्योता लिंक से दोस्त जुड़े। हर 3 दोस्त = 1 महीना मुफ़्त।",
  mk_inv_none: "अभी तक न्योता लिंक से कोई दोस्त नहीं जुड़ा।", mk_inv_setup: "न्योते देखने के लिए Supabase में supabase/referrals.sql चलाएँ।",
  mk_c_grower: "बागवान", mk_c_joined: "जुड़े दोस्त", mk_c_claimed: "लिए मुफ़्त महीने",
  mk_s_total: "जुड़े दोस्त", mk_s_inviters: "न्योता देने वाले", mk_s_months: "दिए मुफ़्त महीने",
  mk_plan_h: "सीज़न प्लान", mk_done_n: "{n} में से {d} पूरे",
  mk_vid_h: "पहले महीने के वीडियो", mk_vid_p: "हफ़्ते में 3, 60 सेकंड से कम, अपने बाग़ में बनाए। हर वीडियो के अंत में: \"Seb Saathi free hai. Link description mein.\"",
  mk_c_week: "हफ़्ता", mk_c_video: "वीडियो", mk_c_hook: "पहले 3 सेकंड", mk_c_show: "क्या दिखाएँ", mk_c_posted: "डाला",
  mk_msg_h: "भेजने के लिए तैयार संदेश", mk_msg_p: "कॉपी करने या भेजने पर आपका न्योता लिंक अंत में जुड़ जाता है।",
  mk_copy: "कॉपी", mk_copied: "कॉपी हुआ", mk_wa: "WhatsApp",
  mk_soc_h: "सोशल मीडिया सेटअप", mk_soc_p: "हर जगह एक ही नाम और हैंडल: Seb Saathi, @sebsaathi। admin@sebsaathi.com से साइन अप करें। पेज बनते ही उसका लिंक यहाँ डालें।",
  mk_c_platform: "प्लेटफ़ॉर्म", mk_c_link: "आपके पेज का लिंक", mk_save: "सेव", mk_saved: "सेव हुआ",
  mk_bio_s: "छोटा बायो (Instagram)", mk_bio_l: "लंबा विवरण (Facebook, YouTube, WhatsApp चैनल)",
  mk_bud_h: "बजट (मोटा अनुमान, सीज़न के लिए लगभग ₹60,000)", mk_c_item: "चीज़", mk_c_when: "कब", mk_c_cost: "मोटा ख़र्च",
  mk_watch_h: "सावधानियाँ",
  mk_local: "टिक सिर्फ़ इसी डिवाइस पर सेव हैं। हर जगह रखने के लिए Supabase में supabase/marketing.sql चलाएँ।"
});

const MK_DOC = "https://claude.ai/artifact/PTXtE3NqDn7evir41iqscM";
const MK_DESIGN = "https://claude.ai/artifact/NzBuFfUyBBB27VthLgioRK";

const MK_PHASES = [
  { id: "p1", name: "Pilot", when: "Nov–Dec", target: "30 growers", tasks: [
    ["p1a", "Pick 20–30 pilot growers around Rohru and Chirgaon"],
    ["p1b", "Visit each one and enter last season's sales with them"],
    ["p1c", "Set up Facebook, Instagram, YouTube and a WhatsApp channel"],
    ["p1d", "Add the page links to the site, replacing \"coming soon\""],
    ["p1e", "Record 5–10 short testimonials"]] },
  { id: "p2", name: "Pruning season", when: "Jan–Feb", target: "200 growers", tasks: [
    ["p2a", "Post 3 videos a week"],
    ["p2b", "Send the weekly WhatsApp tip"],
    ["p2c", "Put up posters in packing houses, cold stores and transport offices"],
    ["p2d", "Attend 2–4 grower meetings or KVK days a month"]] },
  { id: "p3", name: "Spray season", when: "Mar–Jun", target: "1,000 active growers", main: true, tasks: [
    ["p3a", "Turn on the invite reward (3 friends = 1 free month)"],
    ["p3b", "Push the photo check during scab and leaf-fall season"],
    ["p3c", "Find 2–3 trusted growers in Kashmir and Uttarakhand to share it"],
    ["p3d", "Run small Facebook ads to apple districts (₹5,000–10,000 a month)"]] },
  { id: "p4", name: "Harvest", when: "Jul–Oct", target: "Paid growers", tasks: [
    ["p4a", "Push the Season sales record before each lot is sold"],
    ["p4b", "Launch paid plans, with an early-bird price for pilot growers"],
    ["p4c", "Send each grower a season report they can share"]] }
];

const MK_VIDEOS = [
  [1, "Main kaun hoon", "Main bhi aap jaisa bagwan hoon, Rohru se.", "You in your orchard; why you built Seb Saathi"],
  [1, "Asli munafa kitna?", "Har peti par aapko sach mein kitna bachta hai?", "Enter one lot on the phone; net per box appears"],
  [1, "Photo se bimari", "Ek photo, aur jawab 30 second mein.", "Tap the camera button on a canker or leaf"],
  [2, "Canker ki pehchaan", "Chhaal phat rahi hai? Ye dekhiye.", "Canker on a branch; what to do in winter"],
  [2, "Pichhle season ka hisaab", "Season khatam. Ab hisaab likhiye.", "Season sales record, filled for one orchard"],
  [2, "Kharche likhna", "Kharcha yaad nahi rehta? Phone mein likhiye.", "Add an expense in Kharche in 10 seconds"],
  [3, "Kataai ki 3 galtiyan", "Pruning mein ye 3 galtiyan mat kijiye.", "Three cuts on a real tree"],
  [3, "Kaunsa bagicha kamata hai", "Mere 3 bagichon mein se sabse zyada kaun kamata hai?", "Munafa report comparing orchards"],
  [3, "Saathi se poochho", "Raat 10 baje sawaal? Saathi se poochhiye.", "Ask Saathi a winter-care question by voice"],
  [4, "Bagwan ki kahani", "Inhone pehli baar apna asli munafa dekha.", "One pilot grower, 30 seconds (with their permission)"],
  [4, "Spray schedule", "March aa raha hai. Spray schedule taiyar?", "The spray schedule tab"],
  [4, "Dost ko bhejiye", "Apne bhai-bandhu ko bhi bataiye.", "WhatsApp share and invite link"]
];

const MK_MSGS = [
  ["To pilot growers (send personally)", "Namaste ji 🙏 Maine apne bagichon ke liye ek app banaya hai: Seb Saathi. Ismein har bagiche ka record, har lot ka asli munafa, aur photo se bimari ki jaanch hai. Free hai. Kya aap 15 minute de sakte hain? Main khud aakar pichhle season ka hisaab daal dunga."],
  ["For village and grower WhatsApp groups", "🍎 Bagwan bhaiyon ke liye: Seb Saathi\n• Har bagiche ka record ek jagah\n• Har peti par asli munafa\n• Photo bhejo, bimari ka jawab 30 second mein\nHindi, Hinglish aur English mein. Free shuruaat:"],
  ["Weekly tip (WhatsApp channel)", "🍎 Is hafte bagiche mein: patte girne ke baad canker wali tehniyan kaatkar jalayein, aur kate hisse par paste lagayein. Shaq ho to photo Seb Saathi par jaanchein:"],
  ["Reminder to pilot growers after a week", "Ji, Seb Saathi kaisa laga? Koi dikkat ho to bataiye, main theek kar dunga. Apne 2-3 dost bagwanon ko bhi bhej dijiye. 3 dost judenge to aapko 1 mahina Saathi plan free milega."]
];

const MK_SOCIAL = [["facebook", "Facebook page"], ["instagram", "Instagram"], ["youtube", "YouTube"], ["whatsapp", "WhatsApp channel"]];
const MK_BIO_S = "🍎 Seb bagwanon ka apna app\nRecord · Munafa · Photo se bimari ki jaanch\nHimachal · J&K · Uttarakhand\nFree 👇 sebsaathi.com";
const MK_BIO_L = "सेब साथी सेब बागवानों का अपना ऐप है। हर बग़ीचे का रिकॉर्ड, हर पेटी पर असली मुनाफ़ा, और फ़ोटो से बीमारी की जाँच, एक जगह। हिमाचल, जम्मू-कश्मीर और उत्तराखंड के बागवानों के लिए।\nSeb Saathi apple growers ka apna app hai: bagiche ka record, har peti par asli munafa, aur photo se bimari ki jaanch. Hindi, Hinglish aur English mein. Free shuru karein: sebsaathi.com";

const MK_BUDGET = [
  ["Posters, 200 A4 colour", "December and March", "₹3,000–5,000"],
  ["Travel to meetings and pilot growers", "December–April", "₹10,000"],
  ["Facebook ads, apple districts only", "March–June", "₹20,000–40,000"],
  ["Free months given through invites", "All season", "No cash cost"]
];
const MK_WATCH = [
  "Keep pesticide dealers out for now. Growers may start to see Saathi's advice as a sales pitch.",
  "Promise small: \"Saathi is learning\" beats \"100% accurate\".",
  "Ask before filming or naming any grower."
];

let MK = {}, mkLocal = false, mkInv = null, mkInvErr = "";
const mkRef = () => user && user.id ? String(user.id).replace(/-/g, "").slice(0, 8) : "1";
const mkLink = () => "https://sebsaathi.com/?invite=" + mkRef();
const mkCopied = {};

async function loadMk() {
  MK = {}; mkLocal = false;
  try {
    const r = await sb.from("admin_marketing").select("key,done,value");
    if (r.error) throw r.error;
    (r.data || []).forEach(x => { MK[x.key] = { done: !!x.done, value: x.value || "" }; });
  } catch (e) {
    mkLocal = true;
    try { MK = JSON.parse(localStorage.getItem("mk-state") || "{}") || {}; } catch (x) { MK = {}; }
  }
  renderMk();
  mkInv = null; mkInvErr = "";
  try { const r = await sb.rpc("admin_invites"); if (r.error) mkInvErr = "setup"; else mkInv = r.data || []; } catch (e) { mkInvErr = "setup"; }
  renderMk();
}
async function mkSave(key, patch) {
  MK[key] = Object.assign({ done: false, value: "" }, MK[key], patch);
  if (mkLocal) { try { localStorage.setItem("mk-state", JSON.stringify(MK)); } catch (e) {} return true; }
  try {
    const r = await sb.from("admin_marketing").upsert({ key, done: MK[key].done, value: MK[key].value || null, updated_at: new Date().toISOString() });
    return !r.error;
  } catch (e) { return false; }
}
const mkDone = k => !!(MK[k] && MK[k].done);
const mkBox = (k, label) => '<label class="chk mkchk"><input type="checkbox" data-mk="' + k + '"' + (mkDone(k) ? " checked" : "") + "><span>" + esc(label) + "</span></label>";

function renderMk() {
  const box = $("mkBody"); if (!box) return;
  let h = "";
  if (mkLocal) h += '<p class="fine mkwarn">' + tr("mk_local") + "</p>";
  /* files */
  h += '<h5 class="ovsub">' + tr("mk_links_h") + '</h5><div class="mklinks"><a class="btn-s" href="' + MK_DOC + '" target="_blank" rel="noopener">' + tr("mk_doc") + '</a><a class="btn-s" href="' + MK_DESIGN + '" target="_blank" rel="noopener">' + tr("mk_design") + "</a></div>";
  /* invites */
  h += '<h5 class="ovsub">' + tr("mk_inv_h") + '</h5><p class="fine">' + tr("mk_inv_p") + "</p>";
  if (mkInvErr) h += '<p class="fine">' + tr("mk_inv_setup") + "</p>";
  else if (mkInv) {
    const tot = mkInv.reduce((a, x) => a + (+x.joined || 0), 0), months = mkInv.reduce((a, x) => a + (+x.claimed || 0), 0);
    h += '<div class="ystats"><div><span>' + tr("mk_s_total") + "</span><b>" + tot + "</b></div><div><span>" + tr("mk_s_inviters") + "</span><b>" + mkInv.length + "</b></div><div><span>" + tr("mk_s_months") + "</span><b>" + months + "</b></div></div>";
    h += mkInv.length ? '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_grower") + '</th><th scope="col" class="n">' + tr("mk_c_joined") + '</th><th scope="col" class="n">' + tr("mk_c_claimed") + "</th></tr></thead><tbody>" +
      mkInv.slice(0, 50).map(x => "<tr><td>" + esc(x.email || "–") + '</td><td class="n">' + (+x.joined || 0) + '</td><td class="n">' + (+x.claimed || 0) + "</td></tr>").join("") + "</tbody></table></div>"
      : '<p class="fine">' + tr("mk_inv_none") + "</p>";
  }
  /* season plan */
  h += '<h5 class="ovsub">' + tr("mk_plan_h") + '</h5><div class="mkphases">';
  MK_PHASES.forEach(p => {
    const d = p.tasks.filter(t => mkDone(t[0])).length;
    h += '<section class="mkphase' + (p.main ? " main" : "") + '"><div class="mkph"><span class="fine">' + esc(p.when) + "</span><b>" + esc(p.name) + '</b><span class="fine">' + tr("mk_done_n").replace("{d}", d).replace("{n}", p.tasks.length) + "</span></div>" +
      p.tasks.map(t => mkBox(t[0], t[1])).join("") + '<p class="mktarget">Target: ' + esc(p.target) + "</p></section>";
  });
  h += "</div>";
  /* videos */
  h += '<h5 class="ovsub">' + tr("mk_vid_h") + '</h5><p class="fine">' + tr("mk_vid_p") + '</p><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_week") + '</th><th scope="col">' + tr("mk_c_video") + '</th><th scope="col">' + tr("mk_c_hook") + '</th><th scope="col">' + tr("mk_c_show") + '</th><th scope="col">' + tr("mk_c_posted") + "</th></tr></thead><tbody>" +
    MK_VIDEOS.map((v, i) => "<tr><td>" + v[0] + "</td><td><b>" + esc(v[1]) + "</b></td><td>" + esc(v[2]) + "</td><td>" + esc(v[3]) + '</td><td><input type="checkbox" aria-label="' + esc(tr("mk_c_posted") + ": " + v[1]) + '" data-mk="v' + (i + 1) + '"' + (mkDone("v" + (i + 1)) ? " checked" : "") + "></td></tr>").join("") + "</tbody></table></div>";
  /* messages */
  h += '<h5 class="ovsub">' + tr("mk_msg_h") + '</h5><p class="fine">' + tr("mk_msg_p") + "</p>";
  MK_MSGS.forEach((m, i) => {
    const full = m[1] + (i === 3 ? "" : "\n" + mkLink());
    h += '<div class="mkmsg"><b>' + esc(m[0]) + '</b><pre>' + esc(full) + '</pre><div class="mklinks"><button class="btn-s" type="button" data-mkcopy="m' + i + '">' + tr(mkCopied["m" + i] ? "mk_copied" : "mk_copy") + '</button><a class="btn-s wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(full) + '">' + tr("mk_wa") + "</a></div></div>";
  });
  /* social */
  h += '<h5 class="ovsub">' + tr("mk_soc_h") + '</h5><p class="fine">' + tr("mk_soc_p") + '</p><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_platform") + '</th><th scope="col">' + tr("mk_c_link") + "</th><th></th></tr></thead><tbody>" +
    MK_SOCIAL.map(s => {
      const k = "link:" + s[0], v = MK[k] ? MK[k].value || "" : "";
      return "<tr><td>" + mkBox("soc:" + s[0], s[1]) + '</td><td><input class="mkin" type="url" id="mkl-' + s[0] + '" value="' + esc(v) + '" placeholder="https://" aria-label="' + esc(s[1]) + '"></td><td><button class="btn-s" type="button" data-mksave="' + s[0] + '">' + tr("mk_save") + "</button></td></tr>";
    }).join("") + "</tbody></table></div>";
  h += '<div class="mkmsg"><b>' + tr("mk_bio_s") + "</b><pre>" + esc(MK_BIO_S) + '</pre><div class="mklinks"><button class="btn-s" type="button" data-mkcopy="bs">' + tr(mkCopied.bs ? "mk_copied" : "mk_copy") + "</button></div></div>";
  h += '<div class="mkmsg"><b>' + tr("mk_bio_l") + "</b><pre>" + esc(MK_BIO_L) + '</pre><div class="mklinks"><button class="btn-s" type="button" data-mkcopy="bl">' + tr(mkCopied.bl ? "mk_copied" : "mk_copy") + "</button></div></div>";
  /* budget + cautions */
  h += '<h5 class="ovsub">' + tr("mk_bud_h") + '</h5><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_item") + '</th><th scope="col">' + tr("mk_c_when") + '</th><th scope="col" class="n">' + tr("mk_c_cost") + "</th></tr></thead><tbody>" +
    MK_BUDGET.map(b => "<tr><td>" + esc(b[0]) + "</td><td>" + esc(b[1]) + '</td><td class="n">' + esc(b[2]) + "</td></tr>").join("") + "</tbody></table></div>";
  h += '<h5 class="ovsub">' + tr("mk_watch_h") + '</h5><ul class="mkwatch">' + MK_WATCH.map(w => "<li>" + esc(w) + "</li>").join("") + "</ul>";
  box.innerHTML = h;
}

function mkText(id) {
  if (id === "bs") return MK_BIO_S;
  if (id === "bl") return MK_BIO_L;
  const i = +id.slice(1), m = MK_MSGS[i];
  return m ? m[1] + (i === 3 ? "" : "\n" + mkLink()) : "";
}
$("mkBody").addEventListener("change", async e => {
  const c = e.target.closest("[data-mk]"); if (!c) return;
  const ok = await mkSave(c.dataset.mk, { done: c.checked });
  if (!ok) { c.checked = !c.checked; MK[c.dataset.mk].done = c.checked; }
  renderMk();
});
$("mkBody").addEventListener("click", async e => {
  const cp = e.target.closest("[data-mkcopy]");
  if (cp) {
    const id = cp.dataset.mkcopy;
    try { await navigator.clipboard.writeText(mkText(id)); mkCopied[id] = true; renderMk(); setTimeout(() => { delete mkCopied[id]; renderMk(); }, 2000); } catch (x) {}
    return;
  }
  const sv = e.target.closest("[data-mksave]");
  if (sv) {
    const s = sv.dataset.mksave, v = ($("mkl-" + s).value || "").trim().slice(0, 500);
    sv.disabled = true;
    const ok = await mkSave("link:" + s, { value: v });
    if (ok && v) await mkSave("soc:" + s, { done: true });
    sv.disabled = false; renderMk();
    const b = document.querySelector('[data-mksave="' + s + '"]'); if (b && ok) b.textContent = tr("mk_saved");
  }
});
$("mkRefresh").addEventListener("click", () => loadMk());
if (typeof tab !== "undefined" && tab === "mk" && typeof isAdmin === "function" && isAdmin() && !loaded.mk) { loaded.mk = true; loadMk(); }
document.querySelectorAll('[data-i18n^="mk_"],[data-i18n="adm_t_mk"]').forEach(el => { el.textContent = tr(el.getAttribute("data-i18n")); });
