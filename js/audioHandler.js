// audioHandler.js
export default class AudioHandler {
  constructor() {
      this.recognition = null;
      this.isRecording = false;
      this.currentText = '';
      this.wordCount = 0;
      this.MAX_WORDS = 12;
      this.selectedLanguage = 'hi-IN';
      this.transcriptionMode = 'local';
  }

  async initialize() {
      try {
          if (!('webkitSpeechRecognition' in window)) {
              throw new Error('Speech recognition not supported');
          }

          this.recognition = new webkitSpeechRecognition();
          this.setupContinuousRecognition();
          return true;
      } catch (error) {
          console.error('Audio initialization error:', error);
          return false;
      }
  }

  setTranscriptionMode(mode, selectedLanguage) {
      this.transcriptionMode = mode;
      this.selectedLanguage = selectedLanguage;
      
      if (this.recognition) {
          this.recognition.lang = this.transcriptionMode === 'local' ? 
              this.selectedLanguage : 'en-US';
      }
  }

  setupContinuousRecognition() {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.transcriptionMode === 'local' ? 
          this.selectedLanguage : 'en-US';

      this.recognition.onresult = (event) => {
          const result = event.results[event.results.length - 1];
          const transcript = result[0].transcript;
          
          const words = transcript.trim().split(/\s+/);
          this.wordCount = words.length;

          if (this.wordCount >= this.MAX_WORDS || result.isFinal) {
              this.processChunk(transcript, result.isFinal);
              this.currentText = '';
              this.wordCount = 0;
          } else {
              this.currentText = transcript;
              window.dispatchEvent(new CustomEvent('interimResult', {
                  detail: { text: transcript }
              }));
          }
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

  processChunk(text, isFinal) {
      window.dispatchEvent(new CustomEvent('speechResult', {
          detail: {
              transcript: text,
              isFinal: isFinal
          }
      }));
  }

  async startRecording(languageCode) {
      try {
          if (this.isRecording) return;

          this.selectedLanguage = languageCode;
          this.recognition.lang = this.transcriptionMode === 'local' ? 
              languageCode : 'en-US';

          await this.recognition.start();
          this.isRecording = true;

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

          await this.recognition.stop();
          this.isRecording = false;

          window.dispatchEvent(new CustomEvent('recordingStateChange', {
              detail: { isRecording: false }
          }));

      } catch (error) {
          console.error('Stop recording error:', error);
      }
  }
}