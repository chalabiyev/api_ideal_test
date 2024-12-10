import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

//* Redux Persist Storage
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

//* Clear Auth Storage
export const clearAuthStorage = async () => {
  await reduxStorage.removeItem('persist:auth');
};

//* Set Item To Storage
export const setStorage = (
  key: string,
  value: string | number | boolean | object | null,
) => {
  if (typeof value === 'object') {
    return storage.set(key, JSON.stringify(value));
  } else {
    return storage.set(key, value);
  }
};

//* Get String From Storage
export const getStringFromStorage = (key: string) => {
  return storage.getString(key);
};

//* Get Number From Storage
export const getNumberFromStorage = (key: string) => {
  return storage.getNumber(key);
};

//* Get Boolean From Storage
export const getBooleanFromStorage = (key: string) => {
  return storage.getBoolean(key);
};

//* Get JSON From Storage
export const getStorageObject = (key: string) => {
  const data = storage.getString(key) as string;
  if (data) {
    return JSON.parse(data);
  }
};

//* Checking If An Item Exists
export const checkStorage = (key: string) => {
  return storage.contains(key);
};

//* Delete An Item From Storage
export const deleteStorage = (key: string) => {
  return storage.delete(key);
};

//* Delete All Items
export const clearStorage = () => {
  return storage.clearAll();
};
