-- Apple Doctor: starter library articles (added as DRAFTS — check, edit and publish them from the Admin tab).
-- Run once after supabase/library.sql. Running it again does not add duplicates.

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$disease$ad$, 10, $ad$Apple scab: how to spot it and stop it early$ad$, $ad$सेब का स्कैब (पपड़ी रोग): पहचान और शुरुआती रोकथाम$ad$,
$ad$Apple scab is a fungus that spoils leaves and fruit. It is worst in years with a wet spring.

## How to recognise it
- Olive-green to black, velvety spots on leaves, often along the veins
- Dark, corky, scabby spots on fruit; badly hit fruit cracks and stays small
- Leaves with many spots turn yellow and drop early

## How it spreads
The fungus spends the winter on **fallen leaves** under the tree. In spring, from bud break (green tip) to a few weeks after petal fall, rain releases spores that land on new leaves and young fruit. Leaves that stay wet for many hours, especially in cool weather, get infected.

## What to do
- **Clean the orchard floor:** in autumn and winter, collect fallen leaves and bury or compost them away from the trees. Many growers also spray urea on the leaves just before or at leaf fall to make them rot faster; use the strength given in the spray schedule.
- **Protect at the right time:** the key sprays are from green tip to fruit set. Spray before expected rain, not after many days of rain.
- **Follow the official schedule:** use only the fungicides and doses in the current Himachal spray schedule (link in the Spray schedule tab), and do not use the same fungicide group again and again.
- **Keep the canopy open:** good pruning lets leaves dry faster after rain.

If you are not sure it is scab, use the photo check in Disease diagnosis, or show a sample to your horticulture extension officer.$ad$,
$ad$स्कैब एक फफूंद रोग है जो पत्तों और फलों को ख़राब करता है। जिस साल वसंत में बारिश ज़्यादा हो, उस साल यह सबसे ज़्यादा फैलता है।

## कैसे पहचानें
- पत्तों पर जैतूनी-हरे से काले, मख़मली धब्बे, अक्सर नसों के साथ-साथ
- फलों पर गहरे, खुरदरे, पपड़ी जैसे धब्बे; ज़्यादा असर हो तो फल फट जाता है और छोटा रह जाता है
- बहुत धब्बों वाले पत्ते पीले होकर जल्दी गिर जाते हैं

## कैसे फैलता है
फफूंद सर्दी भर पेड़ के नीचे **गिरे हुए पत्तों** पर रहती है। वसंत में कली फूटने (ग्रीन टिप) से लेकर पत्ती झड़ने के कुछ हफ़्ते बाद तक, बारिश से इसके बीजाणु निकलकर नए पत्तों और छोटे फलों पर पहुँचते हैं। जो पत्ते कई घंटे गीले रहें, ख़ासकर ठंडे मौसम में, उनमें संक्रमण होता है।

## क्या करें
- **बाग़ की ज़मीन साफ़ रखें:** पतझड़ और सर्दी में गिरे पत्ते इकट्ठा करके पेड़ों से दूर दबा दें या खाद बना दें। कई बाग़वान पत्ते गिरने से ठीक पहले या उस समय पत्तों पर यूरिया का छिड़काव भी करते हैं ताकि वे जल्दी गलें; मात्रा स्प्रे सूची के अनुसार रखें।
- **सही समय पर बचाव:** सबसे ज़रूरी स्प्रे ग्रीन टिप से फल बनने तक हैं। स्प्रे बारिश से पहले करें, कई दिन की बारिश के बाद नहीं।
- **सरकारी स्प्रे सूची मानें:** सिर्फ़ हिमाचल की मौजूदा स्प्रे सूची में दी गई दवाइयाँ और मात्रा इस्तेमाल करें (लिंक स्प्रे सूची टैब में है), और एक ही समूह की दवा बार-बार न डालें।
- **पेड़ खुला रखें:** अच्छी छँटाई से बारिश के बाद पत्ते जल्दी सूखते हैं।

अगर पक्का न हो कि यह स्कैब है, तो बीमारी की पहचान में फ़ोटो जाँच करें, या नमूना अपने उद्यान प्रसार अधिकारी को दिखाएँ।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Apple scab: how to spot it and stop it early$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$disease$ad$, 20, $ad$Premature leaf fall (Marssonina blotch) in the monsoon$ad$, $ad$बरसात में समय से पहले पत्ते गिरना (मार्सोनिना ब्लॉच)$ad$,
$ad$Premature leaf fall is one of the most damaging apple diseases in Himachal and Kashmir. Trees can lose most of their leaves by August or September, long before normal leaf fall.

## How to recognise it
- Dark brown to blackish patches on the **upper side** of leaves, from about July
- The leaf turns yellow around the patches and falls, even while still partly green
- Inner and lower branches are usually hit first

