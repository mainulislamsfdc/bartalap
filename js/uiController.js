// js/uiController.js
class UIController {
    constructor() {
        this.micButton = document.getElementById('micButton');
        this.clearButton = document.getElementById('clearButton');
        this.exportButton = document.getElementById('exportButton');
        this.languageSelect = document.getElementById('languageSelect');
        this.currentText = document.getElementById('currentText');
        this.translationHistory = document.getElementById('translationHistory');
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
            <p><strong>Original:</strong> ${translation.original}</p>
            <p><strong>Translation:</strong> ${translation.translated}</p>
            <small>${translation.timestamp.toLocaleString()}</small>
        `;
        this.translationHistory.insertBefore(element, this.translationHistory.firstChild);
    }

        clearTranslations() {
        this.translationHistory.innerHTML = '';
        this.currentText.innerHTML = '<p class="placeholder">Press the microphone to start...</p>';
    }
}