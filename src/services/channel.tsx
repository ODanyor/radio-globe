import { createContext, useState, useContext } from 'react';
import { ReactComponent, ChannelState } from 'types';

const ChannelContext = createContext({});

const initialChannelState = {
  context: [],
  country: {id: '', title: ''},
  id: '',
  place: {id: '', title: ''},
  secure: false,
  title: '',
  url: '',
  website: ''
};

function ChannelProvider({ children }: ReactComponent) {
  const [state, dispatch] = useState<ChannelState>(initialChannelState);

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