## Why it matters
Without leaves, the tree cannot fill and colour the fruit, and it stores less food for next year. Next season's buds and fruit size can suffer.

## What to do
- **Sanitation:** collect and destroy fallen leaves in autumn and winter, as for scab. This cuts next year's disease a lot.
- **Open the tree:** prune so air and light reach the inside. Keep grass and weeds under the tree short, and do not let water stand in the orchard.
- **Spray before the monsoon spreads it:** follow the fungicide sprays in the current Himachal spray schedule for June to August. Spraying before rain spells works much better than spraying after leaves are already spotted.
- **Do not skip the late-season spray** if the schedule lists one; the disease keeps spreading through the rains.

Fallen leaves from this disease are a big source of next year's infection, so the winter clean-up is as important as the sprays.$ad$,
$ad$समय से पहले पत्ते गिरना हिमाचल और कश्मीर में सेब की सबसे नुक़सानदेह बीमारियों में से एक है। पेड़ अगस्त या सितंबर तक ही अपने ज़्यादातर पत्ते खो सकते हैं, आम पतझड़ से बहुत पहले।

## कैसे पहचानें
- लगभग जुलाई से पत्तों की **ऊपरी सतह** पर गहरे भूरे से काले धब्बे
- धब्बों के आसपास पत्ता पीला होकर गिर जाता है, कई बार आधा हरा रहते हुए भी
- आमतौर पर अंदर और नीचे की टहनियों पर पहले असर होता है

## यह क्यों ज़रूरी है
पत्तों के बिना पेड़ फल को भर और रंग नहीं पाता, और अगले साल के लिए कम भोजन जमा करता है। अगले सीज़न की कलियाँ और फल का आकार भी कमज़ोर हो सकता है।

## क्या करें
- **सफ़ाई:** स्कैब की तरह पतझड़ और सर्दी में गिरे पत्ते इकट्ठा करके नष्ट करें। इससे अगले साल बीमारी बहुत कम होती है।
- **पेड़ खोलें:** ऐसी छँटाई करें कि हवा और धूप अंदर तक पहुँचे। पेड़ के नीचे घास-खरपतवार छोटी रखें और बाग़ में पानी खड़ा न होने दें।
- **बरसात से पहले स्प्रे:** जून से अगस्त के लिए हिमाचल की मौजूदा स्प्रे सूची में दिए फफूंदनाशक स्प्रे करें। बारिश के दौर से पहले किया गया स्प्रे, धब्बे आने के बाद किए स्प्रे से कहीं ज़्यादा असर करता है।
- **सीज़न के आख़िरी स्प्रे को न छोड़ें,** अगर सूची में दिया है; बरसात भर बीमारी फैलती रहती है।

इस बीमारी से गिरे पत्ते अगले साल के संक्रमण का बड़ा स्रोत हैं, इसलिए सर्दियों की सफ़ाई उतनी ही ज़रूरी है जितने स्प्रे।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Premature leaf fall (Marssonina blotch) in the monsoon$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$pest$ad$, 30, $ad$Red spider mites: bronzed leaves in hot, dry weather$ad$, $ad$लाल मकड़ी (माइट): गर्म-सूखे मौसम में कांसे जैसे पत्ते$ad$,
$ad$Mites are tiny pests, smaller than a pinhead, that suck sap from leaves. Two kinds are common in apple: the European red mite and the two-spotted spider mite.

## How to recognise them
- Leaves look dull, pale or speckled, then **bronze or rusty** in colour
- With a hand lens you can see tiny red or greenish mites on the underside of leaves, sometimes with fine webbing
- In winter, small **red eggs** are seen around buds and on the rough bark of twigs
- Damage builds fast in hot, dry spells in June and July

## What to do
- **Start in the dormant season:** horticultural mineral oil sprayed at the time given in the spray schedule (usually around bud swell to green tip) kills many overwintering eggs.
- **Check before you spray:** look at about 10 leaves from several trees each week in summer. Use a miticide only when mites are many, as advised in the schedule.
- **Change the product each time:** mites quickly become resistant if the same miticide is used again and again.
- **Protect the helpers:** predatory mites and ladybird beetles eat red mites. Avoid unnecessary insecticide sprays, especially synthetic pyrethroids, which often cause mite outbreaks.
- **Water and nutrition:** stressed, dusty, drought-hit trees suffer more. Irrigate in dry spells if you can.

Use only the products and doses in the current Himachal spray schedule.$ad$,
$ad$माइट बहुत छोटे कीट हैं, पिन की नोक से भी छोटे, जो पत्तों का रस चूसते हैं। सेब में दो तरह के आम हैं: यूरोपियन रेड माइट और टू-स्पॉटेड स्पाइडर माइट।

