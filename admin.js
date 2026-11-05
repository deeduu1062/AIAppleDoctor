/* Seb Saathi — admin page (only the admin account can use it; the real checks are in Supabase policies). */
const T = {
"en": {
"tt_admin": "Admin",
"ad_h": "Admin",
"ad_pill": "Only you can see this",
"ad_p": "Everyone who has made an account, when they last logged in, and whether they are keeping records. Sale figures stay private to each grower.",
"ad_refresh": "Refresh",
"ad_at": "Updated {t}",
"ad_loading": "Loading…",
"ad_find": "Find by email",
"ad_total": "Accounts",
"ad_a7": "Logged in, last 7 days",
"ad_a30": "Logged in, last 30 days",
"ad_new7": "New this week",
"ad_rec": "Keeping records",
"ad_unconf": "Email not confirmed",
"ad_email": "Email",
"ad_joined": "Joined",
"ad_last": "Last login",
"ad_orch": "Orchards",
"ad_years": "Years",
"ad_lots": "Lots",
"ad_saved": "Last saved",
"ad_status": "Status",
"ad_ok": "Confirmed",
"ad_no": "Not confirmed",
"ad_me": "You",
"ad_never": "Never",
"ad_today": "Today, {t}",
"ad_yday": "Yesterday, {t}",
"ad_none": "No accounts match.",
"ad_note": "Last login is the most recent time each person logged in. Orchards, years and lots leave out the example records.",
"ad_err_setup": "The admin view is not set up yet. Run the admin SQL once in Supabase > SQL Editor (it is in the project notes), then tap Refresh.",
"ad_err_deny": "This account is not an admin.",
"ad_err": "Could not load the admin view: {m}",
"auth_out": "Log out",
"lang_btn": "हिंदी",
"pl_h": "Plans",
"pl_p": "Start free. Upgrade when your records grow. Pay by UPI from any app — no card needed.",
"pl_note": "Paid plans switch on after we check your payment, usually within a day. Some features are still being built and will be added to your plan as they arrive.",
"pl_free": "Free",
"pl_basic": "Saathi",
"pl_prem": "Saathi Plus",
"pl_free_t": "For every grower",
"pl_basic_t": "For your own orchards",
"pl_premium_t": "Full features, no limits",
"pl_zero": "₹0",
"pl_always": "Free forever",
"pl_yr": "/ year",
"pl_mo": "or ₹{m} a month",
"pl_best": "Best value",
"pl_f_free": [
"Profit calculator (quick check)",
"Season calendar and spray schedule",
"Daily mandi rates",
"3 photo disease checks a month",
"5 questions a day to Saathi",
"Video and learning library"
],
"pl_f_basic": [
"Everything in Free",
"Apple register for 2 orchards, this season",
"15 photo disease checks a month",
"Unlimited Saathi chat",
"Spray reminders on WhatsApp",
"Download your season report"
],
"pl_f_premium": [
"Everything in Saathi",
"Unlimited orchards and all past years",
"Year-on-year profit comparison",
"Unlimited photo disease checks",
"Spray plan for your height, variety and rootstock",
"Mandi price alerts",
"Priority listing in Buy & Sell",
"Family or munshi access",
"Expert help on WhatsApp"
],
"pl_go_free": "Start free",
"pl_go_free_in": "You're on Free",
"pl_go_pay": "Choose {p}",
"pl_pending": "Payment sent — being checked",
"pl_active": "Your plan is active",
"pay_h": "Get {p}",
"pay_per": "Payment period",
"pay_year": "Yearly",
"pay_month": "Monthly",
"pay_app": "Pay with UPI app",
"pay_app_n": "Opens GPay, PhonePe, Paytm or BHIM with the amount filled in.",
"pay_qr": "On a computer? Scan this with your phone's UPI app.",
"pay_to": "Pay to",
"pay_copy": "Copy",
"pay_copied": "Copied",
"pay_utr_l": "After paying, enter the 12-digit UPI reference number (UTR) from your payment app",
"pay_utr_ph": "e.g. 412345678901",
"pay_send": "Send for checking",
"pay_sending": "Sending…",
"pay_bad": "The reference number should be 12 digits.",
"pay_dup": "This reference number has already been sent.",
"pay_ok": "Thank you! We'll check your payment and switch on {p}, usually within a day.",
"pay_err": "Couldn't send just now. Please try again.",
"pay_close": "Close",
"pay_signin_p": "Please sign in first, so your plan is linked to your account.",
"pay_signin": "Sign in",
"pa_h": "Payments",
"pa_p": "UPI payments sent from the Plans section. Check each UTR in PhonePe, then set it to Approved or Rejected. Every change is logged with who made it and when.",
"pa_s_total": "Total received",
"pa_s_month": "Received this month",
"pa_s_pend": "Waiting for check",
"pa_s_active": "Active paid plans",
"pa_pend": "Waiting ({n})",
"pa_all": "All ({n})",
"pa_csv": "Download CSV",
"pa_none": "No payments here yet.",
"pa_c_status": "Status",
"pa_c_when": "Sent",
"pa_c_from": "Grower",
"pa_c_plan": "Plan",
"pa_c_amt": "Amount",
"pa_c_utr": "UTR",
"pa_c_until": "Plan ends",
"pa_c_by": "Checked",
"pa_st_pending": "Waiting",
"pa_st_approved": "Approved",
"pa_st_rejected": "Rejected",
"pa_expired": "Ended",
"pa_ask_ok": "Approve {a} from {e}?\n\nOnly approve after you see UTR {u} for {a} in PhonePe.",
"pa_ask_no": "Reject the payment with UTR {u} from {e}?",
"pa_ask_back": "Set UTR {u} back to waiting?",
"pa_log_h": "Payment log",
"pa_log_none": "Nothing logged yet.",
"pa_ev_sent": "{e} sent {a}, UTR {u}",
"pa_ev_changed": "UTR {u}: {o} → {n} by {b}",
"pa_err_setup": "The payments table is not set up yet. Run supabase/payments.sql, then supabase/payments_admin.sql, in the Supabase SQL Editor.",
"pa_err": "Could not load payments: {m}",
"pay_soon": "UPI payment is being set up. Please check back soon.",
"fa_h": "Feedback and suggestions",
"fa_p": "Messages sent with the Feedback button on any page. Only you can see them.",
"fa_new": "New ({n})",
"fa_all": "All ({n})",
"fa_none": "No messages here yet.",
"fa_done": "Mark done",
"fa_undo": "Mark as new",
"fa_k_problem": "Problem",
"fa_k_idea": "Suggestion",
"fa_k_other": "Other",
"fa_c_n": "#",
"fa_c_when": "Date",
"fa_c_kind": "Type",
"fa_c_msg": "Message",
"fa_c_page": "Page",
"fa_c_from": "From",
"fa_c_status": "Status",
"fa_s_new": "New",
"fa_s_done": "Done",
"fa_anon": "Not logged in",
"fa_page": "Page: {p}",
"fa_err_setup": "The feedback table is not set up yet. Run supabase/feedback.sql once in the Supabase SQL Editor.",
"fa_err": "Could not load feedback: {m}",
"lb_cat_disease": "Diseases",
"lb_cat_pest": "Pests",
"lb_cat_spray": "Sprays",
"lb_cat_nutrition": "Nutrition",
"lb_cat_pruning": "Pruning",
"lb_cat_orchard": "Orchard care",
"lb_cat_harvest": "Harvest",
"lb_cat_market": "Selling",
"lb_cat_schemes": "Govt. schemes",
"lb_cat_other": "Other",
"la_h": "Library articles",
"la_p": "Write and publish guides for the Library tab. Drafts are only visible to you.",
"la_new": "New article",
"la_seed": "Add starter articles (as drafts)",
"la_cat": "Category",
"la_status": "Status",
"la_sort": "Order (small first)",
"la_draft": "Draft",
"la_pub": "Published",
"la_ten": "Title (English)",
"la_thi": "Title (Hindi)",
"la_ben": "Article (English)",
"la_bhi": "Article (Hindi)",
"la_help": "Formatting: leave an empty line between paragraphs. Start a line with ## for a heading, - for a bullet point, and put **two stars** around words for bold.",
"la_vid": "Video link (YouTube, Facebook or Instagram, optional)",
"la_pics": "Photos (the first one is the cover)",
"la_addpic": "Add photos",
"la_save": "Save",
"la_prev": "Preview",
"la_cancel": "Close",
"la_del": "Delete",
"la_delq": "Delete this article for good? Tap Delete again to confirm.",
"la_saved": "Saved.",
"la_deleted": "Deleted.",
"la_need": "Write a title in English or Hindi first.",
"la_up": "Uploading {n}…",
"la_upfail": "Photo upload failed: {m}",
"la_c_t": "Title",
"la_c_cat": "Category",
"la_c_st": "Status",
"la_c_upd": "Updated",
"la_c_a": "",
"la_edit": "Edit",
"la_empty": "No articles yet. Tap New article, or add the starter articles.",
"la_seeded": "{n} starter articles added as drafts. Check each one, then set it to Published.",
"la_err_setup": "The library table is not set up yet. Run supabase/library.sql once in the Supabase SQL Editor.",
"la_err": "Could not save: {m}",
"la_lerr": "Could not load articles: {m}",
"adm_title": "Seb Saathi Admin",
"adm_site": "Back to site",
"adm_t_pay": "Payments",
"adm_t_users": "Growers",
"adm_t_fb": "Feedback",
"adm_t_lib": "Library",
"adm_out": "Log out",
"adm_gate_h": "Admin only",
"adm_gate_in": "Please log in with the admin account to open this page.",
"adm_gate_login": "Log in",
"adm_gate_no": "This account ({e}) is not an admin account.",
"adm_loading": "Checking your account…",
"adm_prev_close": "Close preview"
},
"hi": {
"pl_h": "प्लान",
"pl_p": "मुफ़्त शुरू करें। रिकॉर्ड बढ़ें तो अपग्रेड करें। किसी भी ऐप से UPI से भुगतान — कार्ड की ज़रूरत नहीं।",
"pl_note": "भुगतान जाँचने के बाद पेड प्लान चालू होता है, आमतौर पर एक दिन में। कुछ सुविधाएँ अभी बन रही हैं, तैयार होते ही आपके प्लान में जुड़ जाएँगी।",
"pl_free": "मुफ़्त",
"pl_basic": "साथी",
"pl_prem": "साथी प्लस",
"pl_free_t": "हर बाग़वान के लिए",
"pl_basic_t": "अपने बाग़ों के लिए",
"pl_premium_t": "पूरी सुविधाएँ, कोई सीमा नहीं",
"pl_zero": "₹0",
"pl_always": "हमेशा मुफ़्त",
"pl_yr": "/ साल",
"pl_mo": "या ₹{m} महीना",
"pl_best": "सबसे फ़ायदेमंद",
"pl_f_free": [
"मुनाफ़ा कैलकुलेटर (झटपट हिसाब)",
"सीज़न कैलेंडर और स्प्रे शेड्यूल",
"रोज़ के मंडी भाव",
"महीने में 3 फ़ोटो से बीमारी जाँच",
"साथी से रोज़ 5 सवाल",
"वीडियो और जानकारी लाइब्रेरी"
],
"pl_f_basic": [
"मुफ़्त प्लान की सब सुविधाएँ",
"2 बाग़ों का सेब रजिस्टर, इस सीज़न का",
"महीने में 15 फ़ोटो से बीमारी जाँच",
"साथी से असीमित बातचीत",
"WhatsApp पर स्प्रे रिमाइंडर",
"सीज़न रिपोर्ट डाउनलोड"
],
"pl_f_premium": [
"साथी प्लान की सब सुविधाएँ",
"असीमित बाग़ और पिछले सभी साल",
"साल-दर-साल मुनाफ़े की तुलना",
"असीमित फ़ोटो से बीमारी जाँच",
"आपकी ऊँचाई, किस्म और रूटस्टॉक के हिसाब से स्प्रे प्लान",
"मंडी भाव अलर्ट",
"ख़रीद-बिक्री में सबसे ऊपर लिस्टिंग",
"परिवार या मुंशी को एक्सेस",
"WhatsApp पर विशेषज्ञ मदद"
],
"pl_go_free": "मुफ़्त शुरू करें",
"pl_go_free_in": "आप मुफ़्त प्लान पर हैं",
"pl_go_pay": "{p} चुनें",
"pl_pending": "भुगतान भेजा — जाँच हो रही है",
"pl_active": "आपका प्लान चालू है",
"pay_h": "{p} लें",
"pay_per": "भुगतान अवधि",
"pay_year": "सालाना",
"pay_month": "महीना",
"pay_app": "UPI ऐप से भुगतान करें",
"pay_app_n": "GPay, PhonePe, Paytm या BHIM रकम भरकर खुलेगा।",
"pay_qr": "कंप्यूटर पर हैं? फ़ोन के UPI ऐप से यह स्कैन करें।",
"pay_to": "भुगतान पाने वाला",
"pay_copy": "कॉपी",
"pay_copied": "कॉपी हो गया",
"pay_utr_l": "भुगतान के बाद, अपने पेमेंट ऐप से 12 अंकों का UPI रेफ़रेंस नंबर (UTR) लिखें",
"pay_utr_ph": "जैसे 412345678901",
"pay_send": "जाँच के लिए भेजें",
"pay_sending": "भेज रहे हैं…",
"pay_bad": "रेफ़रेंस नंबर 12 अंकों का होना चाहिए।",
"pay_dup": "यह रेफ़रेंस नंबर पहले ही भेजा जा चुका है।",
"pay_ok": "धन्यवाद! हम भुगतान जाँचकर {p} चालू कर देंगे, आमतौर पर एक दिन में।",
"pay_err": "अभी भेज नहीं पाए। कृपया दोबारा कोशिश करें।",
"pay_close": "बंद करें",
"pay_signin_p": "पहले साइन इन करें, ताकि प्लान आपके खाते से जुड़े।",
"pay_signin": "साइन इन",
"pay_soon": "UPI भुगतान की तैयारी चल रही है। जल्द ही दोबारा देखें।",
"pa_h": "भुगतान",
"pa_p": "प्लान सेक्शन से भेजे गए UPI भुगतान। हर UTR को PhonePe में जाँचें, फिर मंज़ूर या नामंज़ूर करें। हर बदलाव किसने और कब किया, दर्ज होता है।",
"pa_s_total": "कुल प्राप्त",
"pa_s_month": "इस महीने प्राप्त",
"pa_s_pend": "जाँच बाकी",
"pa_s_active": "चालू पेड प्लान",
"pa_pend": "बाकी ({n})",
"pa_all": "सभी ({n})",
"pa_csv": "CSV डाउनलोड",
"pa_none": "यहाँ अभी कोई भुगतान नहीं है।",
"pa_c_status": "स्थिति",
"pa_c_when": "भेजा",
"pa_c_from": "बाग़वान",
"pa_c_plan": "प्लान",
"pa_c_amt": "रकम",
"pa_c_utr": "UTR",
"pa_c_until": "प्लान ख़त्म",
"pa_c_by": "जाँचा",
"pa_st_pending": "बाकी",
"pa_st_approved": "मंज़ूर",
"pa_st_rejected": "नामंज़ूर",
"pa_expired": "ख़त्म",
"pa_ask_ok": "{e} का {a} मंज़ूर करें?\n\nPhonePe में {a} का UTR {u} दिखने के बाद ही मंज़ूर करें।",
"pa_ask_no": "{e} का UTR {u} वाला भुगतान नामंज़ूर करें?",
"pa_ask_back": "UTR {u} को वापस बाकी में डालें?",
"pa_log_h": "भुगतान रिकॉर्ड",
"pa_log_none": "अभी कुछ दर्ज नहीं।",
"pa_ev_sent": "{e} ने {a} भेजा, UTR {u}",
"pa_ev_changed": "UTR {u}: {o} → {n}, {b} द्वारा",
"pa_err_setup": "भुगतान टेबल अभी नहीं बनी। Supabase SQL Editor में supabase/payments.sql, फिर supabase/payments_admin.sql चलाएँ।",
"pa_err": "भुगतान लोड नहीं हो सके: {m}",
"tt_admin": "एडमिन",
"ad_h": "एडमिन",
"ad_pill": "सिर्फ़ आप देख सकते हैं",
"ad_p": "जिन्होंने भी खाता बनाया है, उन्होंने आख़िरी बार कब लॉग इन किया, और क्या वे रिकॉर्ड रख रहे हैं। बिक्री के आँकड़े हर बागवान के अपने रहते हैं।",
"ad_refresh": "ताज़ा करें",
"ad_at": "{t} पर ताज़ा किया",
"ad_loading": "लोड हो रहा है…",
"ad_find": "ईमेल से ढूँढें",
"ad_total": "खाते",
"ad_a7": "पिछले 7 दिन में लॉग इन",
"ad_a30": "पिछले 30 दिन में लॉग इन",
"ad_new7": "इस हफ़्ते नए",
"ad_rec": "रिकॉर्ड रख रहे हैं",
"ad_unconf": "ईमेल की पुष्टि नहीं हुई",
"ad_email": "ईमेल",
"ad_joined": "जुड़े",
"ad_last": "आख़िरी लॉग इन",
"ad_orch": "बाग़",
"ad_years": "साल",
"ad_lots": "लॉट",
"ad_saved": "आख़िरी बार सहेजा",
"ad_status": "स्थिति",
"ad_ok": "पुष्टि हुई",
"ad_no": "पुष्टि नहीं हुई",
"ad_me": "आप",
"ad_never": "कभी नहीं",
"ad_today": "आज, {t}",
"ad_yday": "कल, {t}",
"ad_none": "कोई खाता नहीं मिला।",
"ad_note": "आख़िरी लॉग इन यानी हर व्यक्ति ने सबसे हाल में कब लॉग इन किया। बाग़, साल और लॉट में उदाहरण वाले रिकॉर्ड शामिल नहीं हैं।",
"ad_err_setup": "एडमिन व्यू अभी सेट नहीं हुआ है। Supabase > SQL Editor में एडमिन SQL एक बार चलाएँ (यह प्रोजेक्ट नोट्स में है), फिर ताज़ा करें दबाएँ।",
"ad_err_deny": "यह खाता एडमिन नहीं है।",
"ad_err": "एडमिन व्यू लोड नहीं हो सका: {m}",
"auth_out": "लॉग आउट",
"lang_btn": "English",
"fa_h": "सुझाव और शिकायतें",
"fa_p": "हर पेज के सुझाव बटन से भेजे गए संदेश। इन्हें सिर्फ़ आप देख सकते हैं।",
"fa_new": "नए ({n})",
"fa_all": "सभी ({n})",
"fa_none": "यहाँ अभी कोई संदेश नहीं है।",
"fa_done": "हो गया",
"fa_undo": "फिर से नया करें",
"fa_k_problem": "दिक़्क़त",
"fa_k_idea": "सुझाव",
"fa_k_other": "अन्य",
"fa_c_n": "#",
"fa_c_when": "तारीख़",
"fa_c_kind": "प्रकार",
"fa_c_msg": "संदेश",
"fa_c_page": "पेज",
"fa_c_from": "किससे",
"fa_c_status": "स्थिति",
"fa_s_new": "नया",
"fa_s_done": "हो गया",
"fa_anon": "लॉग इन नहीं",
"fa_page": "पेज: {p}",
"fa_err_setup": "सुझाव वाली टेबल अभी नहीं बनी है। Supabase SQL Editor में supabase/feedback.sql एक बार चलाएँ।",
"fa_err": "सुझाव लोड नहीं हो सके: {m}",
"lb_cat_disease": "बीमारियाँ",
"lb_cat_pest": "कीट",
"lb_cat_spray": "स्प्रे",
"lb_cat_nutrition": "पोषण",
"lb_cat_pruning": "छँटाई",
"lb_cat_orchard": "बाग़ की देखभाल",
"lb_cat_harvest": "तुड़ाई",
"lb_cat_market": "बिक्री",
"lb_cat_schemes": "सरकारी योजनाएँ",
"lb_cat_other": "अन्य",
"la_h": "जानकारी के लेख",
"la_p": "जानकारी टैब के लिए गाइड लिखें और प्रकाशित करें। ड्राफ़्ट सिर्फ़ आपको दिखते हैं।",
"la_new": "नया लेख",
"la_seed": "शुरुआती लेख जोड़ें (ड्राफ़्ट में)",
"la_cat": "श्रेणी",
"la_status": "स्थिति",
"la_sort": "क्रम (छोटा पहले)",
"la_draft": "ड्राफ़्ट",
"la_pub": "प्रकाशित",
"la_ten": "शीर्षक (अंग्रेज़ी)",
"la_thi": "शीर्षक (हिंदी)",
"la_ben": "लेख (अंग्रेज़ी)",
"la_bhi": "लेख (हिंदी)",
"la_help": "लिखने का तरीक़ा: पैराग्राफ़ों के बीच एक ख़ाली लाइन छोड़ें। शीर्षक के लिए लाइन ## से, बिंदु के लिए - से शुरू करें, और मोटे अक्षरों के लिए शब्दों के दोनों ओर **दो तारे** लगाएँ।",
"la_vid": "वीडियो लिंक (YouTube, Facebook या Instagram, ज़रूरी नहीं)",
"la_pics": "फ़ोटो (पहली फ़ोटो कवर बनेगी)",
"la_addpic": "फ़ोटो जोड़ें",
"la_save": "सहेजें",
"la_prev": "झलक देखें",
"la_cancel": "बंद करें",
"la_del": "हटाएँ",
"la_delq": "यह लेख हमेशा के लिए हटाएँ? पक्का करने के लिए फिर से हटाएँ दबाएँ।",
"la_saved": "सहेज लिया।",
"la_deleted": "हटा दिया।",
"la_need": "पहले अंग्रेज़ी या हिंदी में शीर्षक लिखें।",
"la_up": "{n} अपलोड हो रही हैं…",
"la_upfail": "फ़ोटो अपलोड नहीं हुई: {m}",
"la_c_t": "शीर्षक",
"la_c_cat": "श्रेणी",
"la_c_st": "स्थिति",
"la_c_upd": "अपडेट",
"la_c_a": "",
"la_edit": "बदलें",
"la_empty": "अभी कोई लेख नहीं। नया लेख दबाएँ, या शुरुआती लेख जोड़ें।",
"la_seeded": "{n} शुरुआती लेख ड्राफ़्ट में जोड़े गए। हर एक जाँचें, फिर प्रकाशित करें।",
"la_err_setup": "जानकारी वाली टेबल अभी नहीं बनी है। Supabase SQL Editor में supabase/library.sql एक बार चलाएँ।",
"la_err": "सहेजा नहीं जा सका: {m}",
"la_lerr": "लेख लोड नहीं हो सके: {m}",
"adm_title": "सेब साथी एडमिन",
"adm_site": "साइट पर वापस",
"adm_t_pay": "भुगतान",
"adm_t_users": "बाग़वान",
"adm_t_fb": "सुझाव",
"adm_t_lib": "लाइब्रेरी",
"adm_out": "लॉग आउट",
"adm_gate_h": "सिर्फ़ एडमिन के लिए",
"adm_gate_in": "यह पेज खोलने के लिए एडमिन खाते से लॉग इन करें।",
"adm_gate_login": "लॉग इन",
"adm_gate_no": "यह खाता ({e}) एडमिन खाता नहीं है।",
"adm_loading": "खाता जाँच रहे हैं…",
"adm_prev_close": "प्रीव्यू बंद करें"
}
};
const $ = id => document.getElementById(id);
const set = (id, t) => { const e = $(id); if (e) e.textContent = t; };
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmtN = n => Math.round(n).toLocaleString("en-IN");
const rupees = n => "₹" + Number(n).toLocaleString("en-IN");
const plName = p => tr(p === "premium" ? "pl_prem" : p === "basic" ? "pl_basic" : "pl_free");
let lang = "en";
try { const s = localStorage.getItem("ad-lang"); if (s === "hi" || s === "en") lang = s; } catch (e) {}
const tr = k => (T[lang][k] != null ? T[lang][k] : T.en[k] != null ? T.en[k] : "");
const SB_URL = "https://rylqzyylbsephirwslce.supabase.co";
const SB_KEY = "sb_publishable_EYVtP0ljYd-jta5ENmX9Jg_mCtYLzJo";
let sb = null, user = null;
try { if (window.supabase && window.supabase.createClient) sb = window.supabase.createClient(SB_URL, SB_KEY); } catch (e) { sb = null; }
var LIB_CATS = ["disease", "pest", "spray", "nutrition", "pruning", "orchard", "harvest", "market", "schemes", "other"];
var LIB_COLS = "id,category,title_en,title_hi,body_en,body_hi,video_url,images,status,sort,updated_at";

