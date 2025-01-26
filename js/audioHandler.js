// js/audioHandler.js
class AudioHandler {
    constructor() {
        this.recognition = null;
        this.isRecording = false;
        this.wakeLock = null;
        this.silenceTimer = null;
    }

    async initialize() {
        try {
            // Check for Speech Recognition support
            if (!('webkitSpeechRecognition' in window)) {
                throw new Error('Speech recognition not supported');
            }

            this.recognition = new webkitSpeechRecognition();
            this.setupRecognition();
            return true;
        } catch (error) {
            console.error('Audio initialization error:', error);
            return false;
        }
    }

    setupRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            const isFinal = result.isFinal;

            // Dispatch custom event with the result
            window.dispatchEvent(new CustomEvent('speechResult', {
                detail: { transcript, isFinal }
            }));

            // Reset silence timer
            this.resetSilenceTimer();
        };

        this.recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            this.stopRecording();
        };

        this.recognition.onend = () => {
            if (this.isRecording) {
                this.recognition.start();
            }
        };
    }

    async startRecording(languageCode) {
        try {
            if (this.isRecording) return;

            // Request wake lock to keep screen active
            try {
                this.wakeLock = await navigator.wakeLock.request('screen');
            } catch (err) {
                console.log('Wake Lock not supported');
            }

            this.recognition.lang = languageCode;
            await this.recognition.start();
            this.isRecording = true;
            this.resetSilenceTimer();

            // Dispatch recording state change event
            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { isRecording: true }
            }));

        } catch (error) {
            console.error('Start recording error:', error);
            this.stopRecording();
        }
    }

    async stopRecording() {
        try {
            if (!this.isRecording) return;

            // Release wake lock
            if (this.wakeLock) {
                await this.wakeLock.release();
                this.wakeLock = null;
            }

            await this.recognition.stop();
            this.isRecording = false;
            clearTimeout(this.silenceTimer);

            // Dispatch recording state change event
            window.dispatchEvent(new CustomEvent('recordingStateChange', {
                detail: { isRecording: false }
            }));

        } catch (error) {
            console.error('Stop recording error:', error);
        }
    }

    resetSilenceTimer() {
        clearTimeout(this.silenceTimer);
        this.silenceTimer = setTimeout(() => {
            this.stopRecording();
        }, 60000); // 60 seconds silence timeout
    }
}