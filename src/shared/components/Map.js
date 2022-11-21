import React, { useRef } from "react";
import "./Map.css";

const Map = (props) => {
  // const mapRef = useRef();
  let mapDiv = document.createElement("div");
  

  // const mapDiv = document.getElementById("map");
  mapDiv.classList.add("map");
  //🗺️making a map using the map constructor object provided by google
  const map = new window.google.maps.Map(mapDiv, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  //Now lets add a red marker!📌
  new window.google.maps.Marker({ position: props.center, map: map });

  return (
    <div id="mapContainer" className="map">
      {mapDiv}
    </div>
  );
};

export default Map;
