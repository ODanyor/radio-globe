import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getPage, getChannel } from 'services/service';
import { usePlayerContext, setPage, setChannel } from 'services/player';
import { setCache } from 'utils/cache';
import { Params } from 'types';

function useUpdateCache(key: string, value: any) {
  React.useEffect(() => setCache(key, value), [key, value]);
}

function ExplorePage() {
  const location = useLocation();
  const { method, id } = useParams<Params>();
  const [, dispatch] = usePlayerContext();

  const handlePageSwitch = React.useCallback(() => {
    // TODO: check if channel.place.id doesn't equal to page.map
    getPage(id).then(page => {
      setPage(dispatch, page);

      const splittedHref = String(page.content[0].items[0].href).split('/');
      const channelId = method === 'visit'
        ? splittedHref[splittedHref.length - 1]
        : id;

      getChannel(channelId).then(channel => setChannel(dispatch, channel));
    });
  }, [dispatch, method, id]);

  React.useEffect(() => {
    handlePageSwitch();
  }, [handlePageSwitch]);

  useUpdateCache('_immortal|location', location.pathname);

  return null;
}

export default ExplorePage
