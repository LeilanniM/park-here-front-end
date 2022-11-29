import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [firstName, setFirstName] = useState(() => "");
  const [lastName, setLastName] = useState(() => "");
  const [loginMode, setLoginMode] = useState(() => true);
  const auth = useContext(AuthContext);

  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitting form...");
    if (loginMode) {
      console.log("loggin in...");
      console.log(email, password);
      //Send this to POST http://localhost:8080/users/login
      fetch("http://localhost:8080/users/login", {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return console.error("Error logging in user");
          }
          console.log(res);
          res.json().then((data) => {
            console.log(data);

            auth.login(data.id, data.token); //calling the cloud function that sets App.js's userId state and tokenState AND sets the token inside of localStorage
          });
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    } else {
      console.log("Registering new user...");

      //Send this to POST http://localhost:8080/users/signup
      fetch("http://localhost:8080/users/signup", {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return console.error("Error creating user");
          }
          console.log(res);
          res.json().then((data) => {
            console.log(data);
            auth.login(data.id, data.token, null, true); //calling the cloud function that sets isLoggedIn to true
          });
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    }
  };

  const onSwitchModeHandler = () => {
    setLoginMode((prevState) => {
      return !prevState;
    });
  };
  //conditionally rendering 2 types of JSX forms depending on which mode they are in which is controlled by the switch button
  let mode = loginMode ? (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={(e) => onSubmitHandler(e)} className="auth-form-form">
        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => onChangeHandler(e, setEmail)}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          minLength={6}
          onChange={(e) => onChangeHandler(e, setPassword)}
          value={password}
          required
        />
        <button type="submit">LOGIN</button>
      </form>
      <button type="button" onClick={onSwitchModeHandler}>
        or switch to Signup!
      </button>
    </div>
  ) : (
    <div>
      <h2>Signup</h2>
      <p>set up signup form here!!</p>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => onChangeHandler(e, setEmail)}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          minLength={6}
          onChange={(e) => onChangeHandler(e, setPassword)}
          value={password}
          required
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="firstName"
          id="firstName"
          onChange={(e) => onChangeHandler(e, setFirstName)}
          value={firstName}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="lastName"
          id="lastName"
          onChange={(e) => onChangeHandler(e, setLastName)}
          value={lastName}
          required
        />

        <button type="submit">Sign up!</button>
      </form>
      <button type="button" onClick={onSwitchModeHandler}>
        or switch to Login!
      </button>
    </div>
  );

  return mode;
};

export default Auth;
