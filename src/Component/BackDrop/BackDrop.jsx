import React from "react";

const BackDrop = props => {
  const style = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 500
  };

  return <div style={style} onClick={props.close}></div>;
};

export default BackDrop;
