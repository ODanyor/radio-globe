import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Globe from 'react-globe.gl';
import earthImg from 'assets/images/earth-night.jpeg';

function App() {
  return (
    <ChakraProvider>
      <Globe globeImageUrl={earthImg} />
    </ChakraProvider>
  );
}

export default App;
