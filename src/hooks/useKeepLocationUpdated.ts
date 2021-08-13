import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setStored } from 'utils/store';
import { IMMORTAL_LOCATION } from 'utils/constants';

export function useKeepLocationUpdated() {
  const location = useLocation();

  useEffect(() => {
    setStored(IMMORTAL_LOCATION, location.pathname);
  }, [location]);
}
