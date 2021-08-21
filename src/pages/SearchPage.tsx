import { useEffect, useState, useMemo } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { Content } from 'components';
import { search } from 'services/service';
import { getStored } from 'utils/store';
import { useKeepStoreUpdatedWith } from 'hooks/useKeepStoreUpdatedWith';
import { IMMORTAL_QUERY } from 'utils/constants';

function SearchPage() {
  const storedQuery = useMemo(() => getStored(IMMORTAL_QUERY), []);
  const [query, setQuery] = useState(storedQuery ? storedQuery : '');
  const [result, setResult] = useState([]);

  useKeepStoreUpdatedWith(IMMORTAL_QUERY, query);

  useEffect(() => {
    if (storedQuery) setQuery(storedQuery);
  }, [storedQuery, setQuery]);

  function handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value.toLowerCase());
  }

  useEffect(() => {
    const { ready, abort } = search(`search?query=${query}`);
    ready.then(res => {
      const { hits: { hits } } = res;
      const result = hits.map((hit: any) => hit._source);
      setResult(result);
    }).catch(() => null);
    return () => abort();
  }, [query]);

  return (
    <Box color="white" padding="1rem">
      <Input
        value={query}
        onChange={handleQuery}
        type="text"
        placeholder="type country, city, station..." />
      <Content
        content={{
          title: '',
          type: 'list',
          items: result,
        }} />
    </Box>
  );
}

export default SearchPage;
