import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";

import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink } from "react-router-dom";

const Booking = (props) => {
  const [booking, setBooking] = useState();
  const auth = useContext(AuthContext); //importing cloudstate auth

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/bookings/${props.routeProps.match.params.bookingId}`
      )
      .then((res) => {
        console.log(res.data);
        setBooking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Only once the props and state are set can we render our page, otherwise render loading...
  if (
    props.routeProps &&
    booking &&
    auth.isLoggedIn &&
    auth.userId === booking.guest
  ) {
    return (
      <div className="booking-page">
        <div className="booking-page-gallery"></div>

        <div className="booking-page-details">
          <h2 className="booking-title">Booking</h2>
          <img
            src={
              booking.parking.pictures[0] ||
              "https://i.ibb.co/K94DwZc/empty.jpg"
            }
          />
          <h4>Check in: {booking.checkIn}</h4>
          <h4>Check out: {booking.checkOut}</h4>
          <h4>Booking Date/created: {booking.bookingDate}</h4>
          <h5 className="booking-page-host">
            Hosted by:{" "}
            <NavLink to={`/users`}>
              {booking.parking.host.firstName} {booking.parking.host.lastName}
            </NavLink>
          </h5>
          <h5 className="booking-page-host">
            <NavLink to={`/parkings/${booking.parking.id}`}>
              🅿️arking Spot: {booking.parking.title}
              <p>{booking.parking.address}</p>
            </NavLink>
          </h5>

          <hr />

          <div className="booking-page-info">
            <div className="booking-page-info-list">
              <p>Total Cost: {booking.totalCost}</p>
              <p>
                Vehicle: {booking.vehicle.vehicleType} {booking.vehicle.color}{" "}
                {booking.vehicle.licensePlate}
              </p>
            </div>
            <div className="booking-page-info-description">
              {booking.description}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h2>loading...</h2>;
  }
};

export default Booking;
