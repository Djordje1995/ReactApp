import React from "react";
import AddRemoveButtonGroup from "./common/AddRemoveButtonGroup";
import TextInput from "./common/TextInput";

function FormField(props) {
  let cName = props.renderAdd
    ? "grouped-form-field separator"
    : "grouped-form-field";
  return (
    <div className={cName}>
      <TextInput
        onChange={props.onChange}
        name={props.name}
        label={props.label}
        id={props.id}
        value={props.value}
        formGroup={true}
      />
      <AddRemoveButtonGroup
        id={props.id + "button"}
        renderAdd={props.renderAdd}
        addField={props.addField}
        removeField={props.removeField}
        renderRemove={props.renderRemove}
      />
    </div>
  );
}

export default FormField;
