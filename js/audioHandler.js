// audioHandler.js - Enhanced with Auto Language Detection
import { audioStateManager } from "./audioStateManager.js";

export default class AudioHandler {
  constructor() {
    if (typeof window === "undefined") {
      throw new Error("AudioHandler requires a browser environment");
    }
    this.recognition = null;
    this.isRecording = false;
    this.buffer = "";
    this.lastProcessedTimestamp = Date.now();
    this.processingTimeout = null;
    this.sourceLang = "en-US";
    this.targetLang = "kn-IN";
    this.pendingLanguageChange = false;
    this.isRestarting = false;

    // Auto-detection settings
    this.autoDetectEnabled = true;
    this.supportedLanguages = ["en-US", "kn-IN"]; // Your supported languages
    this.detectionConfidenceThreshold = 0.7;
    this.detectionHistory = []; // Keep track of detection results
    this.googleApiKey = null; // Will be set via method
    this.detectionCache = new Map(); // Cache to avoid repeated API calls
    this.detectionQueue = []; // Queue for batch processing
    this.isDetecting = false; // Prevent concurrent API calls
    this.batchTimeout = null; // Timeout for batch processing

    // Subscribe to state changes
    audioStateManager.subscribe((state) => {
      this.handleStateChange(state);
    });
  }

  handleStateChange(state) {
    if (
      state.isSpeaking &&
      this.recognition &&
      this.recordingState === "recording"
    ) {
      this.stopRecording();
    }
  }

  // Enable/disable auto-detection
  setAutoDetection(enabled) {
    this.autoDetectEnabled = enabled;
    console.log("DEBUG: Auto-detection set to:", enabled);
  }

  setGoogleApiKey(apiKey) {
    this.googleApiKey = apiKey;
    console.log("DEBUG: Google API key set for language detection");
  }

  // Set supported languages for auto-detection
  setSupportedLanguages(languages) {
    this.supportedLanguages = languages;
    console.log("DEBUG: Supported languages updated:", languages);
  }

  async detectLanguageWithGoogle(text) {
    if (!this.googleApiKey) {
      console.warn("Google API key not set, falling back to pattern detection");
      return this.patternBasedDetection(text);
    }

    if (!text || text.length < 10) return null;

    // Check cache first
    const cacheKey = text.toLowerCase().trim();
    if (this.detectionCache.has(cacheKey)) {
      console.log("DEBUG: Using cached detection result");
      return this.detectionCache.get(cacheKey);
    }

    try {
      const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${this.googleApiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && data.data.detections && data.data.detections[0]) {
        const detection = data.data.detections[0][0];
        const langMap = {
          en: "en-US",
          kn: "kn-IN",
          hi: "hi-IN", // Add Hindi support
          te: "te-IN", // Add Telugu support
          ta: "ta-IN", // Add Tamil support
        };

        const mappedLang = langMap[detection.language];
        if (mappedLang && detection.confidence > 0.6) {
          const result = {
            language: mappedLang,
            confidence: detection.confidence,
            detectedCode: detection.language,
          };

          // Cache the result
          this.detectionCache.set(cacheKey, result);

          // Clean cache if it gets too large
          if (this.detectionCache.size > 100) {
            const firstKey = this.detectionCache.keys().next().value;
            this.detectionCache.delete(firstKey);
          }

          console.log("DEBUG: Google detected language:", result);
          return result;
        }
      }
    } catch (error) {
      console.error("Google language detection error:", error);
      // Fallback to pattern detection
      return this.patternBasedDetection(text);
    }

    return null;
  }

