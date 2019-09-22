import React from "react";
import AddRemoveButtonGroup from "./common/AddRemoveButtonGroup";
import TextInput from "./common/TextInput";
import TimePicker from "./common/TimePicker";

function MeasurementFormField(props) {
  let cName = props.renderAdd
    ? "measurement-form-field separator"
    : "measurement-form-field";
  return (
    <div className={cName}>
      <TimePicker
        onChange={props.changeTime}
        value={props.time}
        id={props.measurementId}
        time={props.time}
        handleMinutesSelect={props.handleMinutesSelect}
        handleHoursSelect={props.handleHoursSelect}
      />
      <TextInput
        onChange={props.onChange}
        name={props.name}
        label={props.label}
        id={props.id}
        value={props.value}
        formGroup={false}
        measurementComment="measurement-comment"
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

export default MeasurementFormField;
