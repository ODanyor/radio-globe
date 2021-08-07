import { Link } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

type ContentProps = {
  title: string;
  content: any;
}

function Content({ title, content }: ContentProps) {
  function getContent() {
    return content.items.map((item: any, index: number) => {
      let { subtitle, href: path } = item;
      if (item.page) {
        path = item.page.url;
        subtitle = item.page.subtitle;
      }
      
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
    <Box mb="3rem">
      <Heading as="h3" size="lg" mb="1rem">{title}</Heading>
      {getContent()}
    </Box>
  );
}

export default Content;
