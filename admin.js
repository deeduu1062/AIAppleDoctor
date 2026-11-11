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
"Quick profit calculator",
"Apple register for 2 orchards, keep records up to 2 years",
"Season calendar and spray schedule",
"3 photo disease checks a month",
"5 questions a day to Saathi",
"Daily apple news"
],
"pl_f_basic": [
"Everything in Free",
"Apple register for 5 orchards, keep records up to 5 years",
"15 photo disease checks a month",
"20 questions a day to Saathi",
"Spray reminders on WhatsApp",
"Download your season report"
],
"pl_f_premium": [
"Everything in Saathi",
"Apple register for 10 orchards, keep records up to 10 years",
"Year-on-year profit comparison",
"50 photo disease checks a month",
"30 questions a day to Saathi",
"Spray plan for your height, variety and rootstock",
"Family or munshi access"
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
"झटपट मुनाफ़ा कैलकुलेटर",
"2 बाग़ों का सेब रजिस्टर, 2 साल तक का रिकॉर्ड रखें",
"सीज़न कैलेंडर और स्प्रे शेड्यूल",
"महीने में 3 फ़ोटो से बीमारी जाँच",
"साथी से रोज़ 5 सवाल",
"रोज़ सेब समाचार"
],
"pl_f_basic": [
"मुफ़्त प्लान की सब सुविधाएँ",
"5 बाग़ों का सेब रजिस्टर, 5 साल तक का रिकॉर्ड रखें",
"महीने में 15 फ़ोटो से बीमारी जाँच",
"साथी से रोज़ 20 सवाल",
"WhatsApp पर स्प्रे रिमाइंडर",
"सीज़न रिपोर्ट डाउनलोड"
],
"pl_f_premium": [
"साथी प्लान की सब सुविधाएँ",
"10 बाग़ों का सेब रजिस्टर, 10 साल तक का रिकॉर्ड रखें",
"साल-दर-साल मुनाफ़े की तुलना",
"महीने में 50 फ़ोटो से बीमारी जाँच",
"साथी से रोज़ 30 सवाल",
"आपकी ऊँचाई, किस्म और रूटस्टॉक के हिसाब से स्प्रे प्लान",
"परिवार या मुंशी को एक्सेस"
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
const ADMIN_EMAILS = ["deeduu@gmail.com", "admin@sebsaathi.com"];
const ADMIN_ONLY = ["admin@sebsaathi.com"]; /* these accounts only ever see this page */
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
    rows.map(u => '<tr><th scope="row">' + (u.email ? '<button class="pflink" type="button" data-pfmail="' + esc(u.email) + '">' + esc(u.email) + "</button>" : "–") + (String(u.email || "").toLowerCase() === mine ? ' <span class="tag me">' + tr("ad_me") + "</span>" : "") + "</th>" +
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
  if ($("paSubs")) { set("paSubs", tr("sb_tab").replace("{n}", fmtN(PA ? subsRows().length : 0))); $("paSubs").setAttribute("aria-selected", paShow === "subs" ? "true" : "false"); }
  if (paShow === "subs") { $("paPend").setAttribute("aria-selected", "false"); $("paAll").setAttribute("aria-selected", "false"); set("paPend", tr("pa_pend").replace("{n}", fmtN((PA || []).filter(x => x.status === "pending").length))); set("paAll", tr("pa_all").replace("{n}", fmtN((PA || []).length))); if (PA) renderSubs(); return; }
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
    '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col"' + (k === "pa_c_amt" ? ' class="n"' : "") + ">" + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(x => {
      const sel = '<td class="fbst"><select class="pa-' + esc(x.status) + '" data-pa="' + esc(x.id) + '" aria-label="' + tr("pa_c_status") + '">' +
        ["pending", "approved", "rejected"].map(s => '<option value="' + s + '"' + (x.status === s ? " selected" : "") + ">" + tr("pa_st_" + s) + "</option>").join("") + "</select></td>";
      const expired = x.status === "approved" && x.valid_until && x.valid_until < today;
      return "<tr>" + sel + "<td>" + paDate(x.created_at) + "</td><td>" + esc(x.email || "–") + "</td>" +
        "<td>" + plName(x.plan) + '<br><span class="fine">' + tr(x.period === "year" ? "pay_year" : "pay_month") + "</span></td>" +
        '<td class="n">' + paRup(x.amount) + '</td><td><code>' + (x.source === "referral" ? "Invite reward" : esc(x.utr)) + "</code></td>" +
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
  if ($("paSubs")) $("paSubs").addEventListener("click", () => { paShow = "subs"; renderPayAdmin(); });
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
  ov_c_what:"", ov_r_fb:"Feedback received", ov_r_fbnew:"Feedback not done yet", ov_r_ch:"Saathi questions", ov_r_users:"Growers asking Saathi", ov_c_when:"When", ov_c_lang:"Language", ov_c_q:"Question", ov_sv_h:"Site visits", ov_sv_hits:"Visits (page opens)", ov_sv_uniq:"Different visitors", ov_sv_in:"Visits by logged-in growers", ov_sv_note:"Your own admin visits are not counted. A visitor is one phone or computer.", ov_sv_refs:"Where visitors came from (30 days)", ov_sv_dev:"Phone or computer (30 days)", ov_sv_days:"Last 14 days", ov_sv_day:"Day", ov_sv_n:"Visits", ov_sv_u:"Visitors", ov_sv_direct:"Direct / app / WhatsApp", ov_d_mobile:"Phone", ov_d_desktop:"Computer", ov_d_tablet:"Tablet", ov_sv_src:"Source", ov_sv_devc:"Device", ov_err_sv:"Visit counting not set up yet (supabase/visits.sql).", ov_pa_h:"Payments", ov_t_money:"Money received", ov_t_paid:"Payments approved", ov_t_wait:"Waiting for check", ov_t_active:"Active paid plans", ov_err_pa:"Payments table not set up yet (supabase/payments.sql).", ov_t_received:"Received", ov_t_notdone:"Not done yet", ov_t_questions:"Questions", ov_t_growers:"Growers asking", ov_c_today:"Today", ov_c_7:"7 days", ov_c_30:"30 days", ov_c_total:"Total",
  rv_h:"Saathi answers to check", rv_p:"Answers growers marked 👎. Fix the Library guide that covers it (Saathi reads the Library before every answer), then mark it checked.",
  rv_up:"👍 Helpful (30 days): {n}", rv_down:"👎 Not helpful (30 days): {n}", rv_none:"Nothing to check. No 👎 answers waiting.", rv_q:"Question", rv_note:"Grower's note", rv_done:"Mark as checked", rv_setup:"Ratings not set up yet: run supabase/chat_feedback.sql in Supabase.",
  ov_err_fb:"Feedback table not set up yet (supabase/feedback.sql).", ov_err_ch:"Saathi chat table not set up yet (supabase/chat.sql).", ov_err:"Could not load: {m}"
});
Object.assign(T.hi, {
  adm_t_ov:"सारांश", ov_h:"सारांश", ov_at:"अपडेट {t}",
  ov_fb_h:"मिले सुझाव", ov_fb_total:"कुल", ov_fb_new:"नए (बाकी)", ov_fb_7:"पिछले 7 दिन", ov_fb_today:"आज",
  ov_ch_h:"साथी से पूछे गए सवाल", ov_ch_today:"आज", ov_ch_7:"पिछले 7 दिन", ov_ch_30:"पिछले 30 दिन", ov_ch_total:"कुल",
  ov_ch_users:"सवाल पूछने वाले बाग़वान (30 दिन)", ov_q_h:"ताज़ा सवाल", ov_q_none:"अभी कोई सवाल नहीं।",
  ov_c_what:"", ov_r_fb:"मिले सुझाव", ov_r_fbnew:"बाकी सुझाव", ov_r_ch:"साथी से सवाल", ov_r_users:"सवाल पूछने वाले बाग़वान", ov_c_when:"समय", ov_c_lang:"भाषा", ov_c_q:"सवाल", ov_sv_h:"साइट विज़िट", ov_sv_hits:"विज़िट (पेज खुले)", ov_sv_uniq:"अलग-अलग विज़िटर", ov_sv_in:"लॉग-इन बाग़वानों की विज़िट", ov_sv_note:"आपकी अपनी एडमिन विज़िट नहीं गिनी जातीं। एक विज़िटर = एक फ़ोन या कंप्यूटर।", ov_sv_refs:"विज़िटर कहाँ से आए (30 दिन)", ov_sv_dev:"फ़ोन या कंप्यूटर (30 दिन)", ov_sv_days:"पिछले 14 दिन", ov_sv_day:"दिन", ov_sv_n:"विज़िट", ov_sv_u:"विज़िटर", ov_sv_direct:"सीधे / ऐप / WhatsApp", ov_d_mobile:"फ़ोन", ov_d_desktop:"कंप्यूटर", ov_d_tablet:"टैबलेट", ov_sv_src:"स्रोत", ov_sv_devc:"डिवाइस", ov_err_sv:"विज़िट गिनती अभी सेट नहीं (supabase/visits.sql)।", ov_pa_h:"भुगतान", ov_t_money:"प्राप्त रकम", ov_t_paid:"मंज़ूर भुगतान", ov_t_wait:"जाँच बाकी", ov_t_active:"चालू पेड प्लान", ov_err_pa:"भुगतान टेबल अभी नहीं बनी (supabase/payments.sql)।", ov_t_received:"मिले", ov_t_notdone:"बाकी", ov_t_questions:"सवाल", ov_t_growers:"पूछने वाले बाग़वान", ov_c_today:"आज", ov_c_7:"7 दिन", ov_c_30:"30 दिन", ov_c_total:"कुल",
  rv_h:"जाँचने वाले साथी के जवाब", rv_p:"जिन जवाबों पर बाग़वानों ने 👎 दिया। उस विषय की जानकारी भंडार गाइड ठीक करें (साथी हर जवाब से पहले उसे पढ़ता है), फिर जाँचा हुआ मार्क करें।",
  rv_up:"👍 काम आया (30 दिन): {n}", rv_down:"👎 काम नहीं आया (30 दिन): {n}", rv_none:"जाँचने को कुछ नहीं। कोई 👎 जवाब बाक़ी नहीं।", rv_q:"सवाल", rv_note:"बाग़वान की टिप्पणी", rv_done:"जाँचा हुआ मार्क करें", rv_setup:"रेटिंग अभी सेट नहीं है: Supabase में supabase/chat_feedback.sql चलाएँ।",
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
  try {
    const r = await sb.rpc("admin_site_stats");
    if (r.error) throw r.error;
    o.sv = r.data;
  } catch (e) {
    const m = String(e.message || e);
    errs.push(String(e.code || "") === "PGRST202" || /could not find the function|does not exist|schema cache/i.test(m) ? tr("ov_err_sv") : tr("ov_err").replace("{m}", m));
  }
  try {
    const r = await sb.from("payments").select("status,amount,created_at,valid_until").limit(10000);
    if (r.error) throw r.error;
    const P = r.data || [], day = new Date().toISOString().slice(0, 10);
    const per = (rows, since) => rows.filter(x => !since || x.created_at >= since);
    const ok = P.filter(x => x.status === "approved"), wait = P.filter(x => x.status === "pending");
    const sum = a => a.reduce((s, x) => s + (+x.amount || 0), 0);
    const four = f => [f(today), f(d7), f(d30), f(null)];
    o.pa = { money: four(s => sum(per(ok, s))), paid: four(s => per(ok, s).length), wait: four(s => per(wait, s).length),
      active: ok.filter(x => !x.valid_until || x.valid_until >= day).length };
  } catch (e) { errs.push(ovMissing(e) ? tr("ov_err_pa") : tr("ov_err").replace("{m}", String(e.message || e))); }
  try {
    const [up, down, bad] = await Promise.all([ovCount("chat_messages", q => q.eq("feedback", 1).gte("created_at", d30)), ovCount("chat_messages", q => q.eq("feedback", -1).gte("created_at", d30)),
      sb.from("chat_messages").select("id,user_id,created_at,content,lang,feedback_note").eq("role", "assistant").eq("feedback", -1).eq("reviewed", false).order("created_at", { ascending: false }).limit(30)]);
    if (bad.error) throw bad.error;
    const rows = bad.data || [], qs = {};
    if (rows.length) {
      const r = await sb.from("chat_messages").select("user_id,created_at,content").eq("role", "user").in("created_at", rows.map(x => x.created_at)).limit(200);
      (r.data || []).forEach(x => { qs[x.user_id + "|" + x.created_at] = x.content; });
    }
    o.rv = { up, down, rows: rows.map(x => Object.assign(x, { question: qs[x.user_id + "|" + x.created_at] || "" })) };
  } catch (e) { o.rv = { err: true }; }
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
  const pa = OV.pa || {}, money = a => '<tr><th scope="row">' + tr("ov_t_money") + "</th>" + (a || [null, null, null, null]).map(x => '<td class="n">' + (x == null ? "–" : rupees(x)) + "</td>").join("") + "</tr>";
  const sv = OV.sv || {}, q4 = x => x ? [x.today, x.d7, x.d30, x.total] : [null, null, null, null];
  const two = (h, c1, c2, rows) => '<h5 class="ovsub">' + tr(h) + '</h5><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr(c1) + '</th><th scope="col" class="n">' + tr(c2) + "</th></tr></thead><tbody>" +
    (rows.length ? rows.join("") : '<tr><td colspan="2">–</td></tr>') + "</tbody></table></div>";
  const svHtml = tbl("ov_sv_h", row("ov_sv_hits", q4(sv.visits)) + row("ov_sv_uniq", q4(sv.visitors)) + row("ov_sv_in", q4(sv.signed), "sub")) +
    '<p class="fine">' + tr("ov_sv_note") + "</p>" +
    (OV.sv ? two("ov_sv_refs", "ov_sv_src", "ov_sv_n", (sv.refs || []).map(r => '<tr><th scope="row">' + esc(r.name === "direct" ? tr("ov_sv_direct") : r.name) + '</th><td class="n">' + fmtN(+r.n) + "</td></tr>")) +
      two("ov_sv_dev", "ov_sv_devc", "ov_sv_n", (sv.devices || []).map(r => '<tr><th scope="row">' + tr("ov_d_" + r.name) + '</th><td class="n">' + fmtN(+r.n) + "</td></tr>")) +
      '<h5 class="ovsub">' + tr("ov_sv_days") + '</h5><div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("ov_sv_day") + '</th><th scope="col" class="n">' + tr("ov_sv_n") + '</th><th scope="col" class="n">' + tr("ov_sv_u") + "</th></tr></thead><tbody>" +
      ((sv.days || []).length ? sv.days.map(d => '<tr><th scope="row">' + esc(new Date(d.day + "T00:00:00").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short" })) + '</th><td class="n">' + fmtN(+d.n) + '</td><td class="n">' + fmtN(+d.u) + "</td></tr>").join("") : '<tr><td colspan="3">–</td></tr>') +
      "</tbody></table></div>" : "");
  $("ovTab").innerHTML = svHtml + tbl("ov_pa_h", money(pa.money) + row("ov_t_paid", pa.paid || [null, null, null, null]) + row("ov_t_wait", pa.wait || [null, null, null, null], "sub") + row("ov_t_active", [null, null, null, pa.active], "sub")) + tbl("ov_fb_h", row("ov_t_received", [f.d, f.w, f.m, f.t]) + row("ov_t_notdone", [null, null, null, f.n], "sub")) +
    tbl("ov_ch_h", row("ov_t_questions", [c.d, c.w, c.m, c.t]) + row("ov_t_growers", [null, null, c.users, null], "sub"));
  const q = OV.q || [];
  $("ovQ").innerHTML = !q.length ? '<p class="fine">' + tr("ov_q_none") + "</p>" :
    '<div class="tablewrap"><table class="ledger"><thead><tr><th scope="col">' + tr("ov_c_when") + '</th><th scope="col">' + tr("ov_c_q") + "</th></tr></thead><tbody>" +
    q.map(x => '<tr><td class="qt">' + adWhen(x.created_at) + (x.lang ? "<br>" + esc(String(x.lang).toUpperCase()) : "") + '</td><td class="qq">' + esc(String(x.content).slice(0, 400)) + "</td></tr>").join("") +
    "</tbody></table></div>";
  renderReview();
}
$("ovRefresh").addEventListener("click", loadOverview);
function renderReview() {
  const el = $("ovRv"); if (!el) return;
  const rv = OV && OV.rv; if (!rv) { el.innerHTML = ""; return; }
  if (rv.err) { el.innerHTML = '<p class="fine">' + esc(tr("rv_setup")) + "</p>"; return; }
  el.innerHTML = '<p class="rvsum"><span>' + esc(tr("rv_up").replace("{n}", fmtN(rv.up))) + "</span><span>" + esc(tr("rv_down").replace("{n}", fmtN(rv.down))) + "</span></p>" +
    (!rv.rows.length ? '<p class="fine">' + esc(tr("rv_none")) + "</p>" :
    '<div class="rvlist">' + rv.rows.map(x => '<article class="rv"><span class="meta">' + adWhen(x.created_at) + (x.lang ? " · " + esc(String(x.lang).toUpperCase()) : "") + "</span>" +
      (x.question ? '<div class="q">' + esc(tr("rv_q")) + ": " + esc(String(x.question).slice(0, 600)) + "</div>" : "") +
      '<div class="a">' + esc(String(x.content).slice(0, 3000)) + "</div>" +
      (x.feedback_note ? '<div class="note"><b>' + esc(tr("rv_note")) + ":</b> " + esc(x.feedback_note) + "</div>" : "") +
      '<button class="btn-s" type="button" data-rvdone="' + esc(x.id) + '">' + esc(tr("rv_done")) + "</button></article>").join("") + "</div>");
}
$("ovRv").addEventListener("click", async e => {
  const b = e.target.closest("[data-rvdone]"); if (!b || !sb) return;
  b.disabled = true;
  const r = await sb.from("chat_messages").update({ reviewed: true }).eq("id", b.dataset.rvdone);
  if (r.error) { b.disabled = false; set("ovErr", tr("ov_err").replace("{m}", r.error.message || "")); return; }
  if (OV && OV.rv && OV.rv.rows) OV.rv.rows = OV.rv.rows.filter(x => x.id !== b.dataset.rvdone);
  renderReview();
});


/* ---------- Subscriptions (Payments tab): one row per grower, from approved payments ---------- */
let sbFilt = "all";
function subsRows() {
  const today = new Date().toISOString().slice(0, 10), byU = {};
  (PA || []).forEach(x => { const k = x.user_id || x.email || x.id; (byU[k] = byU[k] || []).push(x); });
  return Object.keys(byU).map(k => {
    const L = byU[k], ok = L.filter(x => x.status === "approved").sort((a, b) => String(b.valid_until || "").localeCompare(String(a.valid_until || "")));
    const pend = L.filter(x => x.status === "pending"), cur = ok[0] || null;
    const left = cur && cur.valid_until ? Math.ceil((new Date(cur.valid_until + "T00:00:00") - new Date(today + "T00:00:00")) / 864e5) : null;
    const st = !cur ? (pend.length ? "pending" : "none") : left == null || left >= 0 ? (left != null && left <= 30 ? "soon" : "active") : "expired";
    const first = ok.length ? ok.map(x => x.reviewed_at || x.created_at).sort()[0] : null;
    return { key: k, email: (cur || L[0]).email || "–", cur, left, st, first, paid: ok.reduce((s, x) => s + (+x.amount || 0), 0), n: ok.length, pend: pend.length };
  }).filter(r => r.st !== "none").sort((a, b) => ({ soon: 0, pending: 1, active: 2, expired: 3 }[a.st] - { soon: 0, pending: 1, active: 2, expired: 3 }[b.st]) || (a.left || 0) - (b.left || 0));
}
const perMonth = x => x ? (+x.amount || 0) / (x.period === "year" ? 12 : 1) : 0;
function renderSubs() {
  const R = subsRows(), live = R.filter(r => r.st === "active" || r.st === "soon");
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + tr(k) + "</span><b>" + v + "</b></div>";
  $("paStats").innerHTML = st("sb_s_basic", fmtN(live.filter(r => r.cur.plan === "basic").length), "main") + st("sb_s_prem", fmtN(live.filter(r => r.cur.plan === "premium").length)) +
    st("sb_s_soon", fmtN(R.filter(r => r.st === "soon").length), R.some(r => r.st === "soon") ? "neg" : "") + st("sb_s_exp", fmtN(R.filter(r => r.st === "expired").length)) +
    st("sb_s_mrr", paRup(Math.round(live.reduce((s, r) => s + perMonth(r.cur), 0))), "pos");
  const rows = sbFilt === "all" ? R : R.filter(r => r.st === sbFilt || (sbFilt === "active" && r.st === "soon"));
  const chip = r => '<span class="sbchip sb-' + r.st + '">' + tr("sb_st_" + r.st) + "</span>";
  const head = ["sb_c_st", "pa_c_from", "pa_c_plan", "sb_c_start", "pa_c_until", "sb_c_left", "sb_c_paid", "sb_c_ext"];
  $("paList").innerHTML = '<div class="sbfilt">' + ["all", "active", "soon", "expired", "pending"].map(f => '<button class="btn-s" type="button" data-sbf="' + f + '" aria-pressed="' + (sbFilt === f) + '">' + tr("sb_f_" + f) + "</button>").join("") + "</div>" +
    (!rows.length ? '<p class="empty">' + tr("pa_none") + "</p>" :
    '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col"' + (k === "sb_c_left" || k === "sb_c_paid" ? ' class="n"' : "") + ">" + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(r => {
      const c = r.cur;
      return "<tr><td>" + chip(r) + (r.pend ? '<br><span class="fine">' + tr("sb_pend_n").replace("{n}", r.pend) + "</span>" : "") + "</td><td>" + esc(r.email) + "</td>" +
        "<td>" + (c ? plName(c.plan) + '<br><span class="fine">' + tr(c.period === "year" ? "pay_year" : "pay_month") + "</span>" : "–") + "</td>" +
        "<td>" + (r.first ? paDay(String(r.first).slice(0, 10)) : "–") + "</td><td>" + (c && c.valid_until ? paDay(c.valid_until) : "–") + "</td>" +
        '<td class="n">' + (r.left == null ? "–" : r.left < 0 ? tr("sb_ago").replace("{n}", fmtN(-r.left)) : tr("sb_days").replace("{n}", fmtN(r.left))) + "</td>" +
        '<td class="n">' + paRup(r.paid) + (r.n > 1 ? '<br><span class="fine">' + tr("sb_npay").replace("{n}", r.n) + "</span>" : "") + "</td>" +
        "<td>" + (c ? '<input type="date" value="' + esc(c.valid_until || "") + '" data-sbext="' + esc(c.id) + '" aria-label="' + esc(tr("sb_c_ext")) + '">' : "–") + "</td></tr>";
    }).join("") + "</tbody></table></div>");
  $("paLog").innerHTML = '<p class="fine">' + tr("sb_note") + "</p>";
}
document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-sbf]"); if (!b) return; sbFilt = b.dataset.sbf; renderSubs(); });
document.addEventListener("change", async e => {
  const i = e.target; if (!i || !i.dataset || !i.dataset.sbext || !sb) return;
  const v = i.value; if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return;
  i.disabled = true; set("paErr", "");
  const r = await sb.from("payments").update({ valid_until: v }).eq("id", i.dataset.sbext).select().single();
  if (r.error) { i.disabled = false; set("paErr", tr("pa_err").replace("{m}", r.error.message || "")); return; }
  const x = (PA || []).find(q => q.id === i.dataset.sbext); if (x) x.valid_until = v;
  renderSubs();
});

/* ---------- Costs tab: running costs list (admin_costs table) + AI usage estimate for this month ---------- */
/* worst-case AI cost per use, in rupees (Sonnet photo check: 3 photos + longest answer; Haiku question: full guides + longest answer), at about ₹85 to the dollar */
const AI_PHOTO_INR = 1.9, AI_Q_INR = 0.35;
let CO = null, coBusy = false, coEdit = null, coAi = null, coPay = null, coLive = null, coDb = null;
const USD_INR = 85;   /* rough rupees per dollar for showing AI spend */
const coMonthly = x => x.amount_inr == null ? 0 : x.per === "year" ? x.amount_inr / 12 : x.per === "once" ? 0 : x.amount_inr;
async function loadCosts() {
  if (!isAdmin() || !sb || coBusy) return;
  coBusy = true; set("coErr", ""); $("coRefresh").disabled = true;
  const ms = (() => { const d = new Date(Date.now() + 330 * 60000); return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1) - 330 * 60000).toISOString(); })();
  try {
    const r = await sb.from("admin_costs").select("*").order("sort", { ascending: true }).order("service", { ascending: true });
    if (r.error) throw r.error;
    CO = r.data || [];
  } catch (x) { CO = null; const m = String(x.message || x); set("coErr", String(x.code || "") === "42P01" || /does not exist|could not find the table|schema cache/i.test(m) ? tr("co_err_setup") : tr("pa_err").replace("{m}", m)); }
  coAi = { photos: null, qs: null };
  try { coAi.photos = await ovCount("diagnoses", q => q.gte("created_at", ms)); } catch (x) {}
  try { coAi.qs = await ovCount("chat_messages", q => q.eq("role", "user").gte("created_at", ms)); } catch (x) {}
  try { const r = await sb.from("payments").select("plan,period,amount,status,valid_until,created_at,user_id,email").limit(10000); coPay = r.error ? null : (r.data || []); } catch (x) { coPay = null; }
  coLive = null; coDb = null;
  try {
    const s = await sb.auth.getSession(), tok = s && s.data && s.data.session ? s.data.session.access_token : "";
    const r = await fetch("/api/admin-usage", { headers: { Authorization: "Bearer " + tok } });
    coLive = r.ok ? await r.json() : { error: "HTTP " + r.status };
  } catch (x) { coLive = { error: String(x.message || x) }; }
  try { const r = await sb.rpc("admin_usage"); coDb = r.error ? { error: r.error } : r.data; } catch (x) { coDb = { error: x }; }
  coBusy = false; $("coRefresh").disabled = false;
  renderCosts();
}
function renderLive() {
  const el = $("coLive"); if (!el) return;
  const A = coLive && coLive.ai, usd = n => "$" + (+n || 0).toFixed(2), inr = n => paRup(Math.round((+n || 0) * USD_INR));
  let ai = '<div class="cobox"><h5>' + tr("li_ai_h") + (A && A.setup && !A.error ? '<span class="live">' + tr("li_live") + "</span>" : "") + "</h5>";
  if (!coLive) ai += '<p class="fine">' + tr("li_loading") + "</p>";
  else if (coLive.error) ai += '<p class="fine">' + esc(tr("li_ai_err").replace("{m}", coLive.error)) + "</p>";
  else if (!A || !A.setup) ai += "<p>" + tr("li_ai_setup") + "</p>";
  else if (A.error) ai += '<p class="autherr">' + esc(tr("li_ai_err").replace("{m}", A.error)) + "</p>";
  else {
    const mods = Object.keys(A.by_model || {}).filter(k => A.by_model[k] > 0).sort((a, b) => A.by_model[b] - A.by_model[a]);
    ai += "<p><b>" + tr("li_month") + ": " + usd(A.month_usd) + " ≈ " + inr(A.month_usd) + "</b> · " + tr("li_today") + ": " + usd(A.today_usd) + " ≈ " + inr(A.today_usd) + "</p>" +
      (mods.length ? '<div class="models">' + mods.map(k => "<span>" + esc(k.replace(/^claude-/, "")) + ": " + usd(A.by_model[k]) + "</span>").join("") + "</div>" : "") +
      '<p class="fine">' + tr("li_ai_note").replace("{r}", USD_INR) + "</p>";
  }
  ai += "</div>";
  const D = coDb;
  let db = '<div class="cobox"><h5>' + tr("li_db_h") + (D && !D.error ? '<span class="live">' + tr("li_live") + "</span>" : "") + "</h5>";
  if (!D) db += '<p class="fine">' + tr("li_loading") + "</p>";
  else if (D.error) db += "<p>" + tr("li_db_setup") + "</p>";
  else {
    const mb = b => (b / 1048576 < 10 ? (b / 1048576).toFixed(1) : Math.round(b / 1048576)) + " MB";
    const bar = (lab, used, max, txt) => { const p = Math.min(100, used / max * 100); return '<div class="ubar"><span>' + lab + '</span><span class="tr"><i class="' + (p >= 90 ? "bad" : p >= 70 ? "warn" : "") + '" style="width:' + Math.max(1, p).toFixed(1) + '%"></i></span><b>' + txt + "</b></div>"; };
    db += bar(tr("li_db_size"), +D.db_bytes || 0, 500 * 1048576, mb(+D.db_bytes || 0) + " / 500 MB") +
      bar(tr("li_users"), +D.users || 0, 50000, fmtN(+D.users || 0) + " / 50,000") +
      bar(tr("li_files"), +D.storage_bytes || 0, 1024 * 1048576, mb(+D.storage_bytes || 0) + " / 1 GB") +
      '<p class="fine">' + tr("li_db_note").replace("{n}", fmtN(+D.users_30d || 0)) + "</p>";
  }
  el.innerHTML = ai + db;
}
function renderCosts() {
  if (!$("coList")) return;
  const today = new Date().toISOString().slice(0, 10), ym = today.slice(0, 7);
  const fixed = (CO || []).reduce((s, x) => s + coMonthly(x), 0);
  const aiEst = coAi ? (coAi.photos || 0) * AI_PHOTO_INR + (coAi.qs || 0) * AI_Q_INR : 0;
  const L = coLive && coLive.ai && coLive.ai.setup && !coLive.ai.error && coLive.ai.month_usd != null ? coLive.ai : null;
  const ai = L ? L.month_usd * USD_INR : aiEst;
  const P = coPay || [], ok = P.filter(x => x.status === "approved");
  const live = {}; ok.filter(x => !x.valid_until || x.valid_until >= today).forEach(x => { const k = x.user_id || x.email; if (!live[k] || String(x.valid_until) > String(live[k].valid_until)) live[k] = x; });
  const income = Object.keys(live).reduce((s, k) => s + perMonth(live[k]), 0);
  const cash = ok.filter(x => String(x.created_at).slice(0, 7) === ym).reduce((s, x) => s + (+x.amount || 0), 0);
  const net = income - fixed - ai;
  const st = (k, v, cls) => "<div" + (cls ? ' class="' + cls + '"' : "") + "><span>" + tr(k) + "</span><b>" + v + "</b></div>";
  $("coStats").innerHTML = st("co_s_fixed", paRup(Math.round(fixed)), "main") + (L ? st("co_s_ai_real", paRup(Math.round(ai))) : st("co_s_ai", "≤ " + paRup(Math.round(ai)))) +
    st("co_s_income", paRup(Math.round(income)), "pos") + st("co_s_net", (net < 0 ? "−" : "") + paRup(Math.abs(Math.round(net))), net < 0 ? "neg" : "pos") + st("co_s_cash", paRup(cash));
  const avg = Object.keys(live).length ? income / Object.keys(live).length : 299 / 12;
  renderLive();
  $("coAi").innerHTML = '<div class="cobox"><h5>' + tr("co_ai_h") + "</h5>" +
    "<p>" + tr("co_ai_photo").replace("{n}", coAi && coAi.photos != null ? fmtN(coAi.photos) : "–").replace("{x}", paRup(AI_PHOTO_INR)).replace("{t}", paRup(Math.round((coAi && coAi.photos || 0) * AI_PHOTO_INR))) + "</p>" +
    "<p>" + tr("co_ai_q").replace("{n}", coAi && coAi.qs != null ? fmtN(coAi.qs) : "–").replace("{x}", paRup(AI_Q_INR)).replace("{t}", paRup(Math.round((coAi && coAi.qs || 0) * AI_Q_INR))) + "</p>" +
    '<p class="fine">' + tr("co_ai_note") + "</p>" +
    "<p><b>" + tr("co_be").replace("{n}", fmtN(Math.ceil((fixed + ai) / (avg || 1)))) + "</b></p></div>";
  if (!CO) { $("coList").innerHTML = ""; return; }
  const form = x => '<form class="coform" data-coform="' + esc(x.id || "") + '">' +
    '<div class="field"><label>' + tr("co_c_service") + '</label><input name="service" maxlength="80" required value="' + esc(x.service || "") + '"></div>' +
    '<div class="field"><label>' + tr("co_c_for") + '</label><input name="what_for" maxlength="120" value="' + esc(x.what_for || "") + '"></div>' +
    '<div class="field"><label>' + tr("co_c_plan") + '</label><input name="plan" maxlength="80" value="' + esc(x.plan || "") + '"></div>' +
    '<div class="field"><label>' + tr("co_c_amt") + '</label><input name="amount_inr" type="number" min="0" step="1" inputmode="numeric" value="' + esc(x.amount_inr == null ? "" : x.amount_inr) + '"></div>' +
    '<div class="field"><label>' + tr("co_c_per") + '</label><select name="per">' + ["month", "year", "once"].map(p => '<option value="' + p + '"' + ((x.per || "month") === p ? " selected" : "") + ">" + tr("co_per_" + p) + "</option>").join("") + "</select></div>" +
    '<div class="field"><label>' + tr("co_c_renew") + '</label><input name="renews_on" type="date" value="' + esc(x.renews_on || "") + '"></div>' +
    '<div class="field wide"><label>' + tr("co_c_note") + '</label><textarea name="note" rows="2" maxlength="500">' + esc(x.note || "") + "</textarea></div>" +
    '<div class="dels wide"><button class="btn-s add" type="submit">' + tr("co_save") + '</button><button class="btn-s" type="button" data-coact="cancel">' + tr("co_cancel") + "</button>" +
    (x.id ? '<button class="btn-s danger" type="button" data-coact="del" data-id="' + esc(x.id) + '">' + tr("co_del") + "</button>" : "") + "</div></form>";
  const soon = d => d && d >= today && (new Date(d) - new Date(today)) / 864e5 <= 30;
  $("coList").innerHTML = (coEdit === "new" ? form({}) : "") + '<div class="tablewrap"><table class="ledger"><thead><tr>' +
    ["co_c_service", "co_c_plan", "co_c_amt", "co_c_month", "co_c_renew", "co_c_note", ""].map(k => '<th scope="col"' + (k === "co_c_amt" || k === "co_c_month" ? ' class="n"' : "") + ">" + (k ? tr(k) : "") + "</th>").join("") + "</tr></thead><tbody>" +
    CO.map(x => coEdit === x.id ? '<tr><td colspan="7">' + form(x) + "</td></tr>" :
      "<tr><td><b>" + esc(x.service) + "</b>" + (x.what_for ? '<br><span class="fine">' + esc(x.what_for) + "</span>" : "") + "</td><td>" + esc(x.plan || "–") + "</td>" +
      '<td class="n">' + (x.amount_inr == null ? "–" : paRup(x.amount_inr) + '<br><span class="fine">' + tr("co_per_" + x.per) + "</span>") + "</td>" +
      '<td class="n">' + paRup(Math.round(coMonthly(x))) + "</td>" +
      "<td>" + (x.renews_on ? paDay(x.renews_on) + (soon(x.renews_on) ? ' <span class="sbchip sb-soon">' + tr("co_soon") + "</span>" : "") : "–") + "</td>" +
      '<td class="wrapn">' + esc(x.note || "") + "</td>" +
      '<td><button class="btn-s" type="button" data-coact="edit" data-id="' + esc(x.id) + '">' + tr("co_edit") + "</button></td></tr>").join("") +
    "</tbody></table></div>";
}
document.addEventListener("click", async e => {
  const b = e.target.closest && e.target.closest("[data-coact]"); if (!b) return;
  const a = b.dataset.coact;
  if (a === "edit") { coEdit = b.dataset.id; renderCosts(); return; }
  if (a === "cancel") { coEdit = null; renderCosts(); return; }
  if (a === "del") {
    if (!b.dataset.armed) { b.dataset.armed = "1"; b.textContent = tr("co_del_sure"); return; }
    const r = await sb.from("admin_costs").delete().eq("id", b.dataset.id);
    if (r.error) { set("coErr", tr("pa_err").replace("{m}", r.error.message || "")); return; }
    CO = CO.filter(x => x.id !== b.dataset.id); coEdit = null; renderCosts();
  }
});
document.addEventListener("submit", async e => {
  const f = e.target.closest && e.target.closest("[data-coform]"); if (!f) return;
  e.preventDefault();
  const g = n => f.elements[n].value.trim();
  const row = { service: g("service"), what_for: g("what_for") || null, plan: g("plan") || null, amount_inr: g("amount_inr") === "" ? null : Math.round(+g("amount_inr")),
    per: g("per"), renews_on: g("renews_on") || null, note: g("note") || null, updated_at: new Date().toISOString() };
  if (!row.service) return;
  const id = f.dataset.coform;
  const r = id ? await sb.from("admin_costs").update(row).eq("id", id).select().single()
    : await sb.from("admin_costs").insert(Object.assign({ sort: (CO || []).length + 1 }, row)).select().single();
  if (r.error) { set("coErr", tr("pa_err").replace("{m}", r.error.message || "")); return; }
  if (id) CO = CO.map(x => x.id === id ? r.data : x); else CO.push(r.data);
  coEdit = null; set("coErr", ""); renderCosts();
});
if ($("coRefresh")) {
  $("coRefresh").addEventListener("click", loadCosts);
  $("coAdd").addEventListener("click", () => { coEdit = "new"; renderCosts(); const i = document.querySelector('[data-coform=""] input'); if (i) i.focus(); });
}
Object.assign(T.en, { co_s_ai_real: "AI this month (actual)", li_live: "LIVE", li_loading: "Loading…",
  li_ai_h: "AI spend (Anthropic)", li_month: "This month", li_today: "Today",
  li_ai_setup: "Not connected yet. Make an Admin key in console.anthropic.com → Settings → Admin keys, then add it in Vercel → Settings → Environment Variables as ANTHROPIC_ADMIN_KEY and redeploy. Until then the estimate below is used.",
  li_ai_err: "Could not read AI spend: {m}", li_ai_note: "From Anthropic's cost report (daily figures, can lag a few hours). Rupees at about ₹{r} to the dollar.",
  li_db_h: "Supabase usage (Free plan limits)", li_db_size: "Database size", li_users: "Growers signed up", li_files: "Photos and files",
  li_db_setup: "Not set up yet. In Supabase → SQL Editor, run supabase/admin_usage.sql once, then press Refresh.",
  li_db_note: "{n} growers signed in during the last 30 days. Bars turn orange at 70% and red at 90%: that is the time to move to Supabase Pro." });
Object.assign(T.hi, { co_s_ai_real: "इस महीने AI (असली)", li_live: "LIVE", li_loading: "लोड हो रहा है…",
  li_ai_h: "AI ख़र्च (Anthropic)", li_month: "इस महीने", li_today: "आज",
  li_ai_setup: "अभी जुड़ा नहीं है। console.anthropic.com → Settings → Admin keys में Admin key बनाएँ, फिर Vercel → Settings → Environment Variables में ANTHROPIC_ADMIN_KEY नाम से जोड़ें और redeploy करें। तब तक नीचे का अनुमान दिखेगा।",
  li_ai_err: "AI ख़र्च नहीं पढ़ सके: {m}", li_ai_note: "Anthropic की cost report से (रोज़ के आँकड़े, कुछ घंटे देर से)। रुपये लगभग ₹{r} प्रति डॉलर।",
  li_db_h: "Supabase उपयोग (Free प्लान की सीमा)", li_db_size: "डेटाबेस का आकार", li_users: "जुड़े बाग़वान", li_files: "फ़ोटो और फ़ाइलें",
  li_db_setup: "अभी सेट नहीं है। Supabase → SQL Editor में supabase/admin_usage.sql एक बार चलाएँ, फिर Refresh दबाएँ।",
  li_db_note: "पिछले 30 दिनों में {n} बाग़वानों ने लॉग इन किया। 70% पर पट्टी नारंगी और 90% पर लाल होती है: तब Supabase Pro पर जाएँ।" });
Object.assign(T.en, { adm_t_cost: "Costs", co_h: "Running costs", co_add: "+ Add cost",
  co_p: "Everything Seb Saathi costs to run, and how it compares with what subscriptions bring in. Edit any row when a plan or price changes.",
  co_err_setup: "The costs list is not set up yet. In Supabase → SQL Editor, run supabase/admin_costs.sql once, then press Refresh.",
  co_s_fixed: "Fixed costs a month", co_s_ai: "AI this month (most)", co_s_income: "Subscription income a month", co_s_net: "Left over a month", co_s_cash: "Payments received this month",
  co_ai_h: "AI usage this month", co_ai_photo: "{n} photo checks × up to {x} = up to {t}", co_ai_q: "{n} Saathi questions × up to {x} = up to {t}",
  co_ai_note: "These are upper estimates (longest answers, most photos). The exact AI bill is on console.anthropic.com → Usage.",
  co_be: "You need about {n} paying growers to cover this month's costs.",
  co_c_service: "Service", co_c_for: "What it is for", co_c_plan: "Plan", co_c_amt: "Price (₹)", co_c_per: "Paid", co_c_month: "Per month", co_c_renew: "Renews on", co_c_note: "Notes",
  co_per_month: "a month", co_per_year: "a year", co_per_once: "one time", co_soon: "soon", co_edit: "Edit", co_save: "Save", co_cancel: "Cancel", co_del: "Delete", co_del_sure: "Tap again to delete",
  sb_tab: "Subscriptions ({n})", sb_s_basic: "Active Saathi", sb_s_prem: "Active Saathi Plus", sb_s_soon: "Ending in 30 days", sb_s_exp: "Expired", sb_s_mrr: "Income a month",
  sb_f_all: "All", sb_f_active: "Active", sb_f_soon: "Ending soon", sb_f_expired: "Expired", sb_f_pending: "Waiting for check",
  sb_st_active: "Active", sb_st_soon: "Ending soon", sb_st_expired: "Expired", sb_st_pending: "Waiting",
  sb_c_st: "Status", sb_c_start: "Since", sb_c_left: "Days left", sb_c_paid: "Paid in total", sb_c_ext: "Change end date",
  sb_days: "{n} days", sb_ago: "ended {n} days ago", sb_npay: "{n} payments", sb_pend_n: "{n} payment waiting",
  sb_note: "One row per grower, from their approved payments. Change the end date to extend or shorten a plan; it updates their latest approved payment." });
Object.assign(T.hi, { adm_t_cost: "ख़र्च", co_h: "चलाने का ख़र्च", co_add: "+ ख़र्च जोड़ें",
  co_p: "सेब साथी चलाने का पूरा ख़र्च, और सब्सक्रिप्शन से आने वाली आमदनी से तुलना। कोई प्लान या दाम बदले तो पंक्ति बदलें।",
  co_err_setup: "ख़र्च की सूची अभी सेट नहीं है। Supabase → SQL Editor में supabase/admin_costs.sql एक बार चलाएँ, फिर Refresh दबाएँ।",
  co_s_fixed: "महीने का तय ख़र्च", co_s_ai: "इस महीने AI (ज़्यादा से ज़्यादा)", co_s_income: "महीने की सब्सक्रिप्शन आमदनी", co_s_net: "महीने में बचत", co_s_cash: "इस महीने मिले भुगतान",
  co_ai_h: "इस महीने AI का उपयोग", co_ai_photo: "{n} फ़ोटो जाँच × ज़्यादा से ज़्यादा {x} = {t} तक", co_ai_q: "{n} साथी सवाल × ज़्यादा से ज़्यादा {x} = {t} तक",
  co_ai_note: "ये ऊपरी अनुमान हैं। असली AI बिल console.anthropic.com → Usage पर है।",
  co_be: "इस महीने का ख़र्च निकालने के लिए लगभग {n} भुगतान करने वाले बाग़वान चाहिए।",
  co_c_service: "सेवा", co_c_for: "किस लिए", co_c_plan: "प्लान", co_c_amt: "दाम (₹)", co_c_per: "भुगतान", co_c_month: "प्रति माह", co_c_renew: "नवीनीकरण", co_c_note: "नोट",
  co_per_month: "हर महीने", co_per_year: "हर साल", co_per_once: "एक बार", co_soon: "जल्द", co_edit: "बदलें", co_save: "सहेजें", co_cancel: "रद्द करें", co_del: "हटाएँ", co_del_sure: "हटाने के लिए फिर दबाएँ",
  sb_tab: "सब्सक्रिप्शन ({n})", sb_s_basic: "चालू साथी", sb_s_prem: "चालू साथी प्लस", sb_s_soon: "30 दिन में ख़त्म", sb_s_exp: "ख़त्म", sb_s_mrr: "महीने की आमदनी",
  sb_f_all: "सभी", sb_f_active: "चालू", sb_f_soon: "जल्द ख़त्म", sb_f_expired: "ख़त्म", sb_f_pending: "जाँच बाकी",
  sb_st_active: "चालू", sb_st_soon: "जल्द ख़त्म", sb_st_expired: "ख़त्म", sb_st_pending: "बाकी",
  sb_c_st: "स्थिति", sb_c_start: "कब से", sb_c_left: "बचे दिन", sb_c_paid: "कुल भुगतान", sb_c_ext: "अंतिम तारीख़ बदलें",
  sb_days: "{n} दिन", sb_ago: "{n} दिन पहले ख़त्म", sb_npay: "{n} भुगतान", sb_pend_n: "{n} भुगतान बाकी",
  sb_note: "हर बाग़वान की एक पंक्ति, उनके स्वीकृत भुगतानों से। प्लान बढ़ाने या घटाने के लिए अंतिम तारीख़ बदलें।" });

/* ---------- profiles: one grower's profile and activity (functions in supabase/admin_profiles.sql) ---------- */
Object.assign(T.en, {
  adm_t_prof: "Profiles", pf_h: "Grower profiles and activity", pf_p: "Tap a grower to see their profile and everything they have done on Seb Saathi.",
  pf_find: "Find by email or mobile", pf_none: "No growers match.", pf_c_who: "Grower", pf_c_plan: "Plan", pf_c_seen: "Last active", pf_c_q: "Questions", pf_c_dx: "Photo checks",
  pf_back: "← All growers", pf_prof_h: "Profile", pf_use_h: "Usage", pf_orch_h: "Orchards", pf_act_h: "Activity", pf_act_none: "No activity yet.", pf_orch_none: "No orchards added yet.",
  pf_email: "Email", pf_phone: "Mobile", pf_joined: "Joined", pf_last: "Last sign-in", pf_lang: "Language", pf_how: "Signs in with", pf_ref: "Invited with code", pf_plan: "Plan", pf_saved: "Records last saved", pf_status: "Account",
  pf_ok: "Confirmed", pf_no: "Not confirmed", pf_free: "Free", pf_basic: "Saathi", pf_premium: "Saathi Plus", pf_until: "until {d}", pf_month: "monthly", pf_year: "yearly",
  pf_s_orch: "Orchards", pf_s_years: "Harvest years", pf_s_lots: "Sale lots", pf_s_q: "Saathi questions", pf_s_dx: "Photo checks", pf_s_fb: "Feedback sent", pf_s_pay: "Payments", pf_s_share: "Shared with",
  pf_sub_q: "{a} today · {b} in 30 days", pf_sub_dx: "{a} this month", pf_trees: "{n} trees",
  pf_c_when: "When", pf_c_what: "What", pf_c_detail: "Details",
  pf_k_join: "Created account", pf_k_login: "Signed in", pf_k_save: "Saved orchard records", pf_k_q: "Asked Saathi", pf_k_dx: "Photo check", pf_k_pay: "Payment", pf_k_fb: "Feedback", pf_k_share: "Shared records",
  pf_dx_none: "No clear match", pf_l_en: "English", pf_l_hi: "Hindi", pf_l_hn: "Hinglish", pf_p_email: "Email", pf_p_phone: "Mobile OTP",
  pf_err_setup: "Profiles are not set up yet. Run supabase/admin_profiles.sql once in the Supabase SQL Editor.", pf_err: "Could not load: {m}", pf_gone: "This account no longer exists."
});
Object.assign(T.hi, {
  adm_t_prof: "प्रोफ़ाइल", pf_h: "बाग़वान की प्रोफ़ाइल और गतिविधि", pf_p: "किसी बाग़वान पर टैप करें और उनकी प्रोफ़ाइल व सेब साथी पर किया गया हर काम देखें।",
  pf_find: "ईमेल या मोबाइल से खोजें", pf_none: "कोई बाग़वान नहीं मिला।", pf_c_who: "बाग़वान", pf_c_plan: "प्लान", pf_c_seen: "आख़िरी बार सक्रिय", pf_c_q: "सवाल", pf_c_dx: "फ़ोटो जाँच",
  pf_back: "← सभी बाग़वान", pf_prof_h: "प्रोफ़ाइल", pf_use_h: "इस्तेमाल", pf_orch_h: "बाग़", pf_act_h: "गतिविधि", pf_act_none: "अभी कोई गतिविधि नहीं।", pf_orch_none: "अभी कोई बाग़ नहीं जोड़ा।",
  pf_email: "ईमेल", pf_phone: "मोबाइल", pf_joined: "जुड़े", pf_last: "आख़िरी लॉग इन", pf_lang: "भाषा", pf_how: "लॉग इन का तरीक़ा", pf_ref: "न्योते का कोड", pf_plan: "प्लान", pf_saved: "रिकॉर्ड आख़िरी बार सेव", pf_status: "खाता",
  pf_ok: "पुष्टि हो चुकी", pf_no: "पुष्टि बाकी", pf_free: "मुफ़्त", pf_basic: "साथी", pf_premium: "साथी प्लस", pf_until: "{d} तक", pf_month: "मासिक", pf_year: "सालाना",
  pf_s_orch: "बाग़", pf_s_years: "तुड़ान के साल", pf_s_lots: "बिक्री लॉट", pf_s_q: "साथी से सवाल", pf_s_dx: "फ़ोटो जाँच", pf_s_fb: "भेजे सुझाव", pf_s_pay: "भुगतान", pf_s_share: "साझा किया",
  pf_sub_q: "आज {a} · 30 दिन में {b}", pf_sub_dx: "इस महीने {a}", pf_trees: "{n} पेड़",
  pf_c_when: "समय", pf_c_what: "क्या", pf_c_detail: "ब्योरा",
  pf_k_join: "खाता बनाया", pf_k_login: "लॉग इन किया", pf_k_save: "बाग़ का रिकॉर्ड सेव किया", pf_k_q: "साथी से पूछा", pf_k_dx: "फ़ोटो जाँच", pf_k_pay: "भुगतान", pf_k_fb: "सुझाव", pf_k_share: "रिकॉर्ड साझा किया",
  pf_dx_none: "साफ़ मिलान नहीं", pf_l_en: "अंग्रेज़ी", pf_l_hi: "हिंदी", pf_l_hn: "हिंग्लिश", pf_p_email: "ईमेल", pf_p_phone: "मोबाइल OTP",
  pf_err_setup: "प्रोफ़ाइल अभी सेट नहीं हुई। Supabase SQL Editor में supabase/admin_profiles.sql एक बार चलाएँ।", pf_err: "लोड नहीं हो सका: {m}", pf_gone: "यह खाता अब मौजूद नहीं है।"
});
let PF = null, pfBusy = false, pfSel = null, pfOne = null, pfWant = null;
function pfWhen(iso) {
  if (!iso) return "–";
  const d = new Date(iso), loc = lang === "hi" ? "hi-IN" : "en-IN";
  return d.toLocaleDateString(loc, {day: "numeric", month: "short", year: d.getFullYear() === new Date().getFullYear() ? undefined : "numeric"}) + ", " + d.toLocaleTimeString(loc, {hour: "2-digit", minute: "2-digit"});
}
function pfErrMsg(err) {
  const m = String(err.message || err), code = String(err.code || "");
  return code === "PGRST202" || /could not find the function/i.test(m) ? tr("pf_err_setup")
    : code === "42501" || /not allowed|permission denied/i.test(m) ? tr("ad_err_deny") : tr("pf_err").replace("{m}", m);
}
const pfName = u => u.email || (u.phone ? "+" + String(u.phone).replace(/^\+/, "") : "–");
const pfPlan = p => tr(p === "premium" ? "pf_premium" : p === "basic" ? "pf_basic" : "pf_free");
async function loadProf() {
  if (!isAdmin() || !sb || pfBusy) return;
  pfBusy = true; set("pfErr", ""); set("pfAt", tr("ad_loading")); $("pfRefresh").disabled = true;
  let res = null, err = null;
  try { res = await sb.rpc("admin_profiles"); err = res.error; } catch (x) { err = x; }
  pfBusy = false; $("pfRefresh").disabled = false; set("pfAt", "");
  if (err) { set("pfErr", pfErrMsg(err)); return; }
  PF = res.data || [];
  if (pfWant) { const w = pfWant; pfWant = null; const u = PF.find(x => String(x.email || "").toLowerCase() === w); if (u) { pfOpen(u.id); return; } }
  if (pfSel) pfOpen(pfSel); else renderProf();
}
async function pfOpen(id) {
  pfSel = id; pfOne = null; renderProf(); set("pfErr", ""); set("pfAt", tr("ad_loading"));
  let res = null, err = null;
  try { res = await sb.rpc("admin_profile", { uid: id }); err = res.error; } catch (x) { err = x; }
  set("pfAt", "");
  if (pfSel !== id) return;
  if (err) { set("pfErr", pfErrMsg(err)); return; }
  if (!res.data) { set("pfErr", tr("pf_gone")); pfSel = null; renderProf(); return; }
  pfOne = res.data; renderProf();
}
function renderProf() {
  if (!$("pfList")) return;
  $("pfListWrap").hidden = !!pfSel; $("pfOne").hidden = !pfSel;
  if (pfSel) { renderProfOne(); return; }
  if (!PF) { $("pfList").innerHTML = ""; return; }
  const q = $("pfFind").value.trim().toLowerCase();
  const rows = PF.filter(u => !q || (String(u.email || "") + " " + String(u.phone || "")).toLowerCase().indexOf(q) >= 0);
  if (!rows.length) { $("pfList").innerHTML = '<p class="empty">' + tr("pf_none") + "</p>"; return; }
  const head = ["pf_c_who", "pf_c_plan", "pf_c_seen", "pf_c_q", "pf_c_dx"];
  $("pfList").innerHTML = '<div class="tablewrap"><table class="ledger"><thead><tr>' + head.map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(u => '<tr><th scope="row"><button class="pflink" type="button" data-pf="' + esc(u.id) + '">' + esc(pfName(u)) + "</button></th>" +
      '<td><span class="tag' + (u.plan && u.plan !== "free" ? " ok" : "") + '">' + pfPlan(u.plan) + "</span></td><td>" + adWhen(u.last_seen) + '</td><td class="n">' + fmtN(+u.questions || 0) +
      '</td><td class="n">' + fmtN(+u.checks || 0) + "</td></tr>").join("") + "</tbody></table></div>";
}
function renderProfOne() {
  const box = $("pfOne"), back = '<button class="btn-s" type="button" data-pfback="1">' + tr("pf_back") + "</button>";
  if (!pfOne) { box.innerHTML = back; return; }
  const p = pfOne.profile || {}, c = pfOne.counts || {}, r = pfOne.records || {}, pl = pfOne.plan, act = pfOne.activity || [], orch = r.orchards || [];
  const langs = { en: "pf_l_en", hi: "pf_l_hi", hn: "pf_l_hn" };
  const dDate = d => new Date(d + "T00:00:00").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {day: "numeric", month: "short", year: "numeric"});
  const planTxt = pl ? pfPlan(pl.plan) + " · " + tr(pl.period === "year" ? "pf_year" : "pf_month") + (pl.valid_until ? " · " + tr("pf_until").replace("{d}", dDate(pl.valid_until)) : "") : tr("pf_free");
  const row = (k, v) => v ? '<tr><th scope="row">' + tr(k) + "</th><td>" + v + "</td></tr>" : "";
  const st = (k, v, sub, main) => "<div" + (main ? ' class="main"' : "") + "><span>" + tr(k) + "</span><b>" + fmtN(+v || 0) + "</b>" + (sub ? '<span class="sub">' + sub + "</span>" : "") + "</div>";
  const detail = a => {
    if (a.kind === "dx") return esc(a.detail ? String(a.detail).replace(/[_-]+/g, " ") : tr("pf_dx_none")) + (a.extra ? " · " + esc(a.extra) : "");
    if (a.kind === "pay") { const b = String(a.detail || "").split(" / "); return esc(pfPlan(b[0])) + " · " + tr(b[1] === "year" ? "pf_year" : "pf_month") + " · " + rupees(+b[2] || 0) + (a.extra ? " · " + esc(a.extra) : ""); }
    if (a.kind === "fb") return (a.extra ? esc(tr("fa_k_" + a.extra) || a.extra) + ": " : "") + esc(a.detail || "");
    return esc(a.detail || "");
  };
  box.innerHTML = back +
    '<h5 class="pfwho">' + esc(pfName(p)) + ' <span class="tag' + (pl ? " ok" : "") + '">' + pfPlan(pl && pl.plan) + "</span></h5>" +
    '<h5 class="ovsub">' + tr("pf_prof_h") + '</h5><div class="tablewrap"><table class="ledger"><tbody>' +
      row("pf_email", esc(p.email || "")) + row("pf_phone", p.phone ? esc("+" + String(p.phone).replace(/^\+/, "")) : "") +
      row("pf_status", '<span class="tag' + (p.confirmed ? " ok" : "") + '">' + tr(p.confirmed ? "pf_ok" : "pf_no") + "</span>") +
      row("pf_plan", esc(planTxt)) + row("pf_joined", pfWhen(p.created_at)) + row("pf_last", p.last_sign_in_at ? pfWhen(p.last_sign_in_at) : tr("ad_never")) +
      row("pf_lang", langs[p.lang] ? tr(langs[p.lang]) : "") + row("pf_how", p.provider ? esc(p.provider === "phone" ? tr("pf_p_phone") : p.provider === "email" ? tr("pf_p_email") : p.provider) : "") +
      row("pf_ref", esc(p.ref || "")) + row("pf_saved", r.saved_at ? pfWhen(r.saved_at) : "") + "</tbody></table></div>" +
    '<h5 class="ovsub">' + tr("pf_use_h") + '</h5><div class="ystats">' +
      st("pf_s_q", c.q_total, tr("pf_sub_q").replace("{a}", fmtN(+c.q_today || 0)).replace("{b}", fmtN(+c.q_30 || 0)), true) +
      st("pf_s_dx", c.dx_total, tr("pf_sub_dx").replace("{a}", fmtN(+c.dx_month || 0)), true) +
      st("pf_s_orch", orch.length) + st("pf_s_years", r.years) + st("pf_s_lots", r.lots) + st("pf_s_pay", c.pay_total) + st("pf_s_fb", c.fb_total) + st("pf_s_share", c.shares) + "</div>" +
    '<h5 class="ovsub">' + tr("pf_orch_h") + "</h5>" + (orch.length ? '<div class="tablewrap"><table class="ledger"><tbody>' +
      orch.map(o => '<tr><th scope="row" style="color:var(--fg)">' + esc(o.name || "–") + "</th><td>" + (+o.trees > 0 ? tr("pf_trees").replace("{n}", fmtN(+o.trees)) : "–") + "</td></tr>").join("") + "</tbody></table></div>"
      : '<p class="empty">' + tr("pf_orch_none") + "</p>") +
    '<h5 class="ovsub">' + tr("pf_act_h") + "</h5>" + (act.length ? '<div class="tablewrap"><table class="ledger pfact"><thead><tr>' +
      ["pf_c_what", "pf_c_detail"].map(k => '<th scope="col">' + tr(k) + "</th>").join("") + "</tr></thead><tbody>" +
      act.map(a => "<tr><td><b>" + tr("pf_k_" + a.kind) + "</b>" + pfWhen(a.at) + "</td><td>" + detail(a) + "</td></tr>").join("") + "</tbody></table></div>"
      : '<p class="empty">' + tr("pf_act_none") + "</p>");
}
$("pfRefresh").addEventListener("click", loadProf);
$("pfFind").addEventListener("input", renderProf);
$("pfList").addEventListener("click", e => { const b = e.target.closest("[data-pf]"); if (b) { pfOpen(b.dataset.pf); window.scrollTo(0, 0); } });
$("pfOne").addEventListener("click", e => { if (e.target.closest("[data-pfback]")) { pfSel = null; pfOne = null; set("pfErr", ""); renderProf(); } });
/* in the Growers tab, tapping an email opens that grower's profile */
$("adTable").addEventListener("click", e => {
  const b = e.target.closest("[data-pfmail]"); if (!b) return;
  const m = b.dataset.pfmail.toLowerCase(), u = PF && PF.find(x => String(x.email || "").toLowerCase() === m);
  if (u) { pfSel = u.id; showTab("prof"); pfOpen(u.id); } else { pfWant = m; pfSel = null; showTab("prof"); if (loaded.prof && !pfBusy) loadProf(); }
  window.scrollTo(0, 0);
});

/* ---------- photo checks: expert review ---------- */
Object.assign(T.en, {
  adm_t_dx: "Photo checks", dq_h: "Photo checks for expert review",
  dq_p: "Checks where the grower asked an expert, the AI was unsure, the problem can kill trees, or the grower marked it wrong. Your answer shows to the grower and becomes a label for training Seb Saathi's own model later.",
  dq_open: "Waiting", dq_done: "Answered", dq_all: "All",
  dq_s_total: "Photo checks", dq_s_month: "this month", dq_s_kept: "Photos kept", dq_s_right: "Growers say right", dq_s_agree: "Expert agrees with AI", dq_s_open: "Waiting for review", dq_s_lab: "Labelled photos for training",
  dq_none: "Nothing here.", dq_asked: "Grower asked an expert", dq_flag: "AI flagged", dq_fb: "Grower marked it: {f}", dq_nophoto: "Photos not kept",
  dq_ai: "AI said", dq_note: "Grower's note", dq_area: "Area", dq_ans: "Correct answer", dq_ans_name: "Name (for 'Something else' or other fruits)", dq_msg: "Note to the grower (shown in their app)",
  dq_save: "Save answer", dq_saved: "Saved.", dq_err_setup: "Not set up yet. Run supabase/diagnosis_plus.sql once in Supabase → SQL Editor, then tap Refresh.",
  dq_stage: "Stage", dq_spray: "last spray {n} days before", dq_wx: "last 7 days: {r} mm rain, {d} wet days, humidity {h}%",
  dq_out: "Grower's follow-up", dq_o_better: "better", dq_o_same: "same", dq_o_worse: "worse",
  dq_by: "Answered {d}", fb_right: "right", fb_wrong: "wrong", fb_unsure: "not sure",
  c_high: "quite sure", c_medium: "fairly sure", c_low: "not sure",
  cr_apple: "Apple", cr_cherry: "Cherry", cr_pear: "Pear", cr_plum: "Plum", cr_walnut: "Walnut"
});
Object.assign(T.hi, {
  adm_t_dx: "फ़ोटो जाँच", dq_h: "विशेषज्ञ की जाँच के लिए फ़ोटो",
  dq_p: "वे जाँच जिनमें बागवान ने विशेषज्ञ से पूछा, AI को पक्का नहीं था, समस्या पेड़ मार सकती है, या बागवान ने ग़लत बताया। आपका जवाब बागवान को दिखता है और बाद में सेब साथी का अपना मॉडल सिखाने के लिए लेबल बनता है।",
  dq_open: "इंतज़ार में", dq_done: "जवाब दिया", dq_all: "सभी",
  dq_s_total: "फ़ोटो जाँच", dq_s_month: "इस महीने", dq_s_kept: "रखी गई फ़ोटो", dq_s_right: "बागवान ने सही कहा", dq_s_agree: "विशेषज्ञ AI से सहमत", dq_s_open: "जाँच का इंतज़ार", dq_s_lab: "सिखाने के लिए लेबल वाली फ़ोटो",
  dq_none: "यहाँ कुछ नहीं।", dq_asked: "बागवान ने विशेषज्ञ से पूछा", dq_flag: "AI ने चिह्नित किया", dq_fb: "बागवान ने बताया: {f}", dq_nophoto: "फ़ोटो नहीं रखी गईं",
  dq_ai: "AI ने कहा", dq_note: "बागवान का नोट", dq_area: "इलाक़ा", dq_ans: "सही जवाब", dq_ans_name: "नाम ('कुछ और' या दूसरे फलों के लिए)", dq_msg: "बागवान के लिए नोट (उनके ऐप में दिखेगा)",
  dq_save: "जवाब सेव करें", dq_saved: "सेव हो गया।", dq_err_setup: "अभी सेट नहीं है। Supabase → SQL Editor में supabase/diagnosis_plus.sql एक बार चलाएँ, फिर Refresh दबाएँ।",
  dq_by: "जवाब {d}", fb_right: "सही", fb_wrong: "ग़लत", fb_unsure: "पता नहीं",
  c_high: "काफ़ी भरोसा", c_medium: "कुछ भरोसा", c_low: "पक्का नहीं",
  cr_apple: "सेब", cr_cherry: "चेरी", cr_pear: "नाशपाती", cr_plum: "प्लम", cr_walnut: "अखरोट"
});
const DQ_IDS = { scab: "Apple scab", mars: "Premature leaf fall (Marssonina)", alt: "Alternaria leaf spot", pm: "Powdery mildew", sooty: "Sooty blotch / flyspeck", pit: "Bitter pit",
  canker: "Canker", collar: "Collar rot", wrr: "White root rot", woolly: "Woolly apple aphid", mite: "Red spider mite", sjs: "San Jose scale", borer: "Stem borer",
  rborer: "Root borer", brot: "Brown rot / fruit rot", core: "Core rot", mosaic: "Apple mosaic virus", miner: "Leaf miner", thrips: "Blossom thrips",
  zn: "Zinc shortage", bor: "Boron shortage", hail: "Hail damage", sburn: "Spray burn",
  other: "Something else", healthy: "Healthy", unclear: "Photo not clear enough" };
let DQ = null, dqWhich = "open", dqBusy = false, dqStats = null, dqUrls = {}, dqMsg = {};
async function loadDq() {
  if (!isAdmin() || !sb || dqBusy) return;
  dqBusy = true; set("dqErr", ""); set("dqAt", tr("ad_loading")); $("dqRefresh").disabled = true;
  let err = null;
  try {
    const [q, st] = await Promise.all([sb.rpc("admin_dx_queue", { which: dqWhich, max_rows: 100 }), sb.rpc("admin_dx_stats")]);
    err = q.error || st.error; DQ = q.error ? [] : (q.data || []); dqStats = st.error ? null : st.data;
  } catch (x) { err = x; DQ = []; }
  dqBusy = false; $("dqRefresh").disabled = false; set("dqAt", "");
  if (err) { const m = String(err.message || err); set("dqErr", /could not find the function|PGRST202/i.test(m + (err.code || "")) ? tr("dq_err_setup") : tr("ad_err").replace("{m}", m)); }
  renderDq();
  /* v3 extras: tree stage, grower's follow-up, weather snapshot, model answers (needs supabase/diagnosis_v3.sql) */
  const ids = (DQ || []).map(r => r.id);
  if (ids.length) {
    try { const r = await sb.from("diagnoses").select("id,stage,outcome,outcome_note,context,model_votes").in("id", ids);
      if (!r.error) (r.data || []).forEach(x => { const row = DQ.find(y => y.id === x.id); if (row) Object.assign(row, x); }); } catch (e) {}
    renderDq();
  }
  /* private photo links, valid for an hour */
  const paths = []; (DQ || []).forEach(r => (r.photo_paths || []).forEach(p => { if (!dqUrls[p]) paths.push(p); }));
  if (paths.length) {
    try {
      const r = await sb.storage.from("dx-photos").createSignedUrls(paths, 3600);
      (r.data || []).forEach(x => { if (x.signedUrl) dqUrls[x.path] = x.signedUrl; });
    } catch (e) {}
    renderDq();
  }
}
const pct = (a, b) => (b ? Math.round(a * 100 / b) + "%" : "–");
const DQ_ST = { st1: "Dormant", st2: "Green tip", st3: "Pink bud", st4: "Full bloom", st5: "Petal fall", st6: "Fruit set", st7: "Fruit growth", st8: "Pre-harvest", st9: "After harvest" };
function dqExtra(r) {
  const c = r.context || {}, bits = [];
  if (r.stage) bits.push(tr("dq_stage") + ": " + (DQ_ST[r.stage] || r.stage));
  if (c.alt) bits.push(c.alt + " m");
  if (c.variety) bits.push(c.variety);
  if (c.spray_days != null) bits.push(tr("dq_spray").replace("{n}", c.spray_days));
  if (c.rain7 != null) bits.push(tr("dq_wx").replace("{r}", c.rain7).replace("{d}", c.wet_days7 || 0).replace("{h}", c.rh7 == null ? "–" : c.rh7));
  const own = r.model_votes && r.model_votes.own;
  let h = bits.length ? '<p class="fine">' + esc(bits.join(" · ")) + "</p>" : "";
  if (own && own.predictions) h += '<p class="fine"><b>' + esc(own.model) + ":</b> " + esc(own.predictions.map(p => (DQ_IDS[p.id] || p.id) + " " + Math.round(p.score * 100) + "%").join(", ")) + "</p>";
  if (r.outcome) h += "<p><b>" + tr("dq_out") + ":</b> " + esc(tr("dq_o_" + r.outcome)) + (r.outcome_note ? " — " + esc(r.outcome_note) : "") + "</p>";
  return h;
}
function renderDq() {
  if (!$("dqList")) return;
  document.querySelectorAll("[data-dq]").forEach(b => { b.textContent = tr("dq_" + b.dataset.dq); b.setAttribute("aria-selected", b.dataset.dq === dqWhich ? "true" : "false"); });
  const s = dqStats;
  $("dqStats").innerHTML = s ? '<div class="ystats">' +
    [["dq_s_total", fmtN(+s.total || 0), fmtN(+s.month || 0) + " " + tr("dq_s_month")], ["dq_s_open", fmtN(+s.open || 0)], ["dq_s_kept", fmtN(+s.kept || 0)],
     ["dq_s_lab", fmtN(+s.labelled || 0), "/ 10,000"], ["dq_s_right", pct(+s.right || 0, +s.marked || 0), fmtN(+s.marked || 0)], ["dq_s_agree", pct(+s.agree || 0, +s.reviewed || 0), fmtN(+s.reviewed || 0)]]
      .map(([k, v, sub], i) => "<div" + (i < 2 ? ' class="main"' : "") + "><span>" + tr(k) + "</span><b>" + v + "</b>" + (sub ? '<span class="sub">' + esc(sub) + "</span>" : "") + "</div>").join("") + "</div>" : "";
  if (!DQ) { $("dqList").innerHTML = ""; return; }
  if (!DQ.length) { $("dqList").innerHTML = '<p class="empty">' + tr("dq_none") + "</p>"; return; }
  $("dqList").innerHTML = '<div class="dqlist">' + DQ.map(r => {
    const res = r.result || {}, ms = res.matches || [], crop = r.crop || "apple";
    const who = r.email || (r.phone ? "+" + String(r.phone).replace(/^\+/, "") : "–");
    const flags = [r.ask_expert ? '<span class="tag">' + tr("dq_asked") + "</span>" : "", r.needs_review ? '<span class="tag">' + tr("dq_flag") + "</span>" : "",
      r.feedback ? '<span class="tag">' + esc(tr("dq_fb").replace("{f}", tr("fb_" + r.feedback))) + "</span>" : ""].join("");
    const pics = (r.photo_paths || []).length ? '<div class="dqpics">' + r.photo_paths.map(p => dqUrls[p] ? '<a href="' + esc(dqUrls[p]) + '" target="_blank" rel="noopener"><img src="' + esc(dqUrls[p]) + '" alt=""></a>' : '<span class="dqph"></span>').join("") + "</div>"
      : '<p class="fine">' + tr("dq_nophoto") + "</p>";
    const ai = ms.map(m => esc(m.name || DQ_IDS[m.id] || m.id) + " (" + esc(tr("c_" + m.confidence) || m.confidence) + ")").join(", ") || "–";
    const sel = r.expert_id || (ms[0] && ms[0].id) || "";
    const msg = dqMsg[r.id] || "";
    return '<article class="dqcard"><div class="dqtop"><b>' + esc(adWhen(r.created_at)) + "</b> · " + esc(who) + " · " + esc(tr("cr_" + crop)) + (r.part ? " · " + esc(r.part) : "") + "</div>" +
      '<div class="dqflags">' + flags + "</div>" + pics +
      "<p><b>" + tr("dq_ai") + ":</b> " + ai + (res.severity ? " · " + esc(res.severity) : "") + "</p>" + (res.summary ? '<p class="fine">' + esc(res.summary) + "</p>" : "") +
      dqExtra(r) +
      (r.note ? "<p><b>" + tr("dq_note") + ":</b> " + esc(r.note) + "</p>" : "") + (r.area ? "<p><b>" + tr("dq_area") + ":</b> " + esc(r.area) + "</p>" : "") +
      (r.reviewed_at ? '<p class="fine">' + esc(tr("dq_by").replace("{d}", adWhen(r.reviewed_at))) + "</p>" : "") +
      '<form class="dqform" data-dqform="' + esc(r.id) + '"><div class="grid3"><div class="field"><label for="dqId' + r.id + '">' + tr("dq_ans") + '</label><select id="dqId' + r.id + '">' +
        Object.keys(DQ_IDS).map(k => '<option value="' + k + '"' + (k === sel ? " selected" : "") + ">" + esc(DQ_IDS[k]) + "</option>").join("") + "</select></div>" +
        '<div class="field"><label for="dqNm' + r.id + '">' + tr("dq_ans_name") + '</label><input id="dqNm' + r.id + '" type="text" maxlength="80" value="' + esc(r.expert_name || "") + '"></div></div>' +
        '<div class="field"><label for="dqTx' + r.id + '">' + tr("dq_msg") + '</label><textarea id="dqTx' + r.id + '" rows="2" maxlength="1000">' + esc(r.expert_note || "") + "</textarea></div>" +
        '<div class="dels"><button class="btn-s add" type="submit">' + tr("dq_save") + '</button><span class="fine">' + esc(msg) + "</span></div></form></article>";
  }).join("") + "</div>";
}
$("dqRefresh").addEventListener("click", loadDq);
document.querySelectorAll("[data-dq]").forEach(b => b.addEventListener("click", () => { dqWhich = b.dataset.dq; DQ = null; renderDq(); loadDq(); }));
$("dqList").addEventListener("submit", async e => {
  const f = e.target.closest("[data-dqform]"); if (!f) return;
  e.preventDefault();
  const id = f.dataset.dqform, btn = f.querySelector("button[type=submit]"); btn.disabled = true;
  let err = null;
  try { const r = await sb.rpc("admin_dx_review", { did: id, label: $("dqId" + id).value, label_name: $("dqNm" + id).value.trim(), note: $("dqTx" + id).value.trim() }); err = r.error; } catch (x) { err = x; }
  btn.disabled = false;
  dqMsg[id] = err ? String(err.message || err) : tr("dq_saved");
  if (!err) { const row = DQ.find(x => x.id === id); if (row) { row.reviewed_at = new Date().toISOString(); row.expert_id = $("dqId" + id).value; row.expert_name = $("dqNm" + id).value.trim(); row.expert_note = $("dqTx" + id).value.trim(); } }
  const keep = { id: $("dqId" + id).value, nm: $("dqNm" + id).value, tx: $("dqTx" + id).value };
  renderDq();
  if ($("dqId" + id)) { $("dqId" + id).value = keep.id; $("dqNm" + id).value = keep.nm; $("dqTx" + id).value = keep.tx; }
});
(function () {
  const st = document.createElement("style");
  st.textContent = ".dqlist{display:grid;gap:14px}.dqcard{border:1px solid var(--line);border-radius:10px;padding:14px;display:grid;gap:8px;background:var(--surface)}.dqcard p{margin:0}" +
    ".dqflags{display:flex;gap:6px;flex-wrap:wrap}.dqflags .tag{border:1px solid var(--line);border-radius:6px;padding:2px 8px;font-size:.82rem}.dqflags:empty{display:none}.dqpics{display:flex;gap:8px;flex-wrap:wrap}.dqpics img,.dqph{width:120px;height:120px;object-fit:cover;border-radius:8px;border:1px solid var(--line);display:block;background:var(--surface-2)}" +
    ".dqform{display:grid;gap:8px;border-top:1px solid var(--line);padding-top:10px}.dqform textarea{width:100%}";
  document.head.appendChild(st);
})();

/* ---------- export training photos: confirmed checks, one folder per disease, as .zip ---------- */
Object.assign(T.en, {
  dqx_btn: "Export training photos", dqx_p: "Downloads every photo you have answered, sorted into one folder per disease, with labels.csv. Ready for Vertex AI, Roboflow or your own training. Large sets come in several parts.",
  dqx_find: "Finding answered photos…", dqx_get: "Downloading photo {n} of {t}…", dqx_none: "No answered photos with kept photos yet.",
  dqx_done: "Done: {n} photos in {f} folders, {z} file(s).", dqx_fail: "{n} photos could not be downloaded and were skipped."
});
Object.assign(T.hi, {
  dqx_btn: "ट्रेनिंग फ़ोटो डाउनलोड करें", dqx_p: "जिन फ़ोटो का आपने जवाब दिया है, वे सब हर बीमारी के अलग फ़ोल्डर में, labels.csv के साथ डाउनलोड होंगी। ज़्यादा फ़ोटो कई हिस्सों में आएँगी।",
  dqx_find: "जवाब दी गई फ़ोटो ढूँढ रहे हैं…", dqx_get: "फ़ोटो {n} / {t} डाउनलोड हो रही है…", dqx_none: "अभी रखी गई फ़ोटो वाली कोई जवाब दी गई जाँच नहीं।",
  dqx_done: "हो गया: {n} फ़ोटो, {f} फ़ोल्डर, {z} फ़ाइल।", dqx_fail: "{n} फ़ोटो डाउनलोड नहीं हो सकीं, छोड़ दी गईं।"
});
/* a small .zip writer (stored, no compression: photos are already compressed) */
const CRC_T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeZip(files) {
  const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
  const u16 = v => [v & 255, (v >>> 8) & 255], u32 = v => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  files.forEach(f => {
    const name = enc.encode(f.name), crc = crc32(f.data), sz = f.data.length;
    const head = [0x50, 0x4b, 3, 4, ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(sz), ...u32(sz), ...u16(name.length), ...u16(0)];
    parts.push(new Uint8Array(head), name, f.data);
    cen.push(new Uint8Array([0x50, 0x4b, 1, 2, ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(sz), ...u32(sz), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(off)]), name);
    off += head.length + name.length + sz;
  });
  const cs = cen.reduce((a, b) => a + b.length, 0);
  const end = new Uint8Array([0x50, 0x4b, 5, 6, 0, 0, 0, 0, ...u16(files.length), ...u16(files.length), ...u32(cs), ...u32(off), 0, 0]);
  return new Blob(parts.concat(cen, [end]), { type: "application/zip" });
}
const slug = s => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40) || "other";
const csvq = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
async function exportTraining() {
  const btn = $("dqExport"); if (!isAdmin() || !sb || btn.disabled) return;
  btn.disabled = true; set("dqxSt", tr("dqx_find"));
  try {
    /* every answered check that kept photos (admins can read all checks) */
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const cols = "id,created_at,crop,part,area,severity,result,expert_id,expert_name,photo_paths";
      let r = await sb.from("diagnoses").select(cols + ",stage,outcome,context")
        .not("reviewed_at", "is", null).not("photo_paths", "is", null).neq("expert_id", "unclear").order("created_at").range(from, from + 999);
      if (r.error) r = await sb.from("diagnoses").select(cols)   /* before supabase/diagnosis_v3.sql */
        .not("reviewed_at", "is", null).not("photo_paths", "is", null).neq("expert_id", "unclear").order("created_at").range(from, from + 999);
      if (r.error) throw r.error;
      rows.push(...(r.data || [])); if (!r.data || r.data.length < 1000) break;
    }
    const items = [];
    rows.forEach(x => {
      const crop = x.crop || "apple";
      const lab = x.expert_id === "other" && x.expert_name ? "other_" + slug(x.expert_name) : slug(x.expert_id);
      const folder = (crop === "apple" ? "" : crop + "_") + lab;
      const ai = x.result && x.result.matches && x.result.matches[0];
      (x.photo_paths || []).forEach((p, i) => items.push({ p, folder, x, ai, file: folder + "/" + x.id.slice(0, 8) + "_" + (i + 1) + "." + (p.split(".").pop() || "jpg") }));
    });
    if (!items.length) { set("dqxSt", tr("dqx_none")); return; }
    const LIMIT = 150 * 1024 * 1024, stamp = new Date().toISOString().slice(0, 10), folders = new Set();
    let batch = [], size = 0, part = 0, failed = 0, done = 0;
    const csvHead = "file,label,label_name,crop,part,severity,area,date,ai_guess,ai_confidence,stage,outcome,altitude_m,variety,days_since_spray,rain_7d_mm,wet_days_7d,humidity_7d\n";
    let csv = csvHead;
    const flush = () => {
      if (!batch.length) return; part++;
      batch.push({ name: "labels.csv", data: new TextEncoder().encode(csv) });
      const a = document.createElement("a"); a.href = URL.createObjectURL(makeZip(batch));
      a.download = "sebsaathi-training-" + stamp + (part > 1 || done < items.length ? "-part" + part : "") + ".zip";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      batch = []; size = 0; csv = csvHead;
    };
    for (let i = 0; i < items.length; i++) {
      const it = items[i]; set("dqxSt", tr("dqx_get").replace("{n}", i + 1).replace("{t}", items.length));
      let data = null;
      try { const r = await sb.storage.from("dx-photos").download(it.p); if (!r.error && r.data) data = new Uint8Array(await r.data.arrayBuffer()); } catch (e) {}
      done = i + 1;
      if (!data) { failed++; continue; }
      batch.push({ name: it.file, data }); size += data.length; folders.add(it.folder);
      csv += [it.file, it.x.expert_id, it.x.expert_name, it.x.crop || "apple", it.x.part, it.x.severity, it.x.area, String(it.x.created_at || "").slice(0, 10), it.ai && it.ai.id, it.ai && it.ai.confidence, it.x.stage, it.x.outcome].concat((c => [c.alt, c.variety, c.spray_days, c.rain7, c.wet_days7, c.rh7])(it.x.context || {})).map(csvq).join(",") + "\n";
      if (size >= LIMIT) flush();
    }
    flush();
    set("dqxSt", tr("dqx_done").replace("{n}", items.length - failed).replace("{f}", folders.size).replace("{z}", part) + (failed ? " " + tr("dqx_fail").replace("{n}", failed) : ""));
  } catch (e) { set("dqxSt", tr("ad_err").replace("{m}", String(e.message || e))); }
  finally { btn.disabled = false; }
}
$("dqExport").addEventListener("click", exportTraining);

