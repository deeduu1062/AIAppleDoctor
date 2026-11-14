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
  mk_vid_h: "Video ideas", mk_vid_p: "3 a week, under 60 seconds, filmed in your own orchards. End each one: \"Seb Saathi free hai. Link description mein.\"",
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
  mk_vid_h: "वीडियो आइडिया", mk_vid_p: "हफ़्ते में 3, 60 सेकंड से कम, अपने बाग़ में बनाए। हर वीडियो के अंत में: \"Seb Saathi free hai. Link description mein.\"",
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
  [4, "Dost ko bhejiye", "Apne bhai-bandhu ko bhi bataiye.", "WhatsApp share and invite link"],
  [4, "Parivaar ke saath hisaab", "Beta Shimla mein hai? Ab woh bhi hisaab dekh sakta hai.", "Family sharing: add a family member with view-only access"],
  [4, "Theka ya Mandi?", "Theke par diya bagicha, munafa kitna hua?", "Season sales record: a Theka sale next to a Mandi sale, per-box profit"]
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
   ["Sign up with admin@sebsaathi.com, username sebsaathi (or sebsaathi.app if taken)", "Profile picture: from the design canvas", "Settings → Account type → Switch to a professional account → Business", "Paste the short bio and set the link to https://sebsaathi.com/?src=ig (so the Marketing tab counts growers who came from Instagram)"]],
  ["facebook", "Facebook page", "https://www.facebook.com/pages/create", "https://business.facebook.com/", "https://www.facebook.com/",
   ["Log in to your own Facebook, then create a Page named Seb Saathi · सेब साथी", "Category: Agriculture; add profile picture and Facebook cover", "Paste the long description; set the username to sebsaathi", "Link the Instagram account (Settings → Linked accounts)", "Website link on the Page: https://sebsaathi.com/?src=fb"]],
  ["youtube", "YouTube", "https://www.youtube.com/create_channel", "https://studio.youtube.com/", "https://www.youtube.com/",
   ["Sign in with a Google account, then create a channel named Seb Saathi", "Handle @sebsaathi; add profile picture and YouTube banner", "Paste the long description and add https://sebsaathi.com/?src=yt as the link"]],
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


/* ---- version 2: scoreboard, sources, one content queue, pilot growers (supabase/marketing_v2.sql) ---- */
Object.assign(T.en, {
  mk_v2_setup: "Run supabase/marketing_v2.sql in Supabase once to turn this on.",
  sc_h: "Scoreboard", sc_growers: "Growers", sc_target: "{p} target: {t} by {d}", sc_goal: "Toward 1,000 active growers by June 2027: {n}",
  sc_active: "Active this week", sc_active_sub: "{n} in 30 days", sc_new: "New this week", sc_new_sub: "{n} in 30 days · {t} today",
  sc_fb: "Facebook followers", sc_ig: "Instagram followers", sc_yt: "YouTube subscribers", sc_na: "–", sc_ch: "{c} in 7 days", sc_since: "{c} since {d}",
  sc_notconn: "not connected", sc_weeks: "New growers per week", sc_wk: "Week of {d}: {n}",
  ph_pilot: "Pilot", ph_prune: "Pruning season", ph_spray: "Spray season", ph_harvest: "Harvest",
  src_h: "Where growers come from", src_p: "Visitors and sign-ups in the last 30 days, by the link they came in on. Put a tracked link (below) everywhere you share the site.",
  src_c_src: "Came from", src_c_vis: "Visitors", src_c_n30: "Joined", src_c_all: "Joined, all time",
  src_none_yet: "No visits from tracked links yet. Share the links below and they show up here.", src_since: "Counting since {d}. Growers who joined before that show as \"Not known\".",
  src_l_ig: "Instagram", src_l_fb: "Facebook", src_l_yt: "YouTube", src_l_wa: "WhatsApp messages", src_l_wach: "WhatsApp channel",
  src_l_poster: "Poster", src_l_meet: "Grower meeting", src_l_ads: "Facebook ads", src_l_invite: "Invite link", src_l_unknown: "Not known (before tracking)", src_l_none: "No link (typed or searched)", src_l_other: "Other",
  tl_h: "Make a tracked link", tl_p: "Pick where you will share it. Posters and meetings need a place name.", tl_place: "Place (for example rohru, chirgaon, kotkhai)",
  tl_need_place: "Type a place name first.", tl_copy: "Copy link", tl_copied: "Copied", tl_qr: "QR code for printing", tl_dl: "Download QR (PNG)",
  tl_where_ig: "Put this as the link in your Instagram bio.", tl_where_fb: "Put this as the website on your Facebook Page. Posts from this tab get ?src=fb added by themselves.",
  tl_where_yt: "Put this in your YouTube channel links. Videos uploaded from Video Studio already use it.", tl_where_wa: "The ready-to-send messages already use this.",
  tl_where_wach: "Put this in your WhatsApp channel description.", tl_where_poster: "Print the QR code on the poster for this place.", tl_where_meet: "Show the QR code at the meeting.", tl_where_ads: "Use this as the link in your Facebook ads.",
  cq_h: "Posts and videos", cq_sub: "{d} to check · {s} scheduled",
  cq_write: "✍️ Write a post", cq_ai: "✨ AI: next week's posts", cq_wa: "💬 AI: this week's WhatsApp tip", cq_vid: "🎬 Make a video", cq_close: "Close",
  cq_now: "Post now", cq_later: "Add to the list to schedule", cq_added: "Added to the list below.", cq_k_post: "Post", cq_k_video: "Video", cq_k_wa: "WhatsApp tip", cq_k_yt: "YouTube",
  cq_wa_send: "Send on WhatsApp", cq_wa_copy: "Copy", cq_wa_done: "Mark as sent", cq_wa_when: "Send on (India time)", cq_wa_note: "WhatsApp channels can't be posted to automatically: copy it, post it in your channel, then mark it as sent.",
  cq_yt_self: "YouTube publishes it by itself", cq_ig_proc: "Instagram is still processing the video. Tap Try again in a few minutes.", cq_ig_vid: "Instagram (Reel)",
  cq_old: "Earlier posts", cq_wa_sent: "Sent on WhatsApp",
  pi_h: "Pilot growers", pi_p: "Your first 20–30 growers around Rohru and Chirgaon. \"Signed up\" and \"Sales entered\" fill in by themselves when their mobile number matches an account.",
  pi_sum: "{n} growers · {v} visited · {u} signed up · {s} sales entered · {t} testimonials",
  pi_name: "Name", pi_village: "Village", pi_phone: "Mobile (10 digits)", pi_add: "Add grower", pi_bad_phone: "Mobile number should be 10 digits.", pi_need_name: "Type the grower's name.",
  pi_c_vis: "Visited", pi_c_up: "Signed up", pi_c_sales: "Sales entered", pi_c_test: "Testimonial", pi_auto: "from their account", pi_lots: "{n} lots", pi_none: "No pilot growers yet. Add the first one above.",
  pi_del: "Remove", pi_del_sure: "Tap again to remove", pi_note: "Note",
  vi_ai: "✨ Ideas for next month", vi_ai_busy: "Planning videos…", vi_month: "{m} (AI ideas)", vi_make: "🎬 Make in Studio", vi_err: "The AI could not plan videos just now. Try again in a minute.",
  vi_prefill: "Words for \"{v}\" are in the Video Studio. Film: {s}",
  bu_spent: "Spent so far", bu_total: "Spent: {a} of about ₹60,000", bu_hint: "Add marketing spends in the Costs tab (for example service \"Posters\", what for \"Marketing\"), and they show here.",
  bu_month: "{a}/month", bu_free: "{n} free months",
  st_h: "Setup (accounts, links and posting)", st_sub: "{d} of {n} accounts linked", st_yt: "YouTube: connect it in the Video Studio box above (YouTube card).",
  st_post_ok: "Posting is connected: Facebook page {f}{i}"
});
Object.assign(T.hi, {
  mk_v2_setup: "इसे चालू करने के लिए Supabase में एक बार supabase/marketing_v2.sql चलाएँ।",
  sc_h: "स्कोरबोर्ड", sc_growers: "बागवान", sc_target: "{p} का लक्ष्य: {d} तक {t}", sc_goal: "जून 2027 तक 1,000 सक्रिय बागवानों की ओर: {n}",
  sc_active: "इस हफ़्ते सक्रिय", sc_active_sub: "30 दिन में {n}", sc_new: "इस हफ़्ते नए", sc_new_sub: "30 दिन में {n} · आज {t}",
  sc_fb: "Facebook फ़ॉलोअर", sc_ig: "Instagram फ़ॉलोअर", sc_yt: "YouTube सब्सक्राइबर", sc_na: "–", sc_ch: "7 दिन में {c}", sc_since: "{d} से {c}",
  sc_notconn: "जुड़ा नहीं", sc_weeks: "हर हफ़्ते नए बागवान", sc_wk: "{d} वाला हफ़्ता: {n}",
  ph_pilot: "पायलट", ph_prune: "छँटाई का मौसम", ph_spray: "स्प्रे का मौसम", ph_harvest: "तुड़ाई",
  src_h: "बागवान कहाँ से आते हैं", src_p: "पिछले 30 दिन के विज़िटर और नए खाते, जिस लिंक से वे आए। साइट जहाँ भी शेयर करें, नीचे वाला ट्रैक लिंक लगाएँ।",
  src_c_src: "कहाँ से", src_c_vis: "विज़िटर", src_c_n30: "जुड़े", src_c_all: "कुल जुड़े",
  src_none_yet: "अभी ट्रैक लिंक से कोई नहीं आया। नीचे के लिंक शेयर करें, वे यहाँ दिखेंगे।", src_since: "{d} से गिनती। उससे पहले जुड़े बागवान \"पता नहीं\" में दिखते हैं।",
  src_l_ig: "Instagram", src_l_fb: "Facebook", src_l_yt: "YouTube", src_l_wa: "WhatsApp संदेश", src_l_wach: "WhatsApp चैनल",
  src_l_poster: "पोस्टर", src_l_meet: "बागवान बैठक", src_l_ads: "Facebook विज्ञापन", src_l_invite: "न्योता लिंक", src_l_unknown: "पता नहीं (ट्रैकिंग से पहले)", src_l_none: "बिना लिंक (टाइप या सर्च किया)", src_l_other: "अन्य",
  tl_h: "ट्रैक लिंक बनाएँ", tl_p: "चुनें कि आप इसे कहाँ शेयर करेंगे। पोस्टर और बैठक के लिए जगह का नाम चाहिए।", tl_place: "जगह (जैसे rohru, chirgaon, kotkhai)",
  tl_need_place: "पहले जगह का नाम लिखें।", tl_copy: "लिंक कॉपी करें", tl_copied: "कॉपी हुआ", tl_qr: "छापने के लिए QR कोड", tl_dl: "QR डाउनलोड करें (PNG)",
  tl_where_ig: "इसे Instagram बायो के लिंक में डालें।", tl_where_fb: "इसे Facebook पेज की वेबसाइट में डालें। इस टैब से किए पोस्ट में ?src=fb अपने-आप जुड़ता है।",
  tl_where_yt: "इसे YouTube चैनल के लिंक में डालें। Video Studio से अपलोड वीडियो में यह पहले से है।", tl_where_wa: "तैयार संदेशों में यह पहले से है।",
  tl_where_wach: "इसे WhatsApp चैनल के विवरण में डालें।", tl_where_poster: "इस जगह के पोस्टर पर QR कोड छापें।", tl_where_meet: "बैठक में QR कोड दिखाएँ।", tl_where_ads: "Facebook विज्ञापन में यही लिंक लगाएँ।",
  cq_h: "पोस्ट और वीडियो", cq_sub: "{d} जाँचने हैं · {s} शेड्यूल",
  cq_write: "✍️ पोस्ट लिखें", cq_ai: "✨ AI: अगले हफ़्ते के पोस्ट", cq_wa: "💬 AI: इस हफ़्ते की WhatsApp टिप", cq_vid: "🎬 वीडियो बनाएँ", cq_close: "बंद करें",
  cq_now: "अभी पोस्ट करें", cq_later: "शेड्यूल के लिए सूची में जोड़ें", cq_added: "नीचे सूची में जुड़ गया।", cq_k_post: "पोस्ट", cq_k_video: "वीडियो", cq_k_wa: "WhatsApp टिप", cq_k_yt: "YouTube",
  cq_wa_send: "WhatsApp पर भेजें", cq_wa_copy: "कॉपी", cq_wa_done: "भेज दिया", cq_wa_when: "कब भेजें (भारत का समय)", cq_wa_note: "WhatsApp चैनल पर अपने-आप पोस्ट नहीं होता: कॉपी करें, चैनल में डालें, फिर \"भेज दिया\" दबाएँ।",
  cq_yt_self: "YouTube इसे अपने-आप पब्लिश करेगा", cq_ig_proc: "Instagram अभी वीडियो तैयार कर रहा है। कुछ मिनट बाद \"फिर से कोशिश करें\" दबाएँ।", cq_ig_vid: "Instagram (Reel)",
  cq_old: "पहले के पोस्ट", cq_wa_sent: "WhatsApp पर भेजा",
  pi_h: "पायलट बागवान", pi_p: "रोहड़ू और चिड़गाँव के आपके पहले 20–30 बागवान। मोबाइल नंबर किसी खाते से मिलते ही \"खाता बना\" और \"बिक्री लिखी\" अपने-आप भर जाते हैं।",
  pi_sum: "{n} बागवान · {v} से मिले · {u} ने खाता बनाया · {s} ने बिक्री लिखी · {t} टेस्टिमोनियल",
  pi_name: "नाम", pi_village: "गाँव", pi_phone: "मोबाइल (10 अंक)", pi_add: "बागवान जोड़ें", pi_bad_phone: "मोबाइल नंबर 10 अंक का होना चाहिए।", pi_need_name: "बागवान का नाम लिखें।",
  pi_c_vis: "मिले", pi_c_up: "खाता बना", pi_c_sales: "बिक्री लिखी", pi_c_test: "टेस्टिमोनियल", pi_auto: "उनके खाते से", pi_lots: "{n} लॉट", pi_none: "अभी कोई पायलट बागवान नहीं। ऊपर पहला जोड़ें।",
  pi_del: "हटाएँ", pi_del_sure: "हटाने के लिए फिर दबाएँ", pi_note: "नोट",
  vi_ai: "✨ अगले महीने के आइडिया", vi_ai_busy: "वीडियो की योजना बन रही है…", vi_month: "{m} (AI आइडिया)", vi_make: "🎬 स्टूडियो में बनाएँ", vi_err: "AI अभी वीडियो की योजना नहीं बना पाया। एक मिनट बाद फिर कोशिश करें।",
  vi_prefill: "\"{v}\" के शब्द Video Studio में हैं। फ़िल्म करें: {s}",
  bu_spent: "अब तक ख़र्च", bu_total: "ख़र्च: लगभग ₹60,000 में से {a}", bu_hint: "मार्केटिंग के ख़र्च Costs टैब में जोड़ें (जैसे सेवा \"Posters\", किसलिए \"Marketing\"), वे यहाँ दिखेंगे।",
  bu_month: "{a}/महीना", bu_free: "{n} मुफ़्त महीने",
  st_h: "सेटअप (अकाउंट, लिंक और पोस्टिंग)", st_sub: "{n} में से {d} अकाउंट जुड़े", st_yt: "YouTube: ऊपर Video Studio बॉक्स (YouTube कार्ड) में जोड़ें।",
  st_post_ok: "पोस्टिंग जुड़ी है: Facebook पेज {f}{i}"
});

