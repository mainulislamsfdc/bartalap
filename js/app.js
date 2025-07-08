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

        // Initialize PWA install functionality
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

            // Enhanced service worker registration with update handling
            if ('serviceWorker' in navigator) {
                try {
                    // First, unregister any existing service workers to avoid conflicts
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    for (let registration of registrations) {
                        console.log('Unregistering existing service worker');
                        await registration.unregister();
                    }

                    // Wait a moment before registering the new one
                    await new Promise(resolve => setTimeout(resolve, 100));

                    // Register the service worker with proper path
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                        scope: '/'
                    });
                    
                    console.log('Service Worker registered successfully:', registration);

                    // Handle service worker updates
                    registration.addEventListener('updatefound', () => {
                        console.log('Service Worker update found');
                        const newWorker = registration.installing;
                        
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed') {
                                    if (navigator.serviceWorker.controller) {
                                        console.log('New service worker available');
                                        this.showUpdateNotification();
                                    } else {
                                        console.log('Service worker installed for the first time');
                                    }
                                }
                            });
                        }
                    });

                    // Listen for service worker messages
                    navigator.serviceWorker.addEventListener('message', (event) => {
                        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                            this.showUpdateNotification();
                        }
                    });

                    // Check for updates periodically (every 60 seconds instead of 30)
                    setInterval(() => {
                        if (registration) {
                            registration.update().catch(error => {
                                console.warn('Service worker update check failed:', error);
                            });
                        }
                    }, 60000);

                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                    // Don't show alert for service worker errors in development
                    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                        console.warn('Service Worker not available in this environment');
                    }
                }
            }

        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Error initializing app. Please refresh the page.');
        }
    }

    showUpdateNotification() {
        // Create a simple update notification
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <span>🔄 Update available!</span>
                <button onclick="window.location.reload()" class="update-button">Reload</button>
                <button onclick="this.parentElement.parentElement.remove()" class="dismiss-button">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 229, 255, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
        `;
        
        const updateContent = notification.querySelector('.update-content');
        updateContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const updateButton = notification.querySelector('.update-button');
        updateButton.style.cssText = `
            background: white;
            color: #00E5FF;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        `;
        
        const dismissButton = notification.querySelector('.dismiss-button');
        dismissButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            margin-left: auto;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    showError(message) {
        console.error('App Error:', message);
        // You can implement a proper error notification here
        // For now, we'll just use console.error
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
                        translated: translation.translation,
                        transliteration: translation.pronunciation,
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