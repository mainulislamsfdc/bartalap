// translationService.js
export default class TranslationService {
    constructor() {
        // Specifically check for API_KEY
        this.apiKey = process.env.API_KEY;
        
        console.log('DEBUG: Checking environment setup');
        console.log('DEBUG: process.env available:', !!process.env);
        console.log('DEBUG: API_KEY found:', !!this.apiKey);
        
        if (!this.apiKey) {
            console.error('DEBUG: API_KEY not found in process.env');
            this.isConfigured = false;
        } else {
            console.log('DEBUG: Translation service configured with API key');
            this.isConfigured = true;
        }
        
        this.translations = [];
    }

    async translateText(text, sourceLang, targetLang) {
        if (!this.isConfigured) {
            console.error('DEBUG: Translation service is not configured (missing API_KEY)');
            throw new Error('Translation service is not properly configured - API_KEY missing');
        }

        const sourceCode = sourceLang.split('-')[0];
        const targetCode = targetLang.split('-')[0];

        try {
            console.log('DEBUG: Making translation request', {
                text: text.substring(0, 50) + '...',
                sourceCode,
                targetCode
            });

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
                const errorData = await response.json();
                console.error('DEBUG: Translation API error:', errorData);
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.data?.translations?.[0]?.translatedText) {
                throw new Error('Invalid response format from translation API');
            }

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
        if (this.translations.length === 0) {
            return;
        }

        const csv = [
            ['Timestamp', 'Original Text', 'Translated Text', 'Source Language', 'Target Language'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated,
                t.sourceLang,
                t.targetLang
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `translations_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}