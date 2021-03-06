import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserProvider } from 'services/browser';
import { InterfaceProvider } from 'services/interface';
import { PageProvider } from 'services/page';
import { ChannelProvider } from 'services/channel';
import { PlayerProvider } from 'services/player';
import WithErrorBoundary from 'hocs/ErrorBoundary';
import App from './App';

const queryClient: QueryClient  = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <WithErrorBoundary>
        <BrowserRouter>
          <BrowserProvider>
            <QueryClientProvider client={queryClient}>
              <InterfaceProvider>
                <PageProvider>
                  <ChannelProvider>
                    <PlayerProvider>
                      <App />
                    </PlayerProvider>
                  </ChannelProvider>
                </PageProvider>
              </InterfaceProvider>
            </QueryClientProvider>
          </BrowserProvider>
        </BrowserRouter>
      </WithErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
