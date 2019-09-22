import React from "react";
import MeasurementFormField from "./MeasurementFormField";

function InsertMeasurementForm(props) {
  var renderMeasurementFormFields = function() {
    let formFields = [];
    for (let i = 0; i < props.measurements.length; i++) {
      let shouldRenderRemove = true;
      if (props.measurements.length === 1) {
        shouldRenderRemove = false;
      }
      let o = (
        <MeasurementFormField
          handleHoursSelect={props.handleHoursSelect}
          handleMinutesSelect={props.handleMinutesSelect}
          time={props.measurements[i].time}
          measurementId={i + 1}
          changeTime={props.changeTime}
          onChange={props.onChange}
          name={props.measurements[i].id}
          label={props.measurements[i].label}
          id={props.measurements[i].id}
          value={props.measurements[i].value}
          renderAdd={props.measurements[i].renderAdd}
          addField={props.addMeasurementField}
          removeField={props.removeMeasurementField}
          renderRemove={shouldRenderRemove}
        />
      );
      formFields.push(o);
    }
    return formFields;
  };

  var renderStudySelectField = function() {
    let selectOptions = [];
    props.studies.forEach(function(study) {
      let o = (
        <option value={study.id} key={study.id}>
          {study.name}
        </option>
      );
      selectOptions.push(o);
    });
    return (
      <div className="separator grouped-form-field">
        <label htmlFor="selectStudy">Studija</label>
        <select
          id="selectStudy"
          onChange={props.handleStudySelect}
          className="select-box form-field"
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  var renderGroupSelectField = function() {
    let selectOptions = [];
    props.groups.forEach(function(group) {
      let o = (
        <option value={group.id} key={group.id}>
          {group.name}
        </option>
      );
      selectOptions.push(o);
    });
    return (
      <div className="separator grouped-form-field">
        <label htmlFor="selectGroup">Grupa</label>
        <select
          id="selectGroup"
          onChange={props.handleGroupSelect}
          className="select-box form-field"
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  var renderExamineeSelectField = function() {
    let selectOptions = [];
    props.examinees.forEach(function(examinee) {
      let o = (
        <option value={examinee.id} key={examinee.id}>
          {examinee.name + " " + examinee.surname}
        </option>
      );
      selectOptions.push(o);
    });
    return (
      <div className="separator grouped-form-field">
        <label htmlFor="selectExaminee">Ispitanik</label>
        <select
          id="selectExaminee"
          onChange={props.handleExamineeSelect}
          className="select-box form-field"
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  var renderTaskSelectField = function() {
    let selectOptions = [];
    props.tasks.forEach(function(task) {
      let o = (
        <option value={task.id} key={task.id}>
          {task.name}
        </option>
      );
      selectOptions.push(o);
    });
    return (
      <div className="separator grouped-form-field">
        <label htmlFor="selectTask">Task</label>
        <select
          id="selectTask"
          onChange={props.handleTaskSelect}
          className="select-box form-field"
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  return (
    <>
      <h4 className="module-header">UNOS MERENJA</h4>
      <div className="form-class">
        {renderStudySelectField()}
        {renderGroupSelectField()}
        {renderExamineeSelectField()}
        {renderTaskSelectField()}
        {renderMeasurementFormFields()}
      </div>
    </>
  );
}

export default InsertMeasurementForm;
