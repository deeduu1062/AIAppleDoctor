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
  mk_soc_h: "Social media setup", mk_soc_p: "Same name and handle everywhere: Seb Saathi, @sebsaathi. Each account needs your phone for a code, so you create it; then paste its link here. Saved links open from this tab and replace \"coming soon\" on the website.",
  mk_c_platform: "Platform", mk_c_link: "Your page link (shows on the website once saved)",
  mk_meta: "Meta Business Suite (Facebook + Instagram)", mk_yts: "YouTube Studio", mk_soc_live: "Live ✓", mk_soc_todo: "Not set up yet",
  mk_create: "Create it", mk_open: "Open page", mk_manage: "Manage", mk_badlink: "That doesn't look like the right link. It should start with {u}", mk_save: "Save", mk_saved: "Saved",
  mk_bio_s: "Short bio (Instagram)", mk_bio_l: "Long description (Facebook, YouTube, WhatsApp channel)",
  mk_bud_h: "Budget (rough, about ₹60,000 for the season)", mk_c_item: "Item", mk_c_when: "When", mk_c_cost: "Rough cost",
  mk_watch_h: "Cautions",
  mk_next_h: "Next steps", mk_all_done: "All plan tasks are done.", mk_inv_sub: "{n} friends joined · {m} free months", mk_more_h: "Budget, cautions and plan doc",
  mk_post_h: "Post to Facebook + Instagram", mk_post_checking: "Checking your accounts…",
  mk_post_conn: "Connected: Facebook page {f}{i}", mk_post_ig: " · Instagram @{u}", mk_post_noig: " · Instagram not linked to the Page yet",
  mk_post_text: "What to post", mk_post_ready: "Use a ready message…", mk_post_photo: "Add a photo", mk_post_photo_ch: "Change photo", mk_post_rm: "Remove photo",
  mk_post_fb: "Facebook", mk_post_igc: "Instagram (needs a photo)", mk_post_go: "Post now", mk_post_busy: "Posting…", mk_post_up: "Preparing the photo…",
  mk_post_done_fb: "Posted on Facebook", mk_post_done_ig: "Posted on Instagram", mk_post_view: "View", mk_post_fail: "{w} failed: {m}",
  mk_post_need: "Write something or add a photo first.", mk_post_err: "Could not reach your accounts: {m}", mk_post_recent: "Recent posts",
  mk_post_setup_h: "One-time setup (about 20–30 minutes)", mk_post_setup_p: "Do this once with your own Facebook login. After that you can post from here.",
  mk_q_h: "Auto posts (AI drafts + schedule)", mk_q_p: "One tap: the AI writes the next week's posts for this month in the orchard. Check them, add a photo for Instagram, then Approve all. Each one goes out by itself at its time (within 10 minutes).",
  mk_q_setup: "Run supabase/social_queue.sql in Supabase once to turn this on.", mk_q_draft: "✨ Draft next week with AI", mk_q_drafting: "Writing posts…",
  mk_q_n: "{n} posts", mk_q_l_hn: "Hinglish", mk_q_l_hi: "Hindi", mk_q_l_en: "English",
  mk_q_drafts: "Drafts to check ({n})", mk_q_sched: "Scheduled ({n})", mk_q_done: "Posted recently", mk_q_none: "No drafts. Tap the button above to get a week of posts.",
  mk_q_when: "When (India time)", mk_q_photo_idea: "Photo idea: {t}", mk_q_ig_need: "Add a photo to post on Instagram too.",
  mk_q_approve: "Approve", mk_q_approve_all: "Approve all and schedule ({n})", mk_q_del: "Delete", mk_q_del_sure: "Tap again to delete",
  mk_q_unsched: "Back to drafts", mk_q_retry: "Try again", mk_q_failed: "Failed", mk_q_partial: "{w} failed: {m}",
  mk_q_err: "Could not do that: {m}", mk_q_ai_err: "The AI could not write posts just now. Try again in a minute.",
  mk_q_notoken: "Scheduled posts wait until posting is connected (box above).", mk_q_empty: "Write something first.",
  mk_change: "Change link", mk_how: "How to set it up", mk_copy_bs: "Copy short bio", mk_copy_bl: "Copy long description",
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
  mk_soc_h: "सोशल मीडिया सेटअप", mk_soc_p: "हर जगह एक ही नाम और हैंडल: Seb Saathi, @sebsaathi। हर अकाउंट के लिए आपके फ़ोन पर कोड आता है, इसलिए अकाउंट आप बनाएँ; फिर उसका लिंक यहाँ डालें। सेव किए लिंक यहीं से खुलते हैं और वेबसाइट पर \"जल्द आ रहा है\" की जगह दिखते हैं।",
  mk_c_platform: "प्लेटफ़ॉर्म", mk_c_link: "आपके पेज का लिंक (सेव करते ही वेबसाइट पर दिखेगा)",
  mk_meta: "Meta Business Suite (Facebook + Instagram)", mk_yts: "YouTube Studio", mk_soc_live: "चालू ✓", mk_soc_todo: "अभी नहीं बना",
  mk_create: "बनाएँ", mk_open: "पेज खोलें", mk_manage: "संभालें", mk_badlink: "यह सही लिंक नहीं लगता। यह {u} से शुरू होना चाहिए", mk_save: "सेव", mk_saved: "सेव हुआ",
  mk_bio_s: "छोटा बायो (Instagram)", mk_bio_l: "लंबा विवरण (Facebook, YouTube, WhatsApp चैनल)",
  mk_bud_h: "बजट (मोटा अनुमान, सीज़न के लिए लगभग ₹60,000)", mk_c_item: "चीज़", mk_c_when: "कब", mk_c_cost: "मोटा ख़र्च",
  mk_watch_h: "सावधानियाँ",
  mk_next_h: "अगले काम", mk_all_done: "प्लान के सारे काम पूरे।", mk_inv_sub: "{n} दोस्त जुड़े · {m} मुफ़्त महीने", mk_more_h: "बजट, सावधानियाँ और प्लान डॉक",
  mk_post_h: "Facebook + Instagram पर पोस्ट करें", mk_post_checking: "आपके अकाउंट जाँच रहे हैं…",
  mk_post_conn: "जुड़ा हुआ: Facebook पेज {f}{i}", mk_post_ig: " · Instagram @{u}", mk_post_noig: " · Instagram अभी पेज से नहीं जुड़ा",
  mk_post_text: "क्या पोस्ट करें", mk_post_ready: "तैयार संदेश चुनें…", mk_post_photo: "फ़ोटो जोड़ें", mk_post_photo_ch: "फ़ोटो बदलें", mk_post_rm: "फ़ोटो हटाएँ",
  mk_post_fb: "Facebook", mk_post_igc: "Instagram (फ़ोटो ज़रूरी)", mk_post_go: "अभी पोस्ट करें", mk_post_busy: "पोस्ट हो रहा है…", mk_post_up: "फ़ोटो तैयार हो रही है…",
  mk_post_done_fb: "Facebook पर पोस्ट हुआ", mk_post_done_ig: "Instagram पर पोस्ट हुआ", mk_post_view: "देखें", mk_post_fail: "{w} नहीं हुआ: {m}",
  mk_post_need: "पहले कुछ लिखें या फ़ोटो जोड़ें।", mk_post_err: "अकाउंट तक नहीं पहुँच पाए: {m}", mk_post_recent: "हाल के पोस्ट",
  mk_post_setup_h: "एक बार का सेटअप (लगभग 20–30 मिनट)", mk_post_setup_p: "यह एक बार अपने Facebook लॉगिन से करें। उसके बाद यहीं से पोस्ट कर सकेंगे।",
  mk_q_h: "अपने-आप पोस्ट (AI ड्राफ़्ट + शेड्यूल)", mk_q_p: "एक टैप: AI इस महीने के बाग़ीचे के काम पर अगले हफ़्ते के पोस्ट लिखता है। जाँचें, Instagram के लिए फ़ोटो जोड़ें, फिर सब मंज़ूर करें। हर पोस्ट अपने समय पर अपने-आप जाएगा (10 मिनट के अंदर)।",
  mk_q_setup: "इसे चालू करने के लिए Supabase में एक बार supabase/social_queue.sql चलाएँ।", mk_q_draft: "✨ AI से अगले हफ़्ते के पोस्ट", mk_q_drafting: "पोस्ट लिखे जा रहे हैं…",
  mk_q_n: "{n} पोस्ट", mk_q_l_hn: "Hinglish", mk_q_l_hi: "हिंदी", mk_q_l_en: "English",
  mk_q_drafts: "जाँचने के लिए ड्राफ़्ट ({n})", mk_q_sched: "शेड्यूल हुए ({n})", mk_q_done: "हाल में पोस्ट हुए", mk_q_none: "कोई ड्राफ़्ट नहीं। ऊपर का बटन दबाकर हफ़्ते भर के पोस्ट पाएँ।",
  mk_q_when: "कब (भारत का समय)", mk_q_photo_idea: "फ़ोटो का सुझाव: {t}", mk_q_ig_need: "Instagram पर भी डालने के लिए फ़ोटो जोड़ें।",
  mk_q_approve: "मंज़ूर करें", mk_q_approve_all: "सब मंज़ूर करें और शेड्यूल करें ({n})", mk_q_del: "हटाएँ", mk_q_del_sure: "हटाने के लिए फिर दबाएँ",
  mk_q_unsched: "वापस ड्राफ़्ट में", mk_q_retry: "फिर से कोशिश करें", mk_q_failed: "नहीं हुआ", mk_q_partial: "{w} नहीं हुआ: {m}",
  mk_q_err: "यह नहीं हो सका: {m}", mk_q_ai_err: "AI अभी पोस्ट नहीं लिख पाया। एक मिनट बाद फिर कोशिश करें।",
  mk_q_notoken: "शेड्यूल हुए पोस्ट तब तक रुके रहेंगे जब तक पोस्टिंग जुड़ नहीं जाती (ऊपर वाला बॉक्स)।", mk_q_empty: "पहले कुछ लिखें।",
  mk_change: "लिंक बदलें", mk_how: "कैसे बनाएँ", mk_copy_bs: "छोटा बायो कॉपी करें", mk_copy_bl: "लंबा विवरण कॉपी करें",
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

