import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponent } from 'types';

const PlayerContext = createContext({});

const initialState = {
  locked: false,
  playing: false,
  loading: false,
  muted: false,
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
    case 'SET_MUTED':
      return { ...state, muted: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_VOLUME-SLIDER-SUPPORTED':
      return { ...state, volumeSliderSupported: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function PlayerProvider({ children }: ReactComponent) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayerContext() {
  const context: any = useContext(PlayerContext);
  if (!context) throw new Error('usePlayerContext must be used within PlayerProvider');
  return context;
}

function setLocked(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_LOCKED', payload: value })
}
function setPlaying(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_PLAYING', payload: value })
}
function setLoading(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_LOADING', payload: value })
}
function setMuted(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_MUTED', payload: value });
}
function setVolume(dispatch: React.Dispatch<any>, value: number) {
  dispatch({ type: 'SET_VOLUME', payload: value })
}
function setVolumeSliderSupported(dispatch: React.Dispatch<any>, value: boolean) {
  dispatch({ type: 'SET_VOLUME-SLIDER-SUPPORTED', payload: value })
}

export {
  PlayerProvider,
  usePlayerContext,
  setLocked,
  setPlaying,
  setLoading,
  setMuted,
  setVolume,
  setVolumeSliderSupported,
};
