import { createContext, useState, useContext } from 'react';
import { ReactComponent } from 'types';

const PageContext = createContext({});

const initialPageState = {
  map: undefined,
  url: undefined,
  count: null,
  title: undefined,
  subtitle: undefined,
  content: []
};

function PageProvider({ children }: ReactComponent) {
  const [state, dispatch] = useState(initialPageState);

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
