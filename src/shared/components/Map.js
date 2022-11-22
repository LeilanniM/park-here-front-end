import React, { useEffect, useRef } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    //Now lets add a red marker!📌
    new window.google.maps.Marker({ position: props.center, map: map });
  }, [center, zoom]);

  //🗺️making a map using the map constructor object provided by google

  return <div ref={mapRef} id="mapContainer" className="map"></div>;
};

export default Map;
