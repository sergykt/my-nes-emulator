import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { RomDecoded, type Rom } from '@/types';
import {
  arrayBufferToHex,
  deleteRomFromDB,
  getAllRoms,
  hexToArrayBuffer,
  saveRomToDB,
} from '@/utils';

interface RomState {
  roms: Rom[];
}
interface RomActions {
  saveRom: (file: File) => Promise<void>;
  getRomById: (id: string) => RomDecoded | undefined;
  removeRom: (id: string) => Promise<void>;
  initRoms: () => Promise<void>;
}

const useRomStore = create<RomState & RomActions>()(
  immer((set, get) => ({
    roms: [],

    initRoms: async () => {
      const romsFromDb = await getAllRoms();
      set({ roms: romsFromDb });
    },
    saveRom: async (file: File) => {
      if (!file.name.endsWith('.nes')) {
        throw new Error('Нужен .nes-файл');
      }
      const buffer = await file.arrayBuffer();
      const hex = arrayBufferToHex(buffer);
      const newRom: Rom = {
        id: uuidv4(),
        name: file.name.replace(/\.nes$/, ''),
        hash: hex,
      };
      set({ roms: [...get().roms, newRom] });
      await saveRomToDB(newRom);
    },

    getRomById: (id: string) => {
      const rom = get().roms.find((r) => r.id === id);
      if (!rom) return undefined;
      const buf = hexToArrayBuffer(rom.hash);
      const decoded = new TextDecoder('x-user-defined').decode(buf);
      return { name: rom.name, romData: decoded };
    },

    removeRom: async (id: string) => {
      set({ roms: get().roms.filter((r) => r.id !== id) });
      await deleteRomFromDB(id);
    },
  }))
);

export default useRomStore;
