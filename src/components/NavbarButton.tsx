import { Button, Flex } from '@chakra-ui/react';
import { useInterfaceContext, setNavberIsOpen } from 'services/interface';

function NavbarButton() {
  const [{navbarIsOpen}, interfaceDispatch] = useInterfaceContext();

  function toggleMenu() {
    setNavberIsOpen(interfaceDispatch, !navbarIsOpen);
  }

  return (
    <Button
      onClick={toggleMenu}
      pos="fixed"
      top="1rem"
      right="1rem"
      padding="0"
      bg="none"
      borderRadius="100%"
      zIndex="1000"
      _hover={{}}>
      <Flex
        position="relative"
        h="25px"
        w="25px"
        flexDir="column"
        justifyContent="space-around"
        transition="transform 300ms ease"
        _before={{
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '4px',
          backgroundColor: 'white',
          transition: 'all 300ms ease',
          top: navbarIsOpen ? '50%' : 'calc(50% - 8px)',
          transform: `translateY(-50%) ${navbarIsOpen && 'rotate(45deg)'}`,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '4px',
          backgroundColor: 'white',
          transition: 'all 300ms ease',
          top: navbarIsOpen ? '50%' : 'calc(50% + 4px)',
          transform: `translateY(-50%) ${navbarIsOpen && 'rotate(-45deg)'}`,
        }}>
      </Flex>
    </Button>
  );
}

export default NavbarButton;
