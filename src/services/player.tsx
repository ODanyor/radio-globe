import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponent, PlayerState, Action } from 'types';
import { getStored } from 'utils/store';
import { IMMORTAL_CHANNEL_LOCKED, IMMORTAL_VOLUME, IMMORTAL_MUTED } from 'utils/constants';

const PlayerContext = createContext({});

const initialPlayerState: PlayerState = {
  locked: false,
  playing: false,
  loading: false,
  muted: false,
  volume: 0.8,
  volumeSliderSupported: true,
};

function playerInitializer(initialPlayerState: PlayerState) {
  return {
    ...initialPlayerState,
    locked: getStored(IMMORTAL_CHANNEL_LOCKED) || false,
    muted: getStored(IMMORTAL_MUTED) || false,
    volume: getStored(IMMORTAL_VOLUME) || 0.8,
  };
}

function playerReducer(state: PlayerState, action: Action) {
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
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState, playerInitializer);

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

function setLocked(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_LOCKED', payload: value })
}
function setPlaying(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_PLAYING', payload: value })
}
function setLoading(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_LOADING', payload: value })
}
function setMuted(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_MUTED', payload: value });
}
function setVolume(dispatch: React.Dispatch<Action>, value: number) {
  dispatch({ type: 'SET_VOLUME', payload: value })
}
function setVolumeSliderSupported(dispatch: React.Dispatch<Action>, value: boolean) {
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
