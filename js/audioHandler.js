// audioHandler.js
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
        this.recordingState = 'stopped';
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
            this.setupContinuousRecognition();
           // console.log('DEBUG: AudioHandler initialized successfully');
            return true;
        } catch (error) {
            console.error('DEBUG: Audio initialization error:', error);
            return false;
        }
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

    processChunk(text, isFinal) {
        if (text) {
         //   console.log('DEBUG: Processing chunk:', { text, isFinal });
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
           // console.log('DEBUG: Starting recording with language:', languageCode);
            if (this.isRecording) return;
            if (this.recordingState === 'recording') return;

            this.recognition.lang = languageCode;
            
            // Clear any existing state
            this.buffer = '';
            this.lastProcessedTimestamp = Date.now();
            clearTimeout(this.processingTimeout);

            await this.recognition.start();
            this.isRecording = true;
            this.recordingState = 'recording';

            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { isRecording: true,state: 'recording' }
            }));

           // console.log('DEBUG: Recording started successfully');
        } catch (error) {
            console.error('DEBUG: Start recording error:', error);
            this.stopRecording();
        }
    }

    pauseRecording() {
        try {
            if (this.recordingState !== 'recording') return;

            this.recognition.stop();
            this.isRecording = false;
            this.recordingState = 'paused';

            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { 
                    isRecording: false,
                    state: 'paused'
                }
            }));

        } catch (error) {
            console.error('DEBUG: Pause recording error:', error);
        }
    }

    resumeRecording() {
        try {
            if (this.recordingState !== 'paused') return;
            
            this.startRecording(this.recognition.lang);
        } catch (error) {
            console.error('DEBUG: Resume recording error:', error);
        }
    }

    async stopRecording() {
        try {
            if (this.recordingState === 'stopped') return;

            clearTimeout(this.processingTimeout);
            
            if (this.buffer.trim()) {
                this.processChunk(this.buffer.trim(), true);
                this.buffer = '';
            }

            await this.recognition.stop();
            this.isRecording = false;
            this.recordingState = 'stopped';

            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { 
                    isRecording: false,
                    state: 'stopped'
                }
            }));

        } catch (error) {
            console.error('DEBUG: Stop recording error:', error);
        }
    }
}