/* id, name, where to create it, where to manage it, the start every page link must have, steps */
const MK_SOCIAL = [
  ["instagram", "Instagram", "https://www.instagram.com/accounts/emailsignup/", "https://business.facebook.com/", "https://www.instagram.com/",
   ["Sign up with admin@sebsaathi.com, username sebsaathi (or sebsaathi.app if taken)", "Profile picture: from the design canvas", "Settings → Account type → Switch to a professional account → Business", "Paste the short bio and add sebsaathi.com as the link"]],
  ["facebook", "Facebook page", "https://www.facebook.com/pages/create", "https://business.facebook.com/", "https://www.facebook.com/",
   ["Log in to your own Facebook, then create a Page named Seb Saathi · सेब साथी", "Category: Agriculture; add profile picture and Facebook cover", "Paste the long description; set the username to sebsaathi", "Link the Instagram account (Settings → Linked accounts)"]],
  ["youtube", "YouTube", "https://www.youtube.com/create_channel", "https://studio.youtube.com/", "https://www.youtube.com/",
   ["Sign in with a Google account, then create a channel named Seb Saathi", "Handle @sebsaathi; add profile picture and YouTube banner", "Paste the long description and add sebsaathi.com as a link"]],
  ["whatsapp", "WhatsApp channel", "https://business.whatsapp.com/products/business-app", "https://web.whatsapp.com/", "https://whatsapp.com/channel/",
   ["Install WhatsApp Business on your phone", "Updates tab → + → Create channel → name Seb Saathi · सेब साथी", "Add profile picture and the long description", "Channel → Share → Copy link, and paste it below"]]
];
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
  renderMk(); loadSoc(); loadQ();
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

