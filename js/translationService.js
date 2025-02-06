// translationService.js
export default class TranslationService {
    constructor() {
        // Get API key from webpack-injected environment variable
        this.apiKey = process.env.API_KEY;
        
        if (!this.apiKey) {
            console.warn('DEBUG: API key not found in process.env.API_KEY');
            this.isConfigured = false;
        } else {
            console.log('DEBUG: Translation service configured with API key');
            this.isConfigured = true;
        }
        
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang) {
        console.log('DEBUG: Translation requested', {
            text,
            sourceLang,
            targetLang,
            isConfigured: this.isConfigured
        });

        if (!this.isConfigured) {
            console.error('DEBUG: Translation service is not configured (missing API key)');
            throw new Error('Translation service is not properly configured');
        }

        const sourceCode = sourceLang.split('-')[0];
        const targetCode = targetLang.split('-')[0];

        try {
            console.log('DEBUG: Sending translation request to API');
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: text,
                        source: sourceCode,  // Using language code without region
                        target: targetCode,  // Using language code without region
                        format: 'text'
                    })
                }
            );

            console.log('DEBUG: Received API response', {
                status: response.status,
                ok: response.ok
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                console.error('DEBUG: API returned error', data.error);
                throw new Error(data.error.message);
            }

            const translation = data.data.translations[0].translatedText;
            
            this.translations.push({
                original: text,
                translated: translation,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
            });

            console.log('DEBUG: Translation successful', {
                original: text,
                translated: translation
            });

            return translation;
        } catch (error) {
            console.error('DEBUG: Translation error:', error);
            throw error;
        }
    }

    clearTranslations() {
        console.log('DEBUG: Clearing translations history');
        this.translations = [];
    }

    exportTranslations() {
        console.log('DEBUG: Exporting translations to CSV');
        const csv = [
            ['Timestamp', 'Original', 'Translation', 'Source Language', 'Target Language'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated,
                t.sourceLang,
                t.targetLang
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