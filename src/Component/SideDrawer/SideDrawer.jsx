import React from "react";
import classes from "./SideDrawer.module.css";
import { NavLink } from "react-router-dom";

const SideDrawer = props => {
  let SideDrawerClasses = [
    classes.SideDrawer,
    props.openSideDrawer ? classes.Open : classes.Close
  ];

  return (
    <div className={SideDrawerClasses.join(" ")}>
      <i className="fas fa-times" onClick={props.closeSideDrawer}></i>
      <h2>OLX</h2>
      <ul>
        {props.isSignIn ? (
          <li onClick={props.closeSideDrawer}>
            <NavLink className={classes.Link} to="/profile">
              My Profile
            </NavLink>
          </li>
        ) : null}

        <li onClick={props.closeSideDrawer}>
          <NavLink className={classes.Link} to="/">
            Home
          </NavLink>
        </li>

        {props.isSignIn ? (
          <li onClick={props.closeSideDrawer}>
            <NavLink className={classes.Link} to="/userads">
              My Ads
            </NavLink>
          </li>
        ) : null}

        {props.isSignIn ? (
          <li onClick={props.closeSideDrawer}>
            <NavLink className={classes.Link} to="/createad">
              Create an Ad
            </NavLink>
          </li>
        ) : null}

        {props.isSignIn ? (
          <li
            onClick={() => {
              props.closeSideDrawer();
              props.signOut();
            }}
          >
            SignOut
          </li>
        ) : null}

        {props.isSignIn ? null : (
          <li onClick={props.closeSideDrawer}>
            <NavLink className={classes.Link} to="/signup">
              SignUp
            </NavLink>
          </li>
        )}

        {props.isSignIn ? null : (
          <li onClick={props.closeSideDrawer}>
            <NavLink className={classes.Link} to="/login">
              LogIn
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideDrawer;
