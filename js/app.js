// app.js

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

import TranslationService from './translationService.js';
import AudioHandler from './audioHandler.js';
import UIController from './uiController.js';
import { initializePWAInstall } from './pwaInstall.js'; 
import { audioStateManager } from './audioStateManager.js';

class App {
    constructor() {
        console.log('DEBUG: Initializing App');
        this.audioHandler = new AudioHandler();
        this.translationService = new TranslationService();
        this.uiController = new UIController();
        this.initialize();
        this.setupEventListeners();

        initializePWAInstall();
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
            const currentState = this.audioHandler.recordingState || audioStateManager.state.recordingState;
            console.log('Current recording state:', currentState);
            
            if (window.speechSynthesis.speaking) {
                console.log('Speech is active, blocking mic action');
                return;
            }
    
            switch (currentState) {
                case 'stopped':
                    const selectedLanguage = this.uiController.sourceLanguageSelect.value;
                    console.log('Starting recording with language:', selectedLanguage);
                    this.audioHandler.startRecording(selectedLanguage);
                    break;
                case 'recording':
                    console.log('Pausing recording');
                    this.audioHandler.pauseRecording();
                    break;
                case 'paused':
                    console.log('Resuming recording');
                    this.audioHandler.resumeRecording();
                    break;
            }
        });
    

        // Add a long press or double click to stop completely
        this.uiController.micButton.addEventListener('dblclick', (e) => {
            e.preventDefault();
            this.audioHandler.stopRecording();
        });

        window.addEventListener('recordingStateChange', (event) => {
            const { state } = event.detail;
            this.uiController.updateRecordingState(state);
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
    const app = new App();
});