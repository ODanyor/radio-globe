import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponent, InterfaceState, Action } from 'types';

const InterfaceContext = createContext({});

const initialInterfaceState: InterfaceState = {
  loading: false,
  error: null,
  navbarIsOpen: false,
};

function interfaceReducer(state: InterfaceState, action: Action) {
  switch(action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_NAVBAR-IS-OPEN':
      return { ...state, navbarIsOpen: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function InterfaceProvider({ children }: ReactComponent) {
  const [state, dispatch] = useReducer(interfaceReducer, initialInterfaceState);

  return (
    <InterfaceContext.Provider value={[state, dispatch]}>
      {children}
    </InterfaceContext.Provider>
  );
}

function useInterfaceContext() {
  const context: any = useContext(InterfaceContext);
  if (!context) throw new Error('useInterfaceContext must be used within InterfaceProvider');
  return context;
}

function setLoading(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_LOADING', payload: value })
}
function setError(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_ERROR', payload: value })
}
function setNavberIsOpen(dispatch: React.Dispatch<Action>, value: boolean) {
  dispatch({ type: 'SET_NAVBAR-IS-OPEN', payload: value })
}

export {
  InterfaceProvider,
  useInterfaceContext,
  setLoading,
  setError,
  setNavberIsOpen,
};
