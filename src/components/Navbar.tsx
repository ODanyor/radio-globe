import Routes from 'App/Routes';
import { Box } from '@chakra-ui/react';
import { useInterfaceContext } from 'services/interface';

function Navbar() {
  const [{navbarIsOpen}] = useInterfaceContext();

  return (
    <Box
      position="relative"
      overflowY="visible"
      transition="all 300ms ease"
      width={`${navbarIsOpen ? 325 : 0}px`}
      left={`${navbarIsOpen ? 0 : 100}%`}>
      <Box
        position="absolute"
        w="325px"
        h="100vh"
        bottom="0"
        overflowY="scroll"
        bgColor="rgb(15 78 108 / 85%)">
        <Routes />
      </Box>
    </Box>
  );
}

export default Navbar;
