import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Center, Box, Heading, Text, Button } from '@chakra-ui/react';
import { ReactComponent } from 'types';

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  // TODO: send error to me
  console.error(error.message);

  return (
    <Center h="100vh" flexDir="column">
      <Box mb="4rem">
        <Heading mb="1rem">Something went wrong :(</Heading>
        <Text>I will let Dany know about this accident, I'm really so sorry</Text>
      </Box>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Center>
  );
}

function WithErrorBoundary({children}: ReactComponent) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}

export default WithErrorBoundary;
