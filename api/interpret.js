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
                                    text: question
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("FULL GEMINI RESPONSE:", JSON.stringify(data));

        let reply = "❌ لا توجد إجابة";

        // 🔥 قراءة ذكية لكل الاحتمالات
        if (data.candidates) {
            for (let c of data.candidates) {
                if (c.content && c.content.parts) {
                    for (let p of c.content.parts) {
                        if (p.text) {
                            reply = p.text;
                            break;
                        }
                    }
                }
            }
        }

        // لو في خطأ من Gemini
        if (data.error) {
            reply = "❌ " + data.error.message;
        }

        res.status(200).json({ reply });

    } catch (error) {
        res.status(500).json({ reply: "❌ خطأ في السيرفر" });
    }
}
