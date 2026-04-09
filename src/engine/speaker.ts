const BATCH_SIZE = 128;

class Speaker {
  private readonly audioContext: AudioContext;

  private audioWorkletNode: AudioWorkletNode | null = null;

  private readonly gainNode: GainNode;

  private leftBatch: Float32Array;

  private rightBatch: Float32Array;

  private batchCounter: number;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.initAudioWorklet().catch(console.error);
    this.leftBatch = new Float32Array(BATCH_SIZE);
    this.rightBatch = new Float32Array(BATCH_SIZE);
    this.batchCounter = 0;
  }

  getSampleRate() {
    return this.audioContext.sampleRate;
  }

  private async initAudioWorklet() {
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

  writeSamples(audioDataL: number, audioDataR: number) {
    if (this.audioWorkletNode) {
      this.leftBatch[this.batchCounter] = audioDataL;
      this.rightBatch[this.batchCounter] = audioDataR;
      this.batchCounter += 1;

      if (this.batchCounter >= BATCH_SIZE) {
        this.pushSamples(this.leftBatch, this.rightBatch);
        this.batchCounter = 0;
      }
    }
  }

  private pushSamples(audioDataL: Float32Array, audioDataR: Float32Array) {
    this.audioWorkletNode?.port.postMessage({
      type: 'samples',
      audioDataL,
      audioDataR,
    });
  }
}

export default Speaker;
