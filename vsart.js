/* Seb Saathi admin — built-in drawn pictures for the Video Studio (used when a scene has no photo or clip).
   Each picture is drawn with simple shapes on the video canvas and moves gently, so no photos are needed.
   vsArt(ctx, W, H, key, t, theme) draws picture "key" in the top part of the frame; t = seconds into the scene. */
const VS_ART = ["apple", "leaf", "leaf_spots", "tree", "spray", "phone", "calendar", "money", "rain", "mountain", "camera", "crate", "chart", "bug", "shears", "family", "check", "soil", "snow", "flower"];
Object.assign(T.en, { vs_art: "Picture", vs_art_none: "No picture (colours only)", vs_a_apple: "Apple", vs_a_leaf: "Healthy leaf", vs_a_leaf_spots: "Diseased leaf", vs_a_tree: "Apple tree",
  vs_a_spray: "Sprayer", vs_a_phone: "Seb Saathi app", vs_a_calendar: "Calendar", vs_a_money: "Rupees", vs_a_rain: "Rain", vs_a_mountain: "Hills", vs_a_camera: "Camera",
  vs_a_crate: "Apple box", vs_a_chart: "Profit chart", vs_a_bug: "Insect / mite", vs_a_shears: "Pruning shears", vs_a_family: "Family", vs_a_check: "Tick", vs_a_soil: "Soil", vs_a_snow: "Snow", vs_a_flower: "Flowers" });
Object.assign(T.hi, { vs_art: "चित्र", vs_art_none: "चित्र नहीं (सिर्फ़ रंग)", vs_a_apple: "सेब", vs_a_leaf: "स्वस्थ पत्ता", vs_a_leaf_spots: "बीमार पत्ता", vs_a_tree: "सेब का पेड़",
  vs_a_spray: "स्प्रेयर", vs_a_phone: "सेब साथी ऐप", vs_a_calendar: "कैलेंडर", vs_a_money: "रुपये", vs_a_rain: "बारिश", vs_a_mountain: "पहाड़", vs_a_camera: "कैमरा",
  vs_a_crate: "सेब की पेटी", vs_a_chart: "मुनाफ़े का चार्ट", vs_a_bug: "कीट / माइट", vs_a_shears: "कटाई की कैंची", vs_a_family: "परिवार", vs_a_check: "सही का निशान", vs_a_soil: "मिट्टी", vs_a_snow: "बर्फ़", vs_a_flower: "फूल", vs_voice_on: "आवाज़" });

/* the picture chooser in each scene of the Video Studio form */
function vsArtSelect(s, i) {
  return '<label class="vsdur">' + tr("vs_art") + ' <select data-vsf="art" id="vs-art-' + i + '"><option value="">' + tr("vs_art_none") + "</option>" +
    VS_ART.map(k => '<option value="' + k + '"' + (s.art === k ? " selected" : "") + ">" + tr("vs_a_" + k) + "</option>").join("") + "</select></label>";
}

function vsArt(ctx, W, H, key, t, th) {
  const tall = H / W > 1.5, S = Math.min(W * 0.62, H * (tall ? 0.36 : 0.42));
  const cx = W / 2, cy = H * (tall ? 0.36 : 0.32);
  const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, t / 0.6)), 3);   /* grows in */
  const bob = Math.sin(t * 1.6) * S * 0.012;
  ctx.save();
  ctx.translate(cx, cy + bob); ctx.scale(S / 200 * (0.85 + 0.15 * e), S / 200 * (0.85 + 0.15 * e)); ctx.globalAlpha = e;
  /* soft round light behind the picture */
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 125); g.addColorStop(0, "rgba(255,255,255,.22)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 125, 0, Math.PI * 2); ctx.fill();
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  const D = VS_DRAW[key] || VS_DRAW.apple;
  try { D(ctx, t, th || {}); } catch (err) {}
  ctx.restore();
}