## कैसे पहचानें
- पत्ते फीके, हल्के या चित्तीदार दिखते हैं, फिर **कांसे या जंग जैसे** रंग के हो जाते हैं
- हैंड लेंस से पत्ते के नीचे छोटे लाल या हरे माइट दिखते हैं, कभी-कभी बारीक जाला भी
- सर्दी में कलियों के आसपास और टहनियों की खुरदरी छाल पर छोटे **लाल अंडे** दिखते हैं
- जून-जुलाई के गर्म, सूखे दिनों में नुक़सान तेज़ी से बढ़ता है

## क्या करें
- **सुप्त अवस्था से शुरुआत:** स्प्रे सूची में बताए समय पर (आमतौर पर कली फूलने से ग्रीन टिप तक) हॉर्टिकल्चरल मिनरल ऑयल का स्प्रे सर्दी के बहुत से अंडों को मार देता है।
- **स्प्रे से पहले जाँचें:** गर्मियों में हर हफ़्ते कई पेड़ों से लगभग 10 पत्ते देखें। माइटनाशक तभी डालें जब माइट ज़्यादा हों, जैसा सूची में बताया है।
- **हर बार दवा बदलें:** एक ही माइटनाशक बार-बार डालने से माइट पर उसका असर ख़त्म हो जाता है।
- **मददगार कीटों को बचाएँ:** शिकारी माइट और लेडीबर्ड भृंग लाल माइट खाते हैं। बेवजह कीटनाशक स्प्रे से बचें, ख़ासकर सिंथेटिक पायरेथ्रॉइड, जिनसे अक्सर माइट बढ़ जाते हैं।
- **पानी और पोषण:** तनाव में, धूल भरे, सूखे से प्रभावित पेड़ ज़्यादा प्रभावित होते हैं। हो सके तो सूखे में सिंचाई करें।

सिर्फ़ हिमाचल की मौजूदा स्प्रे सूची की दवाइयाँ और मात्रा इस्तेमाल करें।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Red spider mites: bronzed leaves in hot, dry weather$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$nutrition$ad$, 40, $ad$Bitter pit and calcium: brown spots on good-looking fruit$ad$, $ad$बिटर पिट और कैल्शियम: अच्छे दिखते फल पर भूरे धब्बे$ad$,
$ad$Bitter pit is not a disease or a pest. It is a shortage of **calcium inside the fruit**, even when the soil has enough calcium. It often shows up at harvest or after some weeks in storage, so buyers find it before you do.

## How to recognise it
- Small, slightly sunken brown spots on the skin, mostly towards the bottom (calyx end) of the fruit
- Under the spots, the flesh is brown, dry and spongy, and tastes bitter
- Large fruit on lightly cropped trees are hit most

## What makes it worse
- A light crop, so each fruit grows very big
- Too much nitrogen (urea, fresh manure) and very vigorous shoots
- Heavy pruning, which pushes leafy growth that takes calcium away from fruit
- Dry spells and uneven watering during fruit growth
- Too much potash or magnesium compared with calcium

## What to do
- **Balanced feeding:** give nitrogen as per soil test and the advice of the horticulture department; do not overdo it.
- **Calcium sprays:** a series of calcium sprays during fruit growth, as given in the current spray schedule, helps the fruit directly. Cover the fruit well.
- **Moisture:** mulch the tree basin and irrigate in dry spells.
- **Moderate pruning and thinning:** keep a steady, even crop every year.
- **Harvest on time and cool the fruit quickly;** over-mature fruit shows more bitter pit in storage.$ad$,
$ad$बिटर पिट कोई बीमारी या कीट नहीं है। यह **फल के अंदर कैल्शियम की कमी** है, चाहे मिट्टी में कैल्शियम काफ़ी हो। यह अक्सर तुड़ाई के समय या भंडारण के कुछ हफ़्ते बाद दिखता है, इसलिए कई बार ख़रीदार को आपसे पहले पता चलता है।

## कैसे पहचानें
- छिलके पर छोटे, थोड़े धँसे भूरे धब्बे, ज़्यादातर फल के निचले हिस्से (कैलिक्स की ओर)
- धब्बों के नीचे गूदा भूरा, सूखा और स्पंज जैसा, और स्वाद कड़वा
- कम फसल वाले पेड़ों के बड़े फलों पर सबसे ज़्यादा असर

## किससे बढ़ता है
- कम फसल, जिससे हर फल बहुत बड़ा हो जाता है
- ज़्यादा नाइट्रोजन (यूरिया, ताज़ी खाद) और बहुत तेज़ बढ़वार
- भारी छँटाई, जिससे पत्तों वाली बढ़वार होती है जो फल का कैल्शियम खींच लेती है
- फल बढ़ने के समय सूखा और असमान सिंचाई
- कैल्शियम की तुलना में बहुत ज़्यादा पोटाश या मैग्नीशियम

