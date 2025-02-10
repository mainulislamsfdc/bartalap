// audioHandler.js
export default class AudioHandler {
    constructor() {
        this.recognition = null;
        this.isRecording = false;
        this.buffer = "";
        this.lastProcessedTimestamp = Date.now();
        this.processingTimeout = null;
        this.sourceLang = "en-US";
        this.targetLang = "kn-IN";
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

            this.recognition.lang = languageCode;
            
            // Clear any existing state
            this.buffer = '';
            this.lastProcessedTimestamp = Date.now();
            clearTimeout(this.processingTimeout);

            await this.recognition.start();
            this.isRecording = true;

            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { isRecording: true }
            }));

           // console.log('DEBUG: Recording started successfully');
        } catch (error) {
            console.error('DEBUG: Start recording error:', error);
            this.stopRecording();
        }
    }

    async stopRecording() {
        try {
           // console.log('DEBUG: Stopping recording');
            if (!this.isRecording) return;

            clearTimeout(this.processingTimeout);
            
            // Process any remaining buffer before stopping
            if (this.buffer.trim()) {
                this.processChunk(this.buffer.trim(), true);
                this.buffer = '';
            }

            await this.recognition.stop();
            this.isRecording = false;

            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { isRecording: false }
            }));

            //console.log('DEBUG: Recording stopped successfully');
        } catch (error) {
            console.error('DEBUG: Stop recording error:', error);
        }
    }
}