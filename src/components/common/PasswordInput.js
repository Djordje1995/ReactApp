import React from "react";
import PropTypes from "prop-types";

function PasswordInput(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          type="password"
          onChange={props.onChange}
          name={props.name}
          className="form-field"
          value={props.value}
        />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

PasswordInput.defaultProps = {
  error: ""
};

export default PasswordInput;