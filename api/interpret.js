export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question } = req.body;
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
                                    text: `أنت خبير في الأعشاب وتفسير الأحلام. أجب بشكل مفيد:\n${question}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("Gemini response:", data); // 🔥 مهم للتشخيص

        // ✅ معالجة قوية لكل الحالات
        let reply = "❌ لا توجد إجابة حالياً";

        if (data.candidates && data.candidates.length > 0) {
            const parts = data.candidates[0].content.parts;
            if (parts && parts.length > 0) {
                reply = parts[0].text;
            }
        } else if (data.error) {
            reply = "❌ خطأ في API: " + data.error.message;
        }

        res.status(200).json({ reply });

    } catch (error) {
        res.status(500).json({ reply: "❌ خطأ في السيرفر" });
    }
}
