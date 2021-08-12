export const getCache = (key: string) => {
  const cachedValue = localStorage.getItem(key);
  if (cachedValue) return JSON.parse(cachedValue);
}

export const setCache = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const delCache = (key: string) => localStorage.removeItem(key);
