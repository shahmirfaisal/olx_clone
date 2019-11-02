import React from "react";
import classes from "./UserAds.module.css";
import Ad from "../Ad/Ad";
import { withRouter } from "react-router-dom";

const Explore = props => {
  let show =
    props.userAds.length === 0 ? (
      <div className={classes.NoAd}>You haven't created any Ad.</div>
    ) : (
      <div className={classes.PublicAdContainer}>
        {props.userAds.map((v, i) => (
          <Ad ad={v} key={i} showDetails={() => props.showDetails(i)} />
        ))}
      </div>
    );
  return (
    <div className={classes.UserAds}>
      <h2>Your Ads</h2>
      {show}
      <i
        className="fas fa-plus"
        onClick={() => props.history.push("/createad")}
      ></i>
    </div>
  );
};

export default withRouter(Explore);
