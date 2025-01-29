(() => {
  "use strict";
  const t = class {
    constructor() {
      if (
        ((this.apiKey = "AIzaSyBK9GgQz_gmNTTh7MSHgnce_rhq2X_0NRE"),
        !this.apiKey)
      )
        throw new Error("Translation service requires an API key");
    }
    async translateText(t, e, r = "en") {
      try {
        const i = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: t,
                source: e,
                target: r,
                format: "text",
              }),
            }
          ),
          n = await i.json();
        if (n.error) throw new Error(n.error.message);
        const a = n.data.translations[0].translatedText;
        return (
          this.translations.push({
            original: t,
            translated: a,
            timestamp: new Date(),
          }),
          a
        );
      } catch (t) {
        throw (console.error("Translation error:", t), t);
      }
    }
    clearTranslations() {
      this.translations = [];
    }
    exportTranslations() {
      const t = [
          ["Timestamp", "Original", "Translation"],
          ...this.translations.map((t) => [
            t.timestamp.toISOString(),
            t.original,
            t.translated,
          ]),
        ]
          .map((t) => t.join(","))
          .join("\n"),
        e = new Blob([t], { type: "text/csv" }),
        r = window.URL.createObjectURL(e),
        i = document.createElement("a");
      (i.href = r),
        (i.download = `translations_${new Date().toISOString()}.csv`),
        document.body.appendChild(i),
        i.click(),
        document.body.removeChild(i),
        window.URL.revokeObjectURL(r);
    }
  };
  class e {
    constructor() {
      (this.audioHandler = new AudioHandler()),
        (this.translationService = new t()),
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
          } catch (t) {
            console.error("Service Worker registration failed:", t);
          }
      } catch (t) {
        console.error("Initialization error:", t),
          alert("Error initializing app. Please check console for details.");
      }
    }
    setupEventListeners() {
      this.uiController.micButton.addEventListener("click", () => {
        if (this.audioHandler.isRecording) this.audioHandler.stopRecording();
        else {
          const t = this.uiController.languageSelect.value;
          this.audioHandler.startRecording(t);
        }
      }),
        this.uiController.clearButton.addEventListener("click", () => {
          this.translationService.clearTranslations(),
            this.uiController.clearTranslations();
        }),
        this.uiController.exportButton.addEventListener("click", () => {
          this.translationService.exportTranslations();
        }),
        window.addEventListener("speechResult", async (t) => {
          const { transcript: e, isFinal: r } = t.detail;
          if ((this.uiController.updateCurrentText(e), r))
            try {
              const t = this.uiController.languageSelect.value.split("-")[0],
                r = await this.translationService.translateText(e, t, "en");
              this.uiController.addTranslation({
                original: e,
                translated: r,
                timestamp: new Date(),
              });
            } catch (t) {
              console.error("Translation error:", t),
                alert("Error during translation. Please try again.");
            }
        }),
        window.addEventListener("recordingStateChange", (t) => {
          const { isRecording: e } = t.detail;
          this.uiController.updateRecordingState(e);
        }),
        window.addEventListener("transcriptionModeChange", (t) => {
          const { mode: e, selectedLanguage: r } = t.detail;
          this.audioHandler.setTranscriptionMode(e, r);
        });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    new e();
  });
})();
