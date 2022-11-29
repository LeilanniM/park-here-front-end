import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParkingsList from "../components/ParkingsList";

const DUMMY_PARKINGS = [
  {
    id: "63687304b2af24247b6374c7",
    title: "South Laguna Beach House driveway",
    description:
      "Clean cement driveway, 5min walk to the beach. Nice neighborhood. Security cams.",
    pictures: [],
    spaces: 1,
    covered: true,
    indoor: false,
    address: "31877 Circle Dr, Laguna Beach, CA 92651",
    location: {
      lat: 33.499266144857806,
      lng: -117.74252233588378,
    },
    terrain: "concrete",
    host: {
      id: "63683ccb3ff57910b60edc36",
      firstName: "AMYYYYYYY",
      lastName: "Rose",
      email: "amy@gmail.com",
      image: "https://i.ibb.co/2dtXpf2/blank-avatar.webp",
      parkings: ["63687304b2af24247b6374c7", "6376cd7684a09a3da6f272a7"],
      bookings: [],
    },
    pricePerHour: 10,
    extraFeatures: "Security Cameras",
  },
  {
    id: "6376cd7684a09a3da6f272a7",
    title: "Driveway, 9min walk from THE FRENCH LAUNDRY",
    description:
      "Cement Driveway in nice quiet neighborhood. Walking distance from the famous French Laundry Restaurant. Please don't leave valuables visibly in car! Free fluids check with parking.",
    pictures: [],
    spaces: 2,
    covered: false,
    indoor: false,
    address: "5 Foxglove Ln, Yountville, CA 94599",
    location: {
      lat: 38.40750439018493,
      lng: -122.36085420221083,
    },
    terrain: "concrete",
    host: {
      id: "63683ccb3ff57910b60edc36",
      firstName: "AMYYYYYYY",
      lastName: "Rose",
      email: "amy@gmail.com",
      image: "https://i.ibb.co/2dtXpf2/blank-avatar.webp",
      parkings: ["63687304b2af24247b6374c7", "6376cd7684a09a3da6f272a7"],
      bookings: [],
    },
    pricePerHour: 10,
    extraFeatures: "Fluid Check on car",
  },
];

const HostParkings = () => {
  const [parkings, setParkings] = useState(() => null);
  const userId = useParams().userId; //accessing the Route prop. can also do this another way using routeProps in the <Route/> render

  useEffect(() => {
    fetch(`http://localhost:8080/parkings/user/${userId}/`).then((res) => {
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
        <>
          <h2>Host Parkings</h2> <ParkingsList parkingItems={parkings} />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default HostParkings;
