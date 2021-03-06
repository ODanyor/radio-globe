import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBrowserContext, setFavorite, unsetFavorite } from 'services/browser';
import { useChannelContext } from 'services/channel';
import { usePageContext } from 'services/page';
import { getChannel, getStream } from 'services/service';
import dataUtils from 'utils/data';
import { useAudioPlayer } from 'hooks/useAudioPlayer';
import { useDebounce } from 'hooks/useDebounce';
import { useWindowSize } from 'hooks/useWindowSize';
import { useCopyToClipboard } from 'hooks/useCopyToClipboard';
import { useKeepStoreUpdatedWith } from 'hooks/useKeepStoreUpdatedWith';
import {
  IMMORTAL_VOLUME,
  IMMORTAL_MUTED,
  IMMORTAL_CHANNEL_LOCKED,
} from 'utils/constants';
import {
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  FiPlay,
  FiSquare,
  FiSkipBack, 
  FiSkipForward,
  FiLock,
  FiUnlock,
  FiHeart,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import {
  usePlayerContext,
  setLocked,
  setPlaying,
  setLoading,
  setVolume,
  setMuted,
  setVolumeSliderSupported,
  setUrl,
} from 'services/player';
import { Channel, ContentItemListen } from 'types';

function Player() {
  const toast = useToast();
  const history = useHistory();
  const windowSize = useWindowSize();
  const [, copy] = useCopyToClipboard();
  const [browser, browserDispatch] = useBrowserContext();
  const [{
    locked,
    playing,
    loading,
    volume,
    muted,
    volumeSliderSupported,
    url,
  }, playerDispatch] = usePlayerContext();
  const [channel, setChannel] = useChannelContext();
  const [page] = usePageContext();
  const isFavorited = browser.favorites.some((favorite: string) => favorite === channel.id);

  useEffect(() => {
    if (window.innerWidth < 1000) setVolumeSliderSupported(playerDispatch, false);
    else setVolumeSliderSupported(playerDispatch, true);
  }, [windowSize, playerDispatch]);

  const debouncedLocked = useDebounce(locked);
  const debouncedMuted = useDebounce(muted);
  const debouncedVolume = useDebounce(volume);

  useKeepStoreUpdatedWith(IMMORTAL_CHANNEL_LOCKED, debouncedLocked);
  useKeepStoreUpdatedWith(IMMORTAL_MUTED, debouncedMuted);
  useKeepStoreUpdatedWith(IMMORTAL_VOLUME, debouncedVolume);

  useEffect(() => {
    const channelId = browser.channelId;
    if (channelId && page.map) {
      const channelContextIndex = dataUtils.findChannelContextIndex(page.content, channelId);
      getStream(channelId).then((res) => setUrl(playerDispatch, res));
      getChannel(channelId).then((res: Channel) => {
        if (typeof channelContextIndex === 'number')
          setChannel({...res,  context: dataUtils.channelsOnly(page.content[channelContextIndex].items)});
        else setChannel({...res, context: []});
      });
    }
  }, [browser.channelId, page, setChannel, playerDispatch]);

  function getVolumeIcon() {
    if (muted) return <FiVolumeX />;

    if (volume === 0) return <FiVolume />;
    if (volume < .5) return <FiVolume1 />;
    return <FiVolume2 />;
  }

  function getResponsiveTitle() {
    if (!channel.title) return null;

    const responsiveStyle = windowSize.width < 800 ? {
      position: 'fixed',
      top: '1rem',
      left: '1rem',
    } : {};

    return (
      <Flex
        // @ts-ignore
        style={responsiveStyle}
        w="200px"
        flexDir="column"
        cursor="pointer"
        onClick={handleTitleClick}>
        <Heading
          as="h4"
          size="md"
          color="#ffffcd">
          {channel.title}
        </Heading>
        <Text
          color="white"
          fontSize="xx-small">
          {channel.place.title}, {channel.country.title}
        </Text>
      </Flex>
    );
  }

  function getIndexOfCurrentPlaying() {
    return channel.context.findIndex((item: ContentItemListen) => item.href === channel.url);
  }

  function playPrevious() {
    const { context } = channel;

    let path;
    if (getIndexOfCurrentPlaying() === 0) path = context[context.length - 1].href;
    else path = context[getIndexOfCurrentPlaying() - 1].href;

    history.push(path);
  }

  function playNext() {
    const { context } = channel;

    let path;
    if (getIndexOfCurrentPlaying() === context.length - 1) path = context[0].href;
    else path = context[getIndexOfCurrentPlaying() + 1].href;
    
    history.push(path);
  }

  function handleFavorite() {
    if (isFavorited) unsetFavorite(browserDispatch, channel.id);
    else setFavorite(browserDispatch, channel.id);
  }

  function handleLocked() {
    setLocked(playerDispatch, !locked);
  }

  function handleMuted() {
    setMuted(playerDispatch, !muted);
  }

  function handleVolume(value: number) {
    setVolume(playerDispatch, value);
  }

  function handleTitleClick() {
    const shareLink = String(window.location.origin).concat(channel.url);
    copy(shareLink);
    toast({
      title: 'Share link copied successfuly.',
      description: shareLink,
      status: "success",
      position: 'bottom-right',
      duration: 4000,
      isClosable: true,
    });
  }

  const { onLoadStart, onLoadedData } = useAudioPlayer({src: url, playing, muted, volume});
  onLoadStart(() => setLoading(playerDispatch, true));
  onLoadedData(() => setLoading(playerDispatch, false));

  return (
    <Center flex="1">
      {getResponsiveTitle()}

      <IconButton
        aria-label="lock-toggle"
        icon={locked ? <FiLock /> : <FiUnlock />}
        onClick={handleLocked}
        disabled={!channel.id}
        borderRadius="100%"
        size="xs"
        m="0 1rem" />

      <Flex
        w="150px"
        justifyContent="space-between"
        alignItems="center">
        <IconButton
          aria-label="play-back"
          icon={<FiSkipBack />}
          onClick={playPrevious}
          disabled={!channel.context.length || channel.context.length === 1}
          borderRadius="100%"
          size="sm" />
        <IconButton
          aria-label="play-toggle"
          icon={playing ? <FiSquare /> : <FiPlay />}
          onClick={() => setPlaying(playerDispatch, !playing)}
          disabled={loading || !url}
          isLoading={loading}
          borderRadius="100%"
          size="lg" />
        <IconButton
          aria-label="play-forward"
          icon={<FiSkipForward />}
          onClick={playNext}
          disabled={!channel.context.length || channel.context.length === 1}
          borderRadius="100%"
          size="sm" />
      </Flex>

      <IconButton
        aria-label="favorite"
        icon={<FiHeart fill={isFavorited ? 'black' : 'transparent'} />}
        onClick={handleFavorite}
        disabled={!channel.id}
        borderRadius="100%"
        size="xs"
        m="0 1rem" />

      {volumeSliderSupported && 
      <Flex w="200px">
        <IconButton
          aria-label="mute-toggle"
          icon={getVolumeIcon()}
          onClick={handleMuted}
          borderRadius="100%"
          size="xs"
          m="0 1rem" />
        <Slider
          aria-label="slider-ex-1"
          value={volume}
          onChange={handleVolume}
          max={1}
          step={.1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>}
    </Center>
  );
}

export default Player;
