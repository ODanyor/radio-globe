import { Box, Flex } from '@chakra-ui/react';
import { Navbar, Player, NavbarButton } from 'components';
import { ReactComponent } from 'types';

function MainLayout({ children }: ReactComponent) {
  return (
    <Box>
      <NavbarButton />
      {children}
      <Flex
        pos="fixed"
        w="100%"
        h="100px"
        bottom="0"
        justifyContent="space-between">
        <Player />
        <Navbar />
      </Flex>
    </Box>
  );
}

export default MainLayout;
