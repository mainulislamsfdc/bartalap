class StorageService {
    constructor() {
        this.prefix = 'bartalap1_';
    }

    saveTranslations(translations) {
        localStorage.setItem(
            `${this.prefix}translations`,
            JSON.stringify(translations)
        );
    }

    getTranslations() {
        const saved = localStorage.getItem(`${this.prefix}translations`);
        return saved ? JSON.parse(saved) : [];
    }

    clearTranslations() {
        localStorage.removeItem(`${this.prefix}translations`);
    }
}