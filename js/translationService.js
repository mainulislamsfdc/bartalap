// translationService.js
export default class TranslationService {
    constructor() {
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
            console.error('DEBUG: Translation service is not configured (missing API_KEY)');
            throw new Error('Translation service is not properly configured');
        }

        const sourceCode = sourceLang.split('-')[0];
        const targetCode = targetLang.split('-')[0];

        try {
            // First, get the translation
            console.log('DEBUG: Sending translation request to API');
            const translationResponse = await fetch(
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

            if (!translationResponse.ok) {
                throw new Error(`HTTP error! status: ${translationResponse.status}`);
            }

            const translationData = await translationResponse.json();
            const translation = translationData.data.translations[0].translatedText;

            // If target language is not English, get transliteration
            if (targetCode !== 'en') {
                console.log('DEBUG: Getting transliteration for non-English target');
                const transliterationResponse = await fetch(
                    `https://translation.googleapis.com/language/translate/v2/transliterate?key=${this.apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            q: translation,
                            target_language: 'en',
                            source_language: targetCode
                        })
                    }
                );

                if (!transliterationResponse.ok) {
                    throw new Error(`Transliteration HTTP error! status: ${transliterationResponse.status}`);
                }

                const transliterationData = await transliterationResponse.json();
                const transliteration = transliterationData.data.translations[0].translatedText;

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
            }

            // If target is English, no transliteration needed
            this.translations.push({
                original: text,
                translated: translation,
                sourceLang: sourceCode,
                targetLang: targetCode,
                timestamp: new Date()
            });

            return {
                translation,
                transliteration: translation // Same as translation for English
            };

        } catch (error) {
            console.error('DEBUG: Translation/Transliteration error:', error);
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
            ['Timestamp', 'Original', 'Translation', 'Transliteration', 'Source Language', 'Target Language'],
            ...this.translations.map(t => [
                t.timestamp.toISOString(),
                t.original,
                t.translated,
                t.transliterated || t.translated,
                t.sourceLang,
                t.targetLang
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

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