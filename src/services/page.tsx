import React from 'react';
import { ReactComponent } from 'types';

const PageContext = React.createContext({});

function PageProvider({ children }: ReactComponent) {
  const [state, dispatch] = React.useState();

  return (
    <PageContext.Provider value={[state, dispatch]}>
      {children}
    </PageContext.Provider>
  );
}

function usePageContext() {
  const context: any = React.useContext(PageContext);
  if (!context) throw new Error('usePageContext must be used within PageProvider');
  return context;
}

export {
  PageProvider,
  usePageContext,
};
