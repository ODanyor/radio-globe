import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getStored } from 'utils/store';
import { IMMORTAL_LOCATION } from 'utils/constants';
import { Center, Box, Heading, Text } from '@chakra-ui/react';

function HomePage() {
  const history = useHistory();
  const cachedLocation = getStored(IMMORTAL_LOCATION);

  useEffect(() => {
    if (cachedLocation) history.push(cachedLocation);
  }, [cachedLocation, history]);

  return (
    <Center h="100vh" flexDir="column" color="white">
      <Box textAlign="center" mb="3rem">
        <Heading>Welcome to the Radio Globe</Heading>
        <Text>Made by Doniyor Otamurodov thanks for radio.garden API</Text>
      </Box>
    </Center>
  );
}

export default HomePage;
