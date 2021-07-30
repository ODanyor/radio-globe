import React from 'react';
import { useParams } from 'react-router-dom';
import { getStationsUrl } from 'services/service';
import { Params } from 'types';

function ExplorePage() {
  const params = useParams<Params>();
  
  React.useEffect(() => {
    getStationsUrl(params.stationId).then(res => console.log(res));
  }, [params]);

  return (
    <div>
      <h1>Explore page</h1>
    </div>
  );
}

export default ExplorePage
