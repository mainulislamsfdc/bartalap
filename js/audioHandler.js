// audioHandler.js
export default class AudioHandler {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.currentText = "";
    //this.wordCount = 0;
    //this.MAX_WORDS = 12;
    this.buffer = "";
    this.lastProcessedTimestamp = Date.now();
    this.CHUNK_INTERVAL = 5000; // Process every 5 seconds
    this.processingTimeout = null;
    this.sourceLang = "en-US";
    this.targetLang = "hi-IN";
  }

  setLanguages(sourceLang, targetLang) {
    this.sourceLang = sourceLang;
    this.targetLang = targetLang;

    if (this.recognition) {
      this.recognition.lang = this.sourceLang;
    }
  }

  async initialize() {
    try {
      if (!("webkitSpeechRecognition" in window)) {
        throw new Error("Speech recognition not supported");
      }

      this.recognition = new webkitSpeechRecognition();
      this.setupContinuousRecognition();
      return true;
    } catch (error) {
      console.error("Audio initialization error:", error);
      return false;
    }
  }

  setTranscriptionMode(mode, selectedLanguage) {
    this.transcriptionMode = mode;
    this.selectedLanguage = selectedLanguage;

    if (this.recognition) {
      this.recognition.lang =
        this.transcriptionMode === "local" ? this.selectedLanguage : "en-US";
    }
  }

  setupContinuousRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = this.sourceLang;
    //this.recognition.lang = this.transcriptionMode === 'local' ? this.selectedLanguage : 'en-US';

    // Collect all results
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    // Update buffer with final transcripts
    if (finalTranscript) {
      this.buffer += " " + finalTranscript;
      this.checkAndProcessBuffer();
    }

    this.recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;

      const words = transcript.trim().split(/\s+/);
      this.wordCount = words.length;

      if (this.wordCount >= this.MAX_WORDS || result.isFinal) {
        this.processChunk(transcript, result.isFinal);
        this.currentText = "";
        this.wordCount = 0;
      } else {
        this.currentText = transcript;
        window.dispatchEvent(
          new CustomEvent("interimResult", {
            detail: { text: transcript },
          })
        );
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      this.stopRecording();
    };

    this.recognition.onend = () => {
      if (this.isRecording) {
        this.recognition.start();
      }
    };
  }

  checkAndProcessBuffer() {
    const now = Date.now();

    // Process buffer if enough time has passed or buffer is getting large
    if (
      now - this.lastProcessedTimestamp >= this.CHUNK_INTERVAL ||
      this.buffer.length > 1000
    ) {
      clearTimeout(this.processingTimeout);
      this.processChunk(this.buffer.trim(), false);
      this.buffer = "";
      this.lastProcessedTimestamp = now;
    } else {
      // Set a timeout to process the buffer if no new content arrives
      clearTimeout(this.processingTimeout);
      this.processingTimeout = setTimeout(() => {
        if (this.buffer.trim()) {
          this.processChunk(this.buffer.trim(), false);
          this.buffer = "";
        }
      }, this.CHUNK_INTERVAL);
    }
  }

  processChunk(text, isFinal) {
    window.dispatchEvent(
      new CustomEvent("speechResult", {
        detail: {
          transcript: text,
          isFinal: isFinal,
        },
      })
    );
  }

  restartRecognition() {
    try {
      this.recognition.start();
    } catch (error) {
      console.error("Error restarting recognition:", error);

      // Wait a bit and try again
      setTimeout(() => {
        if (this.isRecording) {
          this.recognition.start();
        }
      }, 1000);
    }
  }

  async startRecording(languageCode) {
    try {
      if (this.isRecording) return;

      this.selectedLanguage = languageCode;
      this.recognition.lang = languageCode;

      // Clear any existing state
      this.buffer = "";
      this.lastProcessedTimestamp = Date.now();
      clearTimeout(this.processingTimeout);

      await this.recognition.start();
      this.isRecording = true;

      window.dispatchEvent(
        new CustomEvent("recordingStateChange", {
          detail: { isRecording: true },
        })
      );
    } catch (error) {
      console.error("Start recording error:", error);
      this.stopRecording();
    }
  }

  async stopRecording() {
    try {
      if (!this.isRecording) return;

      clearTimeout(this.processingTimeout);

      // Process any remaining buffer
      if (this.buffer.trim()) {
        this.processChunk(this.buffer.trim(), true);
        this.buffer = "";
      }

      await this.recognition.stop();
      this.isRecording = false;

      window.dispatchEvent(
        new CustomEvent("recordingStateChange", {
          detail: { isRecording: false },
        })
      );
    } catch (error) {
      console.error("Stop recording error:", error);
    }
  }
}
