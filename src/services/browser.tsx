import React, { createContext, useState, useContext } from 'react';
import { ReactComponent, BrowserState } from 'types';
import { IMMORTAL_CHANNEL } from 'utils/constants';
import { getStored, setStored } from 'utils/store';

const BrowserContext = createContext({});

const initialBrowserState = {
  channelId: getStored(IMMORTAL_CHANNEL) || '',
};

function BrowserProvider({ children }: ReactComponent) {
  const [state, dispatch] = useState<BrowserState>(initialBrowserState);

  return (
    <BrowserContext.Provider value={[state, dispatch]}>
      {children}
    </BrowserContext.Provider>
  );
}

function useBrowserContext() {
  const context: any = useContext(BrowserContext);
  if (!context) throw new Error('useBrowserContext must be used within BrowserProvider');
  return context;
}

function setChannelId(dispatch: React.Dispatch<any>, value: string) {
  setStored(IMMORTAL_CHANNEL, value);
  dispatch((state: any) => dispatch({ ...state, channelId: value }));
}

export {
  BrowserProvider,
  useBrowserContext,
  setChannelId
};
