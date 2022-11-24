import React, { useEffect, useRef, useState } from "react";
import "./Autocomplete.css";

const Autocomplete = (props) => {
  //   const [address, setAddress] = useState(() => "");
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "geometry",
      "icon",
      "name",
      "formatted_address",
    ],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      //   console.log(place.geometry.location.lat()); //<----super useful if we want to get the coordinates
      props.setAddress(place.formatted_address);
    });
  }, []);
  return (
    <div className="autocomplete">
      <label>Address :</label>
      <input
        defaultValue={props.address ? props.address : ""}
        // onChange={(e) => props.onChangeHandler(e, props.setAddress)}
        ref={inputRef}
      />
    </div>
  );
};

export default Autocomplete;
