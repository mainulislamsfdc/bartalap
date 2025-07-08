// audioHandler.js
import { audioStateManager } from './audioStateManager.js';

export default class AudioHandler {
    constructor() {
        if (typeof window === 'undefined') {
            throw new Error('AudioHandler requires a browser environment');
        }
        this.recognition = null;
        this.isRecording = false;
        this.buffer = "";
        this.lastProcessedTimestamp = Date.now();
        this.processingTimeout = null;
        this.sourceLang = "en-US";
        this.targetLang = "kn-IN";
        this.pendingLanguageChange = false;
        this.isRestarting = false; // Add flag to prevent concurrent restarts
        
        // Subscribe to state changes
        audioStateManager.subscribe(state => {
            this.handleStateChange(state);
        });
    }

    handleStateChange(state) {
        if (state.isSpeaking && this.recognition && this.recordingState === 'recording') {
            this.stopRecording(); // Only stop if it was recording
        }
    }

    setLanguages(sourceLang, targetLang) {
        console.log('DEBUG: Setting languages:', { sourceLang, targetLang });
        const oldSourceLang = this.sourceLang;
        this.sourceLang = sourceLang;
        this.targetLang = targetLang;

        // If we're currently recording and the source language changed, restart recognition
        if (this.recognition && 
            audioStateManager.state.recordingState === 'recording' && 
            oldSourceLang !== sourceLang) {
            
            console.log('DEBUG: Language changed during recording, restarting with new language');
            this.restartRecognitionWithNewLanguage(sourceLang);
        } else if (this.recognition) {
            // Just update the language for next time
            this.recognition.lang = sourceLang;
        }
    }

    async restartRecognitionWithNewLanguage(newLanguage) {
        if (this.isRestarting) {
            console.log('DEBUG: Already restarting recognition, skipping');
            return;
        }

        this.isRestarting = true;
        
        try {
            // Stop current recognition if it's running
            if (this.recognition) {
                this.recognition.stop();
            }
            
            // Wait for the recognition to fully stop
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Update language and restart
            this.recognition.lang = newLanguage;
            
            // Only start if we're supposed to be recording
            if (audioStateManager.state.recordingState === 'recording') {
                this.recognition.start();
                console.log('DEBUG: Recognition restarted with new language:', newLanguage);
            }
        } catch (error) {
            console.error('DEBUG: Error restarting recognition with new language:', error);
            // Fallback: try again after a longer delay
            setTimeout(() => {
                if (audioStateManager.state.recordingState === 'recording' && !this.isRestarting) {
                    this.recognition.lang = newLanguage;
                    try {
                        this.recognition.start();
                    } catch (e) {
                        console.error('DEBUG: Fallback restart failed:', e);
                    }
                }
            }, 500);
        } finally {
            this.isRestarting = false;
        }
    }

    async initialize() {
        try {
            console.log('DEBUG: Initializing AudioHandler');
            if (!('webkitSpeechRecognition' in window)) {
                throw new Error('Speech recognition not supported');
            }

            this.recognition = new webkitSpeechRecognition();
            this.setupRecognition();
            console.log('DEBUG: AudioHandler initialized successfully');
            return true;
        } catch (error) {
            console.error('DEBUG: Audio initialization error:', error);
            return false;
        }
    }

    setupRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = this.sourceLang;

        this.recognition.onstart = () => {
            console.log('DEBUG: Recognition started with language:', this.recognition.lang);
            this.isRecording = true;
            this.isRestarting = false; // Clear restart flag when successfully started
            audioStateManager.setState({ 
                isRecording: true, 
                recordingState: 'recording' 
            });
        };