## क्या करें
- **संतुलित खाद:** नाइट्रोजन मिट्टी जाँच और उद्यान विभाग की सलाह से दें; ज़्यादा न डालें।
- **कैल्शियम स्प्रे:** मौजूदा स्प्रे सूची के अनुसार फल बढ़ने के दौरान कैल्शियम के कुछ स्प्रे फल को सीधे मदद करते हैं। फल पर अच्छी तरह स्प्रे करें।
- **नमी:** तौलिये में मल्च डालें और सूखे में सिंचाई करें।
- **संतुलित छँटाई और फल-विरलन:** हर साल बराबर, एक जैसी फसल रखें।
- **समय पर तुड़ाई करें और फल जल्दी ठंडा करें;** ज़्यादा पका फल भंडारण में ज़्यादा बिटर पिट दिखाता है।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Bitter pit and calcium: brown spots on good-looking fruit$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$pruning$ad$, 50, $ad$Winter pruning: when and how to prune apple trees$ad$, $ad$सर्दियों की छँटाई: सेब के पेड़ कब और कैसे काटें$ad$,
$ad$Good pruning gives you better colour, bigger fruit, fewer diseases and easier spraying and picking.

## When to prune
- In the **dormant season**, after the leaves have fallen and before the buds swell, usually December to February depending on height.
- Avoid days with snow, rain or hard frost. Prune older, bigger trees first and young trees last.

## What to remove first
- Dead, broken and diseased branches (cut well into healthy wood)
- Water sprouts (strong upright shoots) and branches growing into the centre
- Crossing or rubbing branches, and branches that hang too low

## Shape the tree
- Keep a clear structure, such as a central leader or an open centre, so light reaches every part of the tree.
- Leave fruiting spurs; they carry next year's crop. Spur-type varieties need much lighter pruning than standard Royal Delicious.
- Make clean cuts just outside the branch collar. Do not leave stubs.

## Do not over-prune
Heavy pruning gives a lot of leafy growth, fewer fruits and more bitter pit. It is better to prune a little every year than a lot once.

## Hygiene
- Use sharp tools and clean them between trees, especially after cutting cankered wood.
- Cover cuts bigger than about 2 to 3 cm with a wound paste recommended by the horticulture department.
- Remove and destroy diseased prunings; do not leave them in the orchard.$ad$,
$ad$अच्छी छँटाई से रंग बेहतर, फल बड़े, बीमारियाँ कम और स्प्रे व तुड़ाई आसान होती है।

## कब काटें
- **सुप्त अवस्था** में, पत्ते गिरने के बाद और कलियाँ फूलने से पहले, ऊँचाई के हिसाब से आमतौर पर दिसंबर से फ़रवरी।
- बर्फ़, बारिश या कड़े पाले वाले दिनों में छँटाई न करें। पहले पुराने बड़े पेड़ और आख़िर में छोटे पेड़ काटें।

## पहले क्या हटाएँ
- सूखी, टूटी और रोगी टहनियाँ (स्वस्थ लकड़ी तक काटें)
- वॉटर स्प्राउट (सीधी तेज़ बढ़ने वाली टहनियाँ) और बीच की ओर बढ़ती टहनियाँ
- आपस में क्रॉस या रगड़ खाने वाली टहनियाँ, और बहुत नीचे लटकती टहनियाँ

## पेड़ को आकार दें
- साफ़ ढाँचा रखें, जैसे सेंट्रल लीडर या ओपन सेंटर, ताकि हर हिस्से तक धूप पहुँचे।
- फल वाले स्पर छोड़ें; अगले साल की फसल उन्हीं पर आती है। स्पर किस्मों में साधारण रॉयल डिलीशियस से बहुत कम छँटाई चाहिए।
- टहनी के कॉलर के ठीक बाहर साफ़ कट लगाएँ। ठूँठ न छोड़ें।

## ज़्यादा न काटें
भारी छँटाई से पत्तों वाली बढ़वार बहुत होती है, फल कम आते हैं और बिटर पिट बढ़ता है। एक बार बहुत काटने से हर साल थोड़ा काटना बेहतर है।

## साफ़-सफ़ाई
- तेज़ औज़ार इस्तेमाल करें और पेड़ों के बीच उन्हें साफ़ करें, ख़ासकर कैंकर वाली लकड़ी काटने के बाद।
- लगभग 2 से 3 सेमी से बड़े कट पर उद्यान विभाग द्वारा सुझाया गया लेप लगाएँ।
- रोगी कटी टहनियाँ बाग़ से हटाकर नष्ट करें; बाग़ में न छोड़ें।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Winter pruning: when and how to prune apple trees$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$orchard$ad$, 60, $ad$Flowering, pollination and fruit thinning$ad$, $ad$फूल, परागण और फल-विरलन (फल छाँटना)$ad$,
$ad$A good crop starts at flowering. Royal Delicious and most other varieties cannot set fruit with their own pollen, so they need a **pollinizer variety** and bees.

