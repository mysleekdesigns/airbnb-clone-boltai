"use client"

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapComponentProps {
  address: string;
}

export default function MapComponent({ address }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      setMapLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 15,
          });
          new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }, [address, mapLoaded]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}