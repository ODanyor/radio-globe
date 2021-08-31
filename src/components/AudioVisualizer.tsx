import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Wave from 'wave-visualizer';

function AudioVisualizer() {
  const [wave] = useState(new Wave());

  // TODO: width of the wave should be 100% by height and width
  // wave.fromStream(stream, 'output', {
  //   colors: ['red', 'white', 'blue'],
  // });

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(function (stream) {
      wave.fromStream(stream, 'output', {
        colors: ['red', 'white', 'blue'],
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });

  return (
    <Box
      pos="absolute"
      w="100%"
      h="100%"
      bgColor="#000011">
      <canvas id="output" height="100vh" width="100vw"></canvas>
    </Box>
  );
}

export default AudioVisualizer;
