import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponent, BrowserState, Action } from 'types';
import { IMMORTAL_CHANNEL, IMMORTAL_FAVORITES } from 'utils/constants';
import { getStored, setStored } from 'utils/store';

const BrowserContext = createContext({});

const initialBrowserState: BrowserState = {
  channelId: '',
  favorites: [],
};

function browserInitializer(initialState: BrowserState) {
  return {
    ...initialState,
    channelId: getStored(IMMORTAL_CHANNEL) || '',
    favorites: getStored(IMMORTAL_FAVORITES) || [],
  };
}

function browserReducer(state: BrowserState, action: Action) {
  switch(action.type) {
    case 'SET_CHANNEL_ID':
      setStored(IMMORTAL_CHANNEL, action.payload);
      return { ...state, channelId: action.payload };
    case 'SET_FAVORITE': {
      const updatedFavorites = [...state.favorites, action.payload];
      setStored(IMMORTAL_FAVORITES, updatedFavorites);
      return { ...state, favorites: updatedFavorites};
    }
    case 'UNSET_FAVORITE': {
      const updatedFavorites = state.favorites.filter((fav: string) => fav !== action.payload);
      setStored(IMMORTAL_FAVORITES, updatedFavorites);
      return { ...state, favorites: updatedFavorites};
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function BrowserProvider({ children }: ReactComponent) {
  const [state, dispatch] = useReducer(browserReducer, initialBrowserState, browserInitializer);

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

function setChannelId(dispatch: React.Dispatch<Action>, value: string) {
  dispatch({ type: 'SET_CHANNEL_ID', payload: value });
}

function setFavorite(dispatch: React.Dispatch<Action>, value: string) {
  dispatch({ type: 'SET_FAVORITE', payload: value });
}

function unsetFavorite(dispatch: React.Dispatch<Action>, value: string) {
  dispatch({ type: 'UNSET_FAVORITE', payload: value });
}

export {
  BrowserProvider,
  useBrowserContext,
  setChannelId,
  setFavorite,
  unsetFavorite
};