## Pollination
- Have pollinizer trees (for example Golden Delicious, Red Gold or crab apples) spread through the orchard, flowering at the same time as your main variety. Your horticulture officer can advise the right mix for your area.
- Keep bee hives in or near the orchard during full bloom.
- **Do not spray insecticides during flowering.** It kills bees. Check the spray schedule for what is allowed at bloom.
- Cold, rain or strong wind at bloom reduces fruit set; there is little to do about the weather, but good bees help use every warm hour.

## Fruit thinning
Too many fruits give small, poorly coloured apples and often a poor crop the next year.
- Thin by hand about 3 to 4 weeks after full bloom, when fruit is about marble size.
- Keep one fruit per cluster, usually the central (king) fruit if it is well shaped.
- Leave roughly a hand's width between fruits on a branch.
- Remove damaged, misshapen and insect-hit fruit first.
- On young trees, remove most fruit for the first years so the tree builds its frame.

Thinning feels like throwing away money, but the fruit you keep grows bigger and sells better, and the tree bears well again next year.$ad$,
$ad$अच्छी फसल फूल से शुरू होती है। रॉयल डिलीशियस और ज़्यादातर किस्में अपने ही पराग से फल नहीं बना सकतीं, इसलिए उन्हें **परागण किस्म** और मधुमक्खियों की ज़रूरत होती है।

## परागण
- बाग़ में जगह-जगह परागण किस्म के पेड़ रखें (जैसे गोल्डन डिलीशियस, रेड गोल्ड या क्रैब ऐपल), जिनके फूल मुख्य किस्म के साथ ही खिलें। आपके इलाक़े के लिए सही अनुपात उद्यान अधिकारी बता सकते हैं।
- पूरे फूल के समय बाग़ में या पास में मधुमक्खी के बक्से रखें।
- **फूल के समय कीटनाशक का स्प्रे न करें।** इससे मधुमक्खियाँ मरती हैं। फूल के समय क्या डाल सकते हैं, स्प्रे सूची में देखें।
- फूल के समय ठंड, बारिश या तेज़ हवा से फल कम बनते हैं; मौसम पर बस नहीं, पर अच्छी मधुमक्खियाँ हर गर्म घंटे का फ़ायदा उठाती हैं।

## फल-विरलन
बहुत ज़्यादा फल होने से सेब छोटे और कम रंग वाले होते हैं, और अक्सर अगले साल फसल कम आती है।
- पूरे फूल के लगभग 3 से 4 हफ़्ते बाद, जब फल कंचे के आकार का हो, हाथ से फल छाँटें।
- हर गुच्छे में एक फल रखें, आमतौर पर बीच वाला (किंग) फल अगर अच्छे आकार का हो।
- एक टहनी पर फलों के बीच लगभग एक हथेली की दूरी रखें।
- पहले चोट वाले, टेढ़े-मेढ़े और कीड़े लगे फल हटाएँ।
- छोटे पेड़ों पर शुरुआती सालों में ज़्यादातर फल हटा दें ताकि पेड़ का ढाँचा बने।

फल छाँटना पैसे फेंकने जैसा लगता है, पर बचे फल बड़े होते हैं और अच्छे दाम पर बिकते हैं, और पेड़ अगले साल भी अच्छी फसल देता है।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Flowering, pollination and fruit thinning$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$spray$ad$, 70, $ad$Spraying safely and getting your money's worth$ad$, $ad$सुरक्षित स्प्रे और दवा का पूरा फ़ायदा$ad$,
$ad$Sprays are one of the biggest costs in an apple orchard. Used well, they protect the crop; used badly, they waste money, harm your health and can leave residue on the fruit.

## Follow the schedule
- Use the current Himachal spray schedule (link in the Spray schedule tab). It lists the right product, dose and timing for each stage.
- Buy from a licensed dealer, check the expiry date, and **keep the bill**.
- Do not add extra products to a tank mix unless the schedule says they can be mixed.

## Spray well
- Measure the dose; do not guess. More is not better, it can burn leaves and fruit.
- Spray in calm weather, in the morning or evening. Not in strong wind, hot afternoons, or when rain is expected within a few hours.
- Cover the whole tree, including the inside and the tops, until leaves are wet but not dripping heavily.
- Clean and check the sprayer and nozzles before the season.

## Protect yourself and others
- Wear gloves, a mask, long sleeves and eye cover while mixing and spraying.
- Do not eat, drink or smoke while spraying; wash well afterwards.
- Keep children and animals away; never store chemicals in food or drink bottles.
- Rinse empty containers three times, pour the rinse into the spray tank, then puncture and dispose of the container safely.

