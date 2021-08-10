import { Fragment, useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { useChannelContext } from 'services/channel';
import { getStream } from 'services/service';
import {
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import {
  FiPlay,
  FiPause,
  FiSkipBack, 
  FiSkipForward,
  FiLock,
  FiUnlock,
  FiHeart,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';
import {
  usePlayerContext,
  setLocked,
  setPlaying,
  setVolume,
  setMuted
} from 'services/player';

function Player() {
  const [{
    locked,
    playing,
    volume,
    muted,
    volumeSliderSupported,
  }, playerDispatch] = usePlayerContext();
  const [channel] = useChannelContext();
  const [url, setUrl] = useState('');

  function getVolumeIcon() {
    if (muted) return <FiVolumeX />;

    if (volume === 0) return <FiVolume />;
    if (volume < .5) return <FiVolume1 />;
    return <FiVolume2 />;
  }

  useEffect(() => {
    if (channel.id) getStream(channel.id).then(setUrl);
  }, [channel]);

  return (
    <Fragment>
      <ReactPlayer
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        style={{ display: 'none' }} />
      <Center h="100px">
        <IconButton
          aria-label="play/toggle"
          icon={locked ? <FiUnlock /> : <FiLock />}
          onClick={() => setLocked(playerDispatch, !locked)}
          borderRadius="100%"
          size="xs"
          m="0 1rem" />

        <Flex
          w="150px"
          justifyContent="space-between"
          alignItems="center">
          <IconButton
            aria-label="play/back"
            icon={<FiSkipBack />}
            borderRadius="100%"
            size="sm" />
          <IconButton
            aria-label="play/toggle"
            icon={playing ? <FiPause /> : <FiPlay />}
            onClick={() => setPlaying(playerDispatch, !playing)}
            borderRadius="100%"
            size="lg" />
          <IconButton
            aria-label="play/toggle"
            icon={<FiSkipForward />}
            borderRadius="100%"
            size="sm" />
        </Flex>

        <IconButton
          aria-label="play/toggle"
          icon={<FiHeart />}
          borderRadius="100%"
          size="xs"
          m="0 1rem" />

        {volumeSliderSupported && 
        <Flex w="200px">
          <IconButton
            aria-label="play/toggle"
            icon={getVolumeIcon()}
            onClick={() => setMuted(playerDispatch, !muted)}
            borderRadius="100%"
            size="xs"
            m="0 1rem" />
          <Slider
            aria-label="slider-ex-1"
            defaultValue={volume}
            onChangeEnd={(val) => setVolume(playerDispatch, val)}
            max={1}
            step={.1}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>}
      </Center>
    </Fragment>
  );
}

export default Player;
