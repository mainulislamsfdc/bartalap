export default class UIController {
    constructor() {
        if (typeof window === 'undefined') {
            throw new Error('UIController requires a browser environment');
        }
        this.synth = window.speechSynthesis;
        this.preferredVoiceGender = localStorage.getItem('voicePreference') || 'male';
        this.voices = [];
        this.isRecording = false;
        
        // Initialize voices when they're available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
            };
        }

        this.initializeElements();
        this.initializeEventListeners();
        this.initializeVoicePreference();

        // Global speak button listener
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('speak-button')) {
                if (this.isRecording) {
                    window.dispatchEvent(new CustomEvent("stopRecording"));
                }
                const text = e.target.dataset.text;
                const lang = e.target.dataset.lang;
                this.speakText(text, lang);
            }
        });
    }

    initializeElements() {
        this.micButton = document.getElementById("micButton");
        this.clearButton = document.getElementById("clearButton");
        this.exportButton = document.getElementById("exportButton");
        this.sourceLanguageSelect = document.getElementById("sourceLanguageSelect");
        this.targetLanguageSelect = document.getElementById("targetLanguageSelect");
        this.currentText = document.getElementById("currentText");
        this.translationHistory = document.getElementById("translationHistory");
        this.recordingStatus = document.getElementById("recordingStatus");
        this.errorMessage = document.getElementById("errorMessage");

        // Add null checks for required elements
        if (!this.micButton || !this.sourceLanguageSelect || !this.targetLanguageSelect) {
            throw new Error('Required UI elements not found');
        }
    }

    initializeEventListeners() {
        if (this.clearButton) {
            this.clearButton.addEventListener("click", () => this.clearTranslations());
        }
        
        if (this.exportButton) {
            this.exportButton.addEventListener("click", () => this.exportTranslations());
        }
        
        if (this.sourceLanguageSelect) {
            this.sourceLanguageSelect.addEventListener("change", () => {
                const sourceLang = this.sourceLanguageSelect.value;
                const targetLang = this.targetLanguageSelect.value;
                this.onLanguageChange(sourceLang, targetLang);
            });
        }
        
        if (this.targetLanguageSelect) {
            this.targetLanguageSelect.addEventListener("change", () => {
                const sourceLang = this.sourceLanguageSelect.value;
                const targetLang = this.targetLanguageSelect.value;
                this.onLanguageChange(sourceLang, targetLang);
            });
        }

        const switchButton = document.getElementById("switchLanguages");
        if (switchButton) {
            switchButton.addEventListener("click", () => {
                const sourceLang = this.sourceLanguageSelect.value;
                const targetLang = this.targetLanguageSelect.value;
                this.sourceLanguageSelect.value = targetLang;
                this.targetLanguageSelect.value = sourceLang;
                this.onLanguageChange(targetLang, sourceLang);
            });
        }
    }

    initializeVoicePreference() {
        document.querySelectorAll('.voice-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.voice === this.preferredVoiceGender);
            btn.addEventListener('click', (e) => {
                const gender = btn.dataset.voice;
                this.setVoicePreference(gender);
                
                // Update toggle button states
                document.querySelectorAll('.voice-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.voice === gender);
                });
            });
        });
    }

    getVoiceForLanguage(lang, gender) {
        const langCode = lang.split('-')[0];
        const voices = this.voices.filter(voice => 
            voice.lang.startsWith(langCode) &&
            voice.name.toLowerCase().includes(gender.toLowerCase())
        );
        return voices[0] || this.voices.find(voice => voice.lang.startsWith(langCode)) || this.voices[0];
    }

    setVoicePreference(gender) {
        this.preferredVoiceGender = gender;
        localStorage.setItem('voicePreference', gender);
    }

    speakText(text, lang) {
      if (this.synth.speaking) {
        this.synth.cancel();
      }

      // Stop recording before speaking
      if (this.isRecording) {
        window.dispatchEvent(new CustomEvent("stopRecording"));
        this.updateRecordingState(false); // Set recording state to false
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      // Ensure voices are loaded
      const voices = speechSynthesis.getVoices();

      // Try selecting a voice based on language and gender
      utterance.voice =
        voices.find(
          (voice) =>
            voice.lang.startsWith(lang) &&
            (this.preferredVoiceGender === "female"
              ? voice.name.includes("Female")
              : voice.name.includes("Male"))
        ) ||
        voices.find((voice) => voice.lang.startsWith(lang)) ||
        null;

      // Set pitch based on gender
      utterance.pitch = this.preferredVoiceGender === "female" ? 1.2 : 0.9;

      // Prevent microphone from restarting while speech is playing
      utterance.onstart = () => {
        this.updateRecordingState(false); // Ensure recording state is false
      };

      // Allow recording to resume after speech ends
      utterance.onend = () => {
        window.dispatchEvent(new CustomEvent("startRecording"));
        this.updateRecordingState(true); // Resume recording after speech ends
      };

      this.synth.speak(utterance);
    }
    

    onLanguageChange(sourceLang, targetLang) {
        window.dispatchEvent(
            new CustomEvent("languageChange", {
                detail: { sourceLang, targetLang },
            })
        );
        if (this.sourceLanguageSelect && this.targetLanguageSelect) {
            this.sourceLanguageSelect.value = sourceLang;
            this.targetLanguageSelect.value = targetLang;
        }
    }

    updateRecordingState(isRecording) {
        this.isRecording = isRecording;

            // Hide/show language controls
        const languageControls = document.querySelector('.language-controls');
        if (languageControls) {
            languageControls.classList.toggle('hidden', isRecording);
        }

        if (this.micButton) {
            this.micButton.classList.toggle("recording", isRecording);
            const micIcon = this.micButton.querySelector(".mic-icon");
            if (micIcon) {
                micIcon.textContent = isRecording ? "⏹" : "🎤";
            }
        }
        if (this.recordingStatus) {
            this.recordingStatus.textContent = isRecording ? "Recording..." : "";
        }
    }

    updateCurrentText(text) {
        if (!this.currentText) return;
        
        if (!text) {
            this.currentText.innerHTML = '<p class="placeholder">Press the microphone button to start speaking...</p>';
            return;
        }
        this.currentText.textContent = text;
    }

    addTranslation(translation) {
        if (!this.translationHistory) return;
    
        const element = document.createElement("div");
        element.className = "translation-item";
        const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
        const targetLang = this.getLanguageName(this.targetLanguageSelect.value);
    
        element.innerHTML = `
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
            <div class="translation-row">
                <div class="translation-column">
                    <div class="translation-box source">
                        <div class="lang-label">${sourceLang}</div>
                        <div class="text">${translation.original}</div>
                    </div>
                </div>
                <div class="translation-column">
                    <div class="translation-box target">
                        <div class="lang-label">${targetLang}</div>
                        <div class="text">${translation.translated}</div>
                        ${translation.transliteration && translation.transliteration !== translation.translated
                            ? `<div class="transliteration">(${translation.transliteration})</div>`
                            : ""
                        }
                    </div>
                </div>
                <button class="speak-button" 
                        data-text="${translation.translated}" 
                        data-lang="${this.targetLanguageSelect.value}">🔊</button>
            </div>
        `;
    
        this.translationHistory.insertBefore(element, this.translationHistory.firstChild);
    }

    getLanguageName(code) {
        const languageMap = {
            "en-US": "English",
            "hi-IN": "Hindi",
            "bn-IN": "Bengali",
            "kn-IN": "Kannada",
            "ta-IN": "Tamil",
            "te-IN": "Telugu",
            "ml-IN": "Malayalam",
        };
        return languageMap[code] || code;
    }

    clearTranslations() {
        if (this.translationHistory) {
            this.translationHistory.innerHTML = "";
        }
        if (this.currentText) {
            this.currentText.innerHTML = '<p class="placeholder">Press the microphone button to start speaking...</p>';
        }
    }

    exportTranslations() {
        if (!this.translationHistory) return;

        const translations = [];
        const items = this.translationHistory.querySelectorAll('.translation-item');
        
        items.forEach(item => {
            const translated = item.querySelector('.translated-text').textContent.trim();
            const timestamp = item.querySelector('.timestamp').textContent;
            translations.push({ timestamp, translated });
        });

        const blob = new Blob([JSON.stringify(translations, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'translations.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showError(message) {
        if (this.errorMessage) {
            const errorText = this.errorMessage.querySelector("p");
            if (errorText) {
                errorText.textContent = message;
            }
            this.errorMessage.classList.remove("hidden");
            setTimeout(() => this.hideError(), 5000);
        }
    }

    hideError() {
        if (this.errorMessage) {
            this.errorMessage.classList.add("hidden");
        }
    }
}