// translation.worker.js
self.onmessage = async function(e) {
    const { text, sourceLang, targetLang, apiKey } = e.data;
    
    try {
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang,
                    format: 'text'
                })
            }
        );

        const data = await response.json();
        self.postMessage({
            success: true,
            translation: data.data.translations[0].translatedText,
            originalText: text
        });
    } catch (error) {
        self.postMessage({
            success: false,
            error: error.message,
            originalText: text
        });
    }
};