import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useInterfaceContext, setNavberIsOpen } from 'services/interface';
import { useChannelContext } from 'services/channel';
import { getStream } from 'services/service';
import {
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Heading,
  Text
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
  setLoading,
  setVolume,
  setMuted
} from 'services/player';
import { ContentItemListen } from 'types';

function Player() {
  const history = useHistory();
  const [{navbarIsOpen}, interfaceDispatch] = useInterfaceContext();
  const [{
    locked,
    playing,
    loading,
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
    if (channel.id) {
      setLoading(playerDispatch, true);
      getStream(channel.id).then(setUrl);
    }
  }, [channel, playerDispatch]);

  function getIndexOfCurrentPlaying() {
    return channel.context.findIndex((item: ContentItemListen) => item.href === channel.url);
  }

  function playPrevious() {
    history.push(channel.context[getIndexOfCurrentPlaying() - 1].href);
  }

  function playNext() {
    history.push(channel.context[getIndexOfCurrentPlaying() + 1].href);
  }

  return (
    <Fragment>
      <ReactPlayer
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        style={{ display: 'none' }}
        onReady={() => setLoading(playerDispatch, false)} />

      <Center flex="1">
        {channel.title &&
        <Flex
          w="200px"
          flexDir="column"
          cursor="pointer"
          onClick={() => setNavberIsOpen(interfaceDispatch, !navbarIsOpen)}>
          <Heading as="h4" size="md" color="#ffffcd">{channel.title}</Heading>
          <Text color="white" fontSize="xx-small">{channel.place.title}, {channel.country.title}</Text>
        </Flex>}

        <IconButton
          aria-label="play/toggle"
          icon={locked ? <FiLock /> : <FiUnlock />}
          onClick={() => setLocked(playerDispatch, !locked)}
          disabled={!channel.id}
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
            onClick={playPrevious}
            disabled={
              !channel.context.length ||
              getIndexOfCurrentPlaying() === 0
            }
            borderRadius="100%"
            size="sm" />
          <IconButton
            aria-label="play/toggle"
            icon={playing ? <FiPause /> : <FiPlay />}
            onClick={() => setPlaying(playerDispatch, !playing)}
            disabled={!channel.id || loading}
            isLoading={loading}
            borderRadius="100%"
            size="lg" />
          <IconButton
            aria-label="play/toggle"
            icon={<FiSkipForward />}
            onClick={playNext}
            disabled={
              !channel.context.length ||
              getIndexOfCurrentPlaying() === channel.context.length - 1 ||
              channel.context[getIndexOfCurrentPlaying() + 1].rightAccessory
            }
            borderRadius="100%"
            size="sm" />
        </Flex>

        <IconButton
          aria-label="play/toggle"
          icon={<FiHeart />}
          disabled={!channel.id}
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
            onChange={(val) => setVolume(playerDispatch, val)}
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
