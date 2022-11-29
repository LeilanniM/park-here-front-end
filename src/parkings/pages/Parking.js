import React, { useContext, useEffect, useState } from "react";
import "./Parking.css";
import Map from "../../shared/components/Map";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink, useHistory } from "react-router-dom";
import Newbooking from "../../bookings/pages/NewBooking";

const Parking = (props) => {
  const [parking, setParking] = useState();
  const auth = useContext(AuthContext); //importing cloudstate auth
  const history = useHistory();

  useEffect(() => {
    console.log(props);

    axios
      .get(
        `http://localhost:8080/parkings/${props.routeProps.match.params.parkingId}`
      )
      .then((res) => {
        console.log(res.data);
        setParking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  const onDeleteHandler = () => {
    console.log("opening warning modal and deleting...");
    const options = {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    fetch(`http://localhost:8080/parkings/${parking.id}`, options)
      .then((res) => {
        if (!res.ok) {
          return console.error("Error creating a place");
        }

        history.push(`/mydash`);
      })
      .catch((err) => {
        return console.error(err);
      });
    //render a warning modal where you will simply send a fetch req to DELETE parkings/id
  };

  //Only once the props and state are set can we render our page, otherwise render loading...
  if (props.routeProps && parking) {
    return (
      <div className="parking-page">
        <div className="parking-page-gallery">
          {auth.isLoggedIn && auth.userId === parking.host.id && (
            <div className="edit-delete-btns">
              <li>
                <NavLink to={`/${parking.host.id}/parkings/${parking.id}`}>
                  <button type="button">EDIT</button>
                </NavLink>
              </li>
              <button type="button" onClick={() => onDeleteHandler()}>
                DELETE
              </button>
            </div>
          )}

          {parking.pictures.length === 0 ? (
            <img
              className="parking-gallery-image"
              src="https://i.ibb.co/K94DwZc/empty.jpg"
              alt="placeholder"
            />
          ) : (
            parking.pictures.map((pic, i) => {
              return (
                <img
                  key={i}
                  className="parking-gallery-image"
                  src={pic}
                  alt="example"
                />
              );
            })
          )}
        </div>

        <div className="parking-page-details">
          <h2 className="parking-title">{parking.title}</h2>
          <h4>📌{parking.address}</h4>
          <h5 className="parking-page-host">
            Hosted by:{" "}
            <NavLink to={`/${parking.host.id}/parkings`}>
              {parking.host.firstName} {parking.host.lastName}
              <img className="host-image" src={parking.host.image} />
            </NavLink>
          </h5>
          <hr />

          <div className="parking-page-info">
            <div className="parking-page-info-list">
              <p>🚘spaces: {parking.spaces}</p>
              <p>🏝terrain: {parking.terrain}</p>
              <p>Indoor or OutDoor: {parking.indoor ? "Indoor" : "Outdoor"}</p>
              <p>☔️Covered: {parking.covered ? "Covered" : "Not Covered"}</p>
              <p>🏝terrain: {parking.covered}</p>
              <p className="parking-page-extras">
                ⭐️Extra Features/Notes: {parking.extraFeatures}
              </p>
            </div>
            <div className="parking-page-info-description">
              🅿️ About the Spot: {parking.description}
            </div>
          </div>
        </div>

        <Newbooking
          host={parking.host.id}
          parking={parking.id}
          rate={parking.pricePerHour}
        />
        <Map center={parking.location} zoom={18} />
      </div>
    );
  } else {
    return <h2>loading...</h2>;
  }
};

export default Parking;
