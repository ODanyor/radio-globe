import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useKeepStoreUpdatedWith } from 'hooks/useKeepStoreUpdatedWith';
import { findChannelContextIndex, getItemId } from 'utils/data';
import { useBrowserContext, setChannelId } from 'services/browser';
import { usePlayerContext } from 'services/player';
import { usePageContext } from 'services/page';
import { getAllChannels, getPage } from 'services/service';
import { Content } from 'components';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Params, ContentItem, Page } from 'types';
import { IMMORTAL_LOCATION } from 'utils/constants';

function ExplorePage() {
  const { method, id, option } = useParams<Params>();
  const [, browserDispatch] = useBrowserContext();
  const [page, setPage] = usePageContext();
  const [{locked}] = usePlayerContext();

  useKeepStoreUpdatedWith(IMMORTAL_LOCATION, useLocation().pathname);

  useEffect(() => {
    if (method === 'visit') {
      if (option) {
        getAllChannels(id).then(setPage);
        return;
      }

      getPage(id).then((res: Page) => {
        const firstChannelId = getItemId(res.content[0].items[0]);
        if (!locked) setChannelId(browserDispatch, firstChannelId);
        setPage(res);
      });
    }
  }, [method, option, id, setPage, locked, browserDispatch]);

  useEffect(() => {
    if (method === 'listen') {
      if (!locked) setChannelId(browserDispatch, id);
      if (page && page.subtitle !== 'All Stations') {
        const channelContextIndex = findChannelContextIndex(page.content, id);
        if (typeof channelContextIndex === 'number') return;
      }
      getPage(id).then(setPage);
    }
  }, [method, id, page, setPage, locked, browserDispatch]);

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
