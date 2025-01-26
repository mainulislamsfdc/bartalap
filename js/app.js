// js/app.js
class App {
    constructor() {
        this.audioHandler = new AudioHandler();
        this.translationService = new TranslationService();
        this.uiController = new UIController();
        
        this.initialize();
        this.setupEventListeners();
    }

    async initialize() {
        try {
            // Initialize audio handler
            const isAudioInitialized = await this.audioHandler.initialize();
            if (!isAudioInitialized) {
                throw new Error('Failed to initialize audio');
            }

            // Register service worker
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('./sw.js');
                    console.log('Service Worker registered');
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }

            // Load saved translations from local storage
            this.loadSavedTranslations();

        } catch (error) {
            console.error('Initialization error:', error);
            alert('Error initializing app. Please check console for details.');
        }
    }

    setupEventListeners() {
        // Mic button click handler
        this.uiController.micButton.addEventListener('click', () => {
            if (this.audioHandler.isRecording) {
                this.audioHandler.stopRecording();
            } else {
                const selectedLanguage = this.uiController.languageSelect.value;
                this.audioHandler.startRecording(selectedLanguage);
            }
        });

        // Clear button click handler
        this.uiController.clearButton.addEventListener('click', () => {
            this.translationService.clearTranslations();
            this.uiController.clearTranslations();
            this.saveTranslations();
        });

        // Export button click handler
        this.uiController.exportButton.addEventListener('click', () => {
            this.translationService.exportTranslations();
        });

        // Speech recognition result handler
        window.addEventListener('speechResult', async (event) => {
            const { transcript, isFinal } = event.detail;
            
            // Update current text
            this.uiController.updateCurrentText(transcript);

            if (isFinal) {
                try {
                    const selectedLanguage = this.uiController.languageSelect.value;
                    const sourceLang = selectedLanguage.split('-')[0]; // Extract language code (e.g., 'hi' from 'hi-IN')
                    
                    // Get translation
                    const translation = await this.translationService.translateText(
                        transcript,
                        sourceLang,
                        'en'
                    );

                    // Add to UI
                    const translationEntry = {
                        original: transcript,
                        translated: translation,
                        timestamp: new Date()
                    };
                    this.uiController.addTranslation(translationEntry);

                    // Save to local storage
                    this.saveTranslations();

                } catch (error) {
                    console.error('Translation error:', error);
                    alert('Error during translation. Please try again.');
                }
            }
        });

        // Recording state change handler
        window.addEventListener('recordingStateChange', (event) => {
            const { isRecording } = event.detail;
            this.uiController.updateRecordingState(isRecording);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.audioHandler.isRecording) {
                this.audioHandler.stopRecording();
            }
        });
    }

    saveTranslations() {
        try {
            localStorage.setItem(
                'translations',
                JSON.stringify(this.translationService.translations)
            );
        } catch (error) {
            console.error('Error saving translations:', error);
        }
    }

    loadSavedTranslations() {
        try {
            const savedTranslations = localStorage.getItem('translations');
            if (savedTranslations) {
                const translations = JSON.parse(savedTranslations);
                translations.forEach(t => {
                    t.timestamp = new Date(t.timestamp); // Convert timestamp strings back to Date objects
                    this.translationService.translations.push(t);
                    this.uiController.addTranslation(t);
                });
            }
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});