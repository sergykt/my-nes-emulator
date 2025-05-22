import { type Rom } from '@/types';

const DB_NAME = 'rom-db';
const STORE_NAME = 'roms';

async function getObjectStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
  const openRequest = indexedDB.open(DB_NAME, 1);
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    openRequest.onupgradeneeded = () => {
      if (!openRequest.result.objectStoreNames.contains(STORE_NAME)) {
        openRequest.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    openRequest.onsuccess = () => resolve(openRequest.result);
    openRequest.onerror = () => reject(openRequest.error);
  });
  const tx = db.transaction(STORE_NAME, mode);
  return tx.objectStore(STORE_NAME);
}

export async function getAllRoms(): Promise<Rom[]> {
  const objectStore = await getObjectStore('readonly');

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result as Rom[]);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveRomToDB(rom: Rom): Promise<void> {
  const objectStore = await getObjectStore('readwrite');
  return new Promise((resolve, reject) => {
    const request = objectStore.put(rom);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteRomFromDB(romId: string): Promise<void> {
  const objectStore = await getObjectStore('readwrite');

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(romId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