/* which Costs-tab rows count towards each budget line (matched on service + what for) */
const MK_BUDGET_RX = [/poster|print|flyer|banner/i, /travel|petrol|diesel|fuel|bus|taxi|meeting/i, /\bads?\b|advert|boost|promot/i, null];

/* ---- tracked links (?src=…): where growers come from ---- */
const MK_SRC = [
  ["ig", "src_l_ig", "tl_where_ig"], ["fb", "src_l_fb", "tl_where_fb"], ["yt", "src_l_yt", "tl_where_yt"], ["wa", "src_l_wa", "tl_where_wa"],
  ["wach", "src_l_wach", "tl_where_wach"], ["poster", "src_l_poster", "tl_where_poster", true], ["meet", "src_l_meet", "tl_where_meet", true], ["ads", "src_l_ads", "tl_where_ads"]
];
const mkSrcLabel = code => {
  const c = String(code || "");
  if (c === "invite") return tr("src_l_invite");
  if (c === "unknown") return tr("src_l_unknown");
  if (c === "none") return tr("src_l_none");
  const i = c.indexOf("-"), head = i > 0 ? c.slice(0, i) : c, place = i > 0 ? c.slice(i + 1).replace(/-/g, " ") : "";
  const d = MK_SRC.find(x => x[0] === head);
  return (d ? tr(d[1]) : tr("src_l_other") + ": " + head) + (place ? " · " + place : "");
};
const mkSrcLink = code => "https://sebsaathi.com/?src=" + code;
let mkTl = { src: "poster", place: "" }, mkTlCopied = false;
const mkTlCode = () => {
  const d = MK_SRC.find(x => x[0] === mkTl.src) || MK_SRC[0];
  if (!d[3]) return d[0];
  const pl = String(mkTl.place || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30);
  return pl ? d[0] + "-" + pl : "";
};
function mkQrSvg(text, px) {
  if (typeof ssQr !== "function") return "";
  const q = ssQr(text), n = q.n, m = 4, all = n + m * 2;
  let d = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.dark(r, c)) d += "M" + (c + m) + " " + (r + m) + "h1v1h-1z";
  return '<svg class="mkqr" viewBox="0 0 ' + all + " " + all + '" width="' + px + '" height="' + px + '" role="img" aria-label="QR: ' + esc(text) + '" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
}
function mkQrPng(text, name) {
  const q = ssQr(text), n = q.n, m = 4, k = 24, c = document.createElement("canvas");
  c.width = c.height = (n + m * 2) * k;
  const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.fillStyle = "#000";
  for (let r = 0; r < n; r++) for (let cc = 0; cc < n; cc++) if (q.dark(r, cc)) x.fillRect((cc + m) * k, (r + m) * k, k, k);
  c.toBlob(b => { if (!b) return; const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "seb-saathi-qr-" + name + ".png"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }, "image/png");
}

/* ---- state ---- */
let MK = {}, mkLocal = false, mkInv = null, mkInvErr = "";
let mkSt = null, mkStErr = "", mkPil = null, mkPilErr = "", mkPilMsg = "", mkPilDel = null, mkCost = null, ytSt = null;
const mkRef = () => user && user.id ? String(user.id).replace(/-/g, "").slice(0, 8) : "1";
const mkLink = () => "https://sebsaathi.com/?invite=" + mkRef() + "&src=wa";
const mkCopied = {};
const mkN = v => (+v || 0).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN");
const mkInr = v => "₹" + Math.round(+v || 0).toLocaleString("en-IN");
const mkIst = () => new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
const mkDay = iso => new Date(iso + (iso.length === 10 ? "T00:00:00" : "")).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" });
const mkV2 = e => /kind|video_url|admin_pilots|admin_marketing_stats|admin_pilots_status|src|schema cache|does not exist|42703|PGRST20/i.test(String((e && (e.message || e.code)) || e || ""));

