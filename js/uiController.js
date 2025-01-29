// uiController.js
export default class UIController {
    constructor() {
        this.micButton = document.getElementById('micButton');
        this.clearButton = document.getElementById('clearButton');
        this.exportButton = document.getElementById('exportButton');
        this.languageSelect = document.getElementById('languageSelect');
        this.currentText = document.getElementById('currentText');
        this.translationHistory = document.getElementById('translationHistory');

        const radioButtons = document.querySelectorAll('input[name="transcriptionMode"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const mode = e.target.value;
                const selectedLanguage = this.languageSelect.value;
                this.onTranscriptionModeChange(mode, selectedLanguage);
            });
        });
    }

    updateRecordingState(isRecording) {
        this.micButton.classList.toggle('recording', isRecording);
        this.micButton.querySelector('.mic-icon').textContent = 
            isRecording ? '⏹' : '🎤';
    }

    updateCurrentText(text) {
        this.currentText.innerHTML = `<p>${text}</p>`;
    }

    addTranslation(translation) {
        const element = document.createElement('div');
        element.className = 'translation-item';
        element.innerHTML = `
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
            <p><strong>Original:</strong> ${translation.original}</p>
            <p><strong>Translation:</strong> ${translation.translated}</p>
        `;
        this.translationHistory.insertBefore(element, this.translationHistory.firstChild);
    }

    clearTranslations() {
        this.translationHistory.innerHTML = '';
        this.currentText.innerHTML = '<p class="placeholder">Press the microphone to start...</p>';
    }

    onTranscriptionModeChange(mode, selectedLanguage) {
        window.dispatchEvent(new CustomEvent('transcriptionModeChange', {
            detail: { mode, selectedLanguage }
        }));
    }
}