function libInline(t) {
  return t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, a, u) => '<a href="' + u + '" target="_blank" rel="noopener">' + a + "</a>");
}
function libMd(src) {
  const blocks = esc(String(src || "").replace(/\r/g, "")).split(/\n\s*\n/);
  return blocks.map(b => {
    const lines = b.split("\n").filter(l => l.trim());
    if (!lines.length) return "";
    let out = "", list = [];
    const flush = () => { if (list.length) { out += "<ul>" + list.map(x => "<li>" + libInline(x) + "</li>").join("") + "</ul>"; list = []; } };
    let para = [];
    const flushP = () => { if (para.length) { out += "<p>" + para.map(libInline).join("<br>") + "</p>"; para = []; } };
    lines.forEach(l => {
      const t = l.trim();
      if (/^#{2,3}\s+/.test(t)) { flushP(); flush(); out += "<h4>" + libInline(t.replace(/^#+\s+/, "")) + "</h4>"; }
      else if (/^[-•*]\s+/.test(t)) { flushP(); list.push(t.replace(/^[-•*]\s+/, "")); }
      else { flush(); para.push(t); }
    });
    flushP(); flush();
    return out;
  }).join("");
}

/* ---------- admin (the real check is in the admin_overview function in Supabase) ---------- */
const ADMIN_EMAILS = ["deeduu@gmail.com"];
const isAdmin = () => !!(user && user.email && ADMIN_EMAILS.indexOf(user.email.toLowerCase()) >= 0);
let AD = null, adBusy = false, adLoaded = false;
function adWhen(iso) {
  if (!iso) return tr("ad_never");
  const d = new Date(iso), now = new Date(), loc = lang === "hi" ? "hi-IN" : "en-IN";
  const t = d.toLocaleTimeString(loc, {hour: "2-digit", minute: "2-digit"});
  const day = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((day(now) - day(d)) / 864e5);
  if (diff === 0) return tr("ad_today").replace("{t}", t);
  if (diff === 1) return tr("ad_yday").replace("{t}", t);
  return d.toLocaleDateString(loc, {day: "numeric", month: "short", year: d.getFullYear() === now.getFullYear() ? undefined : "numeric"});
}
async function loadAdmin() {
  if (!isAdmin() || !sb || adBusy) return;
  adBusy = true; set("adErr", ""); set("adAt", tr("ad_loading")); $("adRefresh").disabled = true;
  let res = null, err = null;
  try { res = await sb.rpc("admin_overview"); err = res.error; } catch (x) { err = x; }
  adBusy = false; $("adRefresh").disabled = false; set("adAt", "");
  if (err) {
    const m = String(err.message || err), code = String(err.code || "");
    set("adErr", code === "PGRST202" || /could not find the function|does not exist/i.test(m) ? tr("ad_err_setup")
      : code === "42501" || /not allowed|permission denied/i.test(m) ? tr("ad_err_deny") : tr("ad_err").replace("{m}", m));
    return;
  }
  AD = res.data; adLoaded = true; renderAdmin();
}
function renderAdmin() {
  if (!AD) { $("adBody").hidden = true; return; }
  $("adBody").hidden = false;
  set("adAt", tr("ad_at").replace("{t}", adWhen(AD.at)));
  const st = (k, v, main) => "<div" + (main ? ' class="main"' : "") + "><span>" + tr(k) + "</span><b>" + fmtN(+v || 0) + "</b></div>";
  $("adStats").innerHTML = st("ad_total", AD.total, true) + st("ad_a7", AD.active7) + st("ad_a30", AD.active30) + st("ad_new7", AD.new7) +
    st("ad_rec", AD.withRecords) + st("ad_unconf", (+AD.total || 0) - (+AD.confirmed || 0));
  const q = $("adFind").value.trim().toLowerCase();
  const rows = (AD.users || []).filter(u => !q || String(u.email || "").toLowerCase().indexOf(q) >= 0);
  if (!rows.length) { $("adTable").innerHTML = '<p class="empty">' + tr("ad_none") + "</p>"; return; }
  const mine = (user && user.email || "").toLowerCase();
  const head = ["ad_email", "ad_joined", "ad_last", "ad_orch", "ad_years", "ad_lots", "ad_saved", "ad_status"];
  $("adTable").innerHTML = '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(u => '<tr><th scope="row">' + esc(u.email || "–") + (String(u.email || "").toLowerCase() === mine ? ' <span class="tag me">' + tr("ad_me") + "</span>" : "") + "</th>" +
      "<td>" + adWhen(u.created_at) + "</td><td>" + adWhen(u.last_sign_in_at) + '</td><td class="n">' + fmtN(+u.orchards || 0) + '</td><td class="n">' + fmtN(+u.years || 0) +
      '</td><td class="n">' + fmtN(+u.lots || 0) + "</td><td>" + (u.saved_at ? adWhen(u.saved_at) : "–") + "</td>" +
      '<td><span class="tag' + (u.confirmed ? " ok" : "") + '">' + tr(u.confirmed ? "ad_ok" : "ad_no") + "</span></td></tr>").join("") +
    "</tbody></table></div>";
}
$("adRefresh").addEventListener("click", () => { loadAdmin(); loadFeedback(); loadLibAdmin(); if (typeof loadPayAdmin === "function") loadPayAdmin(); });
$("adFind").addEventListener("input", renderAdmin);

