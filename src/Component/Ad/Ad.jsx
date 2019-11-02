import React from "react";
import classes from "./Ad.module.css";

const Ad = props => {
  return (
    <div className={classes.Ad} onClick={props.showDetails}>
      <img src={props.ad.img} alt="House" />
      <h4>
        Title: <span>{props.ad.title}</span>
      </h4>
      <h4>
        Price: <span>{props.ad.price}</span>
      </h4>
      <p>Click to show details</p>
    </div>
  );
};

export default Ad;