  async batchDetectLanguage(texts) {
    if (!this.googleApiKey || texts.length === 0) return [];
    
    try {
        const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${this.googleApiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: texts
            })
        });
        
        if (!response.ok) {
            throw new Error(`Google API batch error: ${response.status}`);
        }
        
        const data = await response.json();
        const results = [];
        
        if (data.data && data.data.detections) {
            for (let i = 0; i < data.data.detections.length; i++) {
                const detection = data.data.detections[i][0];
                const langMap = {
                    'en': 'en-US',
                    'kn': 'kn-IN',
                    'hi': 'hi-IN',
                    'te': 'te-IN',
                    'ta': 'ta-IN'
                };
                
                const mappedLang = langMap[detection.language];
                if (mappedLang && detection.confidence > 0.6) {
                    results.push({
                        text: texts[i],
                        language: mappedLang,
                        confidence: detection.confidence,
                        detectedCode: detection.language
                    });
                }
            }
        }
        
        return results;
    } catch (error) {
        console.error('Google batch detection error:', error);
        return [];
    }
}

queueForDetection(text) {
    if (!text || text.length < 10) return;
    
    this.detectionQueue.push(text);
    
    // Clear existing timeout
    if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
    }
    
    // Process queue after 2 seconds or when it reaches 3 items
    this.batchTimeout = setTimeout(() => {
        this.processBatchDetection();
    }, 2000);
    
    if (this.detectionQueue.length >= 3) {
        this.processBatchDetection();
    }
}

async processBatchDetection() {
    if (this.detectionQueue.length === 0 || this.isDetecting) return;
    
    this.isDetecting = true;
    const textsToProcess = [...this.detectionQueue];
    this.detectionQueue = [];
    
    if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
        this.batchTimeout = null;
    }
    
    try {
        const results = await this.batchDetectLanguage(textsToProcess);
        
        for (const result of results) {
            if (result.language !== this.sourceLang) {
                this.updateDetectionHistory(result.language, result.confidence);
            }
        }
    } catch (error) {
        console.error('Batch processing error:', error);
    } finally {
        this.isDetecting = false;
    }
}

