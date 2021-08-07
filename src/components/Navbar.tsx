import Routes from 'App/Routes';
import { Box } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      width="325px"
      height="100%"
      bgColor="rgb(15 78 108 / 60%)"
      overflowY="scroll">
      <Routes />
    </Box>
  );
}

export default Navbar;
