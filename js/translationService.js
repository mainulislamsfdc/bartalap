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
            // First translation: Source to target language
            const translationResponse = await fetch(
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

            if (!translationResponse.ok) throw new Error(`HTTP error! status: ${translationResponse.status}`);
            const translationData = await translationResponse.json();
            const translation = translationData.data.translations[0].translatedText;

            // Get the pronunciation for each word
            const words = translation.split(' ');
            const pronunciationPromises = words.map(word => 
                fetch(
                    `https://translation.googleapis.com/language/translate/v2/transliterate?key=${this.apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            q: word,
                            target_language: 'en',
                            source_language: targetCode
                        })
                    }
                ).then(res => res.json())
            );

            const pronunciationResults = await Promise.all(pronunciationPromises);
            const pronunciation = pronunciationResults
                .map(result => result.data?.translations?.[0]?.translatedText || '')
                .join(' ');

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