import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Params, ContentItem } from 'types';
import { getPageAndChannelState, findChannelContextIndex } from 'utils/data';
import { usePageContext } from 'services/page';
import { useChannelContext } from 'services/channel';
import { Content, Spinner } from 'components';
import { Box } from '@chakra-ui/react';

function ExplorePage() {
  const { method, id } = useParams<Params>();
  const [page, setPage] = usePageContext();
  const [channel, setChannel] = useChannelContext();
  console.log({page, channel});

  useEffect(() => {
    if (method === 'listen' && page) {
      const channelContextIndex = findChannelContextIndex(page.content, id);
      if (typeof channelContextIndex === 'number') {
        getPageAndChannelState(id, page.content[channelContextIndex].items)
          .then(res => setChannel(res.channel));
        return;
      }
    }

    getPageAndChannelState(id).then(res => {
      setPage(res.page);
      setChannel(res.channel);
    });
  }, [method, id, setPage, setChannel]); // eslint-disable-line

  if (!page) return <Spinner />;

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
