import React, { useContext, useState } from "react";

import PlacesAutoComplete from "./Autocomplete";

import "./NewParking.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const NewParking = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState(() => "");
  const [description, setDesc] = useState(() => "");
  const [spaces, setSpaces] = useState(() => "");
  const [pricePerHour, setPricePerHour] = useState(() => "");
  const [isIndoor, setIsIndoor] = useState(() => false);
  const [isCovered, setIsCovered] = useState(() => false);
  const [address, setAddress] = useState(() => "");
  const [terrain, setTerrain] = useState(() => "");
  const [extraFeatures, setExtraFeatures] = useState(() => "");

  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitting form...");

    const newParking = {
      title,
      description,
      spaces,
      isIndoor,
      isCovered,
      address,
      terrain,
      extraFeatures,
      pricePerHour,
    };
    console.log(newParking);
    const options = {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(newParking),
    };

    fetch(`http://localhost:8080/parkings/`, options)
      .then((res) => {
        if (!res.ok) {
          return console.error("Error creating a place");
        }
        res.json().then((data) => {
          console.log(data);
          history.push(`/parking/images/${data._id}`);
        });
      })
      .catch((err) => {
        return console.error(err);
      });
  }; //end of submit handler

  const history = useHistory();

  return (
    <form onSubmit={onSubmitHandler} className="parking-form">
      <h2>Create a New Parking Spot</h2>
      <label htmlFor="parking-form-title">Title:</label>
      <input
        id="parking-form-title"
        type="text"
        placeholder="gravel parking near beach..."
        onChange={(e) => onChangeHandler(e, setTitle)}
        value={title}
        required
        minLength={2}
      />
      <PlacesAutoComplete setAddress={setAddress} address={address} />

      <label htmlFor="parking-form-spaces">Number of Spaces:</label>
      <input
        id="parking-form-spaces"
        type="number"
        min="1"
        onChange={(e) => onChangeHandler(e, setSpaces)}
        value={spaces}
        required
      />
      <label htmlFor="parking-form-pricePerHour">Hourly Rate:</label>
      <input
        id="parking-form-pricePerHour"
        type="number"
        min="0"
        onChange={(e) => onChangeHandler(e, setPricePerHour)}
        value={pricePerHour}
        required
      />
      <label htmlFor="parking-form-covered">Covered Parking?:</label>
      <select
        id="parking-form-covered"
        name="isCovered"
        onChange={(e) => onChangeHandler(e, setIsCovered)}
        value={isCovered}
      >
        <option value={false}>No Cover</option>
        <option value={true}>Cover</option>
      </select>
      <label htmlFor="parking-form-indoor">Indoor/Outdoor?:</label>
      <select
        id="parking-form-indoor"
        name="isIndoor"
        onChange={(e) => onChangeHandler(e, setIsIndoor)}
        value={isIndoor}
      >
        <option value={false}>Outdoor</option>
        <option value={true}>Indoor</option>
      </select>
      <label htmlFor="parking-form-description">Description:</label>
      <textarea
        id="parking-form-description"
        rows={5}
        placeholder="description here..."
        onChange={(e) => onChangeHandler(e, setDesc)}
        value={description}
        required
      />
      <label htmlFor="parking-form-terrain">Terrain type:</label>
      <input
        id="parking-form-terrain"
        type="text"
        onChange={(e) => onChangeHandler(e, setTerrain)}
        value={terrain}
      />
      <label htmlFor="parking-form-extraFeatures">Extra Features/Notes:</label>
      <textarea
        id="parking-form-extraFeatures"
        rows={5}
        onChange={(e) => onChangeHandler(e, setExtraFeatures)}
        value={extraFeatures}
        required
      />

      <button type="submit">ADD PARKING!</button>
    </form>
  );
};

export default NewParking;
