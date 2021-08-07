import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPage, getChannel } from 'services/service';
import { useChannelContext, setChannel, setContext } from 'services/channel';
import { setCache } from 'utils/cache';
import { Params } from 'types';
import { Box, Heading } from '@chakra-ui/react';
import { Content } from 'components';

function useUpdateCache(key: string, value: any) {
  React.useEffect(() => setCache(key, value), [key, value]);
}

function getItemId(item: any) {
  let path = item.href;
  if (item.page) path = item.page.url;

  const parsedPath = path.split('/');
  return parsedPath[parsedPath.length - 1];
}

function findChannelContextIndex(content: any, id: string) {
  for (let x = 0; x < content.length; x++) {
    for (let y = 0; y < content[x].items.length; y++) {
      const contentItemId = getItemId(content[x].items[y]);
      if (contentItemId === id) return x;
    }
  }
}

function ExplorePage() {
  const location = useLocation();
  const { method, id } = useParams<Params>();
  const [channel, channelDispatch] = useChannelContext();

  const pageQuery = useQuery(['page', id], () => getPage(id));
  const channelQuery = useQuery(['channel', method, id], () => {
    if (method === 'listen') return getChannel(id);
    return undefined;
  });

  useUpdateCache('_immortal|location', location.pathname);

  React.useEffect(() => {
    if (pageQuery.isFetched && channelQuery.isFetched) {
      const id = getItemId(pageQuery.data.content[0].items[0]);

      let fetchedChannel = channelQuery.data;

      if (!channelQuery.data) (async () => {
        await getChannel(id).then(res => fetchedChannel = res);
      })();

      setChannel(channelDispatch, fetchedChannel);
      const contextIndex = findChannelContextIndex(pageQuery.data.content, id);
      if (contextIndex !== undefined)
        setContext(channelDispatch, pageQuery.data.content[contextIndex].items);
    }
  }, [
    channelDispatch,
    pageQuery.isFetched,
    pageQuery.data,
    channelQuery.isFetched,
    channelQuery.data,
  ]);

  // console.log(channel);

  if (pageQuery.isLoading) return <Heading color="white">Loading ...</Heading>

  function getContent() {
    return pageQuery.data.content.map(
      (content: any, index: number) =>
        <Content key={index} title={content.title} content={content} />
    );
  }

  return (
    <Box color="white" padding="1rem">
      {getContent()}
    </Box>
  );
}

export default ExplorePage
