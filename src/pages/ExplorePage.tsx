import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useUpdateTitle } from 'hooks/useUpdateTitle';
import { useKeepStoreUpdatedWith } from 'hooks/useKeepStoreUpdatedWith';
import { findChannelContextIndex, getItemId } from 'utils/data';
import { useBrowserContext, setChannelId } from 'services/browser';
import { useInterfaceContext, setLoading } from 'services/interface';
import { usePlayerContext } from 'services/player';
import { usePageContext } from 'services/page';
import { getAllChannels, getPage } from 'services/service';
import { Content } from 'components';
import { Params, ContentItem, Page } from 'types';
import { IMMORTAL_LOCATION, METHOD_VISIT, METHOD_LISTEN, ALL_STATIONS } from 'utils/constants';

function ExplorePage() {
  const { method, id, option } = useParams<Params>();
  const [, browserDispatch] = useBrowserContext();
  const [, interfaceDispatch] = useInterfaceContext();
  const [page, setPage] = usePageContext();
  const [{locked}] = usePlayerContext();

  useUpdateTitle(String('Radio Globe - ').concat(page.title));
  useKeepStoreUpdatedWith(IMMORTAL_LOCATION, useLocation().pathname);

  useEffect(() => {
    if (method === METHOD_VISIT) {
      setLoading(interfaceDispatch, true);

      if (option) {
        getAllChannels(id).then((res: Page) => {
          setPage(res);
          setLoading(interfaceDispatch, false);
        });
        return;
      }

      getPage(id).then((res: Page) => {
        const firstChannelId = getItemId(res.content[0].items[0]);
        if (!locked) setChannelId(browserDispatch, firstChannelId);
        setPage(res);
        setLoading(interfaceDispatch, false);
      });
    }
  }, [method, option, id, setPage, locked, browserDispatch, interfaceDispatch]);

  useEffect(() => {
    if (method === METHOD_LISTEN) {
      if (!locked) setChannelId(browserDispatch, id);
      if (page.map && page.subtitle !== ALL_STATIONS) {
        const channelContextIndex = findChannelContextIndex(page.content, id);
        if (typeof channelContextIndex === 'number') return;
      }

      setLoading(interfaceDispatch, true);
      getPage(id).then((res: Page) => {
        setPage(res);
        setLoading(interfaceDispatch, false);
      });
    }
  }, [method, id, page, setPage, locked, browserDispatch, interfaceDispatch]);

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