/* ---- admin: feedback and suggestions (table public.feedback, see supabase/feedback.sql) ---- */
Object.assign(T.en, {
  fa_h:"Feedback and suggestions", fa_p:"Messages sent with the Feedback button on any page. Only you can see them.",
  fa_new:"New ({n})", fa_all:"All ({n})", fa_none:"No messages here yet.", fa_done:"Mark done", fa_undo:"Mark as new",
  fa_k_problem:"Problem", fa_k_idea:"Suggestion", fa_k_other:"Other", fa_c_n:"#", fa_c_when:"Date", fa_c_kind:"Type", fa_c_msg:"Message", fa_c_page:"Page", fa_c_from:"From", fa_c_status:"Status", fa_s_new:"New", fa_s_done:"Done", fa_anon:"Not logged in", fa_page:"Page: {p}",
  fa_err_setup:"The feedback table is not set up yet. Run supabase/feedback.sql once in the Supabase SQL Editor.",
  fa_err:"Could not load feedback: {m}"
});
Object.assign(T.hi, {
  fa_h:"सुझाव और शिकायतें", fa_p:"हर पेज के सुझाव बटन से भेजे गए संदेश। इन्हें सिर्फ़ आप देख सकते हैं।",
  fa_new:"नए ({n})", fa_all:"सभी ({n})", fa_none:"यहाँ अभी कोई संदेश नहीं है।", fa_done:"हो गया", fa_undo:"फिर से नया करें",
  fa_k_problem:"दिक़्क़त", fa_k_idea:"सुझाव", fa_k_other:"अन्य", fa_c_n:"#", fa_c_when:"तारीख़", fa_c_kind:"प्रकार", fa_c_msg:"संदेश", fa_c_page:"पेज", fa_c_from:"किससे", fa_c_status:"स्थिति", fa_s_new:"नया", fa_s_done:"हो गया", fa_anon:"लॉग इन नहीं", fa_page:"पेज: {p}",
  fa_err_setup:"सुझाव वाली टेबल अभी नहीं बनी है। Supabase SQL Editor में supabase/feedback.sql एक बार चलाएँ।",
  fa_err:"सुझाव लोड नहीं हो सके: {m}"
});
var FB = null, fbBusy = false, fbShow = "new";
async function loadFeedback() {
  if (!isAdmin() || !sb || fbBusy) return;
  fbBusy = true; set("faErr", ""); $("faRefresh").disabled = true;
  let res = null, err = null;
  try { res = await sb.from("feedback").select("*").order("created_at", {ascending: false}).limit(500); err = res.error; } catch (x) { err = x; }
  fbBusy = false; $("faRefresh").disabled = false;
  if (err) {
    const m = String(err.message || err);
    set("faErr", String(err.code || "") === "42P01" || /does not exist|could not find the table|schema cache/i.test(m) ? tr("fa_err_setup") : tr("fa_err").replace("{m}", m));
    return;
  }
  FB = res.data || []; renderFeedback();
}
function renderFeedback() {
  const all = FB || [], fresh = all.filter(x => x.status !== "done");
  set("faNew", tr("fa_new").replace("{n}", fmtN(fresh.length)));
  set("faAll", tr("fa_all").replace("{n}", fmtN(all.length)));
  $("faNew").setAttribute("aria-selected", fbShow === "new" ? "true" : "false");
  $("faAll").setAttribute("aria-selected", fbShow === "all" ? "true" : "false");
  if (!FB) { $("faList").innerHTML = ""; return; }
  const rows = fbShow === "new" ? fresh : all;
  if (!rows.length) { $("faList").innerHTML = '<p class="empty">' + tr("fa_none") + "</p>"; return; }
  const head = ["fa_c_n", "fa_c_status", "fa_c_when", "fa_c_kind", "fa_c_msg", "fa_c_page", "fa_c_from"];
  $("faList").innerHTML = '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map((x, i) => {
      const st = x.status === "done" ? "done" : "new";
      const stCell = '<td class="fbst"><select class="' + st + '" data-fb="' + esc(x.id) + '" aria-label="' + tr("fa_c_status") + '">' +
        '<option value="new"' + (st === "new" ? " selected" : "") + ">" + tr("fa_s_new") + '</option><option value="done"' + (st === "done" ? " selected" : "") + ">" + tr("fa_s_done") + "</option></select></td>";
      return '<tr class="' + st + '"><td class="n">' + (rows.length - i) + "</td>" + stCell + '<td class="fbwhen">' + adWhen(x.created_at) + "</td>" +
        '<td><span class="fbkind ' + esc(x.kind) + '">' + tr("fa_k_" + (x.kind || "other")) + "</span></td>" +
        '<td class="fbmsgc">' + esc(x.message) + "</td><td>" + esc(x.page || "–") + (x.lang ? '<br><span class="fine">' + esc(x.lang.toUpperCase()) + "</span>" : "") + "</td>" +
        '<td class="fbcont">' + esc(x.contact || (x.user_id ? "–" : tr("fa_anon"))) + "</td></tr>";
    }).join("") + "</tbody></table></div>";
}
$("faNew").addEventListener("click", () => { fbShow = "new"; renderFeedback(); });
$("faAll").addEventListener("click", () => { fbShow = "all"; renderFeedback(); });
$("faRefresh").addEventListener("click", loadFeedback);
$("faList").addEventListener("change", async e => {
  const sel = e.target.closest("select[data-fb]"); if (!sel || !FB) return;
  const row = FB.find(x => x.id === sel.dataset.fb); if (!row) return;
  const next = sel.value === "done" ? "done" : "new";
  if (next === row.status) return;
  sel.disabled = true; set("faErr", "");
  let err = null;
  try { const res = await sb.from("feedback").update({status: next}).eq("id", row.id); err = res.error; } catch (x) { err = x; }
  sel.disabled = false;
  if (err) { sel.value = row.status === "done" ? "done" : "new"; set("faErr", tr("fa_err").replace("{m}", String(err.message || err))); return; }
  row.status = next; renderFeedback();
});