/* ---------- page: tabs, language, sign-in gate ---------- */
const TABS = ["ov", "pay", "cost", "users", "prof", "dx", "fb", "mk"]; /* library editor tab removed from the menu; its code is kept but not shown */
let tab = "ov";
try { const h = location.hash.slice(1); if (TABS.indexOf(h) >= 0) tab = h; } catch (e) {}
const loaded = {};
function showTab(t) {
  tab = t;
  TABS.forEach(n => { $("ap-" + n).hidden = n !== t; $("at-" + n).setAttribute("aria-selected", n === t ? "true" : "false"); });
  try { history.replaceState(null, "", "#" + t); } catch (e) {}
  if (!isAdmin() || loaded[t]) return;
  loaded[t] = true;
  if (t === "ov") loadOverview(); else if (t === "cost") loadCosts(); else if (t === "pay") loadPayAdmin(); else if (t === "users") loadAdmin(); else if (t === "prof") loadProf(); else if (t === "dx") loadDq(); else if (t === "fb") loadFeedback(); else if (t === "mk" && typeof loadMk === "function") loadMk();
}
TABS.forEach(n => $("at-" + n).addEventListener("click", () => showTab(n)));
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = tr(el.getAttribute("data-i18n")); });
  set("langBtn", tr("lang_btn"));
  document.title = tr("adm_title");
  renderGate();
  if (AD) renderAdmin(); renderFeedback(); renderPayAdmin(); if (LA) renderLA(); renderOverview(); renderProf(); renderDq(); if (typeof renderMk === "function") renderMk();
}
$("langBtn").addEventListener("click", () => { lang = lang === "en" ? "hi" : "en"; try { localStorage.setItem("ad-lang", lang); } catch (e) {} applyLang(); });
$("signOut").addEventListener("click", async () => {
  $("signOut").disabled = true;
  try { await sb.auth.signOut(); } catch (e) {}
  try { await sb.auth.signOut({ scope: "local" }); } catch (e) {}   // always forget the session on this device, even if the server call failed
  try { Object.keys(localStorage).filter(k => /^sb-.*-auth-token/.test(k)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  location.replace("/login.html?next=admin");
});
$("prevX").addEventListener("click", () => { const d = $("prevDlg"); if (d.close) d.close(); else d.removeAttribute("open"); });
let checked = false;
function renderGate() {
  const ok = isAdmin();
  $("gate").hidden = ok; $("adminApp").hidden = !ok; $("signOut").hidden = !user;
  set("whoami", user ? (user.email || "") : "");
  const only = !!(user && user.email && ADMIN_ONLY.indexOf(user.email.toLowerCase()) >= 0);
  $("siteLink").hidden = only; $("brandLink").setAttribute("href", only ? "/admin.html" : "/");
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
