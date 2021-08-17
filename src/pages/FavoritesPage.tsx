import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { getStored } from 'utils/store';
import { IMMORTAL_FAVORITES } from 'utils/constants';
import { getFavorites } from 'services/service';
import { useInterfaceContext, setLoading } from 'services/interface';
import { Content } from 'components';

function FavoritesPage() {
  const [, interfaceDispatch] = useInterfaceContext();
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const storedFavorites = getStored(IMMORTAL_FAVORITES);
    setLoading(interfaceDispatch, true);
    getFavorites(storedFavorites).then(res => {
      setFavorites(res);
      setLoading(interfaceDispatch, false);
    });
  }, [interfaceDispatch]);
  
  return (
    <Box color="white" padding="1rem">
      <Content
        content={{
          title: 'Favorites',
          type: 'list',
          items: favorites,
        }} />
    </Box>
  );
}

export default FavoritesPage;
