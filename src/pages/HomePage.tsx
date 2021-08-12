import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCache } from 'utils/cache';
import { IMMORTAL_LOCATION } from 'utils/constants';
import { Heading } from '@chakra-ui/react';

function HomePage() {
  const history = useHistory();
  const cachedLocation = getCache(IMMORTAL_LOCATION);

  useEffect(() => {
    if (cachedLocation) history.push(cachedLocation);
  }, [cachedLocation, history]);

  return <Heading>Home Page</Heading>;
}

export default HomePage;
