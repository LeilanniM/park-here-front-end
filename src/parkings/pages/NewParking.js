import React, { useState } from "react";

const NewParking = () => {
  const [title, setTitle] = useState(() => "");
  const [description, setDesc] = useState(() => "");

  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <form className="parking-form">
      <label htmlFor="parking-form-title">Title</label>
      <input
        id="parking-form-title"
        type="text"
        placeholder="gravel parking near beach..."
        onChange={(e) => onChangeHandler(e, setTitle)}
        value={title}
        required
      />
      <label htmlFor="parking-form-description">Title</label>
      <textarea
        id="parking-form-description"
        rows={5}
        placeholder="description here..."
        onChange={(e) => onChangeHandler(e, setDesc)}
        value={description}
        required
      />
    </form>
  );
};

export default NewParking;
