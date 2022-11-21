import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="userItem">
      <Link to={`/${props.id}/parkings`}>
        <h3>{props.name}</h3>
        <img className="avatarImg" src={props.image} />
      </Link>
    </li>
  );
};

export default UserItem;
