import { ROOT_URL as ROOT_URI } from './config';

const getResource = async (segment) => {
  const res = await fetch(`${ROOT_URI}${segment}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${segment}, received ${res.status}`);
  }

  const data = await res.json();

  return data;
};

export const api = {
  async fetchHomes() {
    const res = await getResource('/homes');

    return res;
  },
};
