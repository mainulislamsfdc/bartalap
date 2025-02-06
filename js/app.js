// app.js
import TranslationService from './translationService.js';
import AudioHandler from './audioHandler.js';
import UIController from './uiController.js';

class App {
    constructor() {
        console.log('DEBUG: Initializing App');
        this.audioHandler = new AudioHandler();
        this.translationService = new TranslationService();
        this.uiController = new UIController();
        this.initialize();
        this.setupEventListeners();
    }

    async initialize() {
        try {
            console.log('DEBUG: Starting initialization');
            const isAudioInitialized = await this.audioHandler.initialize();
            if (!isAudioInitialized) {
                throw new Error('Failed to initialize audio');
            }
            console.log('DEBUG: Audio initialized successfully');

            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('./sw.js');
                    console.log('Service Worker registered');
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }

        } catch (error) {
            console.error('Initialization error:', error);
            alert('Error initializing app. Please check console for details.');
        }
    }

    setupEventListeners() {
        console.log('DEBUG: Setting up event listeners');
        
        this.uiController.micButton.addEventListener('click', () => {
            console.log('DEBUG: Mic button clicked');
            if (this.audioHandler.isRecording) {
                this.audioHandler.stopRecording();
            } else {
                const selectedLanguage = this.uiController.sourceLanguageSelect.value;
                console.log('DEBUG: Starting recording with language:', selectedLanguage);
                this.audioHandler.startRecording(selectedLanguage);
            }
        });

        window.addEventListener('speechResult', async (event) => {
            const { transcript, isFinal } = event.detail;
            console.log('DEBUG: Speech result received:', { transcript, isFinal });
            
            this.uiController.updateCurrentText(transcript);

            if (isFinal) {
                try {
                    const sourceLang = this.uiController.sourceLanguageSelect.value;
                    const targetLang = this.uiController.targetLanguageSelect.value;
                    
                    console.log('DEBUG: Translation request details:', {
                        text: transcript,
                        sourceLang,
                        targetLang
                    });

                    const translation = await this.translationService.translateText(
                        transcript,
                        sourceLang,
                        targetLang
                    );

                    console.log('DEBUG: Translation received:', translation);

                    this.uiController.addTranslation({
                        original: transcript,
                        translated: translation.translation,  // Extract translated text
                        transliteration: translation.pronunciation,  // Fix key name
                        timestamp: new Date()
                    });

                } catch (error) {
                    console.error('DEBUG: Translation error:', error);
                    this.uiController.showError('Error during translation. Please try again.');
                }
            }
        });

        window.addEventListener('recordingStateChange', (event) => {
            const { isRecording } = event.detail;
            console.log('DEBUG: Recording state changed:', isRecording);
            this.uiController.updateRecordingState(isRecording);
        });

        // Add language change event listener
        window.addEventListener('languageChange', (event) => {
            const { sourceLang, targetLang } = event.detail;
            console.log('DEBUG: Language change event:', { sourceLang, targetLang });
            this.audioHandler.setLanguages(sourceLang, targetLang);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DEBUG: DOM Content Loaded - Creating App instance');
    new App();
});