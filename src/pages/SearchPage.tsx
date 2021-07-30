import React from 'react';

function SearchPage() {
  React.useEffect(() => {
    console.log('Search page loaded');
  }, []);

  return (
    <div>
      <h1>Search page</h1>
    </div>
  );
}

export default SearchPage;
