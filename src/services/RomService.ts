interface IGameRom {
  name: string;
  hash: string;
}

class RomService {
  static async saveRom(file: File): Promise<string> {
    if (!file.name.endsWith('.nes')) {
      throw new Error('Invalid file extension. Use .nes file');
    }

    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hash));
    const hex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    const fileObj: IGameRom = { name: file.name, hash: hex };
    const localRoms = localStorage.getItem('roms');

    if (localRoms) {
      const parsedRoms = JSON.parse(localRoms) as IGameRom[];
      localStorage.setItem('roms', JSON.stringify([...parsedRoms, { ...fileObj }]));
    } else {
      localStorage.setItem('roms', JSON.stringify([fileObj]));
    }

    const decoder = new TextDecoder('x-user-defined');
    return decoder.decode(buffer);
  }

  // static getRom(id: number) {
  //   const localRoms = localStorage.getItem('roms');
  //   if (localRoms) {
  //     const parsedRoms = JSON.parse(localRoms) as IGameRom[];
  //     const selectedRom = parsedRoms.find('');
  //   }

  //   const bytes = [];
  //   for (let i = 0; i < hex.length; i += 2) {
  //     bytes.push(parseInt(hex.substring(i, 2), 16));
  //   }
  //   const buffer = new Uint8Array(bytes).buffer;
  // }
}

export default RomService;
