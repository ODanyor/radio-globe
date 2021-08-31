import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Center, Box, Heading, Button } from '@chakra-ui/react';
import { ReactComponent } from 'types';

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  console.error(error.message);

  return (
    <Center h="100vh" flexDir="column">
      <Box mb="4rem">
        <Heading mb="1rem">Something went wrong :(</Heading>
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
