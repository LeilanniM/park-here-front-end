import { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import HostParkings from "./parkings/pages/HostParkings";
import NewParking from "./parkings/pages/NewParking";
import Parking from "./parkings/pages/Parking";
import Parkings from "./parkings/pages/Parkings";
import UpdateParking from "./parkings/pages/UpdateParking";
import ImageUpload from "./shared/components/ImageUpload.component";
import Navbar from "./shared/components/Navigation/Navbar";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";
import Booking from "./user/pages/Booking";
import User from "./user/pages/User";
import Users from "./user/pages/Users";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => false);
  const [userId, setUserId] = useState(() => null);
  const [userData, setUserData] = useState(() => null);
  const [tokenState, setTokenState] = useState(() => null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userData"));
    console.log(local);
    if (local) {
      setTokenState(local.token);
      setIsLoggedIn(true);
      setUserId(local.userId);
      setUserData(local.userData);
    }
  }, []);

  const history = useHistory();

  const login = useCallback(
    (userId, token, tokenExpirationDate, firstTime = false, userData) => {
      setTokenState(token);
      setIsLoggedIn(true);
      setUserId(userId);
      setUserData(userData);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId,
          token,
          userData,
        })
      );
      if (firstTime) {
        history.push(`/user/${userId}/avatar`);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setTokenState(() => null);
    setUserId(() => null);
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    history.push("/");
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact render={() => <Parkings />} />
        <Route path="/users" exact render={() => <Users />} />
        <Route
          path="/user/:userId/avatar/"
          exact
          render={() => (
            <ImageUpload
              avatarImage={true}
              initialState="https://i.ibb.co/2dtXpf2/blank-avatar.webp"
            />
          )}
        />
        <Route exact path="/mydash" render={() => <User user={userData} />} />
        <Route
          path="/parking/images/:parkingId"
          exact
          render={() => (
            <ImageUpload initialState="https://i.ibb.co/K94DwZc/empty.jpg" />
          )}
        />
        <Route path="/:userId/parkings" exact render={() => <HostParkings />} />
        <Route
          path="/bookings/:bookingId"
          exact
          render={(routeProps) => <Booking routeProps={routeProps} />}
        />
        <Route path="/parkings/" exact render={() => <Parkings />} />
        <Route
          path="/:userId/parkings/new"
          exact
          render={() => <NewParking />}
        />
        <Route
          path="/parkings/:parkingId"
          exact
          render={(routeProps) => <Parking routeProps={routeProps} />}
        />
        <Route
          path="/:userId/parkings/:parkingId"
          exact
          render={(routeProps) => <UpdateParking routeProps={routeProps} />}
        />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact render={() => <Parkings />} />
        <Route path="/users" exact render={() => <Users />} />

        <Route path="/parkings/" exact render={() => <Parkings />} />
        <Route
          path="/parkings/:parkingId"
          exact
          render={(routeProps) => <Parking routeProps={routeProps} />}
        />
        <Route path="/:userId/parkings" exact render={() => <HostParkings />} />

        <Route
          path="/auth"
          exact
          render={(routeProps) => <Auth routeProps={routeProps} />}
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!tokenState,
        token: tokenState,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <main>{routes}</main>
      </div>
    </AuthContext.Provider>
  );
};

export default App;

//NOTE: Left off on section 10 video 155, need to also return to image upload
