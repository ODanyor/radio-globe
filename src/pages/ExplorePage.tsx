import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPageAndChannelState, findChannelContextIndex } from 'utils/data';
import { usePageContext } from 'services/page';
import { useChannelContext } from 'services/channel';
import { getAllChannels } from 'services/service';
import { Content } from 'components';
import { Box, Spinner } from '@chakra-ui/react';
import { Params, ContentItem } from 'types';

function ExplorePage() {
  const { method, id, option } = useParams<Params>();
  const [page, setPage] = usePageContext();
  const [, setChannel] = useChannelContext();

  useEffect(() => {
    if (method === 'listen' && page) {
      const channelContextIndex = findChannelContextIndex(page.content, id);
      if (typeof channelContextIndex === 'number')
        getPageAndChannelState(id, page.content[channelContextIndex].items)
          .then(res => setChannel(res.channel));
    }
    else if (option) getAllChannels(id).then(setPage);
    else getPageAndChannelState(id).then(res => {
      setPage(res.page);
      setChannel(res.channel);
    });
    // TODO: page is required in dependencies
  }, [method, id, option, setPage, setChannel]); // eslint-disable-line

  if (!page) return <Spinner color="white" size="xl" />;

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
