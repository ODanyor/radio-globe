import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useKeepLocationUpdated } from 'hooks/useKeepLocationUpdated';
import { getPageAndChannelState, findChannelContextIndex } from 'utils/data';
import { usePlayerContext } from 'services/player';
import { usePageContext } from 'services/page';
import { useChannelContext } from 'services/channel';
import { getAllChannels } from 'services/service';
import { Content } from 'components';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Params, ContentItem } from 'types';

function ExplorePage() {
  const { method, id, option } = useParams<Params>();
  const [page, setPage] = usePageContext();
  const [, setChannel] = useChannelContext();
  const [{locked}] = usePlayerContext();
  useKeepLocationUpdated();

  useEffect(() => {
    if (option) {
      getAllChannels(id).then(setPage);
      return;
    }

    if (method === 'listen' && page && page.subtitle !== 'All Stations') {
      const channelContextIndex = findChannelContextIndex(page.content, id);
      if (typeof channelContextIndex === 'number') {
        getPageAndChannelState(id, page.content[channelContextIndex].items)
          .then(res => !locked && setChannel(res.channel));
        return;
      }
    }

    getPageAndChannelState(id).then(res => {
      setPage(res.page);
      !locked && setChannel(res.channel);
    });
  }, [method, id, option, setPage, setChannel]); // eslint-disable-line

  if (!page) return (
    <Center h="100%">
      <Spinner color="white" size="xl" />
    </Center>
  );

  function getContent() {
    return page.content.map(
      (content: ContentItem, index: number) => <Content key={index} content={content} />
    );
  }

  return (
    <Box color="white" padding="1rem">
      {getContent()}
    </Box>
  );
}

export default ExplorePage;
