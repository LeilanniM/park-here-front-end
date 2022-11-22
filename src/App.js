import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import HostParkings from "./parkings/pages/HostParkings";
import NewParking from "./parkings/pages/NewParking";
import Parking from "./parkings/pages/Parking";
import Navbar from "./shared/components/Navigation/Navbar";
import Users from "./user/pages/Users";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        header
        <Navbar />
      </header>
      <main>
        Main content....
        <Switch>
          <Route path="/" exact render={() => <Users />} />
          <Route
            path="/:userId/parkings"
            exact
            render={() => <HostParkings />}
          />
          <Route path="/parkings/new" exact render={() => <NewParking />} />
          <Route
            path="/parkings/:id"
            exact
            render={(routeProps) => <Parking routeProps={routeProps} />}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
