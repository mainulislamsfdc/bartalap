// audioStateManager.js
export class AudioStateManager {
  constructor() {
    this.state = {
      isRecording: false,
      isSpeaking: false,
      recordingState: "stopped", // 'stopped', 'recording', 'paused'
      lastAction: null,
      error: null,
    };

    this.subscribers = new Set();

    // Bind speechSynthesis events
    speechSynthesis.onvoiceschanged = () => this.notifySubscribers();

    // Monitor speechSynthesis state
    setInterval(() => {
      const wasSpeaking = this.state.isSpeaking;
      const isSpeaking = speechSynthesis.speaking;

      if (wasSpeaking !== isSpeaking) {
        this.setState({ isSpeaking });
      }
    }, 100);
  }

  setState(newState) {
    const hasChanged = Object.keys(newState).some(
      (key) => this.state[key] !== newState[key]
    );

    if (!hasChanged) return; // ✅ Avoid redundant updates

    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
    console.log("State updated:", this.state);
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.state));
  }

  startRecording() {
    if (this.state.isSpeaking) {
      console.log("Cannot start recording while speaking");
      return false;
    }

    this.setState({
      isRecording: true,
      recordingState: "recording",
      lastAction: "startRecording",
    });
    return true;
  }

  stopRecording() {
    this.setState({
      isRecording: false,
      recordingState: "stopped",
      lastAction: "stopRecording",
    });
  }

  startSpeaking() {
    if (this.state.isRecording) {
      this.stopRecording();
    }

    this.setState({
      isSpeaking: true,
      lastAction: "startSpeaking",
    });
  }

  stopSpeaking() {
    this.setState({
      isSpeaking: false,
      lastAction: "stopSpeaking",
    });
  }
}

// Single instance for the entire application
export const audioStateManager = new AudioStateManager();