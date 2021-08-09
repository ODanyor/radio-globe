import { createContext, useState, useContext } from 'react';
import { ReactComponent } from 'types';

const ChannelContext = createContext({});

function ChannelProvider({ children }: ReactComponent) {
  const [state, dispatch] = useState({});

  return (
    <ChannelContext.Provider value={[state, dispatch]}>
      {children}
    </ChannelContext.Provider>
  );
}

function useChannelContext() {
  const context: any = useContext(ChannelContext);
  if (!context) throw new Error('useChannelContext must be used within ChannelProvider');
  return context;
}

export {
  ChannelProvider,
  useChannelContext,
};
