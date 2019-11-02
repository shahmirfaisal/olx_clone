import React from "react";
import classes from "./Profile.module.css";

const Profile = props => {
  return (
    <div className={classes.Profile}>
      <h2>Your Profile</h2>
      <h3>
        Name: <span>{props.user.name}</span>
      </h3>
      <h3>
        Email: <span>{props.user.email}</span>
      </h3>
    </div>
  );
};

export default Profile;