/* ---- posting (api/social-post.js) ---- */
const MK_SETUP = [
  ["Make sure Instagram is a Business account and is linked to your Facebook Page", "Instagram → Settings → Account type → Professional; then Facebook Page → Settings → Linked accounts → Instagram"],
  ["Create a free Meta app", "developers.facebook.com → My Apps → Create app → name \"Seb Saathi poster\" → use case: Manage everything on your Page", "https://developers.facebook.com/apps/"],
  ["Get a token with posting permission", "Graph API Explorer → choose your app → Get User Access Token → tick pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish, business_management → Generate", "https://developers.facebook.com/tools/explorer/"],
  ["Make it last", "Access Token Debugger → paste the token → Extend Access Token → copy the long-lived token", "https://developers.facebook.com/tools/debug/accesstoken/"],
  ["Get the Page token", "Back in Graph API Explorer, paste the long-lived token, run GET me/accounts, and copy the access_token of the Seb Saathi page"],
  ["Add it to Vercel", "Vercel → your project → Settings → Environment Variables → name META_PAGE_TOKEN, value = that Page token → Save → Deployments → Redeploy", "https://vercel.com/dashboard"],
  ["Come back here and tap Refresh", "This box will show your Page and Instagram name, and the Post button"]
];
let mkSoc = null, mkPostText = "", mkImg = null, mkPostBusy = "", mkPostRes = null;
async function mkTok() { try { const r = await sb.auth.getSession(); return r && r.data && r.data.session ? r.data.session.access_token : ""; } catch (e) { return ""; } }
async function loadSoc() {
  mkSoc = null; renderMk();
  try { const r = await fetch("/api/social-post", { headers: { Authorization: "Bearer " + await mkTok() } }); mkSoc = await r.json(); }
  catch (e) { mkSoc = { setup: true, ok: false, error: String(e.message || e) }; }
  if (mkSoc && mkSoc.ok) mkOpen.add("post");
  renderMk();
}
function mkJpeg(file) {   /* JPEG, at most 1440 px wide, cropped to what Instagram accepts (4:5 to 1.91:1) */
  return new Promise((ok, no) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      let sw = img.width, sh = img.height, sx = 0, sy = 0;
      if (sw / sh < 0.8) { const h = sw / 0.8; sy = (sh - h) / 2; sh = h; }
      else if (sw / sh > 1.91) { const w = sh * 1.91; sx = (sw - w) / 2; sw = w; }
      const k = Math.min(1, 1440 / sw), c = document.createElement("canvas");
      c.width = Math.round(sw * k); c.height = Math.round(sh * k);
      c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : no(new Error("image")), "image/jpeg", 0.88);
    };
    img.onerror = () => { URL.revokeObjectURL(url); no(new Error("image")); };
    img.src = url;
  });
}
function postHtml() {
  if (!mkSoc) return '<p class="fine">' + tr("mk_post_checking") + "</p>";
  if (!mkSoc.setup || !mkSoc.ok) {
    return (mkSoc.error ? '<p class="fine mkwarn">' + esc(tr("mk_post_err").replace("{m}", mkSoc.error)) + "</p>" : "") +
      "<p><b>" + tr("mk_post_setup_h") + '</b></p><p class="fine">' + tr("mk_post_setup_p") + '</p><ol class="mksteps">' +
      MK_SETUP.map(x => "<li><b>" + esc(x[0]) + "</b><br><span class=\"fine\">" + esc(x[1]) + "</span>" + (x[2] ? ' <a href="' + x[2] + '" target="_blank" rel="noopener">' + tr("mk_open") + "</a>" : "") + "</li>").join("") + "</ol>" +
      '<div class="mklinks"><button class="btn-s" type="button" data-mkpost="refresh">' + tr("ad_refresh") + "</button></div>";
  }
  const S = mkSoc, hasIg = !!S.ig_id;
  let h = '<p class="fine">' + esc(tr("mk_post_conn").replace("{f}", S.page_name || "").replace("{i}", hasIg ? tr("mk_post_ig").replace("{u}", S.ig_user || "") : tr("mk_post_noig"))) + "</p>";
  h += '<label class="fine" for="mkpText">' + tr("mk_post_text") + '</label><select class="mkin" id="mkpReady"><option value="">' + tr("mk_post_ready") + "</option>" +
    MK_MSGS.map((m, i) => '<option value="m' + i + '">' + esc(m[0]) + "</option>").join("") + "</select>" +
    '<textarea class="mkin mkta" id="mkpText" rows="6">' + esc(mkPostText) + "</textarea>";
  h += '<div class="mkrow">' + (mkImg ? '<img class="mkprev" src="' + esc(mkImg.prev) + '" alt="">' : "") +
    '<label class="btn-s mkfile">' + tr(mkImg ? "mk_post_photo_ch" : "mk_post_photo") + '<input type="file" accept="image/*" id="mkpFile" hidden></label>' +
    (mkImg ? '<button class="btn-s" type="button" data-mkpost="rmimg">' + tr("mk_post_rm") + "</button>" : "") + "</div>";
  h += '<div class="mkrow"><label class="chk"><input type="checkbox" id="mkpFb" checked><span>' + tr("mk_post_fb") + '</span></label><label class="chk"><input type="checkbox" id="mkpIg"' + (hasIg && mkImg ? " checked" : "") + (hasIg ? "" : " disabled") + "><span>" + tr("mk_post_igc") + "</span></label></div>";
  h += '<div class="mklinks"><button class="btn-s add" type="button" data-mkpost="go"' + (mkPostBusy ? " disabled" : "") + ">" + tr(mkPostBusy || "mk_post_go") + "</button></div>";
  if (mkPostRes) h += '<div class="mkres" role="status">' + mkPostRes + "</div>";
  const recent = Object.keys(MK).filter(k => k.indexOf("post:") === 0).sort().reverse().slice(0, 5);
  if (recent.length) {
    h += "<p><b>" + tr("mk_post_recent") + '</b></p><ul class="mkwatch">' + recent.map(k => {
      let v = {}; try { v = JSON.parse(MK[k].value || "{}"); } catch (e) {}
      const d = new Date(+k.slice(5)).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" });
      return "<li>" + esc(d) + " · " + esc(v.t || "") + (v.fb ? ' · <a href="' + esc(v.fb) + '" target="_blank" rel="noopener">Facebook</a>' : "") + (v.ig ? ' · <a href="' + esc(v.ig) + '" target="_blank" rel="noopener">Instagram</a>' : "") + "</li>";
    }).join("") + "</ul>";
  }
  return h;
}
async function mkDoPost() {
  const fb = $("mkpFb") && $("mkpFb").checked, ig = $("mkpIg") && $("mkpIg").checked;
  mkPostText = ($("mkpText").value || "").trim();
  if (!mkPostText && !mkImg) { mkPostRes = '<p class="mkwarn">' + tr("mk_post_need") + "</p>"; renderMk(); return; }
  mkPostRes = null;
  try {
    let url = "";
    if (mkImg) {
      if (!mkImg.url) {
        mkPostBusy = "mk_post_up"; renderMk();
        const path = "social/" + new Date().toISOString().slice(0, 10) + "/" + Math.random().toString(36).slice(2, 10) + ".jpg";
        const up = await sb.storage.from("library").upload(path, mkImg.blob, { contentType: "image/jpeg", upsert: false });
        if (up.error) throw up.error;
        mkImg.url = sb.storage.from("library").getPublicUrl(path).data.publicUrl;
      }
      url = mkImg.url;
    }
    mkPostBusy = "mk_post_busy"; renderMk();
    const r = await fetch("/api/social-post", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ text: mkPostText, image_url: url, fb, ig }) });
    const j = await r.json(); const R = j.result || {};
    let h = "";
    const line = (x, okKey, name) => x ? (x.ok ? "<p>✓ " + tr(okKey) + ' · <a href="' + esc(x.link) + '" target="_blank" rel="noopener">' + tr("mk_post_view") + "</a></p>"
      : '<p class="mkwarn">' + esc(tr("mk_post_fail").replace("{w}", name).replace("{m}", x.error === "need_photo" ? tr("mk_post_igc") : x.error === "no_ig" ? tr("mk_post_noig") : x.error)) + "</p>") : "";
    h += line(R.fb, "mk_post_done_fb", "Facebook") + line(R.ig, "mk_post_done_ig", "Instagram");
    if (!h) h = '<p class="mkwarn">' + esc(j.error || "error") + "</p>";
    mkPostRes = h;
    if ((R.fb && R.fb.ok) || (R.ig && R.ig.ok)) {
      await mkSave("post:" + Date.now(), { done: true, value: JSON.stringify({ t: mkPostText.slice(0, 80), fb: R.fb && R.fb.ok ? R.fb.link : "", ig: R.ig && R.ig.ok ? R.ig.link : "" }).slice(0, 500) });
      mkPostText = ""; mkImg = null;
    }
  } catch (e) { mkPostRes = '<p class="mkwarn">' + esc(String(e.message || e)) + "</p>"; }
  mkPostBusy = ""; renderMk();
}
/* ---- auto posts: AI drafts + schedule (api/social-draft.js, api/social-cron.js, supabase/social_queue.sql) ---- */
let mkQ = null, mkQErr = "", mkQBusy = false, mkQMsg = "", mkQN = 3, mkQLang = "hn", mkQDel = null;
const qIst = iso => iso ? new Date(Date.parse(iso) + 330 * 60000).toISOString().slice(0, 16) : "";
const qUtc = v => new Date(Date.parse(v + ":00Z") - 330 * 60000).toISOString();
const qShow = iso => iso ? new Date(Date.parse(iso) + 330 * 60000).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "";
async function loadQ() {
  try {
    const since = new Date(Date.now() - 21 * 86400000).toISOString();
    const r = await sb.from("social_queue").select("*").or("status.in.(draft,scheduled,posting),updated_at.gte." + since).order("post_at", { ascending: true }).limit(100);
    if (r.error) throw r.error;
    mkQ = r.data || []; mkQErr = "";
  } catch (e) { mkQ = null; mkQErr = "setup"; }
  renderMk();
}
const qGet = id => (mkQ || []).find(x => String(x.id) === String(id));
async function qUpd(id, patch) {
  const r = await sb.from("social_queue").update(Object.assign({}, patch, { updated_at: new Date().toISOString() })).eq("id", id).select().single();
  if (r.error) throw r.error;
  const i = mkQ.findIndex(x => String(x.id) === String(id)); if (i >= 0) mkQ[i] = r.data;
  return r.data;
}
function qApprovePatch(x) {
  const p = { status: "scheduled" };
  if (x.ig && !x.image_url) p.ig = false;
  if (!x.post_at || Date.parse(x.post_at) < Date.now()) p.post_at = new Date().toISOString();
  return p;
}
function qHtml() {
  if (mkQErr) return '<p class="fine mkwarn">' + tr("mk_q_setup") + "</p>";
  if (!mkQ) return '<p class="fine">' + tr("mk_post_checking") + "</p>";
  const hasIg = !!(mkSoc && mkSoc.ok && mkSoc.ig_id);
  let h = '<p class="fine">' + tr("mk_q_p") + "</p>";
  if (mkSoc && !mkSoc.ok) h += '<p class="fine mkwarn">' + tr("mk_q_notoken") + "</p>";
  h += '<div class="mkrow"><select class="mkin mksel" id="mkqN">' + [3, 5, 7].map(n => '<option value="' + n + '"' + (n === mkQN ? " selected" : "") + ">" + tr("mk_q_n").replace("{n}", n) + "</option>").join("") + "</select>" +
    '<select class="mkin mksel" id="mkqLang">' + ["hn", "hi", "en"].map(l => '<option value="' + l + '"' + (l === mkQLang ? " selected" : "") + ">" + tr("mk_q_l_" + l) + "</option>").join("") + "</select>" +
    '<button class="btn-s add" type="button" data-mkq="draft"' + (mkQBusy ? " disabled" : "") + ">" + tr(mkQBusy ? "mk_q_drafting" : "mk_q_draft") + "</button></div>";
  if (mkQMsg) h += '<div class="mkres" role="status"><p class="mkwarn">' + esc(mkQMsg) + "</p></div>";
  const drafts = mkQ.filter(x => x.status === "draft"), sched = mkQ.filter(x => x.status === "scheduled" || x.status === "posting"),
    done = mkQ.filter(x => x.status === "posted" || x.status === "failed").sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  h += "<p><b>" + tr("mk_q_drafts").replace("{n}", drafts.length) + "</b></p>";
  if (!drafts.length) h += '<p class="fine">' + tr("mk_q_none") + "</p>";
  drafts.forEach(x => {
    h += '<div class="mkq">' + (x.topic ? "<b>" + esc(x.topic) + "</b>" : "") +
      '<label class="fine" for="mkqw-' + x.id + '">' + tr("mk_q_when") + '</label><input class="mkin" type="datetime-local" id="mkqw-' + x.id + '" data-qf="post_at" data-id="' + x.id + '" value="' + qIst(x.post_at) + '">' +
      '<textarea class="mkin mkta" rows="7" data-qf="text" data-id="' + x.id + '">' + esc(x.text) + "</textarea>" +
      (x.photo_idea ? '<p class="fine">' + esc(tr("mk_q_photo_idea").replace("{t}", x.photo_idea)) + "</p>" : "") +
      '<div class="mkrow">' + (x.image_url ? '<img class="mkprev" src="' + esc(x.image_url) + '" alt="">' : "") +
      '<label class="btn-s mkfile">' + tr(x.image_url ? "mk_post_photo_ch" : "mk_post_photo") + '<input type="file" accept="image/*" data-qimg="' + x.id + '" hidden></label>' +
      (x.image_url ? '<button class="btn-s" type="button" data-mkq="rmimg" data-id="' + x.id + '">' + tr("mk_post_rm") + "</button>" : "") + "</div>" +
      '<div class="mkrow"><label class="chk"><input type="checkbox" data-qf="fb" data-id="' + x.id + '"' + (x.fb ? " checked" : "") + "><span>" + tr("mk_post_fb") + '</span></label>' +
      '<label class="chk"><input type="checkbox" data-qf="ig" data-id="' + x.id + '"' + (x.ig && x.image_url ? " checked" : "") + (hasIg && x.image_url ? "" : " disabled") + "><span>" + tr("mk_post_igc") + "</span></label></div>" +
      (!x.image_url ? '<p class="fine">' + tr("mk_q_ig_need") + "</p>" : "") +
      '<div class="mklinks"><button class="btn-s add" type="button" data-mkq="approve" data-id="' + x.id + '">' + tr("mk_q_approve") + '</button><button class="btn-s" type="button" data-mkq="del" data-id="' + x.id + '">' + tr(mkQDel === String(x.id) ? "mk_q_del_sure" : "mk_q_del") + "</button></div></div>";
  });
  if (drafts.length > 1) h += '<div class="mklinks"><button class="btn-s add" type="button" data-mkq="approveall">' + tr("mk_q_approve_all").replace("{n}", drafts.length) + "</button></div>";
  if (sched.length) h += "<p><b>" + tr("mk_q_sched").replace("{n}", sched.length) + '</b></p><ul class="mkwatch">' + sched.map(x =>
    "<li>" + esc(qShow(x.post_at)) + " · " + esc(x.topic || x.text.slice(0, 60)) + " · " + (x.fb ? "Facebook" : "") + (x.fb && x.ig ? " + " : "") + (x.ig ? "Instagram" : "") +
    (x.status === "scheduled" ? ' <button class="btn-s" type="button" data-mkq="unsched" data-id="' + x.id + '">' + tr("mk_q_unsched") + "</button>" : " · " + tr("mk_post_busy")) + "</li>").join("") + "</ul>";
  if (done.length) h += "<p><b>" + tr("mk_q_done") + '</b></p><ul class="mkwatch">' + done.slice(0, 10).map(x => {
    const R = x.result || {}, part = (o, w) => o ? (o.ok ? ' · <a href="' + esc(o.link) + '" target="_blank" rel="noopener">' + w + "</a>" : ' · <span class="mkwarn">' + esc(tr("mk_q_partial").replace("{w}", w).replace("{m}", o.error === "need_photo" ? tr("mk_post_igc") : o.error === "no_ig" ? tr("mk_post_noig") : o.error)) + "</span>") : "";
    return "<li>" + esc(qShow(x.post_at)) + " · " + esc(x.topic || x.text.slice(0, 60)) + part(R.fb, "Facebook") + part(R.ig, "Instagram") +
      (x.status === "failed" ? ' · <span class="mkwarn">' + tr("mk_q_failed") + (R.error ? ": " + esc(R.error) : "") + '</span> <button class="btn-s" type="button" data-mkq="retry" data-id="' + x.id + '">' + tr("mk_q_retry") + "</button>" : "") + "</li>";
  }).join("") + "</ul>";
  return h;
}
async function qDraft() {
  mkQBusy = true; mkQMsg = ""; renderMk();
  try {
    const r = await fetch("/api/social-draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ n: mkQN, lang: mkQLang }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) mkQMsg = j.error === "not_setup" ? tr("mk_q_setup") : j.error === "ai" || j.error === "no_ai_key" ? tr("mk_q_ai_err") : tr("mk_q_err").replace("{m}", j.error || r.status);
  } catch (e) { mkQMsg = tr("mk_q_err").replace("{m}", String(e.message || e)); }
  mkQBusy = false; await loadQ();
}
async function qAct(fn) {
  mkQMsg = "";
  try { await fn(); } catch (e) { mkQMsg = tr("mk_q_err").replace("{m}", String(e.message || e)); }
  renderMk();
}
$("mkBody").addEventListener("input", e => {
  const f = e.target.dataset && e.target.dataset.qf; if (f !== "text") return;
  const x = qGet(e.target.dataset.id); if (x) x.text = e.target.value;
});
$("mkBody").addEventListener("change", async e => {
  const t = e.target;
  if (t.id === "mkqN") { mkQN = +t.value || 3; return; }
  if (t.id === "mkqLang") { mkQLang = t.value; return; }
  if (t.dataset && t.dataset.qimg) {
    const id = t.dataset.qimg, f = t.files && t.files[0]; if (!f) return;
    return qAct(async () => {
      const blob = await mkJpeg(f);
      const path = "social/" + new Date().toISOString().slice(0, 10) + "/" + Math.random().toString(36).slice(2, 10) + ".jpg";
      const up = await sb.storage.from("library").upload(path, blob, { contentType: "image/jpeg", upsert: false });
      if (up.error) throw up.error;
      await qUpd(id, { image_url: sb.storage.from("library").getPublicUrl(path).data.publicUrl, ig: !!(mkSoc && mkSoc.ig_id) });
    });
  }
  const f = t.dataset && t.dataset.qf; if (!f) return;
  const id = t.dataset.id;
  if (f === "text") return qAct(() => qUpd(id, { text: t.value.slice(0, 2200) }));
  if (f === "post_at") { if (t.value) return qAct(() => qUpd(id, { post_at: qUtc(t.value) })); return; }
  if (f === "fb" || f === "ig") return qAct(() => qUpd(id, { [f]: t.checked }));
});
$("mkBody").addEventListener("click", e => {
  const b = e.target.closest("[data-mkq]"); if (!b) return;
  const a = b.dataset.mkq, id = b.dataset.id, x = qGet(id);
  if (a !== "del") mkQDel = null;
  if (a === "draft") return qDraft();
  if (a === "approve" && x) {
    if (!String(x.text || "").trim() && !x.image_url) { mkQMsg = tr("mk_q_empty"); renderMk(); return; }
    return qAct(() => qUpd(id, Object.assign({ text: x.text }, qApprovePatch(x))));
  }
  if (a === "approveall") return qAct(async () => {
    for (const d of mkQ.filter(y => y.status === "draft" && (String(y.text || "").trim() || y.image_url))) await qUpd(d.id, Object.assign({ text: d.text }, qApprovePatch(d)));
  });
  if (a === "del") {
    if (mkQDel !== id) { mkQDel = id; renderMk(); return; }
    mkQDel = null;
    return qAct(async () => { const r = await sb.from("social_queue").delete().eq("id", id); if (r.error) throw r.error; mkQ = mkQ.filter(y => String(y.id) !== String(id)); });
  }
  if (a === "rmimg") return qAct(() => qUpd(id, { image_url: null, ig: false }));
  if (a === "unsched") return qAct(() => qUpd(id, { status: "draft" }));
  if (a === "retry") return qAct(() => qUpd(id, { status: "scheduled", post_at: new Date().toISOString(), result: null }));
});
const mkOpen = new Set(["soc"]);   /* which sections are open; social media starts open */
const mkSec = (id, title, sub, body) => '<details class="mksec" data-mksec="' + id + '"' + (mkOpen.has(id) ? " open" : "") + '><summary><b>' + title + "</b>" + (sub ? '<span class="fine">' + sub + "</span>" : "") + "</summary>" + body + "</details>";
function renderMk() {
  const box = $("mkBody"); if (!box) return;
  let h = "";
  if (mkLocal) h += '<p class="fine mkwarn">' + tr("mk_local") + "</p>";
  /* 1. next steps: the first 3 unticked tasks of the plan */
  const all = []; MK_PHASES.forEach(p => p.tasks.forEach(t => all.push([t[0], t[1], p.name])));
  const done = all.filter(t => mkDone(t[0])).length, next = all.filter(t => !mkDone(t[0])).slice(0, 3);
  h += '<section class="mknext"><div class="mkph"><b>' + tr("mk_next_h") + '</b><span class="fine">' + tr("mk_done_n").replace("{d}", done).replace("{n}", all.length) + '</span></div><div class="mkbar"><i style="width:' + Math.round(done / all.length * 100) + '%"></i></div>' +
    (next.length ? next.map(t => mkBox(t[0], t[1])).join("") : "<p>" + tr("mk_all_done") + "</p>") + "</section>";
  /* posting */
  h += mkSec("post", tr("mk_post_h"), mkSoc && mkSoc.ok ? "✓" : "", postHtml());
  h += mkSec("auto", tr("mk_q_h"), mkQ ? tr("mk_q_sched").replace("{n}", mkQ.filter(x => x.status === "scheduled").length) : "", qHtml());
  /* 2. social media */
  const socDone = MK_SOCIAL.filter(x => MK["link:" + x[0]] && MK["link:" + x[0]].value).length;
  h += mkSec("soc", tr("mk_soc_h"), tr("mk_done_n").replace("{d}", socDone).replace("{n}", MK_SOCIAL.length),
    '<ul class="mksoc">' + MK_SOCIAL.map(x => {
      const k = "link:" + x[0], v = MK[k] ? MK[k].value || "" : "", live = !!v;
      return "<li><div class=\"mkrow\"><b>" + esc(x[1]) + '</b><span class="fine">' + tr(live ? "mk_soc_live" : "mk_soc_todo") + "</span>" +
        (live ? '<a class="btn-s add" href="' + esc(v) + '" target="_blank" rel="noopener">' + tr("mk_open") + '</a><a class="btn-s" href="' + x[3] + '" target="_blank" rel="noopener">' + tr("mk_manage") + "</a>"
              : '<a class="btn-s add" href="' + x[2] + '" target="_blank" rel="noopener">' + tr("mk_create") + "</a>") + "</div>" +
        '<details class="mkmore"><summary>' + tr(live ? "mk_change" : "mk_how") + "</summary>" + (live ? "" : '<ol class="mksteps">' + x[5].map(t => "<li>" + esc(t) + "</li>").join("") + "</ol>") +
        '<label class="fine" for="mkl-' + x[0] + '">' + tr("mk_c_link") + '</label><div class="mkrow"><input class="mkin" type="url" id="mkl-' + x[0] + '" value="' + esc(v) + '" placeholder="' + x[4] + '…"><button class="btn-s" type="button" data-mksave="' + x[0] + '">' + tr("mk_save") + '</button></div><p class="fine mkwarn" id="mke-' + x[0] + '"></p></details></li>';
    }).join("") + "</ul>" +
    '<div class="mklinks"><button class="btn-s" type="button" data-mkcopy="bs">' + tr(mkCopied.bs ? "mk_copied" : "mk_copy_bs") + '</button><button class="btn-s" type="button" data-mkcopy="bl">' + tr(mkCopied.bl ? "mk_copied" : "mk_copy_bl") + '</button><a class="btn-s" href="' + MK_DESIGN + '" target="_blank" rel="noopener">' + tr("mk_design") + "</a></div>");
  /* 3. messages */
  h += mkSec("msg", tr("mk_msg_h"), "", '<p class="fine">' + tr("mk_msg_p") + "</p>" + MK_MSGS.map((m, i) => {
    const full = m[1] + (i === 3 ? "" : "\n" + mkLink());
    return '<div class="mkmsg"><b>' + esc(m[0]) + "</b><pre>" + esc(full) + '</pre><div class="mklinks"><button class="btn-s" type="button" data-mkcopy="m' + i + '">' + tr(mkCopied["m" + i] ? "mk_copied" : "mk_copy") + '</button><a class="btn-s wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(full) + '">' + tr("mk_wa") + "</a></div></div>";
  }).join(""));
  /* 4. invites */
  let inv = "";
  if (mkInvErr) inv = '<p class="fine">' + tr("mk_inv_setup") + "</p>";
  else if (mkInv) {
    inv = '<p class="fine">' + tr("mk_inv_p") + "</p>" + (mkInv.length ? '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_grower") + '</th><th scope="col" class="n">' + tr("mk_c_joined") + '</th><th scope="col" class="n">' + tr("mk_c_claimed") + "</th></tr></thead><tbody>" +
      mkInv.slice(0, 50).map(x => "<tr><td>" + esc(x.email || "–") + '</td><td class="n">' + (+x.joined || 0) + '</td><td class="n">' + (+x.claimed || 0) + "</td></tr>").join("") + "</tbody></table></div>" : '<p class="fine">' + tr("mk_inv_none") + "</p>");
  }
  const invSub = mkInv ? tr("mk_inv_sub").replace("{n}", mkInv.reduce((a, x) => a + (+x.joined || 0), 0)).replace("{m}", mkInv.reduce((a, x) => a + (+x.claimed || 0), 0)) : "";
  h += mkSec("inv", tr("mk_inv_h"), invSub, inv);
  /* 5. full plan and videos */
  let plan = '<div class="mkphases">';
  MK_PHASES.forEach(p => {
    const d = p.tasks.filter(t => mkDone(t[0])).length;
    plan += '<section class="mkphase' + (p.main ? " main" : "") + '"><div class="mkph"><span class="fine">' + esc(p.when) + "</span><b>" + esc(p.name) + '</b><span class="fine">' + tr("mk_done_n").replace("{d}", d).replace("{n}", p.tasks.length) + "</span></div>" +
      p.tasks.map(t => mkBox(t[0], t[1])).join("") + '<p class="mktarget">Target: ' + esc(p.target) + "</p></section>";
  });
  plan += "</div>";
  h += mkSec("plan", tr("mk_plan_h"), "", plan);
  const vd = MK_VIDEOS.filter((v, i) => mkDone("v" + (i + 1))).length;
  h += mkSec("vid", tr("mk_vid_h"), tr("mk_done_n").replace("{d}", vd).replace("{n}", MK_VIDEOS.length), '<p class="fine">' + tr("mk_vid_p") + '</p><ul class="mkvids">' +
    MK_VIDEOS.map((v, i) => '<li><label class="chk mkchk"><input type="checkbox" data-mk="v' + (i + 1) + '"' + (mkDone("v" + (i + 1)) ? " checked" : "") + "><span><b>" + esc(v[1]) + "</b> · " + esc(v[2]) + '<br><span class="fine">' + tr("mk_c_week") + " " + v[0] + " · " + esc(v[3]) + "</span></span></label></li>").join("") + "</ul>");
  /* 6. budget, cautions, files */
  h += mkSec("more", tr("mk_more_h"), "", '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_item") + '</th><th scope="col">' + tr("mk_c_when") + '</th><th scope="col" class="n">' + tr("mk_c_cost") + "</th></tr></thead><tbody>" +
    MK_BUDGET.map(b => "<tr><td>" + esc(b[0]) + "</td><td>" + esc(b[1]) + '</td><td class="n">' + esc(b[2]) + "</td></tr>").join("") + "</tbody></table></div>" +
    '<p><b>' + tr("mk_watch_h") + '</b></p><ul class="mkwatch">' + MK_WATCH.map(w => "<li>" + esc(w) + "</li>").join("") + "</ul>" +
    '<div class="mklinks"><a class="btn-s" href="' + MK_DOC + '" target="_blank" rel="noopener">' + tr("mk_doc") + "</a></div>");
  box.innerHTML = h;
}
$("mkBody").addEventListener("toggle", e => {
  const d = e.target; if (!d.dataset || !d.dataset.mksec) return;
  if (d.open) mkOpen.add(d.dataset.mksec); else mkOpen.delete(d.dataset.mksec);
}, true);

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
    const s = sv.dataset.mksave, v = ($("mkl-" + s).value || "").trim().slice(0, 500), def = MK_SOCIAL.find(x => x[0] === s);
    if (v && !(/^https:\/\//.test(v) && (!def || v.indexOf(def[4].replace("/channel/", "")) === 0 || (s === "youtube" && /^https:\/\/(www\.)?youtube\.com\//.test(v)) || (s === "facebook" && /^https:\/\/(www\.|m\.)?facebook\.com\//.test(v)) || (s === "instagram" && /^https:\/\/(www\.)?instagram\.com\//.test(v))))) {
      set("mke-" + s, tr("mk_badlink").replace("{u}", def ? def[4] : "https://")); return;
    }
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

$("mkBody").addEventListener("input", e => { if (e.target.id === "mkpText") mkPostText = e.target.value; });
$("mkBody").addEventListener("change", async e => {
  if (e.target.id === "mkpReady" && e.target.value) {
    const v = mkText(e.target.value); mkPostText = (mkPostText ? mkPostText + "\n\n" : "") + v; renderMk(); return;
  }
  if (e.target.id === "mkpFile") {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    try { const blob = await mkJpeg(f); if (mkImg && mkImg.prev) URL.revokeObjectURL(mkImg.prev); mkImg = { blob, prev: URL.createObjectURL(blob), url: "" }; }
    catch (x) { mkPostRes = '<p class="mkwarn">' + esc(String(x.message || x)) + "</p>"; }
    renderMk();
  }
});
$("mkBody").addEventListener("click", e => {
  const b = e.target.closest("[data-mkpost]"); if (!b) return;
  const a = b.dataset.mkpost;
  if (a === "go") mkDoPost();
  else if (a === "refresh") loadSoc();
  else if (a === "rmimg") { if (mkImg && mkImg.prev) URL.revokeObjectURL(mkImg.prev); mkImg = null; renderMk(); }
});
