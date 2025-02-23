const SAMPLE_COUNT = 4 * 1024;
const SAMPLE_MASK = SAMPLE_COUNT - 1;

class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.audioDataL = new Float32Array(SAMPLE_COUNT);
    this.audioDataR = new Float32Array(SAMPLE_COUNT);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.buffersize = 128;

    this.port.onmessage = (event) => {
      const nextWriteIndex = (this.writeIndex + 1) & SAMPLE_MASK;

      if (nextWriteIndex === this.readIndex) {
        return;
      }

      this.audioDataL[this.writeIndex] = event.data.audioDataL;
      this.audioDataR[this.writeIndex] = event.data.audioDataR;
      this.writeIndex = (this.writeIndex + 1) & SAMPLE_MASK;
    };
  }

  process(_inputs, outputs) {
    const outputL = outputs[0][0];
    const outputR = outputs[0][1];

    const availableSamples = (this.writeIndex - this.readIndex + SAMPLE_COUNT) & SAMPLE_MASK;

    if (availableSamples > 0) {
      const samplesToCopy = Math.min(availableSamples, this.buffersize);
      const firstPart = Math.min(samplesToCopy, SAMPLE_COUNT - this.readIndex);
      const secondPart = samplesToCopy - firstPart;

      outputL.set(this.audioDataL.subarray(this.readIndex, this.readIndex + firstPart), 0);
      outputR.set(this.audioDataR.subarray(this.readIndex, this.readIndex + firstPart), 0);

      if (secondPart > 0) {
        outputL.set(this.audioDataL.subarray(0, secondPart), firstPart);
        outputR.set(this.audioDataR.subarray(0, secondPart), firstPart);
      }

      this.readIndex = (this.readIndex + samplesToCopy) & SAMPLE_MASK;
    } else {
      outputL.fill(0);
      outputR.fill(0);
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
