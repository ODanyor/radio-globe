import React from 'react';
import { MainLayout } from 'layouts';
import { Globe, AudioVisualizer } from 'components';
// import WithErrorBoundary from 'hocs/ErrorBoundary';

function App(): React.ReactElement {
  return (
    <MainLayout>
      <AudioVisualizer />
      <Globe />
    </MainLayout>
  );
}

export default App;
