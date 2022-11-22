import React from "react";

import "./ParkingItem.css";
import { Link } from "react-router-dom";
import Map from "../../shared/components/Map";

const ParkingItem = (props) => {
  return (
    <li className="parking-item">
      <Link to={`/parkings/${props.id}`}>
        <img src={props.pictures[0] || "https://i.ibb.co/K94DwZc/empty.jpg"} />
        <div>
          <h3>{props.title}</h3>
          <p>{props.pricePerHour}/hr</p>
        </div>
      </Link>
    </li>
  );
};

export default ParkingItem;
