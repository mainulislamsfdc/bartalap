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
            // Single translation request with romanization
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}&target=${targetCode}&source=${sourceCode}&format=text&model=nmt&q=${encodeURIComponent(text)}`
            );

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            const translation = data.data.translations[0].translatedText;
            // Get romanization if available
            const pronunciation = data.data.translations[0].transliteration || translation;

            this.translations.push({
                original: text,
                translated: translation,
                pronunciation,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
            });

            return {
                translation,
                pronunciation
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
            ['Timestamp', 'Original', 'Translation', 'Pronunciation'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated,
                t.pronunciation
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