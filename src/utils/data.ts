import {
  ContentItemListen,
  ContentItemPage,
  ContentItemSearch,
  ContentItem,
} from 'types';

function instanceOf<T>(object: any, key: string): object is T {
  return key in object;
}

function getItemId(item: ContentItemListen | ContentItemPage | ContentItemSearch): string {
  let path;
  if (instanceOf<ContentItemListen>(item, 'href')) path = item.href;
  else if (instanceOf<ContentItemPage>(item, 'page')) path = item.page.url;
  else if (instanceOf<ContentItemListen>(item, 'url')) path = item.url;
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

function channelsOnly(items: any[]) {
  return items.filter(item => item.href);
}

const dataUtils = {
  instanceOf,
  getItemId,
  findChannelContextIndex,
  channelsOnly
};

export default dataUtils;