let mkStarted = false;
async function loadMk() {
  mkStarted = true; MK = {}; mkLocal = false;
  try {
    const r = await sb.from("admin_marketing").select("key,done,value");
    if (r.error) throw r.error;
    (r.data || []).forEach(x => { MK[x.key] = { done: !!x.done, value: x.value || "" }; });
  } catch (e) {
    mkLocal = true;
    try { MK = JSON.parse(localStorage.getItem("mk-state") || "{}") || {}; } catch (x) { MK = {}; }
  }
  renderMk(); loadSoc(); loadQ(); loadStats(); loadPilots(); loadCosts2(); loadYtStats();
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

async function loadStats() {
  try { const r = await sb.rpc("admin_marketing_stats"); if (r.error) throw r.error; mkSt = r.data || {}; mkStErr = ""; }
  catch (e) { mkSt = null; mkStErr = "setup"; }
  renderMk();
}
async function loadPilots() {
  try { const r = await sb.rpc("admin_pilots_status"); if (r.error) throw r.error; mkPil = r.data || []; mkPilErr = ""; }
  catch (e) { mkPil = null; mkPilErr = "setup"; }
  renderMk();
}
async function loadCosts2() {
  try { const r = await sb.from("admin_costs").select("service,what_for,amount_inr,per"); if (r.error) throw r.error; mkCost = r.data || []; }
  catch (e) { mkCost = null; }
  renderMk();
}
let ytStTries = 0;
async function loadYtStats() {
  ytSt = null;
  if (typeof ytCall !== "function") { if (ytStTries++ < 20) setTimeout(loadYtStats, 300); return; }   /* studio.js loads just after this file */
  try { ytSt = await ytCall("stats"); } catch (e) { ytSt = { error: String(e.message || e) }; }
  mkSnap(); renderMk();
}
/* one follower snapshot a day, so the scoreboard can show the change over 7 days */
let mkSnapped = false;
function mkSnap() {
  if (mkSnapped || mkLocal || !mkSoc || !ytSt) return;
  const v = { fb: mkSoc.fb_followers, ig: mkSoc.ig_followers, yt: ytSt.subscribers };
  if (v.fb == null && v.ig == null && v.yt == null) return;
  mkSnapped = true;
  const k = "fol:" + mkIst();
  if (!MK[k]) mkSave(k, { done: true, value: JSON.stringify(v) });
}
function mkFolChange(which, now) {
  if (now == null) return "";
  const today = mkIst(), keys = Object.keys(MK).filter(k => k.indexOf("fol:") === 0 && k.slice(4) < today).sort();
  if (!keys.length) return "";
  const wk = new Date(Date.parse(today + "T00:00:00Z") - 7 * 86400000).toISOString().slice(0, 10);
  const older = keys.filter(k => k.slice(4) <= wk), base = older.length ? older[older.length - 1] : keys[0];
  let v = null; try { v = JSON.parse(MK[base].value || "{}")[which]; } catch (e) {}
  if (v == null) return "";
  const c = now - v, cs = (c > 0 ? "+" : c < 0 ? "−" : "±") + mkN(Math.abs(c));
  return older.length ? tr("sc_ch").replace("{c}", cs) : tr("sc_since").replace("{c}", cs).replace("{d}", mkDay(base.slice(4)));
}

/* ---- the phase we are in, from the season plan ---- */
function mkPhase() {
  const d = mkIst();
  if (d < "2027-01-01") return { name: "ph_pilot", t: 30, by: "2026-12-31" };
  if (d < "2027-03-01") return { name: "ph_prune", t: 200, by: "2027-02-28" };
  if (d < "2027-07-01") return { name: "ph_spray", t: 1000, by: "2027-06-30" };
  return { name: "ph_harvest", t: 1000, by: "2027-10-31" };
}
function scoreHtml() {
  let h = '<section class="mkscore" aria-labelledby="mkScH"><div class="mkph"><b id="mkScH">' + tr("sc_h") + "</b></div>";
  if (mkStErr) return h + '<p class="fine mkwarn">' + tr("mk_v2_setup") + "</p></section>";
  if (!mkSt) return h + '<p class="fine">' + tr("mk_post_checking") + "</p></section>";
  const S = mkSt, ph = mkPhase(), g = +S.growers || 0, pct = v => Math.max(0, Math.min(100, Math.round(v * 100)));
  h += '<div class="mkgoal"><div class="mkgoalh"><b>' + mkN(g) + "</b><span> / " + mkN(ph.t) + " " + tr("sc_growers").toLowerCase() + "</span></div>" +
    '<div class="mkbar" role="img" aria-label="' + esc(mkN(g) + " / " + mkN(ph.t)) + '"><i style="width:' + pct(g / ph.t) + '%"></i></div>' +
    '<p class="fine">' + esc(tr("sc_target").replace("{p}", tr(ph.name)).replace("{t}", mkN(ph.t)).replace("{d}", mkDay(ph.by))) + " · " +
    esc(tr("sc_goal").replace("{n}", pct((+S.active30 || 0) / 1000) + "%")) + "</p></div>";
  const tile = (k, v, sub) => "<div><span>" + tr(k) + "</span><b>" + (v == null ? tr("sc_na") : mkN(v)) + "</b>" + (sub ? '<span class="sub">' + esc(sub) + "</span>" : "") + "</div>";
  const fb = mkSoc && mkSoc.ok ? mkSoc.fb_followers : null, ig = mkSoc && mkSoc.ok ? mkSoc.ig_followers : null, yt = ytSt && ytSt.connected ? ytSt.subscribers : null;
  h += '<div class="ystats">' +
    tile("sc_active", +S.active7 || 0, tr("sc_active_sub").replace("{n}", mkN(S.active30))) +
    tile("sc_new", +S.new7 || 0, tr("sc_new_sub").replace("{n}", mkN(S.new30)).replace("{t}", mkN(S.today))) +
    tile("sc_fb", fb, mkSoc && !mkSoc.ok ? tr("sc_notconn") : mkFolChange("fb", fb)) +
    tile("sc_ig", ig, mkSoc && mkSoc.ok && !mkSoc.ig_id ? tr("sc_notconn") : mkFolChange("ig", ig)) +
    tile("sc_yt", yt, ytSt && !ytSt.connected ? tr("sc_notconn") : mkFolChange("yt", yt)) + "</div>";
  const wk = S.weeks || [], mx = Math.max(1, ...wk.map(x => +x.n || 0));
  if (wk.length) {
    h += '<div class="mkweeks"><span class="fine">' + tr("sc_weeks") + '</span><ol class="mkwk">' + wk.map((x, i) => {
      const lab = tr("sc_wk").replace("{d}", mkDay(x.wk)).replace("{n}", mkN(x.n));
      return '<li title="' + esc(lab) + '"><span class="mkwkn">' + ((+x.n || i === wk.length - 1) ? mkN(x.n) : "") + '</span><i style="height:' + Math.max(2, Math.round((+x.n || 0) / mx * 56)) + 'px" aria-hidden="true"></i><span class="mkwkd">' + esc(mkDay(x.wk)) + '</span><span class="vh">' + esc(lab) + "</span></li>";
    }).join("") + "</ol></div>";
  }
  return h + "</section>";
}

/* ---- where growers come from ---- */
function srcHtml() {
  let h = '<p class="fine">' + tr("src_p") + "</p>";
  if (mkStErr) h += '<p class="fine mkwarn">' + tr("mk_v2_setup") + "</p>";
  else if (!mkSt) h += '<p class="fine">' + tr("mk_post_checking") + "</p>";
  else {
    const rows = (mkSt.sources || []).filter(x => +x.visitors || +x.n30 || +x.n_all);
    const tracked = rows.filter(x => !/^(unknown|none)$/.test(x.src));
    if (!tracked.length) h += '<p class="fine">' + tr("src_none_yet") + "</p>";
    if (rows.length) h += '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("src_c_src") + '</th><th scope="col" class="n">' + tr("src_c_vis") + '</th><th scope="col" class="n">' + tr("src_c_n30") + '</th><th scope="col" class="n">' + tr("src_c_all") + "</th></tr></thead><tbody>" +
      rows.map(x => "<tr><td>" + esc(mkSrcLabel(x.src)) + '</td><td class="n">' + mkN(x.visitors) + '</td><td class="n">' + mkN(x.n30) + '</td><td class="n">' + mkN(x.n_all) + "</td></tr>").join("") + "</tbody></table></div>";
    if (mkSt.tracked_since) h += '<p class="fine">' + esc(tr("src_since").replace("{d}", mkDay(String(mkSt.tracked_since).slice(0, 10)))) + "</p>";
  }
  /* link maker */
  const d = MK_SRC.find(x => x[0] === mkTl.src) || MK_SRC[0], code = mkTlCode(), link = code ? mkSrcLink(code) : "";
  h += '<div class="mktl"><p><b>' + tr("tl_h") + '</b></p><p class="fine">' + tr("tl_p") + '</p><div class="mkchips" role="group" aria-label="' + esc(tr("tl_h")) + '">' +
    MK_SRC.map(x => '<button type="button" class="vschip" data-tlsrc="' + x[0] + '" aria-pressed="' + (x[0] === mkTl.src) + '">' + tr(x[1]) + "</button>").join("") + "</div>";
  if (d[3]) h += '<label class="fine" for="mkTlPlace">' + tr("tl_place") + '</label><input class="mkin" id="mkTlPlace" value="' + esc(mkTl.place) + '" maxlength="30" autocomplete="off">';
  h += '<div id="mkTlOut">' + tlOutHtml(d, code, link) + "</div></div>";
  return h;
}
function tlOutHtml(d, code, link) {
  if (!code) return '<p class="fine">' + tr("tl_need_place") + "</p>";
  return '<p class="fine">' + tr(d[2]) + '</p><div class="mkrow"><code class="mklink">' + esc(link) + '</code><button class="btn-s add" type="button" data-tl="copy">' + tr(mkTlCopied ? "tl_copied" : "tl_copy") + "</button></div>" +
    '<details class="mkmore"' + (d[3] ? " open" : "") + '><summary>' + tr("tl_qr") + '</summary><div class="mkqrbox">' + mkQrSvg(link, 168) + '<button class="btn-s" type="button" data-tl="png">' + tr("tl_dl") + "</button></div></details>";
}

/* ---- posting (api/social-post.js) ---- */
let mkSoc = null, mkPostText = "", mkImg = null, mkPostBusy = "", mkPostRes = null, mkCompose = false;
async function mkTok() { try { const r = await sb.auth.getSession(); return r && r.data && r.data.session ? r.data.session.access_token : ""; } catch (e) { return ""; } }
async function loadSoc() {
  mkSoc = null; renderMk();
  try { const r = await fetch("/api/social?fn=post", { headers: { Authorization: "Bearer " + await mkTok() } }); mkSoc = await r.json(); }
  catch (e) { mkSoc = { setup: true, ok: false, error: String(e.message || e) }; }
  mkSnap(); renderMk();
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
const MK_SETUP = [
  ["Make sure Instagram is a Business account and is linked to your Facebook Page", "Instagram → Settings → Account type → Professional; then Facebook Page → Settings → Linked accounts → Instagram"],
  ["Create a free Meta app", "developers.facebook.com → My Apps → Create app → name \"Seb Saathi poster\" → use case: Manage everything on your Page", "https://developers.facebook.com/apps/"],
  ["Get a token with posting permission", "Graph API Explorer → choose your app → Get User Access Token → tick pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish, business_management → Generate", "https://developers.facebook.com/tools/explorer/"],
  ["Make it last", "Access Token Debugger → paste the token → Extend Access Token → copy the long-lived token", "https://developers.facebook.com/tools/debug/accesstoken/"],
  ["Get the Page token", "Back in Graph API Explorer, paste the long-lived token, run GET me/accounts, and copy the access_token of the Seb Saathi page"],
  ["Add it to Vercel", "Vercel → your project → Settings → Environment Variables → name META_PAGE_TOKEN, value = that Page token → Save → Deployments → Redeploy", "https://vercel.com/dashboard"],
  ["Come back here and tap Refresh", "This box will show your Page and Instagram name, and the Post button"]
];
async function mkUpload(blob, ext, type) {
  const path = "social/" + new Date().toISOString().slice(0, 10) + "/" + Math.random().toString(36).slice(2, 10) + "." + ext;
  const up = await sb.storage.from("library").upload(path, blob, { contentType: type, upsert: false });
  if (up.error) throw up.error;
  return sb.storage.from("library").getPublicUrl(path).data.publicUrl;
}
const mkConnLine = S => esc(tr("mk_post_conn").replace("{f}", S.page_name || "").replace("{i}", S.ig_id ? tr("mk_post_ig").replace("{u}", S.ig_user || "") : tr("mk_post_noig")));
function composeHtml() {
  const S = mkSoc || {}, hasIg = !!(S.ok && S.ig_id);
  let h = '<div class="mkcomp">';
  h += '<label class="fine" for="mkpText">' + tr("mk_post_text") + '</label><select class="mkin" id="mkpReady"><option value="">' + tr("mk_post_ready") + "</option>" +
    MK_MSGS.map((m, i) => '<option value="m' + i + '">' + esc(m[0]) + "</option>").join("") + "</select>" +
    '<textarea class="mkin mkta" id="mkpText" rows="6">' + esc(mkPostText) + "</textarea>";
  h += '<div class="mkrow">' + (mkImg ? '<img class="mkprev" src="' + esc(mkImg.prev) + '" alt="">' : "") +
    '<label class="btn-s mkfile">' + tr(mkImg ? "mk_post_photo_ch" : "mk_post_photo") + '<input type="file" accept="image/*" id="mkpFile" hidden></label>' +
    (mkImg ? '<button class="btn-s" type="button" data-mkpost="rmimg">' + tr("mk_post_rm") + "</button>" : "") + "</div>";
  h += '<div class="mkrow"><label class="chk"><input type="checkbox" id="mkpFb" checked><span>' + tr("mk_post_fb") + '</span></label><label class="chk"><input type="checkbox" id="mkpIg"' + (hasIg && mkImg ? " checked" : "") + (hasIg ? "" : " disabled") + "><span>" + tr("mk_post_igc") + "</span></label></div>";
  h += '<div class="mklinks">' + (S.ok ? '<button class="btn-s add" type="button" data-mkpost="go"' + (mkPostBusy ? " disabled" : "") + ">" + tr(mkPostBusy || "cq_now") + "</button>" : "") +
    '<button class="btn-s" type="button" data-mkpost="later"' + (mkPostBusy || mkQErr ? " disabled" : "") + ">" + tr("cq_later") + "</button></div>";
  if (mkPostRes) h += '<div class="mkres" role="status">' + mkPostRes + "</div>";
  return h + "</div>";
}
async function mkImgUrl() {
  if (!mkImg) return "";
  if (!mkImg.url) { mkPostBusy = "mk_post_up"; renderMk(); mkImg.url = await mkUpload(mkImg.blob, "jpg", "image/jpeg"); }
  return mkImg.url;
}
async function mkDoPost() {
  const fb = $("mkpFb") && $("mkpFb").checked, ig = $("mkpIg") && $("mkpIg").checked;
  mkPostText = ($("mkpText").value || "").trim();
  if (!mkPostText && !mkImg) { mkPostRes = '<p class="mkwarn">' + tr("mk_post_need") + "</p>"; renderMk(); return; }
  mkPostRes = null;
  try {
    const url = await mkImgUrl();
    mkPostBusy = "mk_post_busy"; renderMk();
    const r = await fetch("/api/social?fn=post", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ text: mkPostText, image_url: url, fb, ig }) });
    const j = await r.json(); const R = j.result || {};
    const line = (x, okKey, name) => x ? (x.ok ? "<p>✓ " + tr(okKey) + ' · <a href="' + esc(x.link) + '" target="_blank" rel="noopener">' + tr("mk_post_view") + "</a></p>"
      : '<p class="mkwarn">' + esc(tr("mk_post_fail").replace("{w}", name).replace("{m}", qErrTxt(x.error))) + "</p>") : "";
    let h = line(R.fb, "mk_post_done_fb", "Facebook") + line(R.ig, "mk_post_done_ig", "Instagram");
    if (!h) h = '<p class="mkwarn">' + esc(j.error || "error") + "</p>";
    mkPostRes = h;
    if ((R.fb && R.fb.ok) || (R.ig && R.ig.ok)) {
      /* keep it in the list as posted; without the queue table, in the old "recent posts" list */
      let kept = false;
      if (!mkQErr) { try { const ins = await sb.from("social_queue").insert({ status: "posted", text: mkPostText.slice(0, 2200), image_url: url || null, fb, ig, post_at: new Date().toISOString(), result: R }).select().single(); if (!ins.error) { mkQ.push(ins.data); kept = true; } } catch (e) {} }
      if (!kept) await mkSave("post:" + Date.now(), { done: true, value: JSON.stringify({ t: mkPostText.slice(0, 80), fb: R.fb && R.fb.ok ? R.fb.link : "", ig: R.ig && R.ig.ok ? R.ig.link : "" }).slice(0, 500) });
      mkPostText = ""; mkImg = null;
    }
  } catch (e) { mkPostRes = '<p class="mkwarn">' + esc(String(e.message || e)) + "</p>"; }
  mkPostBusy = ""; renderMk();
}
async function mkDoLater() {
  const fb = $("mkpFb") ? $("mkpFb").checked : true, ig = $("mkpIg") ? $("mkpIg").checked : false;
  mkPostText = ($("mkpText").value || "").trim();
  if (!mkPostText && !mkImg) { mkPostRes = '<p class="mkwarn">' + tr("mk_post_need") + "</p>"; renderMk(); return; }
  mkPostRes = null;
  try {
    const url = await mkImgUrl();
    const when = new Date(); when.setUTCDate(when.getUTCDate() + (when.getUTCHours() >= 14 ? 1 : 0)); when.setUTCHours(14, 0, 0, 0);   /* 7:30 pm India time */
    const r = await sb.from("social_queue").insert({ status: "draft", text: mkPostText.slice(0, 2200), image_url: url || null, fb, ig: ig && !!url, post_at: when.toISOString() }).select().single();
    if (r.error) throw r.error;
    mkQ.push(r.data); mkPostText = ""; mkImg = null; mkPostRes = "<p>✓ " + tr("cq_added") + "</p>";
  } catch (e) { mkPostRes = '<p class="mkwarn">' + esc(String(e.message || e)) + "</p>"; }
  mkPostBusy = ""; renderMk();
}

