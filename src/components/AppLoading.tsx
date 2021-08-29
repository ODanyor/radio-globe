import { Center, Box, Heading, Text, Spinner } from '@chakra-ui/react';

function AppLoading() {
  return (
    <Center h="100vh" flexDir="column">
      <Box textAlign="center" mb="3rem">
        <Heading>Welcome to the Radio Globe</Heading>
        <Text>Made by Doniyor Otamurodov thanks for radio.garden API</Text>
      </Box>
      <Spinner size="lg" />
    </Center>
  );
}

export default AppLoading;
