export const getStored = (key: string) => {
  const cachedValue = localStorage.getItem(key);
  if (cachedValue) return JSON.parse(cachedValue);
}

export const setStored = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const delStored = (key: string) => localStorage.removeItem(key);
