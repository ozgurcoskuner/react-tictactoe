import React from "react";

function Square(props) {
  return (
    <div className="square">
      <button
        onClick={props.handleClick}
        style={props.value == "X" ? { color: "black" } : { color: "white" }}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Square;