/* ---------- small helpers (drawing space: -100..100 both ways) ---------- */
const vA = {
  fill(ctx, c) { ctx.fillStyle = c; ctx.fill(); },
  stroke(ctx, c, w) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.stroke(); },
  circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); },
  rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); },
  apple(ctx, x, y, r, col) {
    ctx.beginPath();
    ctx.moveTo(x, y - r * 0.62);
    ctx.bezierCurveTo(x + r * 0.55, y - r * 1.05, x + r * 1.15, y - r * 0.55, x + r * 0.98, y + r * 0.2);
    ctx.bezierCurveTo(x + r * 0.85, y + r * 0.85, x + r * 0.35, y + r * 1.02, x, y + r * 0.86);
    ctx.bezierCurveTo(x - r * 0.35, y + r * 1.02, x - r * 0.85, y + r * 0.85, x - r * 0.98, y + r * 0.2);
    ctx.bezierCurveTo(x - r * 1.15, y - r * 0.55, x - r * 0.55, y - r * 1.05, x, y - r * 0.62);
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.3, r * 0.1, x, y, r * 1.1);
    g.addColorStop(0, "#FF6B5E"); g.addColorStop(0.55, col || "#D3231E"); g.addColorStop(1, "#8E1410");
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.ellipse(x - r * 0.42, y - r * 0.18, r * 0.14, r * 0.26, -0.4, 0, Math.PI * 2); vA.fill(ctx, "rgba(255,255,255,.45)");
    ctx.beginPath(); ctx.moveTo(x, y - r * 0.6); ctx.quadraticCurveTo(x + r * 0.05, y - r * 0.95, x + r * 0.18, y - r * 1.1); vA.stroke(ctx, "#5A3A1E", r * 0.09);
    vA.leafShape(ctx, x + r * 0.42, y - r * 0.98, r * 0.42, -0.5); vA.fill(ctx, "#3E9B3E");
  },
  leafShape(ctx, x, y, len, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
    ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.quadraticCurveTo(0, -len * 0.42, len / 2, 0); ctx.quadraticCurveTo(0, len * 0.42, -len / 2, 0); ctx.restore();
  },
  bigLeaf(ctx, col) {
    ctx.beginPath(); ctx.moveTo(-10, 88);
    ctx.bezierCurveTo(-95, 40, -80, -60, 0, -92); ctx.bezierCurveTo(80, -60, 95, 40, 10, 88); ctx.closePath();
    const g = ctx.createLinearGradient(-60, -80, 60, 80); g.addColorStop(0, col ? col[0] : "#7BCB5C"); g.addColorStop(1, col ? col[1] : "#2E8B3A");
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 95); ctx.lineTo(0, -82); vA.stroke(ctx, "rgba(255,255,255,.55)", 4);
    for (let i = -3; i <= 3; i++) { if (!i) continue; const yy = i * 20 - 5; ctx.beginPath(); ctx.moveTo(0, yy + 14); ctx.quadraticCurveTo(Math.sign(i) * 30, yy, Math.sign(i) * 52 * (1 - Math.abs(i) * 0.08), yy - 18); }
    [[-1, -50], [1, -50], [-1, -25], [1, -25], [-1, 0], [1, 0], [-1, 25], [1, 25], [-1, 50], [1, 50]].forEach(([s, yy]) => { ctx.beginPath(); ctx.moveTo(0, yy + 12); ctx.quadraticCurveTo(s * 26, yy, s * 50 * (1 - Math.abs(yy) / 200), yy - 14); vA.stroke(ctx, "rgba(255,255,255,.35)", 2.5); });
    ctx.beginPath(); ctx.moveTo(0, 88); ctx.lineTo(0, 112); vA.stroke(ctx, "#5A3A1E", 6);
  }
};

