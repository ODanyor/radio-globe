export const getCache = (key: string) => localStorage.getItem(key);

export const setCache = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const delCache = (key: string) => localStorage.removeItem(key);
