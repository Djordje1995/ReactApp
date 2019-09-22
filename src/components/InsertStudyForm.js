import React from "react";
import FormField from "./FormField";
import TextInput from "./common/TextInput";

function InsertStudyForm(props) {
  var renderTaskFormFields = function() {
    let formFields = [];
    for (let i = 0; i < props.taskFormFields.length; i++) {
      let shouldRenderRemove = true;
      if (props.taskFormFields.length === 1) {
        shouldRenderRemove = false;
      }
      let o = (
        <FormField
          onChange={props.onChange}
          name={props.taskFormFields[i].name}
          label={props.taskFormFields[i].label}
          id={props.taskFormFields[i].id}
          value={props.taskFormFields[i].value}
          renderAdd={props.taskFormFields[i].renderAdd}
          addField={props.addTaskField}
          removeField={props.removeTaskField}
          renderRemove={shouldRenderRemove}
        />
      );
      formFields.push(o);
    }
    return formFields;
  };
  var renderGroupFormFields = function() {
    let formFields = [];
    for (let i = 0; i < props.groupFormFields.length; i++) {
      let shouldRenderRemove = true;
      if (props.groupFormFields.length === 1) {
        shouldRenderRemove = false;
      }
      let o = (
        <FormField
          onChange={props.onChange}
          name={props.groupFormFields[i].name}
          label={props.groupFormFields[i].label}
          id={props.groupFormFields[i].id}
          value={props.groupFormFields[i].value}
          renderAdd={props.groupFormFields[i].renderAdd}
          addField={props.addGroupField}
          removeField={props.removeGroupField}
          renderRemove={shouldRenderRemove}
        />
      );
      formFields.push(o);
    }
    return formFields;
  };

  return (
    <>
      <h4 className="module-header">UNOS NOVE STUDIJE</h4>
      <div className="form-class">
        <TextInput
          id="studyName"
          name="studyName"
          label="Naziv Studije"
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
        />
        {renderTaskFormFields()}
        {renderGroupFormFields()}
      </div>
    </>
  );
}

export default InsertStudyForm;