/* ---- admin: write and publish library articles ---- */
var LA = null, laEdit = null, laDelArm = false, laBusy = false;
function laSetMsg(err, ok) { set("laErr", err || ""); set("laOk", ok || ""); }
async function loadLA() {
  if (!isAdmin() || !sb) return;
  let res = null, err = null;
  try { res = await sb.from("articles").select(LIB_COLS).order("sort", {ascending: true}).order("updated_at", {ascending: false}); err = res.error; } catch (x) { err = x; }
  if (err) { const m = String(err.message || err); laSetMsg(/does not exist|schema cache|could not find the table/i.test(m) ? tr("la_err_setup") : tr("la_lerr").replace("{m}", m)); LA = null; renderLA(); return; }
  LA = res.data || []; renderLA();
}
function renderLA() {
  const cats = LIB_CATS.map(c => '<option value="' + c + '">' + tr("lb_cat_" + c) + "</option>").join("");
  if ($("laCat").options.length !== LIB_CATS.length) $("laCat").innerHTML = cats; else LIB_CATS.forEach((c, i) => { $("laCat").options[i].text = tr("lb_cat_" + c); });
  $("laStatus").options[0].text = tr("la_draft"); $("laStatus").options[1].text = tr("la_pub");
  set("laDel", tr(laDelArm ? "la_delq" : "la_del"));
  $("laSeed").hidden = !LA || !laStarterMissing.length;
  if (!LA) { $("laList").innerHTML = ""; return; }
  if (!LA.length) { $("laList").innerHTML = '<p class="empty">' + tr("la_empty") + "</p>"; return; }
  const head = ["la_c_t", "la_c_cat", "la_c_st", "la_c_upd", "la_c_a"];
  $("laList").innerHTML = '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    LA.map(a => '<tr><td class="t">' + esc(a.title_en || a.title_hi || "–") + (a.title_en && a.title_hi ? '<br><span class="fine">' + esc(a.title_hi) + "</span>" : "") + "</td>" +
      "<td>" + tr("lb_cat_" + (a.category || "other")) + "</td>" +
      '<td><span class="tag' + (a.status === "published" ? " ok" : "") + '">' + tr(a.status === "published" ? "la_pub" : "la_draft") + "</span></td>" +
      "<td>" + adWhen(a.updated_at) + '</td><td><button class="btn-s" type="button" data-la="' + esc(a.id) + '">' + tr("la_edit") + "</button></td></tr>").join("") +
    "</tbody></table></div>";
}
var laStarter = null, laStarterMissing = [];
async function laCheckStarter() {
  if (!laStarter) { try { const r = await fetch("/library-starter.json"); if (r.ok) laStarter = await r.json(); } catch (e) {} }
  const have = new Set((LA || []).map(a => (a.title_en || "").trim()));
  laStarterMissing = (laStarter || []).filter(a => !have.has(a.title_en.trim()));
  renderLA();
}
function laFill(a) {
  laEdit = a ? JSON.parse(JSON.stringify(a)) : {id: null, category: "disease", status: "draft", sort: 100, title_en: "", title_hi: "", body_en: "", body_hi: "", video_url: "", images: []};
  if (!Array.isArray(laEdit.images)) laEdit.images = [];
  $("laCat").value = laEdit.category; $("laStatus").value = laEdit.status; $("laSort").value = laEdit.sort;
  $("laTen").value = laEdit.title_en; $("laThi").value = laEdit.title_hi; $("laBen").value = laEdit.body_en; $("laBhi").value = laEdit.body_hi; $("laVid").value = laEdit.video_url || "";
  $("laDel").hidden = !laEdit.id; laDelArm = false; set("laPicMsg", "");
  laPics(); renderLA();
  $("laForm").hidden = false; $("laForm").scrollIntoView({block: "start"});
}
function laRead() {
  Object.assign(laEdit, {category: $("laCat").value, status: $("laStatus").value, sort: Math.max(0, Math.min(9999, parseInt($("laSort").value, 10) || 0)),
    title_en: $("laTen").value.trim(), title_hi: $("laThi").value.trim(), body_en: $("laBen").value.trim(), body_hi: $("laBhi").value.trim(), video_url: $("laVid").value.trim() || null});
}
function laPics() {
  $("laPics").innerHTML = laEdit.images.map((u, i) => '<figure><img src="' + esc(u) + '" alt=""><button type="button" data-rmpic="' + i + '" aria-label="Remove">×</button></figure>').join("");
}
$("laNew").addEventListener("click", () => { laSetMsg(); laFill(null); });
$("laRefresh").addEventListener("click", async () => { laSetMsg(); await loadLA(); laCheckStarter(); });
$("laCancel").addEventListener("click", () => { $("laForm").hidden = true; laEdit = null; laSetMsg(); });
$("laList").addEventListener("click", e => { const b = e.target.closest("[data-la]"); if (!b || !LA) return; const a = LA.find(x => x.id === b.dataset.la); if (a) { laSetMsg(); laFill(a); } });
$("laPics").addEventListener("click", e => { const b = e.target.closest("[data-rmpic]"); if (!b) return; laEdit.images.splice(+b.dataset.rmpic, 1); laPics(); });
$("laAddPic").addEventListener("click", () => $("laFile").click());
function laShrink(file) {
  return new Promise((ok, no) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : no(new Error("image")), "image/jpeg", 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); no(new Error("image")); };
    img.src = url;
  });
}
$("laFile").addEventListener("change", async e => {
  const files = Array.from(e.target.files || []); e.target.value = "";
  if (!files.length || !sb) return;
  set("laPicMsg", tr("la_up").replace("{n}", files.length)); $("laAddPic").disabled = true;
  for (const f of files) {
    try {
      const blob = await laShrink(f);
      const path = new Date().toISOString().slice(0, 10) + "/" + Math.random().toString(36).slice(2, 10) + ".jpg";
      const up = await sb.storage.from("library").upload(path, blob, {contentType: "image/jpeg", upsert: false});
      if (up.error) throw up.error;
      laEdit.images.push(sb.storage.from("library").getPublicUrl(path).data.publicUrl); laPics();
    } catch (x) { set("laPicMsg", tr("la_upfail").replace("{m}", String((x && x.message) || x))); $("laAddPic").disabled = false; return; }
  }
  set("laPicMsg", ""); $("laAddPic").disabled = false;
});
$("laForm").addEventListener("submit", async e => {
  e.preventDefault(); if (laBusy || !laEdit) return;
  laRead(); laSetMsg();
  if (!laEdit.title_en && !laEdit.title_hi) { laSetMsg(tr("la_need")); return; }
  const row = {category: laEdit.category, status: laEdit.status, sort: laEdit.sort, title_en: laEdit.title_en, title_hi: laEdit.title_hi,
    body_en: laEdit.body_en, body_hi: laEdit.body_hi, video_url: laEdit.video_url, images: laEdit.images, updated_at: new Date().toISOString()};
  laBusy = true; $("laSave").disabled = true;
  let res = null, err = null;
  try { res = laEdit.id ? await sb.from("articles").update(row).eq("id", laEdit.id).select(LIB_COLS).single() : await sb.from("articles").insert(row).select(LIB_COLS).single(); err = res.error; } catch (x) { err = x; }
  laBusy = false; $("laSave").disabled = false;
  if (err) { laSetMsg(tr("la_err").replace("{m}", String(err.message || err))); return; }
  laEdit = Object.assign({}, res.data); laSetMsg("", tr("la_saved")); $("laDel").hidden = false;
  await loadLA(); laCheckStarter();
});
$("laPrev").addEventListener("click", () => {
  if (!laEdit) return; laRead();
  const t = lang === "hi" ? (laEdit.title_hi || laEdit.title_en) : (laEdit.title_en || laEdit.title_hi);
  const b = lang === "hi" ? (laEdit.body_hi || laEdit.body_en) : (laEdit.body_en || laEdit.body_hi);
  $("prevBody").innerHTML = "<h3>" + esc(t || "–") + "</h3>" + (laEdit.images || []).map(u => '<img src="' + esc(u) + '" alt="">').join("") + '<div class="libbody">' + libMd(b) + "</div>";
  const d = $("prevDlg"); if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
});
$("laDel").addEventListener("click", async () => {
  if (!laEdit || !laEdit.id) return;
  if (!laDelArm) { laDelArm = true; renderLA(); return; }
  laDelArm = false;
  let err = null;
  try { const res = await sb.from("articles").delete().eq("id", laEdit.id); err = res.error; } catch (x) { err = x; }
  if (err) { laSetMsg(tr("la_err").replace("{m}", String(err.message || err))); renderLA(); return; }
  $("laForm").hidden = true; laEdit = null; laSetMsg("", tr("la_deleted"));
  await loadLA(); laCheckStarter();
});
$("laSeed").addEventListener("click", async () => {
  if (!laStarterMissing.length) return;
  $("laSeed").disabled = true; laSetMsg();
  const rows = laStarterMissing.map(a => ({category: a.category, sort: a.sort, title_en: a.title_en, title_hi: a.title_hi, body_en: a.body_en, body_hi: a.body_hi, status: "draft"}));
  let err = null;
  try { const res = await sb.from("articles").insert(rows); err = res.error; } catch (x) { err = x; }
  $("laSeed").disabled = false;
  if (err) { laSetMsg(tr("la_err").replace("{m}", String(err.message || err))); return; }
  laSetMsg("", tr("la_seeded").replace("{n}", rows.length));
  await loadLA(); laCheckStarter();
});
async function loadLibAdmin() { await loadLA(); laCheckStarter(); }

