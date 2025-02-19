import { audioStateManager } from './audioStateManager.js';

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
        this.updateSelectedLanguages();

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

        // Subscribe to state changes
        audioStateManager.subscribe(state => {
            this.updateUI(state);
        });
    }

    updateUI(state) {
        if (this.micButton) {
            // Update mic button
            this.micButton.classList.remove('recording', 'paused', 'stopped');
            this.micButton.classList.add(state.recordingState);
            
            const micIcon = this.micButton.querySelector('.mic-icon');
            if (micIcon) {
                switch (state.recordingState) {
                    case 'recording':
                        micIcon.textContent = '⏹';
                        this.micButton.style.animation = 'ripple 1.5s linear infinite';
                        break;
                    case 'paused':
                        micIcon.textContent = '🎤';
                        this.micButton.style.animation = 'none';
                        break;
                    case 'stopped':
                        micIcon.textContent = '🎤';
                        this.micButton.style.animation = 'float 3s ease-in-out infinite';
                        break;
                }
            }
        }

        // Update recording status
        if (this.recordingStatus) {
            this.recordingStatus.textContent = state.isRecording ? 'Recording...' : '';
        }

        // Disable mic button during speech
        if (this.micButton) {
            this.micButton.disabled = state.isSpeaking;
        }
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

        // collapsible header click handler
        const languageHeader = document.querySelector('.language-controls-header');
        if (languageHeader) {
            languageHeader.addEventListener('click', () => {
                const controls = document.querySelector('.language-controls');
                if (controls) {
                    controls.classList.toggle('collapsed');
                }
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


    //'Google UK English Male - en-GB' 'Google UK English Female - en-GB'
    speakText(text, lang) {
        if (this.synth.speaking) {
            this.synth.cancel();
            audioStateManager.stopSpeaking();
            return;
        }
    
        // If recording, pause it before speaking
        if (this.isRecording) {
            window.dispatchEvent(new CustomEvent("stopRecording"));
            this.updateRecordingState('paused');
        }
    
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
    
        // Get available voices
        const voices = this.synth.getVoices();
        
        // Look for Google UK English voices
        const googleVoices = {
            male: voices.find(voice => voice.name === 'Google UK English Male - en-GB'),
            female: voices.find(voice => voice.name === 'Google UK English Female - en-GB')
        };
    
        // Select the appropriate Google voice based on preference
        let selectedVoice = googleVoices[this.preferredVoiceGender];
    
        // Fallback logic if Google voices aren't available
        if (!selectedVoice) {
            const genderKeyword = this.preferredVoiceGender === 'female' ? 'Female' : 'Male';
            selectedVoice = voices.find(voice => 
                voice.lang.startsWith(lang) && 
                voice.name.includes(genderKeyword)
            ) || voices.find(voice => voice.lang.startsWith(lang)) || voices[0];
        }
    
        utterance.voice = selectedVoice;
    
        // Optimize voice characteristics for Google voices
        if (utterance.voice?.name === 'Google UK English Female - en-GB') {
            utterance.pitch = 1.1;
            utterance.rate = 1.0;
        } else if (utterance.voice?.name === 'Google UK English Male - en-GB') {
            utterance.pitch = 0.95;
            utterance.rate = 0.95;
        } else {
            utterance.pitch = this.preferredVoiceGender === 'female' ? 1.2 : 0.9;
            utterance.rate = this.preferredVoiceGender === 'female' ? 1.0 : 0.95;
        }
    
        // Event handlers with proper state management
        utterance.onstart = () => {
            audioStateManager.startSpeaking();
        };
    
        utterance.onend = () => {
            audioStateManager.stopSpeaking();
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            audioStateManager.stopSpeaking();
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
        this.updateSelectedLanguages();
    }

    updateSelectedLanguages() {
        const selectedLangs = document.querySelector('.selected-languages');
        if (selectedLangs) {
            const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
            const targetLang = this.getLanguageName(this.targetLanguageSelect.value);
            selectedLangs.textContent = `${sourceLang} → ${targetLang}`;
        }
    }

    updateRecordingState(state) {
        // Update isRecording based on state
        //this.isRecording = state === 'recording';
        
        
        // Update UI based on state
        if (this.micButton) {
            // Remove all state classes first
            this.micButton.classList.remove("recording", "paused", "stopped");
            
            // Add the appropriate state class
            this.micButton.classList.add(state);

            // Update the icon and animation based on state
            const micIcon = this.micButton.querySelector('.mic-icon');
            if (micIcon) {
                switch (state) {
                    case "recording":
                        micIcon.textContent = '⏸'; // pause symbol
                        this.micButton.style.animation = 'ripple 1.5s linear infinite';
                        break;
                    case "paused":
                        micIcon.textContent = '▶'; // play symbol
                        this.micButton.style.animation = 'none';
                        break;
                    case "stopped":
                        micIcon.textContent = '🎤'; // mic symbol
                        this.micButton.style.animation = 'float 3s ease-in-out infinite';
                        break;
                }
            }
        }
    
        // Update status text if it exists
        if (this.recordingStatus) {
            switch (state) {
                case "recording":
                    this.recordingStatus.textContent = "Recording...";
                    break;
                case "paused":
                    this.recordingStatus.textContent = "Paused";
                    break;
                case "stopped":
                    this.recordingStatus.textContent = "";
                    break;
            }
    
            // Hide/show language controls
            const languageControls = document.querySelector('.language-controls');
            if (languageControls) {
                if (state === 'recording') {
                    languageControls.classList.add('collapsed');
                } else {
                    languageControls.classList.remove('collapsed');
                }
            }
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