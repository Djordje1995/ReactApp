import React from "react";
import "../../App.less";

function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      id={props.id}
    >
      {props.value}
    </button>
  );
}

export default Button;
