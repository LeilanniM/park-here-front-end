import React from "react";
import Map from "../../shared/components/Map";

const Parking = (props) => {
  return (
    <div>
      <Map center={props.location} zoom={props.zoom || 8} />
    </div>
  );
};

export default Parking;
