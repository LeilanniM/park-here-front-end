import React, { useEffect, useState } from "react";
import "./Parking.css";
import Map from "../../shared/components/Map";
import axios from "axios";

const Parking = (props) => {
  const [parking, setParking] = useState();

  useEffect(() => {
    console.log(props);

    axios
      .get(`http://localhost:8080/parkings/${props.routeProps.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setParking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  //Only once the props and state are set can we render our page, otherwise render loading...
  if (props.routeProps && parking) {
    return (
      <div>
        {parking.pictures.length === 0 ? (
          <img
            className="parking-gallery-image"
            src="https://i.ibb.co/K94DwZc/empty.jpg"
            alt="placeholder"
          />
        ) : (
          parking.pictures.map((pic) => {
            return (
              <img className="parking-gallery-image" src={pic} alt="example" />
            );
          })
        )}
        <h2 className="parking-title">{parking.title}</h2>
        <Map center={parking.location} zoom={18} />
      </div>
    );
  } else {
    return <h2>loading...</h2>;
  }
};

export default Parking;
