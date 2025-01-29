// translationService.js
export default class TranslationService {
    constructor() {
        // Get API key from webpack-injected environment variable
        this.apiKey = process.env.API_KEY;
        
        if (!this.apiKey) {
            console.error('API key not found. Some features may be limited.');
            // Don't throw error, set a flag instead
            this.isConfigured = false;
        } else {
            this.isConfigured = true;
        }
        
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang = 'en') {
        if (!this.isConfigured) {
            throw new Error('Translation service is not properly configured. Please check your API key.');
        }

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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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