/* ---------- admin: payments (tables public.payments + public.payment_events) ---------- */
let PA = null, PALOG = null, paBusy = false, paShow = "pending";
const paRup = n => rupees(+n || 0);
const paDate = iso => iso ? new Date(iso).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "–";
const paDay = d => d ? new Date(d + "T00:00:00").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }) : "–";

async function loadPayAdmin() {
  if (!document.getElementById("paList") || typeof isAdmin !== "function" || !isAdmin() || !sb || paBusy) return;
  paBusy = true; set("paErr", ""); $("paRefresh").disabled = true;
  let err = null;
  try {
    const r = await sb.from("payments").select("*").order("created_at", { ascending: false }).limit(1000);
    if (r.error) err = r.error; else PA = r.data || [];
    const g = await sb.from("payment_events").select("*").order("at", { ascending: false }).limit(200);
    PALOG = g.error ? null : (g.data || []);
  } catch (x) { err = x; }
  paBusy = false; $("paRefresh").disabled = false;
  if (err) {
    const m = String(err.message || err);
    set("paErr", String(err.code || "") === "42P01" || /does not exist|could not find the table|schema cache/i.test(m) ? tr("pa_err_setup") : tr("pa_err").replace("{m}", m));
  }
  renderPayAdmin();
}

function renderPayAdmin() {
  if (!document.getElementById("paList")) return;
  const all = PA || [], pend = all.filter(x => x.status === "pending"), ok = all.filter(x => x.status === "approved");
  const now = new Date(), ym = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  const today = now.toISOString().slice(0, 10);
  const sum = a => a.reduce((s, x) => s + (+x.amount || 0), 0);
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + tr(k) + "</span><b>" + v + "</b></div>";
  $("paStats").innerHTML = st("pa_s_total", paRup(sum(ok)), "main") +
    st("pa_s_month", paRup(sum(ok.filter(x => String(x.created_at).slice(0, 7) === ym)))) +
    st("pa_s_pend", fmtN(pend.length) + (pend.length ? " · " + paRup(sum(pend)) : ""), pend.length ? "neg" : "") +
    st("pa_s_active", fmtN(ok.filter(x => !x.valid_until || x.valid_until >= today).length), "pos");
  set("paPend", tr("pa_pend").replace("{n}", fmtN(pend.length)));
  set("paAll", tr("pa_all").replace("{n}", fmtN(all.length)));
  $("paPend").setAttribute("aria-selected", paShow === "pending" ? "true" : "false");
  $("paAll").setAttribute("aria-selected", paShow === "all" ? "true" : "false");
  if (!PA) { $("paList").innerHTML = ""; $("paLog").innerHTML = ""; return; }
  const rows = paShow === "pending" ? pend : all;
  const head = ["pa_c_status", "pa_c_when", "pa_c_from", "pa_c_plan", "pa_c_amt", "pa_c_utr", "pa_c_until", "pa_c_by"];
  $("paList").innerHTML = !rows.length ? '<p class="empty">' + tr("pa_none") + "</p>" :
    '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(x => {
      const sel = '<td class="fbst"><select class="pa-' + esc(x.status) + '" data-pa="' + esc(x.id) + '" aria-label="' + tr("pa_c_status") + '">' +
        ["pending", "approved", "rejected"].map(s => '<option value="' + s + '"' + (x.status === s ? " selected" : "") + ">" + tr("pa_st_" + s) + "</option>").join("") + "</select></td>";
      const expired = x.status === "approved" && x.valid_until && x.valid_until < today;
      return "<tr>" + sel + "<td>" + paDate(x.created_at) + "</td><td>" + esc(x.email || "–") + "</td>" +
        "<td>" + plName(x.plan) + '<br><span class="fine">' + tr(x.period === "year" ? "pay_year" : "pay_month") + "</span></td>" +
        '<td class="n">' + paRup(x.amount) + '</td><td><code>' + esc(x.utr) + "</code></td>" +
        "<td>" + (x.valid_until ? paDay(x.valid_until) + (expired ? ' <span class="tag">' + tr("pa_expired") + "</span>" : "") : "–") + "</td>" +
        "<td>" + (x.reviewed_at ? paDate(x.reviewed_at) + '<br><span class="fine">' + esc(x.reviewed_by || "") + "</span>" : "–") + "</td></tr>";
    }).join("") + "</tbody></table></div>";
  const L = PALOG || [];
  $("paLog").innerHTML = '<h5>' + tr("pa_log_h") + "</h5>" + (!L.length ? '<p class="fine">' + tr("pa_log_none") + "</p>" :
    '<ul class="palog">' + L.slice(0, 50).map(e => {
      const d = e.details || {};
      const what = e.action === "sent"
        ? tr("pa_ev_sent").replace("{e}", esc(d.email || e.by_email || "–")).replace("{a}", paRup(d.amount)).replace("{u}", esc(d.utr || ""))
        : tr("pa_ev_changed").replace("{u}", esc(d.utr || "")).replace("{o}", tr("pa_st_" + (e.old_status || "pending"))).replace("{n}", tr("pa_st_" + (e.new_status || "pending"))).replace("{b}", esc(e.by_email || "–"));
      return "<li><time>" + paDate(e.at) + "</time> " + what + "</li>";
    }).join("") + "</ul>");
}