## Before harvest
Each product has a **waiting period** before picking. Check the label and the schedule, and keep a simple diary of what you sprayed and when.$ad$,
$ad$स्प्रे सेब बाग़ के सबसे बड़े ख़र्चों में से एक है। सही तरीक़े से करें तो फसल बचती है; ग़लत तरीक़े से करें तो पैसा बर्बाद होता है, सेहत को नुक़सान होता है और फल पर दवा बची रह सकती है।

## सूची के अनुसार चलें
- हिमाचल की मौजूदा स्प्रे सूची इस्तेमाल करें (लिंक स्प्रे सूची टैब में है)। उसमें हर अवस्था के लिए सही दवा, मात्रा और समय दिया है।
- लाइसेंसशुदा दुकान से ख़रीदें, एक्सपायरी तारीख़ देखें, और **बिल ज़रूर रखें**।
- टंकी में अतिरिक्त दवाइयाँ न मिलाएँ जब तक सूची में न लिखा हो कि वे साथ मिल सकती हैं।

## अच्छी तरह स्प्रे करें
- मात्रा नापकर डालें; अंदाज़े से नहीं। ज़्यादा डालना बेहतर नहीं, इससे पत्ते और फल जल सकते हैं।
- शांत मौसम में, सुबह या शाम स्प्रे करें। तेज़ हवा, गर्म दोपहर, या कुछ घंटों में बारिश की संभावना हो तो नहीं।
- पूरे पेड़ पर स्प्रे करें, अंदर और ऊपर तक, जब तक पत्ते गीले हों पर ज़्यादा टपकें नहीं।
- सीज़न से पहले स्प्रेयर और नोज़ल साफ़ करके जाँच लें।

## अपनी और दूसरों की सुरक्षा
- मिलाते और स्प्रे करते समय दस्ताने, मास्क, पूरी बाँह के कपड़े और चश्मा पहनें।
- स्प्रे करते समय खाना, पीना या धूम्रपान न करें; बाद में अच्छी तरह नहाएँ-धोएँ।
- बच्चों और पशुओं को दूर रखें; दवा कभी खाने-पीने की बोतलों में न रखें।
- ख़ाली डिब्बे तीन बार धोएँ, धोवन स्प्रे टंकी में डालें, फिर डिब्बे में छेद करके सुरक्षित तरीक़े से फेंकें।

## तुड़ाई से पहले
हर दवा का तुड़ाई से पहले **इंतज़ार का समय** होता है। लेबल और सूची देखें, और क्या कब स्प्रे किया, इसकी सरल डायरी रखें।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Spraying safely and getting your money's worth$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$harvest$ad$, 80, $ad$Harvest at the right time and handle fruit gently$ad$, $ad$सही समय पर तुड़ाई और फल की सावधानी से सँभाल$ad$,
$ad$Picking too early is one of the most common and costly mistakes. Early fruit is smaller, less coloured, less sweet and stores badly, and it gets a lower rate in the mandi.

## Signs that fruit is ready
- **Days after full bloom:** Royal Delicious is usually ready about 140 to 160 days after full bloom; higher orchards take longer. Note your bloom date each year.
- **Ground colour:** the background colour of the skin (where it is not red) changes from green to yellowish-green.
- **Seeds** turn brown.
- **Easy picking:** a ripe apple comes off with a gentle lift and twist, without pulling.
- Your horticulture officer can do a starch-iodine or sweetness (TSS) test on a few fruits.

On one tree, fruit on the outside and top ripens first. Pick in two or three rounds if you can.

## Picking and handling
- Pick with the stalk on; do not pull or twist hard.
- Use padded picking bags or baskets, and **place, do not drop** fruit.
- Pick in the cool morning hours and keep picked fruit in shade.
- Cut nails short and avoid rings; small wounds become rot later.

## Grading and packing
- Grade by size and colour honestly; mixed grades lower the price of the whole lot.
- Remove cut, bruised, rotten and bitter-pit fruit before packing.
- Pack firmly so fruit does not move, but do not press.

Use the Profit calculator to see how grade and rate change your net income per box.$ad$,
$ad$बहुत जल्दी तुड़ाई करना सबसे आम और महँगी ग़लतियों में से एक है। जल्दी तोड़ा फल छोटा, कम रंग वाला, कम मीठा होता है, भंडारण में ख़राब होता है, और मंडी में कम भाव मिलता है।

## फल तैयार होने के संकेत
- **पूरे फूल के बाद के दिन:** रॉयल डिलीशियस आमतौर पर पूरे फूल के लगभग 140 से 160 दिन बाद तैयार होता है; ऊँचे बाग़ों में ज़्यादा समय लगता है। हर साल फूल की तारीख़ लिखकर रखें।
- **पृष्ठभूमि का रंग:** छिलके का जो हिस्सा लाल नहीं है, उसका रंग हरे से पीला-हरा हो जाता है।
- **बीज** भूरे हो जाते हैं।
- **आसानी से टूटना:** पका सेब हल्का उठाकर घुमाने से, बिना खींचे, टूट जाता है।
- आपके उद्यान अधिकारी कुछ फलों पर स्टार्च-आयोडीन या मिठास (TSS) जाँच कर सकते हैं।

