export type ReactComponent = {
  children: React.ReactNode;
}

export interface Params {
  method: string;
  city: string;
  stationId: string;
};

export interface PlaceOrigin {
  boost: boolean;
  country: string;
  geo: [number, number];
  id: string;
  size: number;
  title: string;
  url: string;
};

export interface Place extends Omit<PlaceOrigin, 'geo'> {
  geo?: [number, number];
  lat: number;
  lng: number;
};
