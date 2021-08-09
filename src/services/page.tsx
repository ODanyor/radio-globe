import { createContext, useState, useContext } from 'react';
import { ReactComponent } from 'types';

const PageContext = createContext({});

function PageProvider({ children }: ReactComponent) {
  const [state, dispatch] = useState();

  return (
    <PageContext.Provider value={[state, dispatch]}>
      {children}
    </PageContext.Provider>
  );
}

function usePageContext() {
  const context: any = useContext(PageContext);
  if (!context) throw new Error('usePageContext must be used within PageProvider');
  return context;
}

export {
  PageProvider,
  usePageContext,
};
