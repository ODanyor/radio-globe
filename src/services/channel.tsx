import React from 'react';
import { ReactComponent } from 'types';

const ChannelContext = React.createContext({});

const initialState = {};

function channelReducer(state: any, action: any) {
  switch(action.type) {
    case 'SET_CHANNEL':
      return action.payload;
    case 'SET_CONTEXT':
      return { ...state, context: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ChannelProvider({ children }: ReactComponent) {
  const [state, dispatch] = React.useReducer(channelReducer, initialState);

  return (
    <ChannelContext.Provider value={[state, dispatch]}>
      {children}
    </ChannelContext.Provider>
  );
}

export function useChannelContext() {
  const context: any = React.useContext(ChannelContext);
  if (!context) throw new Error('useChannelContext must be used within ChannelProvider');
  return context;
}

export function setChannel(dispatch: React.Dispatch<any>, channel: any) {
  dispatch({ type: 'SET_CHANNEL', payload: channel });
}

export function setContext(dispatch: React.Dispatch<any>, context: any) {
  dispatch({ type: 'SET_CONTEXT', payload: context });
}
