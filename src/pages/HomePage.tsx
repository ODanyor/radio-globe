import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getStored } from 'utils/store';
import { IMMORTAL_LOCATION } from 'utils/constants';
import { Heading } from '@chakra-ui/react';

function HomePage() {
  const history = useHistory();
  const cachedLocation = getStored(IMMORTAL_LOCATION);

  useEffect(() => {
    if (cachedLocation) history.push(cachedLocation);
  }, [cachedLocation, history]);

  return <Heading>Home Page</Heading>;
}

export default HomePage;
