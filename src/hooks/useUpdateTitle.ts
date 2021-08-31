import { useEffect } from 'react';

export function useUpdateTitle(value: string) {
  useEffect(() => {
    document.title = value;
  }, [value]);
}
