import client from 'utils/client';
import { PlaceOrigin, Place } from 'types';

async function handleSuccess(response: Response) {
  const { data } = await response.json();
  return data;
}

function getPlaces() {
  // DESC: transforming data structure to suit Globe component
  async function handleSuccess(response: Response) {
    const { data: { list } } = await response.json();
    const fetchedPlaces: Place[] = list.map((item: PlaceOrigin) => {
      const newItem: Place = { lat: item.geo[1], lng: item.geo[0], ...item };
      delete newItem.geo;
      return newItem;
    });
    
    return fetchedPlaces;
  }

  return client('places', { cache: 'force-cache' }).then(handleSuccess);
}

function getPage(id: string) {
  return client(`page/${id}`).then(handleSuccess);
}

function getChannel(id: string) {
  return client(`channel/${id}`).then(handleSuccess);
}

function getAllChannels(id: string) {
  return client(`channel/${id}/channels`).then(handleSuccess);
}

function getStream(id: string) {
  return client(`listen/${id}`).then(handleSuccess)
}

export {
  getPlaces,
  getPage,
  getChannel,
  getAllChannels,
  getStream,
};
