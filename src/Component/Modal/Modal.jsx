import React from "react";
import classes from "./Modal.module.css";

const Modal = props => {
  return (
    <div className={classes.Modal}>
      <img src={props.info.img} alt="Ad Pic" />
      <h4>Title: {props.info.title}</h4>
      <h4>Price: {props.info.price}</h4>
      <h4>
        Description: <span>{props.info.description}</span>
      </h4>
      <h4>
        Address: <span>{props.info.address}</span>
      </h4>
      <h4>
        Ph_Num: <span>{props.info.ph_num}</span>
      </h4>
      <p>Posted by {props.info.userName}</p>
      <button onClick={props.close}>CLOSE</button>
    </div>
  );
};

export default Modal;
