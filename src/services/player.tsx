import React from 'react';
import { ReactComponent } from 'types';

const PlayerContext = React.createContext({});

const initialState = {
  locked: false,
  playing: false,
  loading: false,
  volume: 0.8,
  volumeSliderSupported: true,
};

function playerReducer(state: any, action: any) {
  switch(action.type) {
    case 'SET_LOCKED':
      return { ...state, locked: action.payload };
    case 'SET_PLAYING':
      return { ...state, playing: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_VOLUE':
      return { ...state, volume: action.payload };
    case 'SET_VOLUME_SLIDER_SUPPORTED':
      return { ...state, volumeSliderSupported: action.payload };
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

export function setLocked(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_LOCKED', payload: value })
}
export function setPlaying(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_PLAYING', payload: value })
}
export function setLoading(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_LOADING', payload: value })
}
export function setVolue(dispatch: React.Dispatch<any>, value: number) {
  dispatch({ type: 'SET_LOADING', payload: value })
}
export function setVolumeSliderSupported(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_VOLUME_SLIDER_SUPPORTED', payload: value })
}
