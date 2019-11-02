import React from "react";
import classes from "./NavBar.module.css";

const NavBar = props => {
  return (
    <nav className={classes.NavBar}>
      <i className="fas fa-bars" onClick={props.openSideDrawer}></i>
      <h1>
        OLX - <span>Buy and Sell Online</span>
      </h1>
    </nav>
  );
};

export default NavBar;
