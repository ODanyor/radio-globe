import { Center, Flex, IconButton } from '@chakra-ui/react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { usePlayerContext, setPlaying } from 'services/player';

function Player() {
  const [{playing}, playerDispatch] = usePlayerContext();

  return (
    <Center h="100px">
      <Flex
        w="150px"
        justifyContent="space-between"
        alignItems="center">
        <IconButton
          aria-label="play/back"
          icon={<FiSkipBack />}
          borderRadius="100%" />
        <IconButton
          aria-label="play/toggle"
          icon={playing ? <FiPause /> : <FiPlay />}
          onClick={() => setPlaying(playerDispatch, !playing)}
          borderRadius="100%"
          size="lg" />
        <IconButton
          aria-label="play/toggle"
          icon={<FiSkipForward />}
          borderRadius="100%" />
      </Flex>
    </Center>
  );
}

export default Player;
