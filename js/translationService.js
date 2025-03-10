import { transliterate } from "transliteration";
// translationService.js
export default class TranslationService {
    constructor() {
        this.apiKey = process.env.API_KEY;
        this.isConfigured = !!this.apiKey;
        this.translations = [];
    }



async translateText(text, sourceLang, targetLang) {
    if (!this.isConfigured) {
        throw new Error("Translation service not configured");
    }

    const sourceCode = sourceLang.split("-")[0];
    const targetCode = targetLang.split("-")[0];

    try {
        // Google Translate API
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}&target=${targetCode}&source=${sourceCode}&format=text&model=nmt&q=${encodeURIComponent(text)}`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const translation = data.data.translations[0].translatedText;
        let pronunciation = transliterate(translation); // Use manual transliteration

        console.log(`DEBUG: Final output -> Translation: ${translation}, Pronunciation: ${pronunciation}`);

        this.translations.push({
            original: text,
            translated: translation,
            pronunciation,
            sourceLang: sourceCode,
            targetLang: targetCode,
            timestamp: new Date(),
        });

        return {
            translation,
            pronunciation,
        };
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
}

    
    // Separate API request to Google Input Tools for transliteration
    async getTransliteration(text, targetLang) {
        try {
            console.log(`DEBUG: Fetching transliteration for: ${text} in ${targetLang}`);
    
            const response = await fetch(
                `https://inputtools.google.com/request?itc=${targetLang}-t-i0-und&text=${encodeURIComponent(text)}`
            );
    
            if (!response.ok) throw new Error('Failed to fetch transliteration');
            const data = await response.json();
    
            console.log(`DEBUG: Transliteration response ->`, data);
    
            return data[1]?.[0]?.[1]?.[0] || text; // Extract transliteration or return original text
        } catch (error) {
            console.warn('Transliteration failed:', error);
            return text; // Return original text as fallback
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