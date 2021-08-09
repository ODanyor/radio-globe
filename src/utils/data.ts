import { getPage, getChannel } from 'services/service';
import { instanceOf } from 'utils/type';
import {
  ContentItemListen,
  ContentItemPage,
  Page,
  ChannelItem,
  ContentItem,
  PageAndChannelState
} from 'types';

function getItemId(item: ContentItemListen | ContentItemPage): string {
  let path;
  if (instanceOf<ContentItemListen>(item, 'href')) path = item.href;
  else if (instanceOf<ContentItemPage>(item, 'page')) path = item.page.url;
  else throw new Error('Undefined item type in getItemId function.');

  const parsedPath = path.split('/');
  return parsedPath[parsedPath.length - 1];
}

function findChannelContextIndex(content: ContentItem[], id: string): number | undefined {
  for (let x = 0; x < content.length; x++) {
    for (let y = 0; y < content[x].items.length; y++) {
      const contentItemId = getItemId(content[x].items[y]);
      if (contentItemId === id) return x;
    }
  }
}

const getPageAndChannelState = (id: string, context = []) =>
  new Promise<PageAndChannelState>(async resolve => {
  const result: any = { channel: {} };

  if (!context.length) {
    await getPage(id).then((res: Page) => {
      result.page = res;
      result.channel.context = res.content[0].items;
      id = getItemId(res.content[0].items[0]);
    });
  } else result.channel.context = context;

  await getChannel(id).then((res: ChannelItem) => {
    result.channel = { ...result.channel, ...res };
  });

  resolve(result);
});

export {
  getItemId,
  getPageAndChannelState,
  findChannelContextIndex,
};
