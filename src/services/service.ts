import client from 'utils/client';
import { PlaceOrigin, Place } from 'types';

async function handleSuccess(response: Response) {
  const { data } = await response.json();
  return data;
}

// function handleFailure(error: any) {
//   throw new Error(error);
// }

function getPlaces() {
  async function handleSuccess(response: Response) {
    const { data: { list } } = await response.json();
    const fetchedPlaces: Place[] = list.map((item: PlaceOrigin) => {
      const newItem: Place = { lat: item.geo[1], lng: item.geo[0], ...item };
      delete newItem.geo;
      return newItem;
    });
    
    return fetchedPlaces;
  }

  return client('places').then(handleSuccess);
}

function getStationsUrl(stationId: string) {
  return client(`page/${stationId}`).then(handleSuccess);
}

function getStationUrl(stationId: string) {
  return client(`channel/${stationId}`).then(handleSuccess);
}

function getStreamUrl(stationId: string) {
  return client(`listen/${stationId}`).then(handleSuccess)
}

export {
  getPlaces,
  getStationsUrl,
  getStationUrl,
  getStreamUrl,
};
