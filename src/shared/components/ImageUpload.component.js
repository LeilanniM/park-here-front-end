import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./imageUpload.styles.css";

const ImageUpload = (props) => {
  const initialState = props.initialState; //initialState is just blank-avatar hosted on ibb
  const [imageState, setImageState] = useState(); //state and state-setter for image
  const [previewUrl, setPreviewUrl] = useState(() => initialState); //state and state-setter for img preview src url
  const auth = useContext(AuthContext);
  const history = useHistory();
  const parkingId = useParams().parkingId;

  useEffect(() => {
    if (!imageState) {
      return;
    }
    const fileReader = new FileReader(); //lets us read files on the pc

    //As soon as it's done loading the file, set the preview img src url state to the result
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); //setting src to result.
    };

    console.log("inside useeffect");
    fileReader.readAsDataURL(imageState);
  }, [imageState]);

  //selected image handler
  const onChangeImageHandler = (event) => {
    const filesArray = event.target.files;
    let imageFile;
    if (filesArray && filesArray.length === 1) {
      imageFile = filesArray[0];
      console.log("inside onChangeImageHandler");
      console.log(imageFile);
      setImageState(() => imageFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitting image");

    //-----------

    //------------

    const postdata = JSON.stringify({
      base64string: previewUrl.slice(22),
    });

    const url = props.avatarImage
      ? `http://localhost:8080/avatar/${auth.userId}/`
      : `http://localhost:8080/parking/images/${parkingId}`;

    // fetch(url, {
    //   method: "POST",
    //   withCredentials: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: postdata,
    // }).then((res) => {
    //   res.json().then((data) => {
    //     console.log(data);
    //     history.push("/");
    //   });
    // });

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("eventlistener thingyyyyyyyyyy");
        console.log(this.responseText);
      }
    });

    xhr.open("POST", url, true);
    // xhr.open("POST", `http://localhost:8080/users/${auth.userId}/avatar`);
    xhr.setRequestHeader("content-type", "application/json");
    // xhr.setRequestHeader("Authorization", "Bearer " + auth.token);
    xhr.onload = function () {
      console.log("onload thing happened!!!!!!!!!!");
      history.push("/");
    };
    xhr.send(postdata);
  };

  return (
    <div className="form-control">
      <h1>
        {props.avatarImage
          ? "Welcome! Now lets get you a profile image!"
          : "Select an image for your Parking Spot"}
      </h1>
      <form id="form" encType="multipart/form-data">
        <input
          id={props.id}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={(e) => onChangeImageHandler(e)}
        />
        <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
      </form>
      <div id="prev"></div>
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>please pick an image</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
