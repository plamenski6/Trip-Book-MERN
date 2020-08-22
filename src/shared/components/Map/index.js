import React, { useRef, useEffect } from 'react';

import './index.css';

const Map = props => {
  const mapRef = useRef();
  
  const { lng, lat, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([lng, lat]),
        zoom: zoom
      })
    });
  }, [lng, lat, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id='map'
    ></div>
  );
};

export default Map;
