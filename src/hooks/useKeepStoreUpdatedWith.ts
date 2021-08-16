import { useEffect } from 'react';
import { setStored } from 'utils/store';

export function useKeepStoreUpdatedWith(key: string, value: any) {
  useEffect(() => { setStored(key, value) }, [key, value]);
}
