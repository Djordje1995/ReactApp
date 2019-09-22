import React from "react";
import TextInput from "./common/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InsertExamineeForm(props) {
  var renderStudySelectField = function() {
    let selectOptions = [];
    props.formFields.studies.forEach(function(study) {
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
          className="select-box form-field no-group-buttons"
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  var renderGroupSelectField = function() {
    let selectOptions = [];
    props.formFields.groups.forEach(function(group) {
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
          className="select-box form-field no-group-buttons"
        >
          {selectOptions}
        </select>
      </div>
    );
  };

  return (
    <>
      <h4 className="module-header">UNOS ISPITANIKA</h4>
      <div className="form-class">
        <TextInput
          id="name"
          name="name"
          label="Ime"
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
          noButtonGroups="no-group-buttons"
        />
        <TextInput
          id="surname"
          name="surname"
          label="Prezime"
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
          noButtonGroups="no-group-buttons"
        />
        <TextInput
          id="parentsName"
          name="parentsName"
          label="Ime jednog roditelja"
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
          noButtonGroups="no-group-buttons"
        />
        <TextInput
          id="age"
          name="age"
          label="Godine "
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
          noButtonGroups="no-group-buttons"
        />
        <div className="separator grouped-form-field">
          <label htmlFor="examineeDate">Datum</label>
          <div id="examineeDate">
            <DatePicker
              selected={props.formFields.date}
              onChange={props.handleDateChange}
            />
          </div>
        </div>
        <TextInput
          id="comment"
          name="comment"
          label="Komentar"
          onChange={props.onChange}
          className="separator grouped-form-field"
          formGroup={false}
          noButtonGroups="no-group-buttons"
        />
        {renderStudySelectField()}
        {renderGroupSelectField()}
      </div>
    </>
  );
}

export default InsertExamineeForm;