/* ---- the content queue: posts, videos, WhatsApp tips, YouTube (api/social-draft.js, api/social-cron.js) ---- */
let mkQ = null, mkQErr = "", mkQBusy = "", mkQMsg = "", mkQN = 3, mkQLang = "hn", mkQDel = null;
const qIst = iso => iso ? new Date(Date.parse(iso) + 330 * 60000).toISOString().slice(0, 16) : "";
const qUtc = v => new Date(Date.parse(v + ":00Z") - 330 * 60000).toISOString();
const qShow = iso => iso ? new Date(Date.parse(iso) + 330 * 60000).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "";
const qKind = x => x.kind || "post";
const qErrTxt = e => e === "need_photo" ? tr("mk_post_igc") : e === "no_ig" ? tr("mk_post_noig") : e === "ig_processing" ? tr("cq_ig_proc") : String(e || "");
async function loadQ() {
  try {
    const since = new Date(Date.now() - 21 * 86400000).toISOString();
    const r = await sb.from("social_queue").select("*").or("status.in.(draft,scheduled,posting),updated_at.gte." + since + ",post_at.gte." + new Date().toISOString()).order("post_at", { ascending: true }).limit(150);
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
  if (x.ig && !x.image_url && !x.video_url) p.ig = false;
  if (!x.post_at || Date.parse(x.post_at) < Date.now()) p.post_at = new Date().toISOString();
  return p;
}
const qTag = x => '<span class="mkkind k-' + qKind(x) + '">' + tr("cq_k_" + qKind(x)) + "</span>";
const qWhere = x => qKind(x) === "yt" ? "YouTube" : qKind(x) === "wa" ? "WhatsApp" : (x.fb ? "Facebook" : "") + (x.fb && x.ig ? " + " : "") + (x.ig ? "Instagram" : "");
function qDraftHtml(x, hasIg) {
  const k = qKind(x);
  let h = '<div class="mkq">' + '<div class="mkrow">' + qTag(x) + (x.topic ? "<b>" + esc(x.topic) + "</b>" : "") + "</div>" +
    '<label class="fine" for="mkqw-' + x.id + '">' + tr(k === "wa" ? "cq_wa_when" : "mk_q_when") + '</label><input class="mkin" type="datetime-local" id="mkqw-' + x.id + '" data-qf="post_at" data-id="' + x.id + '" value="' + qIst(x.post_at) + '">' +
    '<textarea class="mkin mkta" rows="7" data-qf="text" data-id="' + x.id + '" aria-label="' + esc(tr("mk_post_text")) + '">' + esc(x.text) + "</textarea>";
  if (k === "wa") {
    return h + '<p class="fine">' + tr("cq_wa_note") + '</p><div class="mklinks"><button class="btn-s" type="button" data-mkq="wacopy" data-id="' + x.id + '">' + tr(mkCopied["q" + x.id] ? "mk_copied" : "cq_wa_copy") + '</button>' +
      '<a class="btn-s wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(x.text || "") + '">' + tr("cq_wa_send") + '</a>' +
      '<button class="btn-s add" type="button" data-mkq="wasent" data-id="' + x.id + '">' + tr("cq_wa_done") + '</button><button class="btn-s" type="button" data-mkq="del" data-id="' + x.id + '">' + tr(mkQDel === String(x.id) ? "mk_q_del_sure" : "mk_q_del") + "</button></div></div>";
  }
  if (x.photo_idea) h += '<p class="fine">' + esc(tr("mk_q_photo_idea").replace("{t}", x.photo_idea)) + "</p>";
  if (k === "video") h += '<div class="mkrow"><video class="mkvprev" src="' + esc(x.video_url || "") + '" controls muted playsinline preload="metadata"></video></div>';
  else h += '<div class="mkrow">' + (x.image_url ? '<img class="mkprev" src="' + esc(x.image_url) + '" alt="">' : "") +
    '<label class="btn-s mkfile">' + tr(x.image_url ? "mk_post_photo_ch" : "mk_post_photo") + '<input type="file" accept="image/*" data-qimg="' + x.id + '" hidden></label>' +
    (x.image_url ? '<button class="btn-s" type="button" data-mkq="rmimg" data-id="' + x.id + '">' + tr("mk_post_rm") + "</button>" : "") + "</div>";
  const media = !!(x.image_url || x.video_url);
  h += '<div class="mkrow"><label class="chk"><input type="checkbox" data-qf="fb" data-id="' + x.id + '"' + (x.fb ? " checked" : "") + "><span>" + tr("mk_post_fb") + '</span></label>' +
    '<label class="chk"><input type="checkbox" data-qf="ig" data-id="' + x.id + '"' + (x.ig && media ? " checked" : "") + (hasIg && media ? "" : " disabled") + "><span>" + tr(k === "video" ? "cq_ig_vid" : "mk_post_igc") + "</span></label></div>" +
    (!media ? '<p class="fine">' + tr("mk_q_ig_need") + "</p>" : "") +
    '<div class="mklinks"><button class="btn-s add" type="button" data-mkq="approve" data-id="' + x.id + '">' + tr("mk_q_approve") + '</button><button class="btn-s" type="button" data-mkq="del" data-id="' + x.id + '">' + tr(mkQDel === String(x.id) ? "mk_q_del_sure" : "mk_q_del") + "</button></div></div>";
  return h;
}
function qHtml() {
  const S = mkSoc || {}, hasIg = !!(S.ok && S.ig_id), busy = !!mkQBusy;
  let h = '<div class="mkactions">' +
    '<button class="btn-s' + (mkCompose ? " on" : "") + '" type="button" data-mkq="compose" aria-expanded="' + mkCompose + '">' + tr(mkCompose ? "cq_close" : "cq_write") + "</button>" +
    '<button class="btn-s" type="button" data-mkq="draft"' + (busy || mkQErr ? " disabled" : "") + ">" + (mkQBusy === "post" ? tr("mk_q_drafting") : tr("cq_ai")) + "</button>" +
    '<button class="btn-s" type="button" data-mkq="wadraft"' + (busy || mkQErr ? " disabled" : "") + ">" + (mkQBusy === "wa" ? tr("mk_q_drafting") : tr("cq_wa")) + "</button>" +
    '<button class="btn-s" type="button" data-mkq="studio">' + tr("cq_vid") + "</button></div>";
  h += '<div class="mkrow"><select class="mkin mksel" id="mkqN" aria-label="' + esc(tr("cq_ai")) + '">' + [3, 5, 7].map(n => '<option value="' + n + '"' + (n === mkQN ? " selected" : "") + ">" + tr("mk_q_n").replace("{n}", n) + "</option>").join("") + "</select>" +
    '<select class="mkin mksel" id="mkqLang" aria-label="Language">' + ["hn", "hi", "en"].map(l => '<option value="' + l + '"' + (l === mkQLang ? " selected" : "") + ">" + tr("mk_q_l_" + l) + "</option>").join("") + "</select></div>";
  if (mkSoc && !mkSoc.ok) h += '<p class="fine mkwarn">' + tr("mk_q_notoken") + "</p>";
  if (mkCompose) h += composeHtml();
  if (mkQMsg) h += '<div class="mkres" role="status"><p class="mkwarn">' + esc(mkQMsg) + "</p></div>";
  if (mkQErr) return h + '<p class="fine mkwarn">' + tr("mk_q_setup") + "</p>";
  if (!mkQ) return h + '<p class="fine">' + tr("mk_post_checking") + "</p>";
  const now = Date.now();
  const drafts = mkQ.filter(x => x.status === "draft");
  const sched = mkQ.filter(x => x.status === "scheduled" || x.status === "posting" || (qKind(x) === "yt" && x.status === "posted" && Date.parse(x.post_at) > now));
  const done = mkQ.filter(x => (x.status === "posted" || x.status === "failed") && !(qKind(x) === "yt" && Date.parse(x.post_at) > now))
    .sort((a, b) => Date.parse(b.post_at || b.updated_at) - Date.parse(a.post_at || a.updated_at));
  h += '<p class="mkqh"><b>' + tr("mk_q_drafts").replace("{n}", drafts.length) + "</b></p>";
  if (!drafts.length) h += '<p class="fine">' + tr("mk_q_none") + "</p>";
  drafts.forEach(x => { h += qDraftHtml(x, hasIg); });
  const appr = drafts.filter(x => qKind(x) !== "wa");
  if (appr.length > 1) h += '<div class="mklinks"><button class="btn-s add" type="button" data-mkq="approveall">' + tr("mk_q_approve_all").replace("{n}", appr.length) + "</button></div>";
  if (sched.length) h += "<p><b>" + tr("mk_q_sched").replace("{n}", sched.length) + '</b></p><ul class="mkwatch">' + sched.map(x =>
    "<li>" + qTag(x) + " " + esc(qShow(x.post_at)) + " · " + esc(x.topic || String(x.text || "").slice(0, 60)) + (qKind(x) === "yt" ? "" : " · " + qWhere(x)) +
    (qKind(x) === "yt" ? " · " + tr("cq_yt_self") + (x.result && x.result.yt && x.result.yt.link ? ' · <a href="' + esc(x.result.yt.link) + '" target="_blank" rel="noopener">' + tr("mk_post_view") + "</a>" : "")
      : x.status === "scheduled" ? ' <button class="btn-s" type="button" data-mkq="unsched" data-id="' + x.id + '">' + tr("mk_q_unsched") + "</button>" : " · " + tr("mk_post_busy")) + "</li>").join("") + "</ul>";
  if (done.length) h += "<p><b>" + tr("mk_q_done") + '</b></p><ul class="mkwatch">' + done.slice(0, 12).map(x => {
    const R = x.result || {}, part = (o, w) => o ? (o.ok ? ' · <a href="' + esc(o.link) + '" target="_blank" rel="noopener">' + w + "</a>" : ' · <span class="mkwarn">' + esc(tr("mk_q_partial").replace("{w}", w).replace("{m}", qErrTxt(o.error))) + "</span>") : "";
    const failedPart = R.ig && R.ig.ok === false && R.ig.error === "ig_processing";   /* worth trying again; other errors need a change first */
    return "<li>" + qTag(x) + " " + esc(qShow(x.post_at)) + " · " + esc(x.topic || String(x.text || "").slice(0, 60)) +
      (qKind(x) === "wa" ? " · " + tr("cq_wa_sent") : "") + part(R.fb, "Facebook") + part(R.ig, "Instagram") + part(R.yt, "YouTube") +
      ((x.status === "failed" || (failedPart && qKind(x) !== "yt")) ? (x.status === "failed" ? ' · <span class="mkwarn">' + tr("mk_q_failed") + (R.error ? ": " + esc(R.error) : "") + "</span>" : "") + ' <button class="btn-s" type="button" data-mkq="retry" data-id="' + x.id + '">' + tr("mk_q_retry") + "</button>" : "") + "</li>";
  }).join("") + "</ul>";
  /* posts made before the list existed */
  const old = Object.keys(MK).filter(k => k.indexOf("post:") === 0).sort().reverse().slice(0, 5);
  if (old.length) h += '<details class="mkmore"><summary>' + tr("cq_old") + '</summary><ul class="mkwatch">' + old.map(k => {
    let v = {}; try { v = JSON.parse(MK[k].value || "{}"); } catch (e) {}
    return "<li>" + esc(mkDay(new Date(+k.slice(5)).toISOString().slice(0, 10))) + " · " + esc(v.t || "") + (v.fb ? ' · <a href="' + esc(v.fb) + '" target="_blank" rel="noopener">Facebook</a>' : "") + (v.ig ? ' · <a href="' + esc(v.ig) + '" target="_blank" rel="noopener">Instagram</a>' : "") + (v.yt ? ' · <a href="' + esc(v.yt) + '" target="_blank" rel="noopener">YouTube</a>' : "") + "</li>";
  }).join("") + "</ul></details>";
  return h;
}
async function qDraft(kind) {
  mkQBusy = kind; mkQMsg = ""; renderMk();
  try {
    const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ n: mkQN, lang: mkQLang, kind }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) mkQMsg = j.error === "not_setup" ? tr("mk_q_setup") : j.error === "not_setup_v2" ? tr("mk_v2_setup") : j.error === "ai" || j.error === "no_ai_key" ? tr("mk_q_ai_err") : tr("mk_q_err").replace("{m}", j.error || r.status);
  } catch (e) { mkQMsg = tr("mk_q_err").replace("{m}", String(e.message || e)); }
  mkQBusy = ""; await loadQ();
}
async function qAct(fn) {
  mkQMsg = "";
  try { await fn(); } catch (e) { mkQMsg = mkV2(e) ? tr("mk_v2_setup") : tr("mk_q_err").replace("{m}", String(e.message || e)); }
  renderMk();
}
/* Video Studio hands a finished video to the list (studio.js) */
async function mkQueueVideo(blob, caption) {
  const ext = /webm/.test(blob.type) ? "webm" : "mp4";
  const url = await mkUpload(blob, ext, blob.type || "video/mp4");
  const when = new Date(); when.setUTCDate(when.getUTCDate() + 1); when.setUTCHours(14, 0, 0, 0);
  const r = await sb.from("social_queue").insert({ kind: "video", status: "draft", text: String(caption || "").slice(0, 2200), video_url: url, fb: true, ig: !!(mkSoc && mkSoc.ok && mkSoc.ig_id), post_at: when.toISOString() }).select().single();
  if (r.error) throw r.error;
  if (mkQ) mkQ.push(r.data);
  mkOpen.add("content"); renderMk();
  return r.data;
}
/* a YouTube upload, kept in the same list (YouTube publishes it at its own time) */
async function mkQueueYt(title, link, at) {
  if (mkQErr) return;
  try {
    const r = await sb.from("social_queue").insert({ kind: "yt", status: "posted", text: String(title || "").slice(0, 2200), topic: String(title || "").slice(0, 200), fb: false, ig: false, post_at: at || new Date().toISOString(), result: { yt: { ok: true, link } } }).select().single();
    if (!r.error && mkQ) { mkQ.push(r.data); renderMk(); return true; }
  } catch (e) {}
  return false;
}

