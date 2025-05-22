export const arrayBufferToHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

export const hexToArrayBuffer = (hex: string) =>
  new Uint8Array(hex.match(/.{1,2}/g)!.map((h) => parseInt(h, 16))).buffer;
