import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import Autocomplete from "./Autocomplete";

//Comeback and fix with authentication...⛏
const UpdateParking = () => {
  const [title, setTitle] = useState(() => "");
  const [description, setDesc] = useState(() => "");
  const [spaces, setSpaces] = useState(() => "");
  const [isIndoor, setIsIndoor] = useState(() => "");
  const [isCovered, setIsCovered] = useState(() => false);
  const [address, setAddress] = useState(() => "");
  const [terrain, setTerrain] = useState(() => "");
  const [extraFeatures, setExtraFeatures] = useState(() => "");
  const [pricePerHour, setPricePerHour] = useState(() => "");

  const { parkingId, userId } = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  console.log(parkingId, userId);

  useEffect(() => {
    //fetch the parking using the parkingId. We don't have to validate since the backend automatically checks the cookie for us.
    //after fectching, we set the state with the current parking data which will fill it up for us. Meet MVP by not worrying about deleting images, only adding them right now is ok.
    fetch(`http://localhost:8080/parkings/${parkingId}`).then((res) => {
      res.json().then((prk) => {
        console.log(prk);
        const {
          address,
          covered,
          description,
          extraFeatures,
          indoor,
          pricePerHour,
          spaces,
          terrain,
          title,
        } = prk;

        setTitle(title);
        setAddress(address);
        setDesc(description);
        setIsCovered(covered);
        setIsIndoor(indoor);
        setSpaces(spaces);
        setTerrain(terrain);
        setExtraFeatures(extraFeatures);
        setPricePerHour(pricePerHour);
      });
    });
  }, []);

  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitting update form...");
    //tack on the userId in here so you don't have to make an invisible input.
    //Send this to patch http://localhost:8080/parkings/123
    const updatedParking = JSON.stringify({
      title,
      description,
      spaces,
      isIndoor,
      isCovered,
      address,
      terrain,
      extraFeatures,
      pricePerHour,
      host: auth.userId,
    });
    const options = {
      method: "PATCH",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: updatedParking,
    };

    fetch(`http://localhost:8080/parkings/${parkingId}`, options).then(() => {
      history.push("/");
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="parking-form">
      <h2>Edit a Parking Spot</h2>
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
      <Autocomplete setAddress={setAddress} address={address} />

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
      <label htmlFor="parking-form-pricePerHour">Price per hour:</label>
      <input
        id="parking-form-pricePerHour"
        type="text"
        onChange={(e) => onChangeHandler(e, setPricePerHour)}
        value={pricePerHour}
      />
      <label htmlFor="parking-form-extraFeatures">
        ⭐️Extra Features/Notes:
      </label>
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
      <button type="submit">SAVE</button>
      <button type="button">CANCEL</button>
      <button
        style={{ marginTop: "30px", background: "#f09494" }}
        type="button"
      >
        ☠️DELETE PARKING SPOT
      </button>
    </form>
  );
};
//render a modal if they click on the delete button.

export default UpdateParking;
