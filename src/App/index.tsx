import { useState, useEffect } from 'react';
import { MainLayout } from 'layouts';
import { AppLoading, Globe, AudioVisualizer } from 'components';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {setTimeout(() => setLoading(false), 3000)}, []);

  if (loading) return <AppLoading />;

  return (
    <MainLayout>
      <AudioVisualizer />
      <Globe />
    </MainLayout>
  );
}

export default App;
