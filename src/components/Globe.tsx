import { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { useHistory } from 'react-router-dom';
import { getPlaces } from 'services/service';
import { Place } from 'types';
import globeImage from 'assets/images/earth-night.jpeg';

function GlobeComponent() {
  const history = useHistory();
  const [places, setPlaces] = useState<Place[]>([]);

  function handlePointClick(place: object) {
    // @ts-ignore
    history.push(place.url);
  }

  useEffect(() => {
    getPlaces().then((list) => setPlaces(list));
  }, []);

  return (
    <Globe
      globeImageUrl={globeImage}
      backgroundColor="#00000000" // transparent
      pointsData={places}
      pointLabel='point label'
      pointAltitude={0}
      pointRadius={0.20}
      pointResolution={6}
      onPointClick={handlePointClick}
    />
  );
}

export default GlobeComponent;
