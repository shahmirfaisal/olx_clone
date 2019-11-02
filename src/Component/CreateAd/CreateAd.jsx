import React from "react";
import classes from "./CreateAd.module.css";

const CreateAd = props => {
  return (
    <div className={classes.CreateAd}>
      <h2>Create an Ad</h2>

      <p>{props.error}</p>

      <form onSubmit={props.submitAd}>
        <input
          onChange={e => props.inputChange(e, "title")}
          type="text"
          placeholder="Title..."
        />
        <input
          onChange={e => props.inputChange(e, "price")}
          type="text"
          placeholder="Price..."
        />
        <textarea
          onChange={e => props.inputChange(e, "description")}
          placeholder="Description..."
        ></textarea>
        <input
          onChange={e => props.inputChange(e, "address")}
          type="text"
          placeholder="Address..."
        />
        <input
          onChange={e => props.inputChange(e, "ph_num")}
          type="number"
          placeholder="Phone Num..."
        />
        <h4>Add a Pic</h4>
        <input onChange={props.imgChange} type="file" />
        <img src={props.img} />
        <button>Submit Ad</button>
      </form>
    </div>
  );
};

export default CreateAd;