        this.recognition.onend = () => {
            console.log('DEBUG: Recognition ended');
            // Only restart if we're supposed to be recording and not already restarting
            if (audioStateManager.state.recordingState === 'recording' && !this.isRestarting) {
                this.restartRecognition();
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            this.isRestarting = false; // Clear restart flag on error
            
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                this.restartRecognition();
            } else if (event.error === 'aborted') {
                // Don't restart on aborted - this usually means we stopped intentionally
                console.log('DEBUG: Recognition aborted, not restarting');
            } else {
                this.stopRecording();
            }
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
    
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    this.processChunk(transcript.trim(), true);
                } else {
                    interimTranscript += transcript;
                }
            }
    
            if (interimTranscript) {
                this.processChunk(interimTranscript.trim(), false);
            }
        };
    }

    processChunk(text, isFinal, isFromTranslation = false) {
        if (text && !isFromTranslation) {
            console.log('DEBUG: Processing chunk:', { text, isFinal, currentLang: this.recognition.lang });
            window.dispatchEvent(new CustomEvent('speechResult', {
                detail: {
                    transcript: text,
                    isFinal: isFinal
                }
            }));
        }
    }

    restartRecognition() {
        if (this.isRestarting) {
            console.log('DEBUG: Already restarting recognition, skipping');
            return;
        }

        this.isRestarting = true;
        
        try {
            console.log('DEBUG: Attempting to restart recognition with language:', this.sourceLang);
            
            // Make sure we're using the current source language
            this.recognition.lang = this.sourceLang;
            
            // Add a small delay to ensure the previous recognition has fully stopped
            setTimeout(() => {
                if (audioStateManager.state.recordingState === 'recording' && this.isRestarting) {
                    try {
                        this.recognition.start();
                    } catch (error) {
                        console.error('DEBUG: Error in delayed restart:', error);
                        this.isRestarting = false;
                    }
                } else {
                    this.isRestarting = false;
                }
            }, 100);
            
        } catch (error) {
            console.error('DEBUG: Error restarting recognition:', error);
            this.isRestarting = false;
            
            // Fallback with longer delay
            setTimeout(() => {
                if (audioStateManager.state.recordingState === 'recording' && !this.isRestarting) {
                    console.log('DEBUG: Retrying recognition start');
                    this.isRestarting = true;
                    this.recognition.lang = this.sourceLang;
                    try {
                        this.recognition.start();
                    } catch (e) {
                        console.error('DEBUG: Fallback restart failed:', e);
                        this.isRestarting = false;
                    }
                }
            }, 1000);
        }
    }

    async startRecording(languageCode) {
        try {
            if (audioStateManager.state.isSpeaking) {
                console.log('Cannot start recording while speaking');
                return;
            }

            if (this.isRestarting) {
                console.log('DEBUG: Cannot start recording while restarting');
                return;
            }

            console.log('DEBUG: Starting recording with language:', languageCode);
            this.sourceLang = languageCode;
            this.recognition.lang = languageCode;
            
            // Make sure recognition is stopped before starting
            if (this.isRecording) {
                this.recognition.stop();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            await this.recognition.start();
            this.isRecording = true;
            this.recordingState = 'recording';
            audioStateManager.startRecording();

        } catch (error) {
            console.error('Start recording error:', error);
            this.isRestarting = false;
            this.stopRecording();
        }
    }

    pauseRecording() {
        try {
            if (audioStateManager.state.recordingState !== 'recording') return;

            this.recognition.stop();
            this.isRecording = false;
            this.recordingState = 'paused';
            this.isRestarting = false; // Clear restart flag when pausing
            audioStateManager.setState({
                isRecording: false,
                recordingState: 'paused'
            });

        } catch (error) {
            console.error('Pause recording error:', error);
        }
    }

    resumeRecording() {
        try {
            if (audioStateManager.state.recordingState !== 'paused') return;
            // Use the current source language when resuming
            this.startRecording(this.sourceLang);
        } catch (error) {
            console.error('Resume recording error:', error);
        }
    }

    async stopRecording() {
        try {
            this.isRestarting = false; // Clear restart flag when stopping
            if (this.recognition) {
                this.recognition.stop();
            }
            this.isRecording = false;
            this.recordingState = 'stopped';
            audioStateManager.stopRecording();
        } catch (error) {
            console.error('Stop recording error:', error);
        }
    }
}