const VS_DRAW = {
  apple(ctx, t) { ctx.rotate(Math.sin(t * 1.2) * 0.05); vA.apple(ctx, 0, 10, 82); },
  leaf(ctx, t) { ctx.rotate(Math.sin(t * 1.3) * 0.06); vA.bigLeaf(ctx); },
  leaf_spots(ctx, t) {
    ctx.rotate(Math.sin(t * 1.3) * 0.05); vA.bigLeaf(ctx, ["#9CC56A", "#5E8F35"]);
    const spots = [[-28, -40, 11], [22, -18, 14], [-18, 12, 9], [30, 30, 10], [-35, 45, 8], [5, -60, 7], [10, 55, 12], [-45, -10, 7]];
    spots.forEach(([x, y, r], i) => {
      const k = Math.max(0, Math.min(1, (t - 0.3 - i * 0.18) / 0.5)); if (!k) return;
      vA.circle(ctx, x, y, r * k * 1.4); vA.fill(ctx, "rgba(110,90,20,.35)");
      vA.circle(ctx, x, y, r * k); vA.fill(ctx, "#4B3A1A");
    });
    if (t > 1.6) { const p = (t * 1.2) % 1; ctx.beginPath(); ctx.arc(22, -18, 26 + p * 10, 0, Math.PI * 2); vA.stroke(ctx, "rgba(242,193,78," + (1 - p) + ")", 5); }
  },
  tree(ctx, t) {
    ctx.beginPath(); ctx.moveTo(-14, 95); ctx.lineTo(-10, 10); ctx.lineTo(-40, -20); ctx.moveTo(-10, 25); ctx.lineTo(10, 10); ctx.lineTo(42, -18); ctx.moveTo(10, 10); ctx.lineTo(14, 95);
    vA.stroke(ctx, "#6B4423", 14);
    [[-45, -35, 48], [40, -35, 48], [0, -62, 52], [-15, -15, 40], [22, -10, 40]].forEach(([x, y, r]) => { vA.circle(ctx, x, y + Math.sin(t * 1.5 + x) * 1.5, r); vA.fill(ctx, "#2F8F3A"); });
    [[-50, -40], [-20, -70], [15, -50], [45, -30], [-30, -10], [25, -5], [0, -25], [50, -55]].forEach(([x, y], i) => { const k = Math.max(0, Math.min(1, (t - 0.2 - i * 0.1) / 0.4)); vA.circle(ctx, x, y, 9 * k); vA.fill(ctx, "#D3231E"); });
    ctx.beginPath(); ctx.ellipse(0, 98, 70, 8, 0, 0, Math.PI * 2); vA.fill(ctx, "rgba(0,0,0,.2)");
  },
  spray(ctx, t) {
    vA.rrect(ctx, -45, -30, 70, 110, 16); vA.fill(ctx, "#F2F2F2");
    vA.rrect(ctx, -45, 10, 70, 40, 0); vA.fill(ctx, "#2F8F3A");
    vA.rrect(ctx, -25, -55, 30, 28, 6); vA.fill(ctx, "#D3231E");
    ctx.beginPath(); ctx.moveTo(5, -45); ctx.lineTo(45, -60); ctx.lineTo(72, -60); vA.stroke(ctx, "#555", 8);
    for (let i = 0; i < 14; i++) { const p = ((t * 1.4 + i / 14) % 1); vA.circle(ctx, 78 + p * 60, -60 + Math.sin(i * 7) * p * 35, 3.5 * (1 - p) + 1); vA.fill(ctx, "rgba(180,225,255," + (0.9 - p * 0.8) + ")"); }
    ctx.font = "700 22px sans-serif"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.fillText("✓", -10, 38);
  },
  phone(ctx, t, th) {
    vA.rrect(ctx, -55, -100, 110, 200, 18); vA.fill(ctx, "#1C1C1C");
    vA.rrect(ctx, -48, -88, 96, 176, 10); vA.fill(ctx, "#F7F4EC");
    vA.rrect(ctx, -48, -88, 96, 30, 10); vA.fill(ctx, "#2F8F3A");
    vA.apple(ctx, -30, -73, 9);
    ctx.fillStyle = "#FFF"; ctx.font = "700 13px sans-serif"; ctx.textAlign = "left"; ctx.fillText("Seb Saathi", -16, -68);
    [[-40, -45, 80], [-40, -25, 60], [-40, -5, 70]].forEach(([x, y, w], i) => { const k = Math.max(0, Math.min(1, (t - 0.2 - i * 0.15) / 0.4)); vA.rrect(ctx, x, y, w * k, 10, 5); vA.fill(ctx, "#D9D2C3"); });
    const k = Math.max(0, Math.min(1, (t - 0.8) / 0.5));
    vA.rrect(ctx, -40, 18, 80, 52, 10); vA.fill(ctx, "rgba(47,143,58," + (0.15 + 0.85 * k) + ")");
    ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); ctx.moveTo(-14, 44); ctx.lineTo(-3, 55); ctx.lineTo(18, 30); vA.stroke(ctx, "#FFF", 7); ctx.restore();
    vA.circle(ctx, 0, 82, 5); vA.fill(ctx, "#BBB");
  },
  calendar(ctx, t, th) {
    vA.rrect(ctx, -80, -70, 160, 150, 14); vA.fill(ctx, "#FFF");
    vA.rrect(ctx, -80, -70, 160, 36, 14); vA.fill(ctx, th.acc || "#D3231E"); ctx.fillRect(-80, -50, 160, 16);
    [-45, 45].forEach(x => { vA.rrect(ctx, x - 5, -84, 10, 26, 5); vA.fill(ctx, "#555"); });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { vA.rrect(ctx, -66 + c * 27, -24 + r * 24, 20, 16, 4); vA.fill(ctx, "#E8E3D8"); }
    const k = Math.max(0, Math.min(1, (t - 0.4) / 0.4)); vA.circle(ctx, -66 + 2 * 27 + 10, -24 + 2 * 24 + 8, 16 * k); vA.stroke(ctx, "#2F8F3A", 5);
  },
  money(ctx, t) {
    for (let i = 0; i < 5; i++) { const k = Math.max(0, Math.min(1, (t - i * 0.12) / 0.35)); ctx.beginPath(); ctx.ellipse(-35, 70 - i * 16 * k, 45, 14, 0, 0, Math.PI * 2); vA.fill(ctx, i % 2 ? "#E0A800" : "#F2C14E"); vA.stroke(ctx, "#A87A00", 2); }
    vA.circle(ctx, 40, -10, 58); vA.fill(ctx, "#F2C14E"); vA.circle(ctx, 40, -10, 46); vA.stroke(ctx, "#A87A00", 4);
    ctx.fillStyle = "#7A5600"; ctx.font = "700 64px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("₹", 40, -6);
    const p = (t * 0.8) % 1; ctx.fillStyle = "rgba(255,255,255," + (1 - p) + ")"; ctx.font = "700 22px sans-serif"; ctx.fillText("✦", 80 + p * 6, -70 - p * 10);
  },
  rain(ctx, t) {
    for (let i = 0; i < 16; i++) { const p = (t * 1.1 + i * 0.37) % 1, x = -70 + (i * 37) % 140; ctx.beginPath(); ctx.moveTo(x, -5 + p * 100); ctx.lineTo(x - 4, 10 + p * 100); vA.stroke(ctx, "rgba(170,215,255," + (1 - p) + ")", 4); }
    [[-40, -40, 38], [10, -55, 48], [55, -35, 34], [0, -25, 40]].forEach(([x, y, r]) => { vA.circle(ctx, x, y, r); vA.fill(ctx, "#E9EEF2"); });
    ctx.fillStyle = "#C9D3DB"; ctx.fillRect(-78, -20, 166, 20);
  },
  mountain(ctx, t) {
    vA.circle(ctx, 55, -55, 26); vA.fill(ctx, "#F2C14E");
    ctx.beginPath(); ctx.moveTo(-100, 80); ctx.lineTo(-30, -45); ctx.lineTo(40, 80); ctx.closePath(); vA.fill(ctx, "#5C7A8A");
    ctx.beginPath(); ctx.moveTo(-10, 80); ctx.lineTo(50, -15); ctx.lineTo(105, 80); ctx.closePath(); vA.fill(ctx, "#47616E");
    ctx.beginPath(); ctx.moveTo(-30, -45); ctx.lineTo(-48, -12); ctx.lineTo(-38, -18); ctx.lineTo(-28, -8); ctx.lineTo(-18, -20); ctx.lineTo(-12, -12); ctx.closePath(); vA.fill(ctx, "#FFF");
    [[-60, 72], [-35, 76], [70, 74], [20, 78]].forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x - 10, y); ctx.lineTo(x + 10, y); ctx.closePath(); vA.fill(ctx, "#2F8F3A"); });
  },
  camera(ctx, t) {
    vA.rrect(ctx, -80, -45, 160, 110, 16); vA.fill(ctx, "#2B2B2B");
    vA.rrect(ctx, -35, -62, 50, 22, 6); vA.fill(ctx, "#2B2B2B");
    vA.circle(ctx, 0, 10, 40); vA.fill(ctx, "#444"); vA.circle(ctx, 0, 10, 30); vA.fill(ctx, "#1E3A5F"); vA.circle(ctx, -10, 0, 9); vA.fill(ctx, "rgba(255,255,255,.6)");
    const p = (t % 1.6) / 1.6; if (p < 0.18) { ctx.fillStyle = "rgba(255,255,255," + (0.8 - p * 4) + ")"; ctx.fillRect(-100, -100, 200, 200); }
    vA.circle(ctx, 55, -25, 7); vA.fill(ctx, "#F2C14E");
  },
  crate(ctx, t) {
    [[-45, -40], [0, -48], [45, -40], [-22, -62], [22, -62]].forEach(([x, y], i) => { const k = Math.max(0, Math.min(1, (t - i * 0.12) / 0.4)); if (k) vA.apple(ctx, x, y - (1 - k) * 40, 24); });
    vA.rrect(ctx, -85, -30, 170, 110, 6); vA.fill(ctx, "#C68A47");
    for (let i = 0; i < 3; i++) { ctx.fillStyle = "#A86F33"; ctx.fillRect(-85, -8 + i * 34, 170, 6); }
    ctx.fillStyle = "#FFF"; ctx.font = "700 20px sans-serif"; ctx.textAlign = "center"; ctx.fillText("A", 0, 40);
  },
  chart(ctx, t) {
    ctx.beginPath(); ctx.moveTo(-85, -80); ctx.lineTo(-85, 80); ctx.lineTo(90, 80); vA.stroke(ctx, "rgba(255,255,255,.8)", 5);
    [40, 70, 55, 105, 140].forEach((h, i) => { const k = Math.max(0, Math.min(1, (t - i * 0.15) / 0.5)); vA.rrect(ctx, -70 + i * 32, 78 - h * k, 22, h * k, 4); vA.fill(ctx, i === 4 ? "#F2C14E" : "#7BCB5C"); });
    const k = Math.max(0, Math.min(1, (t - 0.9) / 0.5)); ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); ctx.moveTo(-60, 30); ctx.lineTo(-25, 0); ctx.lineTo(5, 15); ctx.lineTo(40, -30); ctx.lineTo(70, -70);
    vA.stroke(ctx, "#FFF", 5); ctx.beginPath(); ctx.moveTo(70, -70); ctx.lineTo(52, -66); ctx.moveTo(70, -70); ctx.lineTo(68, -52); vA.stroke(ctx, "#FFF", 5); ctx.restore();
  },
  bug(ctx, t) {
    ctx.rotate(Math.sin(t * 3) * 0.06);
    for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 3; i++) { const w = Math.sin(t * 9 + i) * 6; ctx.beginPath(); ctx.moveTo(s * 20, -12 + i * 22); ctx.lineTo(s * 55, -22 + i * 26 + w); ctx.lineTo(s * 70, -8 + i * 30 + w); vA.stroke(ctx, "#3A1E10", 6); }
    ctx.beginPath(); ctx.ellipse(0, 15, 36, 52, 0, 0, Math.PI * 2); vA.fill(ctx, "#B5301F");
    vA.circle(ctx, 0, -48, 22); vA.fill(ctx, "#3A1E10");
    [[-12, 0], [14, 22], [-10, 38]].forEach(([x, y]) => { vA.circle(ctx, x, y, 7); vA.fill(ctx, "#3A1E10"); });
    ctx.beginPath(); ctx.moveTo(-8, -66); ctx.quadraticCurveTo(-20, -90, -32, -92); ctx.moveTo(8, -66); ctx.quadraticCurveTo(20, -90, 32, -92); vA.stroke(ctx, "#3A1E10", 4);
  },
  shears(ctx, t) {
    const o = 0.18 + Math.abs(Math.sin(t * 2.2)) * 0.25;
    [[1, "#9AA4AD"], [-1, "#C3CBD2"]].forEach(([s, c]) => {
      ctx.save(); ctx.rotate(s * o);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s * 18, -50, 0, -100); ctx.quadraticCurveTo(s * 2, -50, -s * 6, 0); ctx.closePath(); vA.fill(ctx, c);
      vA.rrect(ctx, -s * 8 - 9, 0, 18, 95, 9); vA.fill(ctx, "#D3231E"); ctx.restore();
    });
    vA.circle(ctx, 0, 0, 9); vA.fill(ctx, "#555");
  },
  family(ctx, t) {
    [[-55, 10, 0.85, "#2F8F3A"], [0, -5, 1, "#D3231E"], [55, 10, 0.85, "#F2C14E"]].forEach(([x, y, k, c], i) => {
      const b = Math.sin(t * 2 + i) * 3;
      vA.circle(ctx, x, y - 45 * k + b, 22 * k); vA.fill(ctx, "#E8B98A");
      ctx.beginPath(); ctx.moveTo(x - 32 * k, y + 70 * k); ctx.quadraticCurveTo(x - 32 * k, y - 15 * k + b, x, y - 18 * k + b); ctx.quadraticCurveTo(x + 32 * k, y - 15 * k + b, x + 32 * k, y + 70 * k); ctx.closePath(); vA.fill(ctx, c);
    });
    vA.apple(ctx, 0, 85, 14);
  },
  check(ctx, t) {
    vA.circle(ctx, 0, 0, 80); vA.fill(ctx, "#2F8F3A");
    const k = Math.max(0, Math.min(1, (t - 0.2) / 0.6));
    ctx.beginPath(); ctx.moveTo(-38, 2); const p1 = Math.min(1, k * 2); ctx.lineTo(-38 + 28 * p1, 2 + 28 * p1);
    if (k > 0.5) { const p2 = (k - 0.5) * 2; ctx.lineTo(-10 + 52 * p2, 30 - 62 * p2); }
    vA.stroke(ctx, "#FFF", 16);
  },
  soil(ctx, t) {
    ctx.beginPath(); ctx.moveTo(-95, 20); ctx.quadraticCurveTo(0, -10, 95, 20); ctx.lineTo(95, 90); ctx.lineTo(-95, 90); ctx.closePath(); vA.fill(ctx, "#6B4423");
    for (let i = 0; i < 18; i++) { vA.circle(ctx, -85 + (i * 53) % 170, 35 + (i * 29) % 50, 3 + (i % 3)); vA.fill(ctx, "#4E3018"); }
    const k = Math.max(0, Math.min(1, (t - 0.2) / 0.8));
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, 10 - 60 * k); vA.stroke(ctx, "#3E9B3E", 7);
    if (k > 0.4) { vA.leafShape(ctx, -18, 10 - 50 * k, 36 * k, 0.5); vA.fill(ctx, "#5DBB4B"); vA.leafShape(ctx, 18, 10 - 62 * k, 36 * k, -0.5); vA.fill(ctx, "#5DBB4B"); }
  },
  snow(ctx, t) {
    ctx.beginPath(); ctx.moveTo(-14, 95); ctx.lineTo(-8, 0); ctx.lineTo(-45, -35); ctx.moveTo(-8, 20); ctx.lineTo(40, -30); ctx.moveTo(-8, 0); ctx.lineTo(5, -60); vA.stroke(ctx, "#6B4423", 10);
    [[-45, -40], [40, -35], [5, -64]].forEach(([x, y]) => { ctx.beginPath(); ctx.ellipse(x, y, 16, 6, 0, 0, Math.PI * 2); vA.fill(ctx, "#FFF"); });
    for (let i = 0; i < 22; i++) { const p = (t * 0.5 + i * 0.29) % 1, x = -90 + (i * 41) % 180 + Math.sin(t * 2 + i) * 6; vA.circle(ctx, x, -95 + p * 190, 3.5); vA.fill(ctx, "rgba(255,255,255," + (0.95 - p * 0.5) + ")"); }
    ctx.beginPath(); ctx.ellipse(0, 95, 90, 10, 0, 0, Math.PI * 2); vA.fill(ctx, "#FFF");
  },
  flower(ctx, t) {
    [[-45, 0, 0.9], [40, -25, 1], [10, 45, 0.8]].forEach(([x, y, k], i) => {
      const o = Math.max(0, Math.min(1, (t - i * 0.25) / 0.5)) * k;
      for (let j = 0; j < 5; j++) { const a = j / 5 * Math.PI * 2 + t * 0.3; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 20 * o, y + Math.sin(a) * 20 * o, 16 * o, 11 * o, a, 0, Math.PI * 2); vA.fill(ctx, "#FCE4EC"); vA.stroke(ctx, "#F3B5C8", 1.5); }
      vA.circle(ctx, x, y, 8 * o); vA.fill(ctx, "#F2C14E");
    });
    const p = (t * 0.7) % 1; ctx.save(); ctx.translate(-80 + p * 160, -70 + Math.sin(p * 6) * 15);
    ctx.beginPath(); ctx.ellipse(0, 0, 10, 7, 0, 0, Math.PI * 2); vA.fill(ctx, "#F2C14E"); ctx.fillStyle = "#333"; ctx.fillRect(-3, -7, 3, 14); ctx.fillRect(3, -7, 3, 14);
    ctx.beginPath(); ctx.ellipse(-2, -9, 6, 4, -0.5, 0, Math.PI * 2); vA.fill(ctx, "rgba(255,255,255,.8)"); ctx.restore();
  }
};
