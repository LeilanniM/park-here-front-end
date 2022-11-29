import React, { useEffect, useState } from "react";
import ParkingsList from "../components/ParkingsList";
import HostParkings from "./HostParkings";
//Here you will display ALL of the parking spots ever.
//This will be the landing page. Maybe later the Loggedin user will have a dash landing page
const Parkings = () => {
  const [parkings, setParkings] = useState(() => null);

  useEffect(() => {
    fetch(`http://localhost:8080/parkings/`).then((res) => {
      if (!res.ok) {
        console.error("could not fetch parkings. :O");
        return;
      }
      return res.json().then((parkings) => {
        console.log(parkings);
        setParkings(parkings);
      });
    });
  }, []);

  return (
    <div>
      {parkings ? (
        <ParkingsList parkingItems={parkings} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Parkings;
