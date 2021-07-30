import React from 'react';

function FavoritesPage() {
  React.useEffect(() => {
    console.log('Favorites page loaded');
  }, []);
  
  return (
    <div>
      <h1>Favorites page</h1>
    </div>
  );
}

export default FavoritesPage;