patternBasedDetection(text) {
    const kannadaPattern = /[\u0C80-\u0CFF]/;
    const englishPattern = /^[a-zA-Z\s.,!?'-]+$/;
    const hindiPattern = /[\u0900-\u097F]/;
    const teluguPattern = /[\u0C00-\u0C7F]/;
    const tamilPattern = /[\u0B80-\u0BFF]/;
    
    if (kannadaPattern.test(text)) {
        return { language: 'kn-IN', confidence: 0.8, detectedCode: 'kn' };
    } else if (hindiPattern.test(text)) {
        return { language: 'hi-IN', confidence: 0.8, detectedCode: 'hi' };
    } else if (teluguPattern.test(text)) {
        return { language: 'te-IN', confidence: 0.8, detectedCode: 'te' };
    } else if (tamilPattern.test(text)) {
        return { language: 'ta-IN', confidence: 0.8, detectedCode: 'ta' };
    } else if (englishPattern.test(text) && text.length > 5) {
        return { language: 'en-US', confidence: 0.7, detectedCode: 'en' };
    }
    
    return null;
}


  setLanguages(sourceLang, targetLang) {
    console.log("DEBUG: Setting languages:", { sourceLang, targetLang });
    const oldSourceLang = this.sourceLang;
    this.sourceLang = sourceLang;
    this.targetLang = targetLang;

    // If auto-detection is enabled, update supported languages
    if (this.autoDetectEnabled) {
      this.supportedLanguages = [sourceLang, targetLang];
    }

    // If we're currently recording and the source language changed, restart recognition
    if (
      this.recognition &&
      audioStateManager.state.recordingState === "recording" &&
      oldSourceLang !== sourceLang
    ) {
      console.log(
        "DEBUG: Language changed during recording, restarting with new language"
      );
      this.restartRecognitionWithNewLanguage(sourceLang);
    } else if (this.recognition) {
      this.recognition.lang = sourceLang;
    }
  }

  // Try to detect language using multiple recognition attempts
  async detectLanguage(audioData) {
    if (!this.autoDetectEnabled) {
      return this.sourceLang;
    }

    const detectionPromises = this.supportedLanguages.map((lang) =>
      this.tryRecognitionWithLanguage(audioData, lang)
    );

    try {
      const results = await Promise.allSettled(detectionPromises);
      const successfulResults = results
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => result.value)
        .sort((a, b) => b.confidence - a.confidence);

      if (successfulResults.length > 0) {
        const bestResult = successfulResults[0];
        console.log("DEBUG: Language detection result:", bestResult);

        // Update detection history
        this.updateDetectionHistory(bestResult.language, bestResult.confidence);

        return bestResult.language;
      }
    } catch (error) {
      console.error("DEBUG: Language detection failed:", error);
    }

    return this.sourceLang; // Fallback to current source language
  }

  // Try recognition with a specific language
  async tryRecognitionWithLanguage(audioData, language) {
    return new Promise((resolve) => {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      let timeoutId = setTimeout(() => {
        recognition.stop();
        resolve(null);
      }, 2000); // 2 second timeout

      recognition.onresult = (event) => {
        clearTimeout(timeoutId);
        if (event.results.length > 0) {
          const result = event.results[0][0];
          resolve({
            language: language,
            text: result.transcript,
            confidence: result.confidence || 0.5,
          });
        } else {
          resolve(null);
        }
      };

      recognition.onerror = () => {
        clearTimeout(timeoutId);
        resolve(null);
      };

      recognition.onend = () => {
        clearTimeout(timeoutId);
      };

      // Start recognition with the audio data
      // Note: Web Speech API doesn't directly accept audio data
      // This is a conceptual implementation
      try {
        recognition.start();
      } catch (error) {
        clearTimeout(timeoutId);
        resolve(null);
      }
    });
  }

  // Update detection history for better accuracy
  updateDetectionHistory(language, confidence) {
    this.detectionHistory.push({
      language,
      confidence,
      timestamp: Date.now(),
    });

    // Keep only last 5 detections
    if (this.detectionHistory.length > 5) {
      this.detectionHistory.shift();
    }

    // If we have consistent detections, switch language
    const recentDetections = this.detectionHistory.slice(-3);
    const sameLanguageCount = recentDetections.filter(
      (d) => d.language === language
    ).length;

    if (sameLanguageCount >= 2 && language !== this.sourceLang) {
      console.log(
        "DEBUG: Consistent language detection, switching to:",
        language
      );
      this.switchToDetectedLanguage(language);
    }
  }

  // Switch to detected language
  switchToDetectedLanguage(detectedLang) {
    // Find the corresponding target language
    const langMap = {
      "en-US": "kn-IN",
      "kn-IN": "en-US",
    };

    const newTargetLang = langMap[detectedLang] || this.targetLang;

    // Dispatch language change event
    window.dispatchEvent(
      new CustomEvent("autoLanguageDetected", {
        detail: {
          detectedLang,
          newSourceLang: detectedLang,
          newTargetLang: newTargetLang,
        },
      })
    );

    // Update internal state
    this.sourceLang = detectedLang;
    this.targetLang = newTargetLang;

    // Restart recognition with new language
    if (
      this.recognition &&
      audioStateManager.state.recordingState === "recording"
    ) {
      this.restartRecognitionWithNewLanguage(detectedLang);
    }
  }

  async restartRecognitionWithNewLanguage(newLanguage) {
    if (this.isRestarting) {
      console.log("DEBUG: Already restarting recognition, skipping");
      return;
    }

    this.isRestarting = true;

    try {
      if (this.recognition) {
        this.recognition.stop();
      }

      await new Promise((resolve) => setTimeout(resolve, 200));

      this.recognition.lang = newLanguage;

      if (audioStateManager.state.recordingState === "recording") {
        this.recognition.start();
        console.log(
          "DEBUG: Recognition restarted with new language:",
          newLanguage
        );
      }
    } catch (error) {
      console.error(
        "DEBUG: Error restarting recognition with new language:",
        error
      );
      setTimeout(() => {
        if (
          audioStateManager.state.recordingState === "recording" &&
          !this.isRestarting
        ) {
          this.recognition.lang = newLanguage;
          try {
            this.recognition.start();
          } catch (e) {
            console.error("DEBUG: Fallback restart failed:", e);
          }
        }
      }, 500);
    } finally {
      this.isRestarting = false;
    }
  }

  async initialize() {
    try {
      console.log("DEBUG: Initializing AudioHandler with auto-detection");
      if (!("webkitSpeechRecognition" in window)) {
        throw new Error("Speech recognition not supported");
      }

      this.recognition = new webkitSpeechRecognition();
      this.setupRecognition();
      console.log("DEBUG: AudioHandler initialized successfully");
      return true;
    } catch (error) {
      console.error("DEBUG: Audio initialization error:", error);
      return false;
    }
  }



  setupRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true; // Enable interim results for better detection
    this.recognition.maxAlternatives = 3; // Get multiple alternatives for better detection
    this.recognition.lang = this.sourceLang;

    this.recognition.onstart = () => {
      console.log(
        "DEBUG: Recognition started with language:",
        this.recognition.lang
      );
      this.isRecording = true;
      this.isRestarting = false;
      audioStateManager.setState({
        isRecording: true,
        recordingState: "recording",
      });
    };

    this.recognition.onend = () => {
      console.log("DEBUG: Recognition ended");
      if (
        audioStateManager.state.recordingState === "recording" &&
        !this.isRestarting
      ) {
        this.restartRecognition();
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      this.isRestarting = false;

      if (event.error === "no-speech" || event.error === "audio-capture") {
        this.restartRecognition();
      } else if (event.error === "aborted") {
        console.log("DEBUG: Recognition aborted, not restarting");
      } else {
        this.stopRecording();
      }
    };

    this.recognition.onresult = (event) => {
      this.handleRecognitionResult(event);
    };
  }

  // Enhanced result handling with language detection
  handleRecognitionResult(event) {
    let interimTranscript = "";
    let finalTranscript = "";
    let bestAlternative = null;
    let maxConfidence = 0;

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];

      // Check all alternatives for the best confidence
      for (let j = 0; j < result.length; j++) {
        const alternative = result[j];
        if (alternative.confidence > maxConfidence) {
          maxConfidence = alternative.confidence;
          bestAlternative = alternative;
        }
      }

      const transcript = result[0].transcript;
      if (result.isFinal) {
        finalTranscript += transcript;

        // Enhanced language detection with Google API
        if (
          this.autoDetectEnabled &&
          bestAlternative &&
          bestAlternative.transcript.length > 15
        ) {
          this.analyzeForLanguageDetection(
            bestAlternative.transcript,
            bestAlternative.confidence
          );
        }

        this.processChunk(transcript.trim(), true);
      } else {
        interimTranscript += transcript;
      }
    }

    if (interimTranscript) {
      this.processChunk(interimTranscript.trim(), false);
    }
  }

  // Analyze text for language detection patterns
  async analyzeForLanguageDetection(text, confidence) {
    if (!text || text.length < 10) return;
    
    try {
        let detectionResult = null;
        
        // Use Google API if available, otherwise use pattern detection
        if (this.googleApiKey) {
            // For real-time detection, use queueing to reduce API calls
            if (text.length > 30) {
                detectionResult = await this.detectLanguageWithGoogle(text);
            } else {
                // Queue shorter texts for batch processing
                this.queueForDetection(text);
                return;
            }
        } else {
            detectionResult = this.patternBasedDetection(text);
        }
        
        if (detectionResult && detectionResult.language !== this.sourceLang) {
            console.log('DEBUG: Language detection result:', detectionResult);
            this.updateDetectionHistory(detectionResult.language, detectionResult.confidence);
        }
    } catch (error) {
        console.error('Language detection error:', error);
        // Fallback to pattern detection
        const fallbackResult = this.patternBasedDetection(text);
        if (fallbackResult && fallbackResult.language !== this.sourceLang) {
            this.updateDetectionHistory(fallbackResult.language, fallbackResult.confidence);
        }
    }
}

  processChunk(text, isFinal, isFromTranslation = false) {
    if (text && !isFromTranslation) {
      console.log("DEBUG: Processing chunk:", {
        text,
        isFinal,
        currentLang: this.recognition.lang,
        autoDetect: this.autoDetectEnabled,
      });

      window.dispatchEvent(
        new CustomEvent("speechResult", {
          detail: {
            transcript: text,
            isFinal: isFinal,
            detectedLanguage: this.recognition.lang,
          },
        })
      );
    }
  }

  restartRecognition() {
    if (this.isRestarting) {
      console.log("DEBUG: Already restarting recognition, skipping");
      return;
    }

    this.isRestarting = true;

    try {
      console.log(
        "DEBUG: Attempting to restart recognition with language:",
        this.sourceLang
      );

      this.recognition.lang = this.sourceLang;

      setTimeout(() => {
        if (
          audioStateManager.state.recordingState === "recording" &&
          this.isRestarting
        ) {
          try {
            this.recognition.start();
          } catch (error) {
            console.error("DEBUG: Error in delayed restart:", error);
            this.isRestarting = false;
          }
        } else {
          this.isRestarting = false;
        }
      }, 100);
    } catch (error) {
      console.error("DEBUG: Error restarting recognition:", error);
      this.isRestarting = false;

      setTimeout(() => {
        if (
          audioStateManager.state.recordingState === "recording" &&
          !this.isRestarting
        ) {
          console.log("DEBUG: Retrying recognition start");
          this.isRestarting = true;
          this.recognition.lang = this.sourceLang;
          try {
            this.recognition.start();
          } catch (e) {
            console.error("DEBUG: Fallback restart failed:", e);
            this.isRestarting = false;
          }
        }
      }, 1000);
    }
  }

  async startRecording(languageCode) {
    try {
      if (audioStateManager.state.isSpeaking) {
        console.log("Cannot start recording while speaking");
        return;
      }

      if (this.isRestarting) {
        console.log("DEBUG: Cannot start recording while restarting");
        return;
      }

      console.log("DEBUG: Starting recording with language:", languageCode);
      console.log("DEBUG: Auto-detection enabled:", this.autoDetectEnabled);

      this.sourceLang = languageCode;
      this.recognition.lang = languageCode;

      // Clear detection history when starting new recording
      this.detectionHistory = [];

      if (this.isRecording) {
        this.recognition.stop();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await this.recognition.start();
      this.isRecording = true;
      this.recordingState = "recording";
      audioStateManager.startRecording();
    } catch (error) {
      console.error("Start recording error:", error);
      this.isRestarting = false;
      this.stopRecording();
    }
  }

  pauseRecording() {
    try {
      if (audioStateManager.state.recordingState !== "recording") return;

      this.recognition.stop();
      this.isRecording = false;
      this.recordingState = "paused";
      this.isRestarting = false;
      audioStateManager.setState({
        isRecording: false,
        recordingState: "paused",
      });
    } catch (error) {
      console.error("Pause recording error:", error);
    }
  }

  resumeRecording() {
    try {
      if (audioStateManager.state.recordingState !== "paused") return;
      this.startRecording(this.sourceLang);
    } catch (error) {
      console.error("Resume recording error:", error);
    }
  }

  async stopRecording() {
    try {
      this.isRestarting = false;
      if (this.recognition) {
        this.recognition.stop();
      }
      this.isRecording = false;
      this.recordingState = "stopped";
      this.detectionHistory = []; // Clear detection history
      audioStateManager.stopRecording();
    } catch (error) {
      console.error("Stop recording error:", error);
    }

    this.cleanup();
  }
    cleanup() {
    // Clear detection queue and timeout
    this.detectionQueue = [];
    if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
        this.batchTimeout = null;
    }
    this.isDetecting = false;
    
    // Clear cache periodically
    if (this.detectionCache.size > 50) {
        this.detectionCache.clear();
    }
    }
  
}
