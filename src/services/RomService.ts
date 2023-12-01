import type { IRom, IRomDecoded } from '../types';

const getId = (array: IRom[]): number => {
  const idArray = array.map((item) => item.id) as number[];
  return Math.max(...idArray) + 1;
};

const arrayBufferToHex = (buffer: ArrayBuffer): string => {
  const view = new Uint8Array(buffer);
  const hex = Array.from(view)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hex;
};

const hexToArrayBuffer = (hex: string): ArrayBuffer => {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
  return bytes.buffer;
};

class RomService {
  static async saveRom(file: File): Promise<IRom> {
    if (!file.name.endsWith('.nes')) {
      throw new Error('Invalid file extension. Use .nes file');
    }

    const buffer = await file.arrayBuffer();
    const hex = arrayBufferToHex(buffer);
    const fileObj: IRom = { name: file.name, hash: hex };
    const localRoms = localStorage.getItem('roms');

    if (localRoms) {
      const parsedRoms = JSON.parse(localRoms) as IRom[];
      fileObj.id = getId(parsedRoms);
      localStorage.setItem('roms', JSON.stringify([...parsedRoms, fileObj]));
    } else {
      fileObj.id = 1;
      localStorage.setItem('roms', JSON.stringify([fileObj]));
    }

    return fileObj;
  }

  static getRomById(id: number): IRomDecoded | null {
    const localRoms = localStorage.getItem('roms');

    if (localRoms) {
      const parsedRoms = JSON.parse(localRoms) as IRom[];
      const selectedRom = parsedRoms.find((item) => item.id === id);
      if (selectedRom) {
        const { hash } = selectedRom;
        const buffer = hexToArrayBuffer(hash);
        const decoder = new TextDecoder('x-user-defined');
        const decodedData = decoder.decode(buffer);

        return { name: selectedRom.name, romData: decodedData };
      }

      return null;
    }

    return null;
  }
}

export default RomService;
