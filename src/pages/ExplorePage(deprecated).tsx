import { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Heading } from '@chakra-ui/react';
import { Content } from 'components';
import { getPage, getChannel, getAllChannels } from 'services/service';
import { useChannelContext } from 'services/channel';
import { setCache } from 'utils/cache';
import { instanceOf } from 'utils/type';
import {
  Params,
  ContentItem,
  ContentItemListen,
  ContentItemPage,
  ChannelItem,
  Page,
} from 'types';

function useUpdateCache(key: string, value: any) {
  useEffect(() => setCache(key, value), [key, value]);
}

function getItemId(item: ContentItemListen | ContentItemPage) {
  let path;
  if (instanceOf<ContentItemListen>(item, 'href')) path = item.href;
  else if (instanceOf<ContentItemPage>(item, 'page')) path = item.page.url;
  else throw new Error('Undefined item type in getItemId function.');

  const parsedPath = path.split('/');
  return parsedPath[parsedPath.length - 1];
}

function findChannelContextIndex(content: ContentItem[], id: string) {
  for (let x = 0; x < content.length; x++) {
    for (let y = 0; y < content[x].items.length; y++) {
      const contentItemId = getItemId(content[x].items[y]);
      if (contentItemId === id) return x;
    }
  }
}

function updateChannel({ queryKey }: { queryKey: string[] }) {
  if (queryKey[1] === 'listen') return getChannel(queryKey[2]);
  return undefined;
}

function ExplorePage() {
  const location = useLocation();
  const { method, id, option } = useParams<Params>();
  const [, channelDispatch] = useChannelContext();

  const cachedPage = useRef<Page | null>(null);
  const pageQuery = useQuery(['page', method, id], () => {
    if (!cachedPage.current || method === 'visit') return getPage(id).then((res: Page) => {
      cachedPage.current = res;
      return res;
    });
    
    const contextIndex = findChannelContextIndex(cachedPage.current.content, id);
    if (typeof contextIndex !== 'number') return getPage(id).then((res: Page) => {
      cachedPage.current = res;
      return res;
    });
    
    return cachedPage.current;
  });
  const channelQuery = useQuery(['channel', method, id], updateChannel);

  useUpdateCache('_immortal|location', location.pathname);

  useEffect(() => {
    if (pageQuery.isFetched && channelQuery.isFetched) {
      const id = getItemId(pageQuery.data!.content[0].items[0]);

      if (option) getAllChannels(id).then(res => console.log(res));

      let fetchedChannel = channelQuery.data;

      if (!channelQuery.data) (async () => {
        await getChannel(id).then((res: ChannelItem) => fetchedChannel = res);
      })();

      // setChannel(channelDispatch, fetchedChannel);
      // const contextIndex = findChannelContextIndex(pageQuery.data!.content, id);
      // if (contextIndex !== undefined)
      //   setContext(channelDispatch, pageQuery.data!.content[contextIndex].items);
    }
  }, [
    option,
    channelDispatch,
    pageQuery.isFetched,
    pageQuery.data,
    channelQuery.isFetched,
    channelQuery.data,
  ]);

  if (!pageQuery.data) return <Heading color="white">Loading ...</Heading>;

  function getContent() {
    console.log('render');
    return pageQuery.data!.content.map(
      (content: ContentItem, index: number) => <Content key={index} content={content} />
    );
  }

  return (
    <Box color="white" padding="1rem">
      {getContent()}
    </Box>
  );
}

export default ExplorePage
