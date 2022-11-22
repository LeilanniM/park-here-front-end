import React, { useEffect, useState } from "react";
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
      .then((prk) => {
        console.group(prk);
      });
  }, []);

  // if (props.routeProps && parking) {
  //   return (
  //     <div>
  //       <Map center={parking.location} zoom={8} />
  //     </div>
  //   );
  // } else {
  //   return <h2>loading...</h2>;
  // }
  return <h2>potatoes</h2>;
};

export default Parking;
