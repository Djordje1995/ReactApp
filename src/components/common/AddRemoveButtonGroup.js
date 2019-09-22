import React from "react";
import Button from "./Button";

function AddRemoveButtonGroup(props) {
  var renderAdd = function() {
    if (props.renderAdd) {
      if (props.renderRemove) {
        return (
          <div className="buttonGroup">
            <Button
              id={props.id + "1"}
              onClick={props.removeField}
              className="button grouped-button"
              value="-"
            />
            <Button
              onClick={props.addField}
              id={props.id + "2"}
              className="button grouped-button"
              value="+"
            />
          </div>
        );
      } else {
        return (
          <div className="buttonGroup">
            <Button
              onClick={props.addField}
              id={props.id + "2"}
              className="button grouped-button"
              value="+"
            />
          </div>
        );
      }
    } else {
      return (
        <div className="buttonGroup">
          <Button
            onClick={props.removeField}
            id={props.id + "1"}
            className="button grouped-button"
            value="-"
          />
        </div>
      );
    }
  };

  return renderAdd();
}

export default AddRemoveButtonGroup;
