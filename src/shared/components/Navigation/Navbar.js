import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h1>🅿️ARK-HERE</h1>
      <li>
        <NavLink to={`/`} exact>
          Signup/Login
        </NavLink>
      </li>
      <li>
        <NavLink to={`/`}>Find Parking</NavLink>
      </li>
      <li>
        <NavLink to={`/`}>Host!</NavLink>
      </li>
    </div>
  );
};

export default Navbar;
