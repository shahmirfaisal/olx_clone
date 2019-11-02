import React from "react";
import classes from "./LogIn.module.css";
import { withRouter } from "react-router-dom";

const LogIn = props => {
  return (
    <div className={classes.LogIn}>
      <h2>Log In</h2>

      <p>{props.error}</p>

      <form onSubmit={props.logIn}>
        <input
          onChange={e => props.logInChange(e, "email")}
          type="email"
          placeholder="Email..."
        />
        <input
          onChange={e => props.logInChange(e, "password")}
          type="password"
          placeholder="Password..."
        />
        <button>LogIn</button>
      </form>

      <h4>OR</h4>

      <button onClick={() => props.history.push("/signup")}>SignUp</button>
    </div>
  );
};

export default withRouter(LogIn);
