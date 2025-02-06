// translationService.js
export default class TranslationService {
    constructor() {
        this.apiKey = process.env.API_KEY;
        this.isConfigured = !!this.apiKey;
        if (!this.apiKey) {
            console.warn('DEBUG: API key not found');
        }
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang) {
        console.log('DEBUG: Translation requested', {
            text, sourceLang, targetLang, isConfigured: this.isConfigured
        });

        if (!this.isConfigured) {
            throw new Error('Translation service not configured');
        }

        const sourceCode = sourceLang.split('-')[0];
        const targetCode = targetLang.split('-')[0];

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: text,
                        source: sourceCode,
                        target: targetCode,
                        format: 'text'
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const translation = data.data.translations[0].translatedText;

            this.translations.push({
                original: text,
                translated: translation,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
            });

            return translation;

        } catch (error) {
            console.error('DEBUG: Translation error:', error);
            throw error;
        }
    }

    clearTranslations() {
        this.translations = [];
    }

    exportTranslations() {
        const csv = [
            ['Timestamp', 'Original', 'Translation'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated
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