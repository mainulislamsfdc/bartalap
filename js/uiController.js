export default class UIController {
  constructor() {
    this.synth = window.speechSynthesis;
    this.preferredVoiceGender = "female";
    this.voices = [];
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

    // Initialize voices when they're available
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("speak-button")) {
        if (this.isRecording) {
          window.dispatchEvent(new CustomEvent("stopRecording"));
        }
        const text = e.target.dataset.text;
        const lang = e.target.dataset.lang;
        this.speakText(text, lang);
      }
    });

    this.clearButton.addEventListener("click", () => this.clearTranslations());
    this.exportButton.addEventListener("click", () =>
      this.exportTranslations()
    );

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
    this.micButton.querySelector(".mic-icon").textContent = isRecording
      ? "⏹"
      : "🎤";
    if (this.recordingStatus) {
      this.recordingStatus.textContent = isRecording ? "Recording..." : "";
    }
  }

  updateCurrentText(text, translation = "") {
    const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
    const targetLang = this.getLanguageName(this.targetLanguageSelect.value);

    this.currentText.innerHTML = `
      <div class="translation-pair">
        <div class="translation-text original-text">
          <div class="text-header">
            <strong>${sourceLang}:</strong>
          </div>
          ${text}
        </div>
        ${
          translation
            ? `
          <div class="translation-text translated-text">
            <div class="text-header">
              <strong>${targetLang}:</strong>
              <button class="speak-button" data-text="${translation}" data-lang="${this.targetLanguageSelect.value}">🔊</button>
            </div>
            ${translation}
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  // Inside UIController.js - Update the addTranslation method
  addTranslation(translation) {
    const element = document.createElement("div");
    element.className = "translation-item";
    const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
    const targetLang = this.getLanguageName(this.targetLanguageSelect.value);

    element.innerHTML = `
      <div class="timestamp">${new Date().toLocaleTimeString()}</div>
      <div class="translation-pair">
          <div class="translation-text original-text">
              <div class="text-header">
                  <strong>${sourceLang}:</strong>
              </div>
              ${translation.original}
          </div>
          <div class="translation-text translated-text">
              <div class="text-header">
                  <strong>${targetLang}:</strong>
                  <div class="voice-controls">
                      <div class="voice-toggle">
                          <button class="voice-btn male ${
                            this.preferredVoiceGender === "male" ? "active" : ""
                          }" 
                                  data-voice="male" onclick="this.closest('.translation-item').querySelector('.speak-button').dataset.gender = 'male'">
                              <span class="icon">👨</span>
                          </button>
                          <button class="voice-btn female ${
                            this.preferredVoiceGender === "female"
                              ? "active"
                              : ""
                          }" 
                                  data-voice="female" onclick="this.closest('.translation-item').querySelector('.speak-button').dataset.gender = 'female'">
                              <span class="icon">👩</span>
                          </button>
                      </div>
                      <button class="speak-button" 
                              data-text="${translation.translated}" 
                              data-lang="${this.targetLanguageSelect.value}"
                              data-gender="${
                                this.preferredVoiceGender
                              }">🔊</button>
                  </div>
              </div>
              <div class="target-script">${translation.translated}</div>
              ${
                translation.transliteration &&
                translation.transliteration !== translation.translated
                  ? `<div class="transliteration">(${translation.transliteration})</div>`
                  : ""
              }
          </div>
      </div>
    `;

    // Add voice button click handlers
    const voiceButtons = element.querySelectorAll(".voice-btn");
    voiceButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const gender = btn.dataset.voice;
        this.setVoicePreference(gender);
        voiceButtons.forEach((b) => b.classList.toggle("active", b === btn));
      });
    });

    this.translationHistory.insertBefore(
      element,
      this.translationHistory.firstChild
    );
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
    this.currentText.innerHTML =
      '<p class="placeholder">Press the microphone to start...</p>';
  }

  exportTranslations() {
    const translations = [];
    const items = this.translationHistory.querySelectorAll(".translation-item");

    items.forEach((item) => {
      const original = item.querySelector(".original-text").textContent.trim();
      const translated = item
        .querySelector(".translated-text")
        .textContent.trim();
      const timestamp = item.querySelector(".timestamp").textContent;
      translations.push({ timestamp, original, translated });
    });

    const blob = new Blob([JSON.stringify(translations, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translations.json";
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

  // Add these methods to UIController class
  getVoiceForLanguage(lang, gender) {
    const langCode = lang.split("-")[0]; // Convert 'en-US' to 'en'
    const voices = this.voices.filter(
      (voice) =>
        voice.lang.startsWith(langCode) &&
        voice.name.toLowerCase().includes(gender.toLowerCase())
    );
    return (
      voices[0] ||
      this.voices.find((voice) => voice.lang.startsWith(langCode)) ||
      this.voices[0]
    );
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
    utterance.pitch = this.preferredVoiceGender === "female" ? 1.2 : 0.9;

    this.synth.speak(utterance);
  }

  setVoicePreference(gender) {
    this.preferredVoiceGender = gender;
    // Update UI to reflect the change
    document.querySelectorAll(".voice-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.voice === gender);
    });
  }
}
