class TranslationService {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/translate';
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang = 'en') {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang,
                    format: 'text'
                })
            });

            if (!response.ok) {
                throw new Error(`Translation failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data.translations[0].translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }
}