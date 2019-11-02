import React from "react";
import classes from "./Explore.module.css";
import Ad from "../Ad/Ad";
import Spinner from "../Spinner/Spinner";

const Explore = props => {
  return (
    <div className={classes.Explore}>
      <h2>Explore</h2>

      {props.loader ? (
        <Spinner pink />
      ) : (
        <div className={classes.PublicAdContainer}>
          {props.publicAds.map((v, i) => (
            <Ad ad={v} key={i} showDetails={() => props.showDetails(i)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
