// translationService.js
export default class TranslationService {
    constructor() {
        this.apiKey = process.env.API_KEY;
        this.isConfigured = !!this.apiKey;
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang) {
        if (!this.isConfigured) {
            throw new Error('Translation service not configured');
        }

        const sourceCode = sourceLang.split('-')[0];
        const targetCode = targetLang.split('-')[0];

        try {
            // First translation: Source language to target language
            const firstResponse = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: text,
                        source: sourceCode,
                        target: targetCode,
                        format: 'text'
                    })
                }
            );

            if (!firstResponse.ok) throw new Error(`HTTP error! status: ${firstResponse.status}`);
            const firstData = await firstResponse.json();
            const translation = firstData.data.translations[0].translatedText;

            // Second translation: Target language back to English for transliteration
            const secondResponse = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: translation,
                        source: targetCode,
                        target: 'en',
                        format: 'text'
                    })
                }
            );

            if (!secondResponse.ok) throw new Error(`HTTP error! status: ${secondResponse.status}`);
            const secondData = await secondResponse.json();
            const transliteration = secondData.data.translations[0].translatedText;

            this.translations.push({
                original: text,
                translated: translation,
                transliterated: transliteration,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
            });

            return {
                translation,
                transliteration
            };

        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }

    clearTranslations() {
        this.translations = [];
    }

    exportTranslations() {
        const csv = [
            ['Timestamp', 'Original', 'Translation', 'Transliteration'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated,
                t.transliterated
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `translations_${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}