export default class UIController {
  constructor() {
      this.synth = window.speechSynthesis;
      this.preferredVoiceGender = localStorage.getItem('voicePreference') || 'male';
      this.voices = [];
      
      // Initialize voices when they're available
      if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => {
              this.voices = this.synth.getVoices();
          };
      }

      // Initialize UI elements
      this.micButton = document.getElementById("micButton");
      this.clearButton = document.getElementById("clearButton");
      this.exportButton = document.getElementById("exportButton");
      this.sourceLanguageSelect = document.getElementById("sourceLanguageSelect");
      this.targetLanguageSelect = document.getElementById("targetLanguageSelect");
      this.currentText = document.getElementById("currentText");
      this.translationHistory = document.getElementById("translationHistory");
      this.recordingStatus = document.getElementById("recordingStatus");
      this.errorMessage = document.getElementById("errorMessage");
      this.isRecording = false;

      // Set initial voice preference UI state
      this.initializeVoicePreference();

      // Event Listeners
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

      this.clearButton.addEventListener("click", () => this.clearTranslations());
      this.exportButton.addEventListener("click", () => this.exportTranslations());

      this.sourceLanguageSelect.addEventListener("change", () => {
          const sourceLang = this.sourceLanguageSelect.value;
          const targetLang = this.targetLanguageSelect.value;
          this.onLanguageChange(sourceLang, targetLang);
      });

      this.targetLanguageSelect.addEventListener("change", () => {
          const sourceLang = this.sourceLanguageSelect.value;
          const targetLang = this.targetLanguageSelect.value;
          this.onLanguageChange(sourceLang, targetLang);
      });

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
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      
      // Set voice based on preference
      const voice = this.getVoiceForLanguage(lang, this.preferredVoiceGender);
      if (voice) {
          utterance.voice = voice;
      }
      
      // Adjust pitch based on gender
      utterance.pitch = this.preferredVoiceGender === 'female' ? 1.2 : 0.9;
      
      this.synth.speak(utterance);
  }

  onLanguageChange(sourceLang, targetLang) {
      window.dispatchEvent(
          new CustomEvent("languageChange", {
              detail: { sourceLang, targetLang },
          })
      );
  }

  updateRecordingState(isRecording) {
      this.isRecording = isRecording;
      this.micButton.classList.toggle("recording", isRecording);
      this.micButton.querySelector(".mic-icon").textContent = isRecording ? "⏹" : "🎤";
      if (this.recordingStatus) {
          this.recordingStatus.textContent = isRecording ? "Recording..." : "";
      }
  }

  updateCurrentText(text) {
      if (!text) {
          this.currentText.innerHTML = '<p class="placeholder">Press the microphone button to start speaking...</p>';
          return;
      }

      this.currentText.textContent = text;
  }

  addTranslation(translation) {
      const element = document.createElement("div");
      element.className = "translation-item";
      const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
      const targetLang = this.getLanguageName(this.targetLanguageSelect.value);

      element.innerHTML = `
          <div class="timestamp">${new Date().toLocaleTimeString()}</div>
          <div class="translation-content">
              <div class="translation-header">
                  <div class="lang-indicator">${sourceLang} → ${targetLang}</div>
                  <button class="speak-button" 
                          data-text="${translation.translated}" 
                          data-lang="${this.targetLanguageSelect.value}">🔊</button>
              </div>
              <div class="translation-text">
                  <div class="translated-text">${translation.translated}</div>
                  ${translation.transliteration && translation.transliteration !== translation.translated
                      ? `<div class="transliteration">(${translation.transliteration})</div>`
                      : ""
                  }
              </div>
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
      this.translationHistory.innerHTML = "";
      this.currentText.innerHTML = '<p class="placeholder">Press the microphone button to start speaking...</p>';
  }

  exportTranslations() {
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