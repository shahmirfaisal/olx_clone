import React from "react";
import classes from "./SignUp.module.css";
import { withRouter } from "react-router-dom";

const SignUp = props => {
  return (
    <div className={classes.SignUp}>
      <h2>Sign Up</h2>

      <p>{props.error}</p>

      <form onSubmit={props.signUp}>
        <input
          onChange={e => props.signUpChange(e, "name")}
          type="text"
          placeholder="Name..."
        />
        <input
          onChange={e => props.signUpChange(e, "email")}
          type="email"
          placeholder="Email..."
        />
        <input
          onChange={e => props.signUpChange(e, "password")}
          type="password"
          placeholder="Password..."
        />
        <button>SignUp</button>
      </form>

      <h4>OR</h4>

      <button onClick={() => props.history.push("/login")}>LogIn</button>
    </div>
  );
};

export default withRouter(SignUp);
