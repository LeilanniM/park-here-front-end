import React from "react";

import "./ParkingItem.css";
import { Link } from "react-router-dom";
import Map from "../../shared/components/Map";

const ParkingItem = (props) => {
  return (
    <li className="parking-item">
      <Link to={`/parkings/${props.id}`}>
        <img src={props.pictures[0] || "https://i.ibb.co/K94DwZc/empty.jpg"} />
        <div className="parking-item-infobox">
          <p className="parking-item-address">
            {props.address.split(",")[1]}, CA
          </p>
          <p className="parking-item-title">{props.title}</p>

          <p className="parking-item-rate">
            <span className="dollar">${props.pricePerHour}</span>/hr
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ParkingItem;
