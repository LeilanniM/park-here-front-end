import React from "react";

import "./ParkingsList.css";
import ParkingItem from "./ParkingItem";

const ParkingsList = (props) => {
  if (props.parkingItems.length === 0) {
    return (
      <>
        <div>No Parking Spots Found</div>
      </>
    );
  } //end of if none

  return (
    <ul className="parkings-list">
      {props.parkingItems.map((parking) => {
        return <ParkingItem key={parking.id} {...parking} />;
      })}
    </ul>
  );
};

export default ParkingsList;
