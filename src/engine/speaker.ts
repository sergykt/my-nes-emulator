class Speaker {
  audioContext: AudioContext;

  audioWorkletNode: AudioWorkletNode | null = null;

  gainNode: GainNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.initAudioWorklet().catch(console.error);
  }

  getSampleRate() {
    return this.audioContext.sampleRate;
  }

  async initAudioWorklet() {
    await this.audioContext.audioWorklet.addModule('/audio-processor.js');

    this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'audio-processor', {
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    if (this.audioWorkletNode) {
      this.audioWorkletNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  async start() {
    if (this.audioWorkletNode) {
      await this.audioContext.resume();
    }
  }

  async toggle() {
    if (this.audioWorkletNode) {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      } else {
        await this.audioContext.suspend();
      }
    }
  }

  toggleVolume() {
    this.gainNode.gain.value = this.gainNode.gain.value === 0 ? 1 : 0;
  }

  updateAudioData(audioDataL: number, audioDataR: number) {
    this.audioWorkletNode?.port.postMessage({
      audioDataL,
      audioDataR,
    });
  }
}

export default Speaker;
