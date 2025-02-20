import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { RomDecoded, type Rom } from '@/types';

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

interface RomState {
  roms: Rom[];
}

interface RomActions {
  saveRom: (file: File) => Promise<void>;
  getRomById: (id: string) => RomDecoded | undefined;
  removeRom: (id: string) => void;
}

const useRomStore = create<RomState & RomActions>()(
  persist(
    immer((set, get) => ({
      roms: [],
      saveRom: async (file: File) => {
        if (!file.name.endsWith('.nes')) {
          throw new Error('Invalid file extension. Use .nes file');
        }

        const buffer = await file.arrayBuffer();
        const hex = arrayBufferToHex(buffer);

        set({ roms: [...get().roms, { name: file.name, hash: hex, id: uuidv4() }] });
      },
      getRomById: (id: string) => {
        const rom = get().roms.find((item) => item.id === id);
        if (rom) {
          const { hash } = rom;
          const buffer = hexToArrayBuffer(hash);
          const decoder = new TextDecoder('x-user-defined');
          const decodedData = decoder.decode(buffer);

          return { name: rom.name, romData: decodedData };
        }

        return undefined;
      },
      removeRom: (id: string) => set({ roms: get().roms.filter((rom) => rom.id !== id) }),
    })),
    {
      name: 'localRoms',
    }
  )
);

export default useRomStore;
