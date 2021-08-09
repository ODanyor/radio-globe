import { Box } from '@chakra-ui/react';
import { Navbar, Player } from 'components';
import { ReactComponent } from 'types';

function MainLayout({ children }: ReactComponent) {
  return (
    <Box>
      {children}
      <Navbar />
      <Box pos="fixed" w="100%" bottom="0px">
        <Player />
      </Box>
    </Box>
  );
}

export default MainLayout;
