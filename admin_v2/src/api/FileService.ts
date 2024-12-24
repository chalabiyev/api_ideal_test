export const API_KEY = import.meta.env.VITE_API_KEY;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// eslint-disable-next-line
import { STORAGE_KEY } from 'src/auth/context/jwt';

const token = localStorage.getItem(STORAGE_KEY);

export const callGetFile = async (fileName: string) => {
  const response = await fetch(`${BASE_URL}/file/getFile/${fileName}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
    },
    method: 'GET',
  });
  if (response.ok) {
    const blobData = await response.blob();
    return URL.createObjectURL(blobData);
    // eslint-disable-next-line
  } else {
    return null;
  }
};

export const uploadFile = async (file: Blob, fileName: string) => {
  let fdata = new FormData();
  fdata.append('file', file);
  fdata.append('fileName', fileName);
  fdata.append('isPublic', "false");
  const response = await fetch(`${BASE_URL}/file/uploadFile`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
    },
    body: fdata,
    method: 'POST',
  });

  if (response.ok) {
    const data = await response.json();
    return { ok: true, data: data };
    // eslint-disable-next-line
  } else {
    return { ok: false, data: null };
  }
};
