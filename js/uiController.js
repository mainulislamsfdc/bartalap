// uiController.js
export default class UIController {
    constructor() {
        this.micButton = document.getElementById('micButton');
        this.clearButton = document.getElementById('clearButton');
        this.exportButton = document.getElementById('exportButton');
        this.sourceLanguageSelect = document.getElementById('sourceLanguageSelect');
        this.targetLanguageSelect = document.getElementById('targetLanguageSelect');
        this.currentText = document.getElementById('currentText');
        this.translationHistory = document.getElementById('translationHistory');
        this.recordingStatus = document.getElementById('recordingStatus');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorMessage = document.getElementById('errorMessage');

        // Add event listeners for language switches
        this.sourceLanguageSelect.addEventListener('change', () => {
            const sourceLang = this.sourceLanguageSelect.value;
            const targetLang = this.targetLanguageSelect.value;
            this.onLanguageChange(sourceLang, targetLang);
        });

        this.targetLanguageSelect.addEventListener('change', () => {
            const sourceLang = this.sourceLanguageSelect.value;
            const targetLang = this.targetLanguageSelect.value;
            this.onLanguageChange(sourceLang, targetLang);
        });

        // Language switch button
        const switchButton = document.getElementById('switchLanguages');
        if (switchButton) {
            switchButton.addEventListener('click', () => {
                const sourceLang = this.sourceLanguageSelect.value;
                const targetLang = this.targetLanguageSelect.value;
                
                // Swap languages
                this.sourceLanguageSelect.value = targetLang;
                this.targetLanguageSelect.value = sourceLang;
                
                // Trigger language change event
                this.onLanguageChange(targetLang, sourceLang);
            });
        }
    }

    onLanguageChange(sourceLang, targetLang) {
        window.dispatchEvent(new CustomEvent('languageChange', {
            detail: { sourceLang, targetLang }
        }));
    }

    updateRecordingState(isRecording) {
        this.micButton.classList.toggle('recording', isRecording);
        this.micButton.querySelector('.mic-icon').textContent = 
            isRecording ? '⏹' : '🎤';
        
        if (this.recordingStatus) {
            this.recordingStatus.textContent = isRecording ? 'Recording...' : '';
        }
    }

    updateCurrentText(text) {
        this.currentText.innerHTML = `
            <div class="translation-pair">
                <div class="translation-text original-text">${text}</div>
            </div>
        `;
    }

    addTranslation(translation) {
        const element = document.createElement('div');
        element.className = 'translation-item';
        
        // Get language names for better readability
        const sourceLang = this.getLanguageName(this.sourceLanguageSelect.value);
        const targetLang = this.getLanguageName(this.targetLanguageSelect.value);
        
        element.innerHTML = `
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
            <div class="translation-pair">
                <div class="translation-text original-text">
                    <strong>${sourceLang}:</strong><br>
                    ${translation.original}
                </div>
                <div class="translation-text translated-text">
                    <strong>${targetLang}:</strong><br>
                    ${translation.translated}
                </div>
            </div>
        `;
        
        this.translationHistory.insertBefore(element, this.translationHistory.firstChild);
    }

    getLanguageName(code) {
        const languageMap = {
            'en-US': 'English',
            'hi-IN': 'Hindi',
            'bn-IN': 'Bengali',
            'kn-IN': 'Kannada',
            'ta-IN': 'Tamil',
            'te-IN': 'Telugu',
            'ml-IN': 'Malayalam'
        };
        return languageMap[code] || code;
    }

    clearTranslations() {
        this.translationHistory.innerHTML = '';
        this.currentText.innerHTML = '<p class="placeholder">Press the microphone to start...</p>';
    }

    showLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.classList.remove('hidden');
        }
    }

    hideLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.classList.add('hidden');
        }
    }

    showError(message) {
        if (this.errorMessage) {
            const errorText = this.errorMessage.querySelector('p');
            if (errorText) {
                errorText.textContent = message;
            }
            this.errorMessage.classList.remove('hidden');

            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.hideError();
            }, 5000);
        }
    }

    hideError() {
        if (this.errorMessage) {
            this.errorMessage.classList.add('hidden');
        }
    }
}