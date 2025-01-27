// js/translationService.js
class TranslationService {
    constructor() {
        if (!window.appConfig?.apiKeys?.translation) {
            throw new Error('API key not configured');
        }
        this.apiKey = window.appConfig.apiKeys.translation;
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang = 'en') {
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
                        source: sourceLang,
                        target: targetLang,
                        format: 'text'
                    })
                }
            );

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            const translation = data.data.translations[0].translatedText;
            
            // Add to translations history
            this.translations.push({
                original: text,
                translated: translation,
                timestamp: new Date()
            });

            return translation;
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