/* ---- pilot growers (admin_pilots) ---- */
function pilotHtml() {
  let h = '<p class="fine">' + tr("pi_p") + "</p>";
  if (mkPilErr) return h + '<p class="fine mkwarn">' + tr("mk_v2_setup") + "</p>";
  if (!mkPil) return h + '<p class="fine">' + tr("mk_post_checking") + "</p>";
  const P = mkPil, up = x => !!x.user_id, sales = x => x.sales || +x.lots > 0;
  h += "<p><b>" + esc(tr("pi_sum").replace("{n}", P.length).replace("{v}", P.filter(x => x.visited).length).replace("{u}", P.filter(up).length).replace("{s}", P.filter(sales).length).replace("{t}", P.filter(x => x.testimonial).length)) + "</b></p>";
  h += '<div class="mkpadd"><input class="mkin" id="piName" placeholder="' + esc(tr("pi_name")) + '" aria-label="' + esc(tr("pi_name")) + '" maxlength="80">' +
    '<input class="mkin" id="piVillage" placeholder="' + esc(tr("pi_village")) + '" aria-label="' + esc(tr("pi_village")) + '" maxlength="80">' +
    '<input class="mkin" id="piPhone" inputmode="numeric" placeholder="' + esc(tr("pi_phone")) + '" aria-label="' + esc(tr("pi_phone")) + '" maxlength="16">' +
    '<button class="btn-s add" type="button" data-pi="add">' + tr("pi_add") + "</button></div>";
  if (mkPilMsg) h += '<p class="fine mkwarn" role="status">' + esc(mkPilMsg) + "</p>";
  if (!P.length) return h + '<p class="fine">' + tr("pi_none") + "</p>";
  const ck = (x, f, on, label, dis) => '<label class="chk"><input type="checkbox" data-pif="' + f + '" data-id="' + x.id + '"' + (on ? " checked" : "") + (dis ? " disabled" : "") + "><span>" + label + "</span></label>";
  h += '<ul class="mkpil">' + P.map(x => "<li><div class=\"mkrow\"><b>" + esc(x.name) + "</b>" + (x.village ? '<span class="fine">' + esc(x.village) + "</span>" : "") +
    (x.phone ? '<a class="fine" href="tel:+91' + esc(x.phone) + '">' + esc(x.phone) + '</a><a class="btn-s wa" target="_blank" rel="noopener" href="https://wa.me/91' + esc(x.phone) + '">WhatsApp</a>' : "") +
    '<button class="btn-s" type="button" data-pi="del" data-id="' + x.id + '">' + tr(mkPilDel === String(x.id) ? "pi_del_sure" : "pi_del") + "</button></div>" +
    '<div class="mkrow mkpck">' + ck(x, "visited", x.visited, tr("pi_c_vis")) +
    ck(x, "_up", up(x), tr("pi_c_up") + (up(x) ? ' <span class="fine">' + esc(mkDay(String(x.joined_at).slice(0, 10))) + "</span>" : ""), true) +
    ck(x, "sales", sales(x), tr("pi_c_sales") + (+x.lots > 0 ? ' <span class="fine">' + esc(tr("pi_lots").replace("{n}", x.lots)) + " · " + tr("pi_auto") + "</span>" : ""), +x.lots > 0) +
    ck(x, "testimonial", x.testimonial, tr("pi_c_test")) + "</div>" +
    '<input class="mkin" data-pif="note" data-id="' + x.id + '" value="' + esc(x.note || "") + '" placeholder="' + esc(tr("pi_note")) + '" aria-label="' + esc(tr("pi_note")) + '" maxlength="500"></li>').join("") + "</ul>";
  return h;
}
async function piAdd() {
  const name = ($("piName").value || "").trim(), village = ($("piVillage").value || "").trim(), d = ($("piPhone").value || "").replace(/\D/g, "");
  const phone = d.length === 12 && d.startsWith("91") ? d.slice(2) : d;
  mkPilMsg = "";
  if (!name) { mkPilMsg = tr("pi_need_name"); renderMk(); return; }
  if (phone && !/^\d{10}$/.test(phone)) { mkPilMsg = tr("pi_bad_phone"); renderMk(); return; }
  try {
    const r = await sb.from("admin_pilots").insert({ name: name.slice(0, 80), village: village.slice(0, 80) || null, phone: phone || null });
    if (r.error) throw r.error;
    ["piName", "piVillage", "piPhone"].forEach(id => { $(id).value = ""; });
    await loadPilots();
  } catch (e) { mkPilMsg = mkV2(e) ? tr("mk_v2_setup") : String(e.message || e); renderMk(); }
}
async function piUpd(id, patch) {
  try {
    const r = await sb.from("admin_pilots").update(Object.assign({}, patch, { updated_at: new Date().toISOString() })).eq("id", id);
    if (r.error) throw r.error;
    const x = (mkPil || []).find(y => String(y.id) === String(id)); if (x) Object.assign(x, patch);
  } catch (e) { mkPilMsg = String(e.message || e); }
  renderMk();
}