एक ही पेड़ पर बाहर और ऊपर के फल पहले पकते हैं। हो सके तो दो-तीन बार में तुड़ाई करें।

## तुड़ाई और सँभाल
- फल डंठल समेत तोड़ें; खींचें या ज़ोर से न घुमाएँ।
- गद्देदार थैले या टोकरी इस्तेमाल करें, और फल **रखें, गिराएँ नहीं**।
- ठंडी सुबह तुड़ाई करें और तोड़े फल छाँव में रखें।
- नाख़ून छोटे रखें और अँगूठी न पहनें; छोटे घाव बाद में सड़न बनते हैं।

## ग्रेडिंग और पैकिंग
- आकार और रंग के हिसाब से ईमानदारी से ग्रेडिंग करें; मिली-जुली ग्रेड पूरे लॉट का भाव गिराती है।
- पैकिंग से पहले कटे, दबे, सड़े और बिटर पिट वाले फल निकाल दें।
- ऐसे कसकर पैक करें कि फल हिले नहीं, पर दबाएँ नहीं।

मुनाफ़ा कैलकुलेटर से देखें कि ग्रेड और भाव से प्रति पेटी आपकी शुद्ध आय कैसे बदलती है।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Harvest at the right time and handle fruit gently$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$market$ad$, 90, $ad$Mandi or ladhani buyer? How to decide and stay safe$ad$, $ad$मंडी या लदानी? कैसे तय करें और धोखे से कैसे बचें$ad$,
$ad$Most growers sell either through a commission agent (aadhti) in a mandi, or to a ladhani or pre-harvest contractor who buys the crop in the orchard. Each has costs and risks.

## Selling in the mandi
- You usually get the open auction rate, which can be higher for good grades.
- You pay for picking, grading, packing material, transport and labour, plus the agent's commission and market charges.
- Rates can swing a lot from day to day, and payment may come later.

## Selling to a ladhani or contractor
- One agreed price, often per box or for the whole orchard; the buyer may take on picking and transport.
- Less work and less risk of a rate crash, but the price is usually lower than a good mandi day.
- Risk: the buyer delays, pays only part, or disappears.

## How to compare
Use the **Mandi or ladhani?** comparison and the Profit calculator in this app. Put in your expected mandi rate and all costs per box, and see which leaves more money in hand.

## Stay safe
- Deal only with **licensed** commission agents and buyers; ask for their licence number.
- Always get a **written slip or bill** with weight or boxes, grade, rate, commission and deductions.
- With a ladhani, get a written agreement and a fair advance; do not hand over the whole crop on a promise.
- Note how apple is sold in your market now (for example by weight in Himachal) and check the current rules with the APMC or horticulture department.
- If payment is not made, complain to the market committee (APMC) quickly, with your slips.$ad$,
$ad$ज़्यादातर बाग़वान या तो मंडी में आढ़ती (कमीशन एजेंट) के ज़रिए बेचते हैं, या लदानी/ठेकेदार को, जो बाग़ में ही फसल ख़रीदता है। दोनों में ख़र्च और जोखिम हैं।

## मंडी में बेचना
- आमतौर पर खुली बोली का भाव मिलता है, जो अच्छी ग्रेड के लिए ज़्यादा हो सकता है।
- तुड़ाई, ग्रेडिंग, पैकिंग सामान, ढुलाई और मज़दूरी का ख़र्च आपका, साथ में आढ़ती का कमीशन और मंडी शुल्क।
- भाव रोज़ बहुत ऊपर-नीचे हो सकते हैं, और भुगतान बाद में आ सकता है।

## लदानी या ठेकेदार को बेचना
- एक तय भाव, अक्सर प्रति पेटी या पूरे बाग़ का; ख़रीदार तुड़ाई और ढुलाई ख़ुद कर सकता है।
- काम कम और भाव गिरने का जोखिम कम, पर दाम आमतौर पर मंडी के अच्छे दिन से कम।
- जोखिम: ख़रीदार देर करे, आधा भुगतान करे, या ग़ायब हो जाए।

## कैसे तुलना करें
इस ऐप में **मंडी या लदानी?** तुलना और मुनाफ़ा कैलकुलेटर इस्तेमाल करें। अपना अनुमानित मंडी भाव और प्रति पेटी सारे ख़र्च डालें, और देखें किसमें हाथ में ज़्यादा पैसा बचता है।

