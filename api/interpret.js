export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question } = req.body; // 🔥 عدلنا هنا

    const API_KEY = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `أنت خبير في الأعشاب وتفسير الأحلام. أجب بشكل بسيط:\n${question}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        // 🔥 أهم تعديل: استخراج النص فقط
        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "لم يتم الحصول على رد";

        res.status(200).json({ reply });

    } catch (error) {
        res.status(500).json({ reply: "خطأ في السيرفر" });
    }
}
