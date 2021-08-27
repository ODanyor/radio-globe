import Routes from 'App/Routes';
import { Link as ReachLink } from 'react-router-dom';
import { Box, Flex, LinkBox, Center, Icon, Text, Spinner } from '@chakra-ui/react';
import { useInterfaceContext } from 'services/interface';
import { useWindowSize } from 'hooks/useWindowSize';
import { FiGlobe, FiHeart, FiSearch } from 'react-icons/fi';

const navbarLinks = [
  { to: '/', icon: FiGlobe, label: 'Explore' },
  { to: '/favorites', icon: FiHeart, label: 'Favorites' },
  { to: '/search', icon: FiSearch, label: 'Search' }
];

function NavbarLink({to, icon, label}: any) {
  return (
    <LinkBox
      to={to}
      as={ReachLink}
      flex="1"
      borderTop="1px solid white"
      color="white"
      _hover={{ color: '#000011', backgroundColor: 'white' }}>
      <Center h="100%" flexDir="column">
        <Icon boxSize="2rem" as={icon} />
        <Text fontSize="small">{label}</Text>
      </Center>
    </LinkBox>
  );
}

function Navbar() {
  const windowSize = useWindowSize();
  const [{navbarIsOpen, loading}] = useInterfaceContext();

  function getLinks() {
    return navbarLinks.map((link, index) => <NavbarLink key={index} {...link} />)
  }

  return (
    <Box
      pos={windowSize.width > 600 ? 'relative' : 'fixed'}
      bottom="0"
      overflowY="visible"
      transition="all 300ms ease"
      width={`${navbarIsOpen ? 325 : 0}px`}
      left={`${navbarIsOpen ? 0 : 100}%`}>
      <Flex
        position="absolute"
        w={windowSize.width > 600 ? '325px' : '100vw'}
        h="100vh"
        bottom="0"
        overflowY="scroll"
        flexDir="column"
        bgColor="rgb(15 78 108 / 85%)">
        {loading && (
          <Center flex="1" h="100%">
            <Spinner color="white" size="xl" />
          </Center>
        )}
        <Box
          flex="1"
          display={loading && 'none'}
          pt="3rem">
          <Routes />
        </Box>
        <Flex
          position="sticky"
          bottom="0"
          w="100%"
          minH="100px"
          bg="#000011">
          {getLinks()}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
