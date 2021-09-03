import { useEffect, useState, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from 'hooks/useWindowSize';
import { getPlaces } from 'services/service';
import { Place } from 'types';
import globeImage from 'assets/images/earth-night.jpeg';

function GlobeComponent() {
  const history = useHistory();
  const [places, setPlaces] = useState<Place[]>([]);
  const {width, height}= useWindowSize();
  const globeRef = useRef<GlobeMethods>();

  function handlePointClick(place: object) {
    // @ts-ignore
    history.push(place.url);
    // // @ts-ignore
    // const { lat, lng } = place;
    // globeRef.current?.toGlobeCoords(lat, lng);
  }

  useEffect(() => {
    getPlaces().then((list) => setPlaces(list));
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      globeImageUrl={globeImage}
      backgroundColor="#000011" // transparent #00000000
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
