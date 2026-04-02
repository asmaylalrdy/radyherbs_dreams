// هذا الكود يعمل على خوادم Vercel وليس في متصفح المستخدم
export default async function handler(req, res) {
    // التأكد من أن الطلب قادم بطريقة POST (لزيادة الأمان)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;
    // هنا نقوم بجلب المفتاح من إعدادات Vercel السرية التي سنضيفها لاحقاً
    const API_KEY = process.env.GEMINI_API_KEY;

    try {
        // الخادم هو من يتحدث مع Google Gemini الآن
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        // إرسال النتيجة النهائية لتطبيقك (index.html)
        res.status(200).json(data);
    } catch (error) {
        // في حال حدوث مشكلة في الخادم
        res.status(500).json({ error: "خطأ في خادم الوسيط" });
    }
}