/* ---- video ideas: month one + AI months; "Make in Studio" fills the Video Studio ---- */
let mkViBusy = false, mkViMsg = "";
const mkViKeys = () => Object.keys(MK).filter(k => k.indexOf("vids:") === 0).sort();
function mkViAll() {   /* [{key, name, hook, show, week}] */
  const out = MK_VIDEOS.map((v, i) => ({ key: "v" + (i + 1), week: v[0], name: v[1], hook: v[2], show: v[3], grp: "" }));
  mkViKeys().forEach(k => { let L = []; try { L = JSON.parse(MK[k].value || "[]"); } catch (e) {} (L || []).forEach((v, i) => out.push({ key: "va:" + k.slice(5) + ":" + i, week: v.week, name: v.name, hook: v.hook, show: v.show, grp: k.slice(5) })); });
  return out;
}
function vidHtml() {
  const all = mkViAll();
  let h = '<p class="fine">' + tr("mk_vid_p") + '</p><div class="mklinks"><button class="btn-s add" type="button" data-vi="ai"' + (mkViBusy ? " disabled" : "") + ">" + tr(mkViBusy ? "vi_ai_busy" : "vi_ai") + "</button></div>";
  if (mkViMsg) h += '<p class="fine mkwarn" role="status">' + esc(mkViMsg) + "</p>";
  let grp = null;
  h += '<ul class="mkvids">';
  all.forEach((v, i) => {
    if (v.grp !== grp) { grp = v.grp; if (grp) h += '<li class="mkvgrp"><b>' + esc(tr("vi_month").replace("{m}", grp)) + "</b></li>"; }
    h += '<li><label class="chk mkchk"><input type="checkbox" data-mk="' + esc(v.key) + '"' + (mkDone(v.key) ? " checked" : "") + "><span><b>" + esc(v.name) + "</b> · " + esc(v.hook) + '<br><span class="fine">' + tr("mk_c_week") + " " + esc(v.week) + " · " + esc(v.show) + "</span></span></label>" +
      '<button class="btn-s vsmini" type="button" data-vi="make" data-i="' + i + '">' + tr("vi_make") + "</button></li>";
  });
  return h + "</ul>";
}
async function viAi() {
  mkViBusy = true; mkViMsg = ""; renderMk();
  try {
    const done = mkViAll().map(v => v.name);
    const r = await fetch("/api/social?fn=draft", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + await mkTok() }, body: JSON.stringify({ kind: "videos", done }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ideas) throw new Error(j.error === "not_setup" ? tr("mk_q_setup") : tr("vi_err"));
    const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const nowI = new Date(Date.now() + 330 * 60000), mi = MON.indexOf(j.month);
    const key = "vids:" + j.month + " " + (nowI.getUTCFullYear() + (mi >= 0 && mi < nowI.getUTCMonth() ? 1 : 0));
    if (!(await mkSave(key, { done: false, value: JSON.stringify(j.ideas) }))) throw new Error(tr("mk_v2_setup"));
  } catch (e) { mkViMsg = String(e.message || e); }
  mkViBusy = false; renderMk();
}
function viMake(i) {
  const v = mkViAll()[i]; if (!v) return;
  if (typeof vsPrefill === "function") vsPrefill(v.name, v.hook, v.show);
  const el = $("vsBody"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
}

/* ---- budget with what has been spent (Costs tab) ---- */
function budgetHtml() {
  const costs = mkCost || [], used = new Set();
  const inv = mkInv ? mkInv.reduce((a, x) => a + (+x.claimed || 0), 0) : 0;
  let total = 0;
  const rows = MK_BUDGET.map((b, i) => {
    const rx = MK_BUDGET_RX[i];
    if (!rx) return [b, tr("bu_free").replace("{n}", mkN(inv))];
    let once = 0, mon = 0;
    costs.forEach((c, j) => { if (used.has(j) || !rx.test((c.service || "") + " " + (c.what_for || ""))) return; used.add(j); if (c.per === "month") mon += +c.amount_inr || 0; else once += +c.amount_inr || 0; });
    total += once;
    return [b, (once || !mon ? mkInr(once) : "") + (mon ? (once ? " + " : "") + tr("bu_month").replace("{a}", mkInr(mon)) : "")];
  });
  return '<p class="fine">' + esc(tr("bu_total").replace("{a}", mkInr(total))) + '</p><div class="mkbar"><i style="width:' + Math.min(100, Math.round(total / 600)) + '%"></i></div>' +
    '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_item") + '</th><th scope="col">' + tr("mk_c_when") + '</th><th scope="col" class="n">' + tr("mk_c_cost") + '</th><th scope="col" class="n">' + tr("bu_spent") + "</th></tr></thead><tbody>" +
    rows.map(r => "<tr><td>" + esc(r[0][0]) + "</td><td>" + esc(r[0][1]) + '</td><td class="n">' + esc(r[0][2]) + '</td><td class="n">' + esc(r[1]) + "</td></tr>").join("") + "</tbody></table></div>" +
    '<p class="fine">' + tr("bu_hint") + "</p>" +
    '<p><b>' + tr("mk_watch_h") + '</b></p><ul class="mkwatch">' + MK_WATCH.map(w => "<li>" + esc(w) + "</li>").join("") + "</ul>" +
    '<div class="mklinks"><a class="btn-s" href="' + MK_DOC + '" target="_blank" rel="noopener">' + tr("mk_doc") + '</a><a class="btn-s" href="' + MK_DESIGN + '" target="_blank" rel="noopener">' + tr("mk_design") + "</a></div>";
}

/* ---- setup: accounts, links, bios, Meta posting ---- */
function setupHtml() {
  let h = '<ul class="mksoc">' + MK_SOCIAL.map(x => {
    const k = "link:" + x[0], v = MK[k] ? MK[k].value || "" : "", live = !!v;
    return "<li><div class=\"mkrow\"><b>" + esc(x[1]) + '</b><span class="fine">' + tr(live ? "mk_soc_live" : "mk_soc_todo") + "</span>" +
      (live ? '<a class="btn-s add" href="' + esc(v) + '" target="_blank" rel="noopener">' + tr("mk_open") + '</a><a class="btn-s" href="' + x[3] + '" target="_blank" rel="noopener">' + tr("mk_manage") + "</a>"
            : '<a class="btn-s add" href="' + x[2] + '" target="_blank" rel="noopener">' + tr("mk_create") + "</a>") + "</div>" +
      '<details class="mkmore"><summary>' + tr(live ? "mk_change" : "mk_how") + "</summary>" + '<ol class="mksteps">' + x[5].map(t => "<li>" + esc(t) + "</li>").join("") + "</ol>" +
      '<label class="fine" for="mkl-' + x[0] + '">' + tr("mk_c_link") + '</label><div class="mkrow"><input class="mkin" type="url" id="mkl-' + x[0] + '" value="' + esc(v) + '" placeholder="' + x[4] + '…"><button class="btn-s" type="button" data-mksave="' + x[0] + '">' + tr("mk_save") + '</button></div><p class="fine mkwarn" id="mke-' + x[0] + '"></p></details></li>';
  }).join("") + "</ul>" +
    '<div class="mklinks"><button class="btn-s" type="button" data-mkcopy="bs">' + tr(mkCopied.bs ? "mk_copied" : "mk_copy_bs") + '</button><button class="btn-s" type="button" data-mkcopy="bl">' + tr(mkCopied.bl ? "mk_copied" : "mk_copy_bl") + "</button></div>";
  h += "<p><b>" + tr("mk_post_h") + "</b></p>";
  if (!mkSoc) h += '<p class="fine">' + tr("mk_post_checking") + "</p>";
  else if (mkSoc.setup && mkSoc.ok) h += '<p class="fine">✓ ' + esc(tr("st_post_ok").replace("{f}", mkSoc.page_name || "").replace("{i}", mkSoc.ig_id ? tr("mk_post_ig").replace("{u}", mkSoc.ig_user || "") : tr("mk_post_noig"))) + "</p>";
  else h += (mkSoc.error ? '<p class="fine mkwarn">' + esc(tr("mk_post_err").replace("{m}", mkSoc.error)) + "</p>" : "") +
      '<p class="fine">' + tr("mk_post_setup_h") + " · " + tr("mk_post_setup_p") + '</p><ol class="mksteps">' +
      MK_SETUP.map(x => "<li><b>" + esc(x[0]) + "</b><br><span class=\"fine\">" + esc(x[1]) + "</span>" + (x[2] ? ' <a href="' + x[2] + '" target="_blank" rel="noopener">' + tr("mk_open") + "</a>" : "") + "</li>").join("") + "</ol>" +
      '<div class="mklinks"><button class="btn-s" type="button" data-mkpost="refresh">' + tr("ad_refresh") + "</button></div>";
  h += '<p class="fine">' + tr("st_yt") + "</p>";
  return h;
}

/* ---- the page ---- */
const mkOpen = new Set(["content", "src"]);   /* which sections are open */
const mkSec = (id, title, sub, body) => '<details class="mksec" data-mksec="' + id + '"' + (mkOpen.has(id) ? " open" : "") + '><summary><b>' + title + "</b>" + (sub ? '<span class="fine">' + sub + "</span>" : "") + "</summary>" + body + "</details>";
function renderMk() {
  const top = $("mkTop"), bot = $("mkBot"); if (!top || !bot) return;
  const keep = mkKeep();
  let h = "";
  if (mkLocal) h += '<p class="fine mkwarn">' + tr("mk_local") + "</p>";
  h += scoreHtml();
  /* next steps: the first 3 unticked tasks of the plan */
  const all = []; MK_PHASES.forEach(p => p.tasks.forEach(t => all.push([t[0], t[1], p.name])));
  const done = all.filter(t => mkDone(t[0])).length, next = all.filter(t => !mkDone(t[0])).slice(0, 3);
  h += '<section class="mknext"><div class="mkph"><b>' + tr("mk_next_h") + '</b><span class="fine">' + tr("mk_done_n").replace("{d}", done).replace("{n}", all.length) + '</span></div><div class="mkbar"><i style="width:' + Math.round(done / all.length * 100) + '%"></i></div>' +
    (next.length ? next.map(t => mkBox(t[0], t[1])).join("") : "<p>" + tr("mk_all_done") + "</p>") + "</section>";
  const nD = mkQ ? mkQ.filter(x => x.status === "draft").length : 0, nS = mkQ ? mkQ.filter(x => x.status === "scheduled").length : 0;
  h += mkSec("src", tr("src_h"), mkSt && !mkStErr ? tr("src_c_n30") + " (30): " + mkN((mkSt.sources || []).reduce((a, x) => a + (/^(unknown|none)$/.test(x.src) ? 0 : +x.n30 || 0), 0)) : "", srcHtml());
  h += mkSec("content", tr("cq_h"), mkQ ? tr("cq_sub").replace("{d}", nD).replace("{s}", nS) : "", qHtml());   /* Video Studio sits right under this */
  top.innerHTML = h;

  let b = "";
  const P = mkPil || [];
  b += mkSec("pilot", tr("pi_h"), mkPil ? P.length + " · " + tr("pi_c_up") + " " + P.filter(x => x.user_id).length : "", pilotHtml());
  b += mkSec("msg", tr("mk_msg_h"), "", '<p class="fine">' + tr("mk_msg_p") + "</p>" + MK_MSGS.map((m, i) => {
    const full = m[1] + (i === 3 ? "" : "\n" + mkLink());
    return '<div class="mkmsg"><b>' + esc(m[0]) + "</b><pre>" + esc(full) + '</pre><div class="mklinks"><button class="btn-s" type="button" data-mkcopy="m' + i + '">' + tr(mkCopied["m" + i] ? "mk_copied" : "mk_copy") + '</button><a class="btn-s wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(full) + '">' + tr("mk_wa") + "</a></div></div>";
  }).join(""));
  let inv = "";
  if (mkInvErr) inv = '<p class="fine">' + tr("mk_inv_setup") + "</p>";
  else if (mkInv) {
    const who = x => x.name ? x.name + (x.phone ? " · " + x.phone : "") : x.phone || x.email || "–";
    inv = '<p class="fine">' + tr("mk_inv_p") + "</p>" + (mkInv.length ? '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("mk_c_grower") + '</th><th scope="col" class="n">' + tr("mk_c_joined") + '</th><th scope="col" class="n">' + tr("mk_c_claimed") + "</th></tr></thead><tbody>" +
      mkInv.slice(0, 50).map(x => "<tr><td>" + esc(who(x)) + '</td><td class="n">' + (+x.joined || 0) + '</td><td class="n">' + (+x.claimed || 0) + "</td></tr>").join("") + "</tbody></table></div>" : '<p class="fine">' + tr("mk_inv_none") + "</p>");
  }
  const invSub = mkInv ? tr("mk_inv_sub").replace("{n}", mkInv.reduce((a, x) => a + (+x.joined || 0), 0)).replace("{m}", mkInv.reduce((a, x) => a + (+x.claimed || 0), 0)) : "";
  b += mkSec("inv", tr("mk_inv_h"), invSub, inv);
  let plan = '<div class="mkphases">';
  MK_PHASES.forEach(p => {
    const d = p.tasks.filter(t => mkDone(t[0])).length;
    plan += '<section class="mkphase' + (p.main ? " main" : "") + '"><div class="mkph"><span class="fine">' + esc(p.when) + "</span><b>" + esc(p.name) + '</b><span class="fine">' + tr("mk_done_n").replace("{d}", d).replace("{n}", p.tasks.length) + "</span></div>" +
      p.tasks.map(t => mkBox(t[0], t[1])).join("") + '<p class="mktarget">Target: ' + esc(p.target) + "</p></section>";
  });
  b += mkSec("plan", tr("mk_plan_h"), "", plan + "</div>");
  const va = mkViAll(), vd = va.filter(v => mkDone(v.key)).length;
  b += mkSec("vid", tr("mk_vid_h"), tr("mk_done_n").replace("{d}", vd).replace("{n}", va.length), vidHtml());
  b += mkSec("more", tr("mk_more_h"), "", budgetHtml());
  const socDone = MK_SOCIAL.filter(x => MK["link:" + x[0]] && MK["link:" + x[0]].value).length;
  b += mkSec("setup", tr("st_h"), tr("st_sub").replace("{d}", socDone).replace("{n}", MK_SOCIAL.length), setupHtml());
  bot.innerHTML = b;
  mkRestore(keep);
}
/* typing must survive a re-render (data arrives while you type) */
function mkKeep() {
  const a = document.activeElement, w = $("mkWrap");
  if (!a || !w || !w.contains(a) || w.querySelector("#vsBody") && $("vsBody").contains(a)) return null;
  const vals = {};
  ["piName", "piVillage", "piPhone", "mkpText", "mkTlPlace"].forEach(id => { const e = $(id); if (e) vals[id] = e.value; });
  return { id: a.id, qf: a.dataset && a.dataset.qf, pif: a.dataset && a.dataset.pif, did: a.dataset && a.dataset.id, s: a.selectionStart, e: a.selectionEnd, vals };
}
function mkRestore(k) {
  if (!k) return;
  Object.keys(k.vals).forEach(id => { const e = $(id); if (e && id !== "mkpText") e.value = k.vals[id]; });
  let el = k.id ? $(k.id) : null;
  if (!el && k.did) el = document.querySelector((k.qf ? '[data-qf="' + k.qf + '"]' : '[data-pif="' + k.pif + '"]') + '[data-id="' + k.did + '"]');
  if (el) { try { el.focus(); if (k.s != null && el.setSelectionRange) el.setSelectionRange(k.s, k.e); } catch (e) {} }
}

/* ---- events ---- */
const W = $("mkWrap");
W.addEventListener("toggle", e => {
  const d = e.target; if (!d.dataset || !d.dataset.mksec) return;
  if (d.open) mkOpen.add(d.dataset.mksec); else mkOpen.delete(d.dataset.mksec);
}, true);
function mkText(id) {
  if (id === "bs") return MK_BIO_S;
  if (id === "bl") return MK_BIO_L;
  const i = +id.slice(1), m = MK_MSGS[i];
  return m ? m[1] + (i === 3 ? "" : "\n" + mkLink()) : "";
}
async function mkClip(t) { try { await navigator.clipboard.writeText(t); return true; } catch (e) { return false; } }
W.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "mkpText") { mkPostText = t.value; return; }
  if (t.id === "mkTlPlace") {   /* update only the link part, so typing isn't interrupted */
    mkTl.place = t.value; mkTlCopied = false;
    const d = MK_SRC.find(x => x[0] === mkTl.src) || MK_SRC[0], code = mkTlCode(), o = $("mkTlOut");
    if (o) o.innerHTML = tlOutHtml(d, code, code ? mkSrcLink(code) : "");
    return;
  }
  if (t.dataset && t.dataset.qf === "text") { const x = qGet(t.dataset.id); if (x) x.text = t.value; }
  if (t.dataset && t.dataset.pif === "note") { const x = (mkPil || []).find(y => String(y.id) === t.dataset.id); if (x) x.note = t.value; }
});
W.addEventListener("change", async e => {
  const t = e.target;
  if (t.closest("#vsBody")) return;
  const c = t.closest("[data-mk]");
  if (c) {
    const ok = await mkSave(c.dataset.mk, { done: c.checked });
    if (!ok) { c.checked = !c.checked; MK[c.dataset.mk].done = c.checked; }
    renderMk(); return;
  }
  if (t.id === "mkqN") { mkQN = +t.value || 3; return; }
  if (t.id === "mkqLang") { mkQLang = t.value; return; }
  if (t.id === "mkpReady" && t.value) { const v = mkText(t.value); mkPostText = (mkPostText ? mkPostText + "\n\n" : "") + v; renderMk(); return; }
  if (t.id === "mkpFile") {
    const f = t.files && t.files[0]; if (!f) return;
    try { const blob = await mkJpeg(f); if (mkImg && mkImg.prev) URL.revokeObjectURL(mkImg.prev); mkImg = { blob, prev: URL.createObjectURL(blob), url: "" }; }
    catch (x) { mkPostRes = '<p class="mkwarn">' + esc(String(x.message || x)) + "</p>"; }
    renderMk(); return;
  }
  if (t.dataset && t.dataset.qimg) {
    const id = t.dataset.qimg, f = t.files && t.files[0]; if (!f) return;
    return qAct(async () => { const url = await mkUpload(await mkJpeg(f), "jpg", "image/jpeg"); await qUpd(id, { image_url: url, ig: !!(mkSoc && mkSoc.ig_id) }); });
  }
  if (t.dataset && t.dataset.pif) {
    const f = t.dataset.pif, id = t.dataset.id;
    if (f === "note") return piUpd(id, { note: t.value.trim().slice(0, 500) || null });
    if (f === "visited" || f === "sales" || f === "testimonial") return piUpd(id, { [f]: t.checked });
    return;
  }
  const f = t.dataset && t.dataset.qf; if (!f) return;
  const id = t.dataset.id;
  if (f === "text") return qAct(() => qUpd(id, { text: t.value.slice(0, 2200) }));
  if (f === "post_at") { if (t.value) return qAct(() => qUpd(id, { post_at: qUtc(t.value) })); return; }
  if (f === "fb" || f === "ig") return qAct(() => qUpd(id, { [f]: t.checked }));
});
W.addEventListener("click", async e => {
  if (e.target.closest("#vsBody")) return;
  const cp = e.target.closest("[data-mkcopy]");
  if (cp) {
    const id = cp.dataset.mkcopy;
    if (await mkClip(mkText(id))) { mkCopied[id] = true; renderMk(); setTimeout(() => { delete mkCopied[id]; renderMk(); }, 2000); }
    return;
  }
  const sv = e.target.closest("[data-mksave]");
  if (sv) {
    const s = sv.dataset.mksave, v = ($("mkl-" + s).value || "").trim().slice(0, 500), def = MK_SOCIAL.find(x => x[0] === s);
    if (v && !(/^https:\/\//.test(v) && (!def || v.indexOf(def[4].replace("/channel/", "")) === 0 || (s === "youtube" && /^https:\/\/(www\.)?youtube\.com\//.test(v)) || (s === "facebook" && /^https:\/\/(www\.|m\.)?facebook\.com\//.test(v)) || (s === "instagram" && /^https:\/\/(www\.)?instagram\.com\//.test(v)) || (s === "whatsapp" && /^https:\/\/(www\.)?whatsapp\.com\/channel\//.test(v))))) {
      set("mke-" + s, tr("mk_badlink").replace("{u}", def ? def[4] : "https://")); return;
    }
    sv.disabled = true;
    const ok = await mkSave("link:" + s, { value: v });
    if (ok && v) await mkSave("soc:" + s, { done: true });
    sv.disabled = false; renderMk();
    const b = document.querySelector('[data-mksave="' + s + '"]'); if (b && ok) b.textContent = tr("mk_saved");
    return;
  }
  const tl = e.target.closest("[data-tlsrc],[data-tl]");
  if (tl) {
    if (tl.dataset.tlsrc) { mkTl.src = tl.dataset.tlsrc; mkTlCopied = false; renderMk(); const pl = $("mkTlPlace"); if (pl && !mkTl.place) pl.focus(); return; }
    const code = mkTlCode(); if (!code) return;
    if (tl.dataset.tl === "copy") { if (await mkClip(mkSrcLink(code))) { mkTlCopied = true; tl.textContent = tr("tl_copied"); setTimeout(() => { mkTlCopied = false; const b = document.querySelector('[data-tl="copy"]'); if (b) b.textContent = tr("tl_copy"); }, 2000); } }
    else if (tl.dataset.tl === "png") mkQrPng(mkSrcLink(code), code);
    return;
  }
  const pb = e.target.closest("[data-mkpost]");
  if (pb) {
    const a = pb.dataset.mkpost;
    if (a === "go") mkDoPost();
    else if (a === "later") { mkPostBusy = "mk_post_up"; mkDoLater(); }
    else if (a === "refresh") loadSoc();
    else if (a === "rmimg") { if (mkImg && mkImg.prev) URL.revokeObjectURL(mkImg.prev); mkImg = null; renderMk(); }
    return;
  }
  const pi = e.target.closest("[data-pi]");
  if (pi) {
    const id = pi.dataset.id;
    if (pi.dataset.pi === "add") return piAdd();
    if (pi.dataset.pi === "del") {
      if (mkPilDel !== id) { mkPilDel = id; renderMk(); return; }
      mkPilDel = null;
      try { const r = await sb.from("admin_pilots").delete().eq("id", id); if (r.error) throw r.error; mkPil = mkPil.filter(y => String(y.id) !== String(id)); } catch (x) { mkPilMsg = String(x.message || x); }
      renderMk();
    }
    return;
  }
  const vi = e.target.closest("[data-vi]");
  if (vi) { if (vi.dataset.vi === "ai") viAi(); else viMake(+vi.dataset.i); return; }
  const b = e.target.closest("[data-mkq]"); if (!b) return;
  const a = b.dataset.mkq, id = b.dataset.id, x = qGet(id);
  if (a !== "del") mkQDel = null;
  if (a === "compose") { mkCompose = !mkCompose; mkPostRes = null; renderMk(); if (mkCompose) { const t = $("mkpText"); if (t) t.focus(); } return; }
  if (a === "studio") { const el = $("vsBody"); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" }); return; }
  if (a === "draft") return qDraft("post");
  if (a === "wadraft") return qDraft("wa");
  if (a === "approve" && x) {
    if (!String(x.text || "").trim() && !x.image_url && !x.video_url) { mkQMsg = tr("mk_q_empty"); renderMk(); return; }
    return qAct(() => qUpd(id, Object.assign({ text: x.text }, qApprovePatch(x))));
  }
  if (a === "approveall") return qAct(async () => {
    for (const d of mkQ.filter(y => y.status === "draft" && qKind(y) !== "wa" && (String(y.text || "").trim() || y.image_url || y.video_url))) await qUpd(d.id, Object.assign({ text: d.text }, qApprovePatch(d)));
  });
  if (a === "wacopy" && x) { if (await mkClip(x.text || "")) { mkCopied["q" + id] = true; renderMk(); setTimeout(() => { delete mkCopied["q" + id]; renderMk(); }, 2000); } return; }
  if (a === "wasent" && x) return qAct(() => qUpd(id, { text: x.text, status: "posted", post_at: new Date().toISOString() }));
  if (a === "del") {
    if (mkQDel !== id) { mkQDel = id; renderMk(); return; }
    mkQDel = null;
    return qAct(async () => { const r = await sb.from("social_queue").delete().eq("id", id); if (r.error) throw r.error; mkQ = mkQ.filter(y => String(y.id) !== String(id)); });
  }
  if (a === "rmimg") return qAct(() => qUpd(id, { image_url: null, ig: false }));
  if (a === "unsched") return qAct(() => qUpd(id, { status: "draft" }));
  /* try again: keep what already went out, so only the part that failed is posted again (api/social-cron.js) */
  if (a === "retry") return qAct(() => qUpd(id, { status: "scheduled", post_at: new Date().toISOString() }));
});
$("mkRefresh").addEventListener("click", () => { loadMk(); });
/* the tab may have opened before this file loaded (the sign-in check can finish first) */
if (typeof tab !== "undefined" && tab === "mk" && typeof isAdmin === "function" && isAdmin() && !mkStarted) { loaded.mk = true; loadMk(); }
document.querySelectorAll('[data-i18n^="mk_"],[data-i18n="adm_t_mk"]').forEach(el => { el.textContent = tr(el.getAttribute("data-i18n")); });
