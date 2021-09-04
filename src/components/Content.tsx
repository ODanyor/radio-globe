import { Link, useHistory, useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, IconButton } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import { useBrowserContext } from 'services/browser';
import { usePlayerContext, setPlaying } from 'services/player';
import dataUtils from 'utils/data';
import { ContentItem, Params } from 'types';
import { FiSquare, FiPlay } from 'react-icons/fi';

type ContentProps = {
  content: ContentItem;
}

function Content({ content }: ContentProps) {
  const history = useHistory();
  const {option} = useParams<Params>();
  const [{channelId}] = useBrowserContext();
  const [{playing, loading, url}, playerDispatch] = usePlayerContext();

  function getContent() {
    return content.items.map((item: any, index: number) => {
      let { subtitle, href: path } = item;
      if (item.page) {
        path = item.page.url;
        subtitle = item.page.subtitle;
      }
      if (item.url) path = item.url;

      let itemId = item.id || dataUtils.getItemId(item);
      if (channelId === itemId && url) return (
        <Flex
          key={index}
          m="0 -1rem"
          p=".3rem 1rem"
          minH="3.5rem"
          justifyContent="space-between"
          _hover={{ bg: "#000011" }}>
          <Box>
            <Heading as="h4" size="md">{item.title}</Heading>
            <Text>{subtitle}</Text>
          </Box>
          <IconButton
            aria-label="play-toggle"
            icon={playing ? <FiSquare /> : <FiPlay />}
            onClick={() => setPlaying(playerDispatch, !playing)}
            disabled={loading}
            isLoading={loading}
            background="none"
            size="lg"
            _hover={{}} />
        </Flex>
      );
      
      return (
        <Link key={index} to={path}>
          <Box m="0 -1rem" p=".3rem 1rem" minH="3.5rem" _hover={{ bg: "#000011" }}>
            <Heading as="h4" size="md">{item.title}</Heading>
            <Text>{subtitle}</Text>
          </Box>
        </Link>
      );
    });
  }

  return (
    <Box color="white" _notLast={{ marginBottom: '3rem' }}>
      {option &&
        <Button
          bg="#000011"
          leftIcon={<FiChevronLeft />}
          _hover={{ color: "#000011", bg: "white" }}
          onClick={history.goBack}>Back</Button>
      }
      <Heading as="h3" size="2xl" mb="1rem">{content.title}</Heading>
      {getContent()}
    </Box>
  );
}

export default Content;
