import React from 'react';
import { MainLayout } from 'layouts';
import { Globe, AudioVisualizer } from 'components';

function App(): React.ReactElement {
  return (
    <MainLayout>
      <AudioVisualizer />
      <Globe />
    </MainLayout>
  );
}

export default App;