function paCsv() {
  if (!PA || !PA.length) return;
  const cols = ["created_at", "email", "plan", "period", "amount", "utr", "status", "valid_until", "reviewed_at", "reviewed_by", "note", "id"];
  const q = v => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = [cols.join(",")].concat(PA.map(x => cols.map(c => q(x[c])).join(","))).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
  a.download = "seb-saathi-payments-" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

if (document.getElementById("paList")) {
  $("paPend").addEventListener("click", () => { paShow = "pending"; renderPayAdmin(); });
  $("paAll").addEventListener("click", () => { paShow = "all"; renderPayAdmin(); });
  $("paRefresh").addEventListener("click", loadPayAdmin);
  $("paCsv").addEventListener("click", paCsv);
  $("paList").addEventListener("change", async e => {
    const sel = e.target.closest("select[data-pa]"); if (!sel || !PA) return;
    const row = PA.find(x => x.id === sel.dataset.pa); if (!row) return;
    const to = sel.value;
    const ask = to === "approved" ? tr("pa_ask_ok") : to === "rejected" ? tr("pa_ask_no") : tr("pa_ask_back");
    if (!confirm(ask.replace("{a}", paRup(row.amount)).replace("{u}", row.utr).replace("{e}", row.email || "–"))) { sel.value = row.status; return; }
    sel.disabled = true;
    let err = null;
    try { const r = await sb.from("payments").update({ status: to }).eq("id", row.id).select().single(); if (r.error) err = r.error; else Object.assign(row, r.data); } catch (x) { err = x; }
    sel.disabled = false;
    if (err) { sel.value = row.status; set("paErr", tr("pa_err").replace("{m}", String(err.message || err))); return; }
    set("paErr", ""); loadPayAdmin();
  });
}


/* ---------- overview: feedback and Saathi chat counts ---------- */
Object.assign(T.en, {
  adm_t_ov:"Overview", ov_h:"Overview", ov_at:"Updated {t}",
  ov_fb_h:"Feedback received", ov_fb_total:"Total", ov_fb_new:"New (not done)", ov_fb_7:"Last 7 days", ov_fb_today:"Today",
  ov_ch_h:"Saathi questions received", ov_ch_today:"Today", ov_ch_7:"Last 7 days", ov_ch_30:"Last 30 days", ov_ch_total:"Total",
  ov_ch_users:"Growers asking (30 days)", ov_q_h:"Latest questions", ov_q_none:"No questions yet.",
  ov_c_what:"", ov_r_fb:"Feedback received", ov_r_fbnew:"Feedback not done yet", ov_r_ch:"Saathi questions", ov_r_users:"Growers asking Saathi", ov_c_when:"When", ov_c_lang:"Language", ov_c_q:"Question", ov_t_received:"Received", ov_t_notdone:"Not done yet", ov_t_questions:"Questions", ov_t_growers:"Growers asking", ov_c_today:"Today", ov_c_7:"7 days", ov_c_30:"30 days", ov_c_total:"Total",
  ov_err_fb:"Feedback table not set up yet (supabase/feedback.sql).", ov_err_ch:"Saathi chat table not set up yet (supabase/chat.sql).", ov_err:"Could not load: {m}"
});
Object.assign(T.hi, {
  adm_t_ov:"सारांश", ov_h:"सारांश", ov_at:"अपडेट {t}",
  ov_fb_h:"मिले सुझाव", ov_fb_total:"कुल", ov_fb_new:"नए (बाकी)", ov_fb_7:"पिछले 7 दिन", ov_fb_today:"आज",
  ov_ch_h:"साथी से पूछे गए सवाल", ov_ch_today:"आज", ov_ch_7:"पिछले 7 दिन", ov_ch_30:"पिछले 30 दिन", ov_ch_total:"कुल",
  ov_ch_users:"सवाल पूछने वाले बाग़वान (30 दिन)", ov_q_h:"ताज़ा सवाल", ov_q_none:"अभी कोई सवाल नहीं।",
  ov_c_what:"", ov_r_fb:"मिले सुझाव", ov_r_fbnew:"बाकी सुझाव", ov_r_ch:"साथी से सवाल", ov_r_users:"सवाल पूछने वाले बाग़वान", ov_c_when:"समय", ov_c_lang:"भाषा", ov_c_q:"सवाल", ov_t_received:"मिले", ov_t_notdone:"बाकी", ov_t_questions:"सवाल", ov_t_growers:"पूछने वाले बाग़वान", ov_c_today:"आज", ov_c_7:"7 दिन", ov_c_30:"30 दिन", ov_c_total:"कुल",
  ov_err_fb:"सुझाव टेबल अभी नहीं बनी (supabase/feedback.sql)।", ov_err_ch:"साथी चैट टेबल अभी नहीं बनी (supabase/chat.sql)।", ov_err:"लोड नहीं हो सका: {m}"
});
let OV = null, ovBusy = false;
const ovIstDay = () => { const n = new Date(Date.now() + 5.5 * 3600e3); return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()) - 5.5 * 3600e3).toISOString(); };
const ovAgo = d => new Date(Date.now() - d * 864e5).toISOString();
const ovMissing = e => e && (String(e.code || "") === "42P01" || /does not exist|could not find the table|schema cache/i.test(String(e.message || e)));
async function ovCount(table, f) {
  let q = sb.from(table).select("id", { count: "exact", head: true });
  if (f) q = f(q);
  const r = await q; if (r.error) throw r.error; return r.count || 0;
}
async function loadOverview() {
  if (!isAdmin() || !sb || ovBusy) return;
  ovBusy = true; set("ovErr", ""); $("ovRefresh").disabled = true;
  const o = { at: new Date().toISOString(), fb: null, ch: null, q: [] }, errs = [];
  const today = ovIstDay(), d7 = ovAgo(7), d30 = ovAgo(30);
  try {
    const [t, n, w, d, m] = await Promise.all([ovCount("feedback"), ovCount("feedback", q => q.neq("status", "done")),
      ovCount("feedback", q => q.gte("created_at", d7)), ovCount("feedback", q => q.gte("created_at", today)), ovCount("feedback", q => q.gte("created_at", d30))]);
    o.fb = { t, n, w, d, m };
  } catch (e) { errs.push(ovMissing(e) ? tr("ov_err_fb") : tr("ov_err").replace("{m}", String(e.message || e))); }
  try {
    const u = q => q.eq("role", "user");
    const [d, w, m, t] = await Promise.all([ovCount("chat_messages", q => u(q).gte("created_at", today)), ovCount("chat_messages", q => u(q).gte("created_at", d7)),
      ovCount("chat_messages", q => u(q).gte("created_at", d30)), ovCount("chat_messages", u)]);
    const ids = await sb.from("chat_messages").select("user_id").eq("role", "user").gte("created_at", d30).limit(10000);
    const g = await sb.from("chat_messages").select("created_at,content,lang").eq("role", "user").order("created_at", { ascending: false }).limit(25);
    o.ch = { d, w, m, t, users: ids.error ? null : new Set((ids.data || []).map(x => x.user_id)).size };
    o.q = g.error ? [] : (g.data || []);
  } catch (e) { errs.push(ovMissing(e) ? tr("ov_err_ch") : tr("ov_err").replace("{m}", String(e.message || e))); }
  ovBusy = false; $("ovRefresh").disabled = false;
  OV = o; set("ovErr", errs.join(" ")); renderOverview();
}
function renderOverview() {
  if (!$("ovTab")) return;
  if (!OV) { $("ovTab").innerHTML = $("ovQ").innerHTML = ""; set("ovAt", ""); return; }
  set("ovAt", tr("ov_at").replace("{t}", adWhen(OV.at)));
  const f = OV.fb || {}, c = OV.ch || {};
  const v = x => x == null ? "–" : fmtN(x);
  const row = (k, a, cls) => '<tr' + (cls ? ' class="' + cls + '"' : "") + '><th scope="row">' + tr(k) + "</th>" + a.map(x => '<td class="n">' + v(x) + "</td>").join("") + "</tr>";
  const tbl = (h, rows) => '<h5 class="ovsub">' + tr(h) + '</h5><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col"></th>' +
    ["ov_c_today", "ov_c_7", "ov_c_30", "ov_c_total"].map(k => '<th scope="col" class="n">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  $("ovTab").innerHTML = tbl("ov_fb_h", row("ov_t_received", [f.d, f.w, f.m, f.t]) + row("ov_t_notdone", [null, null, null, f.n], "sub")) +
    tbl("ov_ch_h", row("ov_t_questions", [c.d, c.w, c.m, c.t]) + row("ov_t_growers", [null, null, c.users, null], "sub"));
  const q = OV.q || [];
  $("ovQ").innerHTML = !q.length ? '<p class="fine">' + tr("ov_q_none") + "</p>" :
    '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("ov_c_when") + '</th><th scope="col">' + tr("ov_c_q") + "</th></tr></thead><tbody>" +
    q.map(x => '<tr><td class="qt">' + adWhen(x.created_at) + (x.lang ? "<br>" + esc(String(x.lang).toUpperCase()) : "") + '</td><td class="qq">' + esc(String(x.content).slice(0, 400)) + "</td></tr>").join("") +
    "</tbody></table></div>";
}
$("ovRefresh").addEventListener("click", loadOverview);

/* ---------- page: tabs, language, sign-in gate ---------- */
const TABS = ["ov", "pay", "users", "fb", "lib"];
let tab = "ov";
try { const h = location.hash.slice(1); if (TABS.indexOf(h) >= 0) tab = h; } catch (e) {}
const loaded = {};
function showTab(t) {
  tab = t;
  TABS.forEach(n => { $("ap-" + n).hidden = n !== t; $("at-" + n).setAttribute("aria-selected", n === t ? "true" : "false"); });
  try { history.replaceState(null, "", "#" + t); } catch (e) {}
  if (!isAdmin() || loaded[t]) return;
  loaded[t] = true;
  if (t === "ov") loadOverview(); else if (t === "pay") loadPayAdmin(); else if (t === "users") loadAdmin(); else if (t === "fb") loadFeedback(); else if (t === "lib") loadLibAdmin();
}
TABS.forEach(n => $("at-" + n).addEventListener("click", () => showTab(n)));
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = tr(el.getAttribute("data-i18n")); });
  set("langBtn", tr("lang_btn"));
  document.title = tr("adm_title");
  renderGate();
  if (AD) renderAdmin(); renderFeedback(); renderPayAdmin(); if (LA) renderLA(); renderOverview();
}
$("langBtn").addEventListener("click", () => { lang = lang === "en" ? "hi" : "en"; try { localStorage.setItem("ad-lang", lang); } catch (e) {} applyLang(); });
$("signOut").addEventListener("click", async () => { try { await sb.auth.signOut(); } catch (e) {} location.replace("/"); });
$("prevX").addEventListener("click", () => { const d = $("prevDlg"); if (d.close) d.close(); else d.removeAttribute("open"); });
let checked = false;
function renderGate() {
  const ok = isAdmin();
  $("gate").hidden = ok; $("adminApp").hidden = !ok; $("signOut").hidden = !user;
  set("whoami", user ? (user.email || "") : "");
  if (ok) return;
  $("gateMsg").textContent = !checked ? tr("adm_loading") : user ? tr("adm_gate_no").replace("{e}", user.email || user.phone || "–") : tr("adm_gate_in");
  $("gateLogin").hidden = !checked || !!user;
}
function applyUser(u) {
  const was = isAdmin(); user = u; checked = true; renderGate();
  if (isAdmin() && !was) { Object.keys(loaded).forEach(k => delete loaded[k]); showTab(tab); }
}
if (sb) {
  sb.auth.onAuthStateChange((ev, session) => setTimeout(() => applyUser(session ? session.user : null), 0));
  sb.auth.getSession().then(r => { const s = r && r.data && r.data.session; applyUser(s ? s.user : null); }).catch(() => applyUser(null));
} else { checked = true; }
applyLang();
TABS.forEach(n => { $("ap-" + n).hidden = n !== tab; $("at-" + n).setAttribute("aria-selected", n === tab ? "true" : "false"); });