## सुरक्षित रहें
- सिर्फ़ **लाइसेंसशुदा** आढ़ती और ख़रीदार से सौदा करें; उनका लाइसेंस नंबर पूछें।
- हमेशा **लिखित पर्ची या बिल** लें, जिसमें वज़न या पेटियाँ, ग्रेड, भाव, कमीशन और कटौती लिखी हो।
- लदानी के साथ लिखित समझौता और उचित एडवांस लें; सिर्फ़ वादे पर पूरी फसल न दें।
- आपकी मंडी में अब सेब कैसे बिकता है (जैसे हिमाचल में वज़न से), यह ध्यान रखें और मौजूदा नियम APMC या उद्यान विभाग से पता करें।
- भुगतान न मिले तो अपनी पर्चियों के साथ जल्दी मंडी समिति (APMC) में शिकायत करें।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Mandi or ladhani buyer? How to decide and stay safe$ad$);

insert into public.articles (category, sort, title_en, title_hi, body_en, body_hi, status)
select $ad$schemes$ad$, 100, $ad$Government help for apple growers: where to start$ad$, $ad$सेब बाग़वानों के लिए सरकारी मदद: कहाँ से शुरू करें$ad$,
$ad$State and central governments run several schemes for apple growers. The details and amounts change from year to year, so always confirm with your local office before you spend money.

## Common kinds of help
- **Market Intervention Scheme (MIS):** in the season, government agencies buy lower-grade (culled) apples at a fixed rate, so that fruit does not go waste.
- **Subsidy on equipment and inputs:** for example anti-hail nets, power sprayers, drip or sprinkler irrigation, and sometimes planting material for new high-density orchards.
- **Crop insurance:** weather-based crop insurance can cover apple against losses from bad weather, if you enrol before the cut-off date.
- **Training and advice:** horticulture departments and universities run camps, demonstrations and soil and leaf testing.
- **Central schemes** such as PM-KISAN income support, for eligible farmers.

## Where to ask
- Your **Horticulture Extension Officer** or block horticulture office
- In Himachal: the Department of Horticulture and Dr YS Parmar University of Horticulture and Forestry, Nauni (and its regional stations)
- In Kashmir: the Department of Horticulture and SKUAST-Kashmir

## Tips
- Keep your land records, Aadhaar, bank details and a passport photo ready.
- Ask for the application form and the last date in writing.
- Keep copies of everything you submit, and the receipt.

We will add details of individual schemes here as they are announced.$ad$,
$ad$राज्य और केंद्र सरकार सेब बाग़वानों के लिए कई योजनाएँ चलाती हैं। ब्यौरे और राशि हर साल बदलती है, इसलिए पैसा ख़र्च करने से पहले अपने स्थानीय कार्यालय से ज़रूर पक्का कर लें।

## आम तरह की मदद
- **मंडी मध्यस्थता योजना (MIS):** सीज़न में सरकारी एजेंसियाँ निचली ग्रेड (छाँटे गए) सेब तय भाव पर ख़रीदती हैं, ताकि फल बर्बाद न हो।
- **उपकरण और सामान पर सब्सिडी:** जैसे ओलारोधी जाल, पावर स्प्रेयर, ड्रिप या स्प्रिंकलर सिंचाई, और कभी-कभी नए सघन बाग़ों के लिए पौधे।
- **फसल बीमा:** मौसम आधारित फसल बीमा ख़राब मौसम से होने वाले नुक़सान को कवर कर सकता है, अगर आप आख़िरी तारीख़ से पहले नाम लिखवाएँ।
- **प्रशिक्षण और सलाह:** उद्यान विभाग और विश्वविद्यालय शिविर, प्रदर्शन, और मिट्टी व पत्ती जाँच करवाते हैं।
- **केंद्रीय योजनाएँ** जैसे पीएम-किसान आय सहायता, पात्र किसानों के लिए।

## कहाँ पूछें
- अपने **उद्यान प्रसार अधिकारी** या ब्लॉक उद्यान कार्यालय में
- हिमाचल में: उद्यान विभाग और डॉ. वाई.एस. परमार औद्यानिकी एवं वानिकी विश्वविद्यालय, नौणी (और उसके क्षेत्रीय केंद्र)
- कश्मीर में: उद्यान विभाग और SKUAST-कश्मीर

## सुझाव
- ज़मीन के काग़ज़, आधार, बैंक ब्यौरा और पासपोर्ट फ़ोटो तैयार रखें।
- आवेदन फ़ॉर्म और आख़िरी तारीख़ लिखित में माँगें।
- जो भी जमा करें उसकी कॉपी और रसीद रखें।

अलग-अलग योजनाओं की जानकारी घोषणा होने पर हम यहाँ जोड़ेंगे।$ad$,
'draft'
where not exists (select 1 from public.articles where title_en = $ad$Government help for apple growers: where to start$ad$);
