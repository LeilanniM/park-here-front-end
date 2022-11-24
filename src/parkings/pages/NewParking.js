import React, { useState } from "react";
import ImageUpload from "../../shared/components/ImageUpload.component";
import Autocomplete from "react-google-autocomplete";
import PlacesAutoComplete from "./Autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./NewParking.css";

const NewParking = () => {
  const [title, setTitle] = useState(() => "");
  const [description, setDesc] = useState(() => "");
  const [spaces, setSpaces] = useState(() => "");
  const [isIndoor, setIsIndoor] = useState(() => "");
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
    //tack on the userId in here so you don't have to make an invisible input.
  };

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
      {/* <GooglePlacesAutocomplete apiKey="AIzaSyBLe6i3IQNXBXa_BftIiir_rIWpRNm2m-c" /> */}
      <div>
        {/* <Autocomplete
          apiKey="AIzaSyBLe6i3IQNXBXa_BftIiir_rIWpRNm2m-c"
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        /> */}
      </div>
      <label htmlFor="parking-form-spaces">Number of Spaces:</label>
      <input
        id="parking-form-spaces"
        type="number"
        min="1"
        onChange={(e) => onChangeHandler(e, setSpaces)}
        value={spaces}
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

      {/* <ImageUpload
        center
        id="image"
        onInput={() => console.log("potatoe")}
        initialState="https://i.ibb.co/2dtXpf2/blank-avatar.webp"
      /> */}
      <button type="submit">ADD PARKING!</button>
    </form>
  );
};

export default NewParking;
