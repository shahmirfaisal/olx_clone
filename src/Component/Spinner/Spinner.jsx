import React from "react";
import classes from "./Spinner.module.css";

const Spinner = props => {
  let classNames = [classes.Spinner, props.pink ? classes.SpinnerPink : null];

  return (
    <div className={classNames.join(" ")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
