<!DOCTYPE html>
<html lang="ar" dir="rtl" id="html-tag">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Rady Healing & Dreams</title>
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#87ceeb">
    <style>
        :root {
            --rady-blue: #87ceeb; --rady-green: #4caf50; --rady-purple: #9b59b6;
            --bg-color: #f0f7f9; --rady-yellow: #ffc107;
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body, html { height: 100%; margin: 0; padding: 0; background-color: var(--bg-color); font-family: 'Segoe UI', Tahoma, sans-serif; overflow: hidden; }

        /* Splash Screen */
        #splash { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 9999; transition: opacity 0.8s ease; }
        #splash img { width: 130px; border-radius: 50%; border: 4px solid var(--rady-green); }

        /* Layout */
        .app-container { display: none; height: 100vh; flex-direction: column; }
        .header { background: linear-gradient(180deg, var(--rady-blue), #ffffff); padding: 10px; text-align: center; border-bottom: 3px solid var(--rady-green); flex-shrink: 0; position: relative; }
        .lang-btn { position: absolute; top: 12px; left: 12px; background: white; border: 2px solid var(--rady-green); padding: 4px 10px; border-radius: 15px; cursor: pointer; font-weight: bold; font-size: 0.8em; color: var(--rady-green); }
        [dir="ltr"] .lang-btn { left: auto; right: 12px; }
        .header img { width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--rady-green); }

        .scrollable-content { flex-grow: 1; overflow-y: auto; padding: 15px; padding-bottom: 50px; }
        .card { background: white; border-radius: 20px; padding: 18px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        .medical-warning { background: #fff3cd; color: #856404; padding: 10px; border-radius: 10px; font-size: 0.8em; margin-bottom: 15px; border: 1px solid #ffeeba; line-height: 1.4; }

        input, textarea { width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e1f0f7; border-radius: 12px; font-size: 0.95em; outline: none; font-family: inherit; }
        .btn { color: white; border: none; padding: 14px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-green { background: var(--rady-green); }
        .btn-purple { background: var(--rady-purple); }
        .btn:active { transform: scale(0.98); opacity: 0.9; }

        #result-display { display: none; background: #fff; border-radius: 15px; padding: 18px; margin-top: 10px; border-right: 6px solid var(--rady-yellow); line-height: 1.6; font-size: 0.95em; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
        [dir="ltr"] #result-display { border-right: none; border-left: 6px solid var(--rady-yellow); }

        /* Offline Utility: Note System */
        .note-item { background: #f9f9f9; padding: 10px; border-radius: 10px; margin-top: 10px; border-right: 3px solid var(--rady-blue); font-size: 0.9em; }

        .footer { text-align: center; font-size: 0.8em; color: #7f8c8d; padding: 20px; border-top: 1px solid #eee; }
        .loading-dots:after { content: ' .'; animation: dots 1.5s steps(5, end) infinite; }
        @keyframes dots { 0%, 20% { color: rgba(0,0,0,0); text-shadow: .5em 0 0 rgba(0,0,0,0), 1em 0 0 rgba(0,0,0,0); } 40% { color: var(--rady-green); text-shadow: .5em 0 0 rgba(0,0,0,0), 1em 0 0 rgba(0,0,0,0); } 60% { text-shadow: .5em 0 0 var(--rady-green), 1em 0 0 rgba(0,0,0,0); } 80%, 100% { text-shadow: .5em 0 0 var(--rady-green), 1em 0 0 var(--rady-green); } }
    </style>
</head>
<body>

    <div id="splash">
        <img src="IMG-20250801-WA0004 (3).jpeg" alt="Rady Logo">
        <h2 style="color: var(--rady-blue); margin: 10px 0;">Rady Healing</h2>
        <p id="splash-sub">صحتك ورؤاك في مكان واحد</p>
    </div>

    <div class="app-container" id="main-app">
        <header class="header">
            <button class="lang-btn" onclick="toggleLang()" id="lang-toggle">English</button>
            <img src="IMG-20250801-WA0004 (3).jpeg" alt="Logo">
            <h1 id="app-title" style="font-size: 1.1rem; margin: 5px 0;">رضي للعلاج والأحلام</h1>
        </header>

        <main class="scrollable-content">
            <div class="card">
                <div class="medical-warning" id="med-warn">
                    ⚠️ تنبيه: استشارة الطبيب ضرورية. هذه الوصفات تعليمية فقط.
                </div>
                <h3 id="herb-h" style="color: var(--rady-green); margin:0;">🌿 استشارة ذكية (Online)</h3>
                <input type="text" id="herb-in" placeholder="مثلاً: علاج السعال للكبار...">
                <button class="btn btn-green" id="herb-btn" onclick="askAI('herbs')">اطلب الوصفة</button>
            </div>

            <div class="card">
                <h3 id="dream-h" style="color: var(--rady-purple); margin:0;">🌙 تفسير الأحلام (Online)</h3>
                <input type="text" id="dream-in" placeholder="ماذا رأيت؟...">
                <button class="btn btn-purple" id="dream-btn" onclick="askAI('dreams')">فسر الآن</button>
            </div>

            <div id="result-display"></div>

            <div class="card">
                <h3 id="note-h" style="color: var(--rady-blue); margin:0;">📝 مفكرتي الصحية (Offline)</h3>
                <textarea id="note-in" rows="2" placeholder="دون ملاحظاتك هنا..."></textarea>
                <button class="btn" style="background:var(--rady-blue)" onclick="saveNote()" id="save-btn">حفظ في الهاتف</button>
                <div id="notes-list"></div>
            </div>

            <footer class="footer">
                <p>v1.3.0 | <strong>Ismail Ahmed Ismail</strong></p>
                <p>asmaylalrdy744@gmail.com</p>
            </footer>
        </main>
    </div>

    <script>
        // تأكد من وضع المفتاح بدقة هنا
        const API_KEY = "AIzaSyA0l2CUmJOH45cpemJCWKFPlrNPme7x5oE"; 
        let lang = 'ar';

        const text = {
            ar: { app: "رضي للعلاج والأحلام", herbH: "🌿 استشارة ذكية (متصل)", herbBtn: "اطلب الوصفة", dreamH: "🌙 تفسير الأحلام (متصل)", dreamBtn: "فسر الآن", noteH: "📝 مفكرتي الصحية (أوفلاين)", saveBtn: "حفظ في الهاتف", loading: "جاري استشارة المحرك الذكي", err: "خطأ: تأكد من الإنترنت أو مفتاح API.", splash: "صحتك ورؤاك في مكان واحد" },
            en: { app: "Rady Healing & Dreams", herbH: "🌿 Smart Advice (Online)", herbBtn: "Get Recipe", dreamH: "🌙 Dream Meaning (Online)", dreamBtn: "Interpret", noteH: "📝 Health Journal (Offline)", saveBtn: "Save to Phone", loading: "Consulting AI Engine", err: "Error: Check connection or API key.", splash: "Health & Visions in one place" }
        };

        function toggleLang() {
            lang = lang === 'ar' ? 'en' : 'ar';
            document.getElementById('html-tag').dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.getElementById('lang-toggle').innerText = lang === 'ar' ? 'English' : 'العربية';
            document.getElementById('app-title').innerText = text[lang].app;
            document.getElementById('herb-h').innerText = text[lang].herbH;
            document.getElementById('herb-btn').innerText = text[lang].herbBtn;
            document.getElementById('dream-h').innerText = text[lang].dreamH;
            document.getElementById('dream-btn').innerText = text[lang].dreamBtn;
            document.getElementById('note-h').innerText = text[lang].noteH;
            document.getElementById('save-btn').innerText = text[lang].saveBtn;
            loadNotes();
        }

        window.onload = () => {
            loadNotes();
            setTimeout(() => {
                document.getElementById('splash').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('splash').style.display = 'none';
                    document.getElementById('main-app').style.display = 'flex';
                }, 800);
            }, 2500);
        };

        // --- دالة الذكاء الاصطناعي المصححة ---
        async function askAI(type) {
            const val = document.getElementById(type === 'herbs' ? 'herb-in' : 'dream-in').value;
            const display = document.getElementById('result-display');
            if (!val) return;

            display.style.display = "block";
            display.innerHTML = `<span class='loading-dots'>${text[lang].loading}</span>`;
            display.scrollIntoView({ behavior: 'smooth' });

            const promptText = type === 'herbs' 
                ? `خبير أعشاب: أعطِ وصفة لـ "${val}" بـ ${lang}. اذكر: المقادير، التحضير، الاستعمال، وتنبيه طبي.`
                : `مفسر أحلام: فسر حلم "${val}" بـ ${lang} بوضوح.`;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
                });

                const data = await response.json();
                if (data.candidates && data.candidates[0].content) {
                    const out = data.candidates[0].content.parts[0].text;
                    display.innerHTML = `<strong>النتيجة:</strong><br>${out.replace(/\n/g, '<br>')}`;
                } else {
                    display.innerHTML = text[lang].err;
                }
            } catch (e) {
                display.innerHTML = text[lang].err;
            }
        }

        // --- نظام المفكرة (يعمل بدون إنترنت) ---
        function saveNote() {
            const noteVal = document.getElementById('note-in').value;
            if (!noteVal) return;
            const notes = JSON.parse(localStorage.getItem('rady_notes') || '[]');
            notes.unshift({ text: noteVal, date: new Date().toLocaleDateString() });
            localStorage.setItem('rady_notes', JSON.stringify(notes));
            document.getElementById('note-in').value = '';
            loadNotes();
        }

        function loadNotes() {
            const notes = JSON.parse(localStorage.getItem('rady_notes') || '[]');
            const list = document.getElementById('notes-list');
            list.innerHTML = notes.slice(0, 3).map(n => `<div class="note-item"><b>${n.date}:</b> ${n.text}</div>`).join('');
        }
    </script>
</body>
</html>
