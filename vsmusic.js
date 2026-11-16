/* Seb Saathi admin — background music for the Video Studio.
   1. Built-in soft music, made right here in the browser (Calm, Serious, Happy): no rights or downloads needed.
   2. Your own tracks (e.g. from the YouTube Audio Library), saved once with a mood; "Create a video for me" picks one that fits.
   The list of your tracks is kept in admin_marketing (key "mu:list"); the files go to the "library" storage like other videos. */
Object.assign(T.en, {
  mu_h: "Music library", mu_p: "Built-in soft music is always there. Add your own tracks too (for example free tracks from the YouTube Audio Library) and give each a mood: \"Create a video for me\" then picks one that fits the video.",
  mu_m_calm: "Calm", mu_m_alert: "Serious", mu_m_happy: "Happy", mu_builtin: "Use built-in music:", mu_mine: "Your tracks:", mu_none: "No tracks of your own yet.",
  mu_add: "Add a track", mu_mood: "Mood for the next track", mu_use: "Use", mu_rm: "Remove", mu_busy: "Saving the track…", mu_making: "Making the music…",
  mu_err: "Couldn't save the track: {m}", mu_name_b: "Built-in: {m}"
});
Object.assign(T.hi, {
  mu_h: "म्यूज़िक लाइब्रेरी", mu_p: "बना-बनाया हल्का म्यूज़िक हमेशा है। अपने ट्रैक भी जोड़ें (जैसे YouTube Audio Library के मुफ़्त ट्रैक) और हर एक का मूड चुनें: 'मेरे लिए वीडियो बनाएँ' वीडियो के हिसाब से एक चुन लेगा।",
  mu_m_calm: "शांत", mu_m_alert: "गंभीर", mu_m_happy: "खुशनुमा", mu_builtin: "बना-बनाया म्यूज़िक लगाएँ:", mu_mine: "आपके ट्रैक:", mu_none: "अभी आपका कोई ट्रैक नहीं।",
  mu_add: "ट्रैक जोड़ें", mu_mood: "अगले ट्रैक का मूड", mu_use: "लगाएँ", mu_rm: "हटाएँ", mu_busy: "ट्रैक सेव हो रहा है…", mu_making: "म्यूज़िक बन रहा है…",
  mu_err: "ट्रैक सेव नहीं हुआ: {m}", mu_name_b: "बना-बनाया: {m}"
});
const MU_MOODS = ["calm", "alert", "happy"];
let muMood = "calm", muBusy = "", muErr = "";
const muList = () => { try { const v = JSON.parse((typeof MK !== "undefined" && MK["mu:list"] && MK["mu:list"].value) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
const muSaveList = L => typeof mkSave === "function" ? mkSave("mu:list", { done: true, value: JSON.stringify(L).slice(0, 7900) }) : Promise.resolve(false);

/* ---------- built-in music: soft chords, a gentle pluck and a bass, rendered once per mood ---------- */
const MU_SONG = {
  calm: { len: 4, ch: [[60, 64, 67], [59, 62, 67], [57, 60, 64], [57, 60, 65]], bass: [48, 43, 45, 41], arp: 0.5, pulse: 0, cut: 1400 },
  happy: { len: 2.4, ch: [[62, 67, 71], [62, 66, 69], [64, 67, 71], [60, 64, 67]], bass: [43, 38, 40, 36], arp: 0.3, pulse: 0.6, cut: 2200 },
  alert: { len: 3.2, ch: [[62, 65, 69], [62, 65, 70], [60, 65, 69], [60, 64, 67]], bass: [38, 34, 41, 36], arp: 0.8, pulse: 0.4, cut: 1100 }
};
const muHz = m => 440 * Math.pow(2, (m - 69) / 12);
const muCache = {};
async function muSynth(mood) {
  if (muCache[mood]) return muCache[mood];
  const S = MU_SONG[mood] || MU_SONG.calm, sr = 32000, dur = 50;
  const ac = new OfflineAudioContext(1, sr * dur, sr);
  const master = ac.createGain(); master.gain.value = 0.55; master.connect(ac.destination);
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = S.cut; lp.Q.value = 0.4; lp.connect(master);
  const tone = (type, f, t0, t1, a, peak, rel, out, det) => {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; if (det) o.detune.value = det;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(peak, t0 + a); g.gain.setValueAtTime(peak, Math.max(t0 + a, t1 - rel)); g.gain.linearRampToValueAtTime(0, t1);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t1 + 0.05);
  };
  const pluck = (f, t0, peak) => {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(peak, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0008, t0 + 0.9);
    o.connect(g); g.connect(lp); o.start(t0); o.stop(t0 + 1);
  };
  for (let t = 0, c = 0; t < dur; t += S.len, c++) {
    const ch = S.ch[c % S.ch.length], end = Math.min(dur, t + S.len + 0.6);
    ch.forEach(n => { tone("triangle", muHz(n), t, end, 0.9, 0.05, 0.9, lp, -7); tone("triangle", muHz(n), t, end, 0.9, 0.05, 0.9, lp, 7); });
    tone("sine", muHz(S.bass[c % S.bass.length]), t, Math.min(dur, t + S.len), 0.25, 0.16, 0.4, master, 0);
    const up = ch.concat(ch.map(n => n + 12));
    for (let a = 0, j = 0; a < S.len - 0.05; a += S.arp, j++) pluck(muHz(up[(j * 2 + c) % up.length] + 12), t + a, 0.05);
    if (S.pulse) for (let a = 0; a < S.len - 0.05; a += S.pulse) tone("sine", muHz(S.bass[c % S.bass.length] + 12), t + a, t + a + 0.18, 0.01, 0.07, 0.15, master, 0);
  }
  const buf = await ac.startRendering(), d = buf.getChannelData(0);
  /* a short fade at both ends, then a plain WAV file the Studio can play like any music file */
  let pk = 0; for (let i = 0; i < d.length; i++) pk = Math.max(pk, Math.abs(d[i]));
  const nv = pk > 0 ? 0.8 / pk : 1; for (let i = 0; i < d.length; i++) d[i] *= nv;   /* same loudness as a normal music file */
  const fade = sr * 1.5; for (let i = 0; i < fade; i++) { d[i] *= i / fade; d[d.length - 1 - i] *= i / fade; }
  const wav = new DataView(new ArrayBuffer(44 + d.length * 2)), str = (o, s) => { for (let i = 0; i < s.length; i++) wav.setUint8(o + i, s.charCodeAt(i)); };
  str(0, "RIFF"); wav.setUint32(4, 36 + d.length * 2, true); str(8, "WAVEfmt "); wav.setUint32(16, 16, true); wav.setUint16(20, 1, true); wav.setUint16(22, 1, true);
  wav.setUint32(24, sr, true); wav.setUint32(28, sr * 2, true); wav.setUint16(32, 2, true); wav.setUint16(34, 16, true); str(36, "data"); wav.setUint32(40, d.length * 2, true);
  for (let i = 0; i < d.length; i++) wav.setInt16(44 + i * 2, Math.max(-1, Math.min(1, d[i])) * 32767, true);
  return (muCache[mood] = new Blob([wav], { type: "audio/wav" }));
}

/* put a track in the Studio (same as choosing a music file there) */
function muSet(blob, name) {
  if (VS.music) { try { VS.music.el.pause(); if (VS.music.own) URL.revokeObjectURL(VS.music.url); } catch (e) {} }
  const el = new Audio(); el.src = URL.createObjectURL(blob); el.preload = "auto";
  VS.music = { el, url: el.src, name: String(name || "").slice(0, 40), own: true };
}
async function muBuiltin(mood) { muSet(await muSynth(mood), tr("mu_name_b").replace("{m}", tr("mu_m_" + mood))); }
async function muUse(x) {
  const r = await fetch(x.url); if (!r.ok) throw new Error("music " + r.status);
  muSet(await r.blob(), x.name);   /* fetched first, so the recording can hear it */
}
/* "Create a video for me": one of your tracks with this mood, or the built-in one */
async function muPick(mood) {
  const L = muList().filter(x => x.mood === mood);
  if (L.length) { try { await muUse(L[Math.floor(Math.random() * L.length)]); return; } catch (e) {} }
  await muBuiltin(mood);
}

/* ---------- the library box inside the Studio's music section ---------- */
function muHtml() {
  const L = muList(), dis = muBusy ? " disabled" : "";
  return '<div class="mubox"><p><b>' + tr("mu_h") + '</b></p><p class="fine">' + tr("mu_p") + "</p>" +
    '<div class="vsmedia"><span class="fine" style="margin:0">' + tr("mu_builtin") + "</span>" + MU_MOODS.map(m => '<button type="button" class="btn-s vsmini" data-mu="b" data-m="' + m + '"' + dis + ">" + tr("mu_m_" + m) + "</button>").join("") + "</div>" +
    '<p class="fine" style="margin-bottom:0">' + tr("mu_mine") + "</p>" +
    (L.length ? '<ul class="mulist">' + L.map((x, i) => "<li>🎵 " + esc(x.name) + ' <span class="fine">(' + tr("mu_m_" + x.mood) + ')</span> <button type="button" class="btn-s vsmini" data-mu="use" data-i="' + i + '"' + dis + ">" + tr("mu_use") +
      '</button><button type="button" class="btn-s vsmini" data-mu="rm" data-i="' + i + '"' + dis + ">" + tr("mu_rm") + "</button></li>").join("") + "</ul>" : '<p class="fine">' + tr("mu_none") + "</p>") +
    '<div class="vsmedia"><label class="vsdur">' + tr("mu_mood") + ' <select id="muMood">' + MU_MOODS.map(m => '<option value="' + m + '"' + (m === muMood ? " selected" : "") + ">" + tr("mu_m_" + m) + "</option>").join("") + "</select></label>" +
    '<label class="btn-s vsfile">' + tr("mu_add") + '<input type="file" accept="audio/*" id="muFile" hidden' + dis + "></label></div>" +
    (muBusy ? '<p class="fine" role="status">' + esc(muBusy) + "</p>" : "") + (muErr ? '<p class="autherr">' + esc(muErr) + "</p>" : "") + "</div>";
}
document.addEventListener("click", async e => {
  const b = e.target.closest && e.target.closest("[data-mu]"); if (!b || muBusy) return;
  const a = b.dataset.mu, L = muList(), x = L[+b.dataset.i];
  muErr = "";
  try {
    if (a === "b") { muBusy = tr("mu_making"); renderStudio(); await muBuiltin(b.dataset.m); }
    else if (a === "use" && x) { muBusy = tr("mu_making"); renderStudio(); await muUse(x); }
    else if (a === "rm" && x) { L.splice(+b.dataset.i, 1); await muSaveList(L); }
  } catch (err) { muErr = tr("mu_err").replace("{m}", String(err.message || err)); }
  muBusy = ""; renderStudio();
});
document.addEventListener("change", async e => {
  const t = e.target; if (!t) return;
  if (t.id === "muMood") { muMood = t.value; return; }
  if (t.id === "muFile" && t.files && t.files[0]) {
    const f = t.files[0]; if (!/^audio\//.test(f.type)) return;
    muBusy = tr("mu_busy"); muErr = ""; renderStudio();
    try {
      const ext = (f.name.split(".").pop() || "mp3").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "mp3";
      const url = await mkUpload(f, ext, f.type);
      const L = muList(); L.push({ url, name: f.name.replace(/\.[^.]+$/, "").slice(0, 60), mood: muMood });
      if (!(await muSaveList(L))) throw new Error("not saved");
    } catch (err) { muErr = tr("mu_err").replace("{m}", String(err.message || err)); }
    muBusy = ""; renderStudio();
  }
});
