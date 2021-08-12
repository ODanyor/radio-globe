import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setCache } from 'utils/cache';
import { IMMORTAL_LOCATION } from 'utils/constants';

export function useKeepLocationUpdated() {
  const location = useLocation();

  useEffect(() => {
    setCache(IMMORTAL_LOCATION, location.pathname);
  }, [location]);
}
