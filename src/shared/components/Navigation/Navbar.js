import React, { useContext } from "react";
import "./Navbar.css";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  //this entire component will rerender if the state in auth/AuthContext changes.
  const auth = useContext(AuthContext);

  const onLogoutHandler = () => {
    auth.logout();
  };

  return (
    <div className="nav-bar">
      <h1 className="nav-bar-h1">🅿️ARK-HERE</h1>
      <ul className="nav-bar-links">
        {!auth.isLoggedIn && (
          <li>
            <NavLink to={`/auth`} exact>
              Signup/Login
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to={`/`}>Find Parking</NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/parkings/new`}>Host!</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/mydash`}>My Dash</NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <button onClick={() => auth.logout()}>LOGOUT ⍈</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
