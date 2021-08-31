import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useUpdateTitle } from 'hooks/useUpdateTitle';
import { getFavorites } from 'services/service';
import { useInterfaceContext, setLoading } from 'services/interface';
import { useBrowserContext } from 'services/browser';
import { Content } from 'components';

function FavoritesPage() {
  const [, interfaceDispatch] = useInterfaceContext();
  const [favorites, setFavorites] = useState([]);
  const [{ favorites: storedFavorites }] = useBrowserContext();

  useUpdateTitle('Radio Globe - Favorites');
  
  useEffect(() => {
    if (!storedFavorites) return;
    setLoading(interfaceDispatch, true);
    getFavorites(storedFavorites).then(res => {
      setFavorites(res);
      setLoading(interfaceDispatch, false);
    });
  }, [storedFavorites, interfaceDispatch]);
  
  return (
    <Box color="white" padding="1rem">
      <Content
        content={{
          title: 'Favorites',
          type: 'list',
          items: favorites,
        }} />
      {!favorites.length && <Text>Here will be appeared stations you've liked</Text>}
    </Box>
  );
}

export default FavoritesPage;
