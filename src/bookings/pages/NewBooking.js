import React, { useContext, useState } from "react";
import datepicker from "js-datepicker";

import "./NewBooking.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const Newbooking = (props) => {
  const auth = useContext(AuthContext);
  const [checkIn, setCheckIn] = useState(() => "");
  const [checkOut, setCheckOut] = useState(() => "");
  const [carColor, setCarColor] = useState(() => "");
  const [carLP, setCarLP] = useState(() => "");
  const [carType, setCarType] = useState(() => "");

  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitting form...");

    const newbooking = {
      checkIn,
      checkOut,
      vehicle: {
        color: carColor,
        licensePlate: carLP,
        vehicleType: carType,
      },
      host: props.host,
      parking: props.parking,
      // booking date: also set on the server, since this is the same as a created date/Date.now()
    };
    console.log(newbooking);
    const options = {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(newbooking),
    };

    fetch(`http://localhost:8080/bookings/`, options)
      .then((res) => {
        if (!res.ok) {
          return console.error("Error creating a place");
        }
        res.json().then((data) => {
          console.log(data);
          history.push(`/bookings/${data._id}`);
        });
      })
      .catch((err) => {
        return console.error(err);
      });
  }; //end of submit handler

  const history = useHistory();

  return (
    <>
      <h3 className="book-this-spot">Book this Spot!</h3>
      <form onSubmit={onSubmitHandler} className="booking-form">
        <div className="booking-form-time">
          <div className="booking-form-time-checkin">
            <label htmlFor="booking-form-checkin">Check-In Time:</label>
            <input
              type="datetime-local"
              name="appt"
              min="09:00"
              max="18:00"
              id="booking-form-checkin"
              onChange={(e) => onChangeHandler(e, setCheckIn)}
              value={checkIn}
              required
            />
          </div>
          <div className="booking-form-time-checkout">
            <label htmlFor="booking-form-checkOut">Check-Out Time:</label>
            <input
              type="datetime-local"
              name="appt"
              min="09:00"
              max="18:00"
              id="booking-form-checkOut"
              onChange={(e) => onChangeHandler(e, setCheckOut)}
              value={checkOut}
              required
            />
          </div>
        </div>

        <div className="booking-form-vehicle">
          <div className="booking-form-vehicle-items">
            <label htmlFor="booking-form-carLP">Vehicle license plate:</label>
            <input
              id="booking-form-carLP"
              type="text"
              onChange={(e) => onChangeHandler(e, setCarLP)}
              value={carLP}
              required
            />
          </div>
          <div className="booking-form-vehicle-items">
            <label htmlFor="booking-form-carColor">Vehicle color:</label>
            <input
              id="booking-form-carColor"
              type="text"
              onChange={(e) => onChangeHandler(e, setCarColor)}
              value={carColor}
              required
            />
          </div>
          <div className="booking-form-vehicle-items">
            <label htmlFor="booking-form-carType">Car Type:</label>
            <input
              id="booking-form-carType"
              onChange={(e) => onChangeHandler(e, setCarType)}
              value={carType}
              required
            />
          </div>
        </div>

        <button className="book-button" type="submit">
          BOOK!
        </button>
      </form>
    </>
  );
};

export default Newbooking;
