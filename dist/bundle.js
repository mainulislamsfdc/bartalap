(() => {
  "use strict";
  class e {
    constructor() {
      (this.audioHandler = new AudioHandler()),
        (this.translationService = new TranslationService()),
        (this.uiController = new UIController()),
        this.initialize(),
        this.setupEventListeners();
    }
    async initialize() {
      try {
        if (!(await this.audioHandler.initialize()))
          throw new Error("Failed to initialize audio");
        if ("serviceWorker" in navigator)
          try {
            await navigator.serviceWorker.register("./sw.js"),
              console.log("Service Worker registered");
          } catch (e) {
            console.error("Service Worker registration failed:", e);
          }
      } catch (e) {
        console.error("Initialization error:", e),
          alert("Error initializing app. Please check console for details.");
      }
    }
    setupEventListeners() {
      this.uiController.micButton.addEventListener("click", () => {
        if (this.audioHandler.isRecording) this.audioHandler.stopRecording();
        else {
          const e = this.uiController.languageSelect.value;
          this.audioHandler.startRecording(e);
        }
      }),
        this.uiController.clearButton.addEventListener("click", () => {
          this.translationService.clearTranslations(),
            this.uiController.clearTranslations();
        }),
        this.uiController.exportButton.addEventListener("click", () => {
          this.translationService.exportTranslations();
        }),
        window.addEventListener("speechResult", async (e) => {
          const { transcript: t, isFinal: i } = e.detail;
          if ((this.uiController.updateCurrentText(t), i))
            try {
              const e = this.uiController.languageSelect.value.split("-")[0],
                i = await this.translationService.translateText(t, e, "en");
              this.uiController.addTranslation({
                original: t,
                translated: i,
                timestamp: new Date(),
              });
            } catch (e) {
              console.error("Translation error:", e),
                alert("Error during translation. Please try again.");
            }
        }),
        window.addEventListener("recordingStateChange", (e) => {
          const { isRecording: t } = e.detail;
          this.uiController.updateRecordingState(t);
        }),
        window.addEventListener("transcriptionModeChange", (e) => {
          const { mode: t, selectedLanguage: i } = e.detail;
          this.audioHandler.setTranscriptionMode(t, i);
        });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    new e();
  });
})();
