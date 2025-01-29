// app.js
import TranslationService from './translationService.js';
import AudioHandler from './audioHandler.js';
import UIController from './uiController.js';
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
            const isAudioInitialized = await this.audioHandler.initialize();
            if (!isAudioInitialized) {
                throw new Error('Failed to initialize audio');
            }

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
        this.uiController.micButton.addEventListener('click', () => {
            if (this.audioHandler.isRecording) {
                this.audioHandler.stopRecording();
            } else {
                const selectedLanguage = this.uiController.languageSelect.value;
                this.audioHandler.startRecording(selectedLanguage);
            }
        });

        this.uiController.clearButton.addEventListener('click', () => {
            this.translationService.clearTranslations();
            this.uiController.clearTranslations();
        });

        this.uiController.exportButton.addEventListener('click', () => {
            this.translationService.exportTranslations();
        });

        window.addEventListener('speechResult', async (event) => {
            const { transcript, isFinal } = event.detail;
            
            this.uiController.updateCurrentText(transcript);

            if (isFinal) {
                try {
                    const selectedLanguage = this.uiController.languageSelect.value;
                    const sourceLang = selectedLanguage.split('-')[0];
                    
                    const translation = await this.translationService.translateText(
                        transcript,
                        sourceLang,
                        'en'
                    );

                    this.uiController.addTranslation({
                        original: transcript,
                        translated: translation,
                        timestamp: new Date()
                    });

                } catch (error) {
                    console.error('Translation error:', error);
                    alert('Error during translation. Please try again.');
                }
            }
        });

        window.addEventListener('recordingStateChange', (event) => {
            const { isRecording } = event.detail;
            this.uiController.updateRecordingState(isRecording);
        });

        window.addEventListener('transcriptionModeChange', (event) => {
            const { mode, selectedLanguage } = event.detail;
            this.audioHandler.setTranscriptionMode(mode, selectedLanguage);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});