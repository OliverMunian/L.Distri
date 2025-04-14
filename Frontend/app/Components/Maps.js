'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState, useEffect } from 'react';



const containerStyle = {
  width: '90%',
  height: '400px',
  borderRadius: '1rem',
  marginTop: '15px'
};

const center = {
  lat: 47.5711578,
  lng: -2.6510092,
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // ⚠️ .env.local
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <p>Chargement de la carte...</p>
  );
};

export default GoogleMapComponent;