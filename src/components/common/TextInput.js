import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  let wrapperClass = props.formGroup
    ? "form-group " + props.className
    : props.className;
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  let innerClass = "";
  if (props.styleFilter && props.styleFilter !== "") {
    wrapperClass = "";
    innerClass = props.styleFilter;
  } else {
    innerClass =
      props.loginClassName +
      " form-field " +
      props.noButtonGroups +
      " " +
      props.measurementComment;
    wrapperClass = props.formGroup
      ? "form-group " + props.className
      : props.className;
    if (props.error.length > 0) {
      wrapperClass += " has-error";
    }
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type="text"
        onChange={props.onChange}
        name={props.name}
        className={innerClass}
        value={props.value}
        placeholder={props.placeholder}
      />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

TextInput.defaultProps = {
  error: ""
};

export default TextInput;
