import React from 'react';
import { ReactComponent } from 'types';

const PlayerContext = React.createContext({});

const initialState = {
  channels: null,
  channel: null,
};

function playerReducer(state: any, action: any) {
  switch(action.type) {
    case 'SET_PAGE':
      return { ...state, channels: action.payload };
    case 'SET_CHANNEL':
      return { ...state, channel: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function PlayerProvider({ children }: ReactComponent) {
  const [state, dispatch] = React.useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context: any = React.useContext(PlayerContext);
  if (!context) throw new Error('usePlayerContext must be used within PlayerProvider');
  return context;
}

export function setPage(dispatch: React.Dispatch<any>, channels: any) {
  dispatch({ type: 'SET_PAGE', payload: channels });
}

export function setChannel(dispatch: React.Dispatch<any>, channel: any) {
  dispatch({ type: 'SET_CHANNEL', payload: channel });
}
