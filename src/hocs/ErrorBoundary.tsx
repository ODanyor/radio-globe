import { ErrorBoundary } from 'react-error-boundary';

type ErrorFallbackProps = {
  canReset: boolean;
  error: any;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ canReset, error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      {canReset ? (
        <button onClick={resetErrorBoundary}>Try again</button>
      ) : null}
    </div>
  );
}

function WithErrorBoundary(parentProps: any) {
  const canReset = Boolean(parentProps.onReset || parentProps.resetKeys);
  return (
    <ErrorBoundary
      fallbackRender={props => <ErrorFallback canReset={canReset} {...props}
      {...parentProps} />} />
  );
}

export default WithErrorBoundary;
