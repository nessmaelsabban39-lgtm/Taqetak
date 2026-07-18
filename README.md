# طاقتك النهارده 🌙 — دليل النشر خطوة بخطوة

الملفات اللي في المشروع ده:
- `index.html` → الموقع كله (الواجهة والخصائص)
- `api/ai.js` → الوسيط اللي بيكلم الذكاء الاصطناعي بأمان
- `README.md` → الدليل ده

---

## الخطوة 1: ارفعي المشروع على GitHub (مجاني)

1. اعملي حساب على github.com (لو مفيش)
2. دوسي **New repository** → سميه `taqetak` → **Create repository**
3. دوسي **uploading an existing file** → اسحبي الملفات (index.html + فولدر api) → **Commit changes**

## الخطوة 2: انشري على Vercel (مجاني)

1. اعملي حساب على vercel.com واختاري **Continue with GitHub**
2. دوسي **Add New → Project** → اختاري `taqetak` → **Import**
3. من غير ما تغيري أي إعداد، دوسي **Deploy**
4. بعد دقيقة هيديكي لينك زي: `taqetak.vercel.app` — ده موقعك شغال! 🎉

## الخطوة 3: فعّلي الذكاء الاصطناعي (5$)

1. اعملي حساب على **console.anthropic.com**
2. من **Billing** اشحني 5$
3. من **API Keys** اعملي مفتاح جديد وانسخيه (بيبدأ بـ sk-ant-)
4. ارجعي لـ Vercel → مشروعك → **Settings → Environment Variables**
5. ضيفي متغير: الاسم `ANTHROPIC_API_KEY` والقيمة = المفتاح → **Save**
6. من تاب **Deployments** دوسي على النقط الثلاثة جنب آخر نشر → **Redeploy**

⚠️ المفتاح ده زي رقم كارت الدفع — ميتحطش في أي ملف ولا يتبعت لحد أبدًا.

## الخطوة 4: فعّلي القياس (مجاني)

1. اعملي حساب على **analytics.google.com** → Create Property
2. هيديكي كود بيبدأ بـ `G-` (زي G-AB12CD34EF)
3. في ملف `index.html` دوري على `G-XXXXXXXXXX` (موجود مرتين) وبدليه بكودك
4. ارفعي التعديل على GitHub (Edit file → Commit) — Vercel هينشر لوحده

بعدها من تطبيق Google Analytics على موبايلك هتشوفي الزوار لايف، وكمان أحداث زي:
`tarot_draw` (سحب كارت) · `chart_draw` (رسم خريطة) · `chat_message` (رسالة شات) · `mood_checkin` · `breathing_start` · `gratitude_save`

## الخطوة 5: لينكات التيك توك المميزة

لكل فيديو استخدمي لينك بذيل مختلف عشان تعرفي أنهي فيديو جاب زوار:

- فيديو برج الثور: `https://taqetak.vercel.app/?utm_source=tiktok&utm_campaign=taurus`
- فيديو برج الأسد: `https://taqetak.vercel.app/?utm_source=tiktok&utm_campaign=leo`
- فيديو التاروت: `https://taqetak.vercel.app/?utm_source=tiktok&utm_campaign=tarot`

وفي Google Analytics → Acquisition هتلاقي كل campaign جابت كام زيارة.

## اختياري: دومين باسمك (10-15$/سنة)

اشتري دومين (زي taqetak.com) من Namecheap أو GoDaddy، وبعدين من Vercel → Settings → Domains ضيفيه واتبعي التعليمات.

---

## أسئلة سريعة

**هتكلفني كام شهريًا؟** الاستضافة والقياس مجانيين. الـ AI بس اللي بياكل من رصيد الـ 5$ — والوسيط محدد الاستخدام بـ 10 طلبات/ساعة لكل زائر عشان الرصيد يعيش.

**أغير حد الاستخدام منين؟** في `api/ai.js` أول سطرين: `LIMIT` و `WINDOW_MS`.

**أعدل في المحتوى إزاي؟** كل النصوص (قراءات، تاروت، نصايح) جوه `index.html` — عدلي من GitHub مباشرة وValue هينشر لوحده.
