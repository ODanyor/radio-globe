import { Box } from '@chakra-ui/react';
import { Navbar } from 'components';
import { ReactComponent } from 'types';

function MainLayout({ children }: ReactComponent) {
  return (
    <Box>
      {children}
      <Navbar />
    </Box>
  );
}

export default MainLayout;
