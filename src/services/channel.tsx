import React from 'react';
import { ReactComponent } from 'types';

const ChannelContext = React.createContext({});

function ChannelProvider({ children }: ReactComponent) {
  const [state, dispatch] = React.useState({});

  return (
    <ChannelContext.Provider value={[state, dispatch]}>
      {children}
    </ChannelContext.Provider>
  );
}

function useChannelContext() {
  const context: any = React.useContext(ChannelContext);
  if (!context) throw new Error('useChannelContext must be used within ChannelProvider');
  return context;
}

export {
  ChannelProvider,
  useChannelContext,
};
