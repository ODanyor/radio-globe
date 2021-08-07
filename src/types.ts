export type ReactComponent = {
  children: React.ReactNode;
}

interface Identifier {
  id: string;
  title: string;
};

export interface Params extends Identifier {
  method: string;
};

export interface PlaceOrigin extends Identifier {
  boost: boolean;
  country: string;
  geo: [number, number];
  size: number;
  url: string;
};

export interface Place extends Omit<PlaceOrigin, 'geo'> {
  geo?: [number, number];
  lat: number;
  lng: number;
};

export interface ContentItemListen {
  title: string;
  href: string;
};

export interface Page {
  map: string;
  url: string;
  count: number;
  title: string;
  subtitle: string;
  content?: ContentItem[];
}

export interface ContentItemPage {
  title: string;
  page: Page;
  rightDetail?: string;
  leftAccessory?: 'chevron-left';
  leftAccessoryCount?: number;
};

export interface ContentItem {
  title: string;
  type: 'list';
  items: Array<ContentItemListen | ContentItemPage>;
  itemsType?: 'channel';
  actionText?: string;
  actionPage?: ContentItemPage;
  rightAccessory?: 'chevron-right';
};

export interface Channel extends Identifier {
  country: Identifier;
  place: Identifier;
  secure: boolean;
  url: string;
  website?: string;
};
