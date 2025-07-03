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
       // console.log('DEBUG: Setting languages:', { sourceLang, targetLang });
        this.sourceLang = sourceLang;
        this.targetLang = targetLang;

        if (this.recognition) {
            this.recognition.lang = this.sourceLang;
        }
    }

    async initialize() {
        try {
           // console.log('DEBUG: Initializing AudioHandler');
            if (!('webkitSpeechRecognition' in window)) {
                throw new Error('Speech recognition not supported');
            }

            this.recognition = new webkitSpeechRecognition();
            
            this.setupRecognition();
           // console.log('DEBUG: AudioHandler initialized successfully');
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
            this.isRecording = true;
            audioStateManager.setState({ 
                isRecording: true, 
                recordingState: 'recording' 
            });
        };

        this.recognition.onend = () => {
            if (audioStateManager.state.recordingState === 'recording') {
                // Only restart if we're supposed to be recording
                this.restartRecognition();
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                this.restartRecognition();
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

    setupContinuousRecognition() {
       // console.log('DEBUG: Setting up continuous recognition');
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = this.sourceLang;

        this.recognition.onresult = (event) => {
           // console.log('DEBUG: Recognition result received');
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                  //  console.log('DEBUG: Final transcript:', transcript);
                    finalTranscript += transcript;
                    this.processChunk(transcript.trim(), true);
                } else {
                    interimTranscript += transcript;
                }
            }

            if (interimTranscript) {
                //console.log('DEBUG: Interim transcript:', interimTranscript);
                this.processChunk(interimTranscript.trim(), false);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('DEBUG: Recognition error:', event.error);
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                this.restartRecognition();
            } else {
                this.stopRecording();
            }
        };

        this.recognition.onend = () => {
          //  console.log('DEBUG: Recognition ended');
            if (this.isRecording) {
            //    console.log('DEBUG: Restarting recognition');
                this.restartRecognition();
            }
        };
    }

processChunk(text, isFinal, isFromTranslation = false) {
    if (text && !isFromTranslation) {
        window.dispatchEvent(new CustomEvent('speechResult', {
            detail: {
                transcript: text,
                isFinal: isFinal
                }
            }));
        }
    }

    restartRecognition() {
        try {
          //  console.log('DEBUG: Attempting to restart recognition');
            this.recognition.start();
        } catch (error) {
            console.error('DEBUG: Error restarting recognition:', error);
            setTimeout(() => {
                if (this.isRecording) {
                //    console.log('DEBUG: Retrying recognition start');
                    this.recognition.start();
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

            this.recognition.lang = languageCode;
            await this.recognition.start();
            this.isRecording = true;
            this.recordingState = 'recording';
            audioStateManager.startRecording();

        } catch (error) {
            console.error('Start recording error:', error);
            this.stopRecording();
        }
    }

            pauseRecording() {
            try {
                if (audioStateManager.state.recordingState !== 'recording') return;

                this.recognition.stop();
                this.isRecording = false;
                this.recordingState = 'paused';
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
                this.startRecording(this.recognition.lang);
            } catch (error) {
                console.error('Resume recording error:', error);
            }
        }

        async stopRecording() {
            try {
                await this.recognition.stop();
                this.isRecording = false;
                this.recordingState = 'stopped';
                audioStateManager.stopRecording();
            } catch (error) {
                console.error('Stop recording error:', error);
            }
        }

    processTranscript(text, isFinal) {
        if (text) {
            window.dispatchEvent(new CustomEvent('speechResult', {
                detail: { transcript: text, isFinal }
            }));
        }
    }

    restartRecognition() {
        if (audioStateManager.state.recordingState === 'recording' && !audioStateManager.state.isSpeaking) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error restarting recognition:', error);
                setTimeout(() => this.restartRecognition(), 1000);
            }
        }
    }
}
