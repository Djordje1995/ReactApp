import React, { useState, useEffect } from "react";
import InsertExamineeForm from "./InsertExamineeForm";
import Button from "./common/Button";
import InsertExamineeConfirmationPopup from "./common/InsertExamineeConfirmationPopup";
import examineeApi from "./api/ExamineeApi";
import utils from "./common/util";

function ManageInsertExamineeForm() {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    parentsName: "",
    date: new Date(),
    comment: "",
    age: "",
    studies: [
      {
        id: "",
        value: ""
      }
    ],
    groups: [
      {
        id: "",
        value: ""
      }
    ],
    selectedStudy: "",
    selectedGroup: ""
  });

  useEffect(() => {
    function fetchData() {
      examineeApi
        .insertExamineeInit() //
        .then(response => {
          const data = response.data;
          var newState = utils.clone(formFields);
          var newStudies = data.studies;
          var newGroups = [];
          newStudies.forEach(study => {
            newGroups = newGroups.concat(study.groups);
          });
          newState.studies = newStudies;
          newState.groups = newGroups;
          newState.selectedStudy = "" + newStudies[0].id;
          newState.selectedGroup = "" + newGroups[0].id;
          setFormFields(newState);
        });
    }
    fetchData();
  }, []);

  function handleChange({ target }) {
    setFormFields({
      ...formFields,
      [target.name]: target.value
    });
  }

  function handleDateChange(date) {
    let newState = utils.copy(formFields);
    newState.date = date;
    setFormFields(newState);
  }

  function handleStudySelect({ target }) {
    var newState = utils.clone(formFields);
    newState.selectedStudy = target.value;
    formFields.studies.forEach(study => {
      if (study.id == newState.selectedStudy) {
        newState.groups = study.groups;
      }
    });
    setFormFields(newState);
  }

  function handleGroupSelect({ target }) {
    var newState = utils.clone(formFields);
    newState.selectedGroup = target.value;
    setFormFields(newState);
  }

  function confirmForm() {
    document.getElementById("instertExamineeConfirmPopup").style.display =
      "block";
  }

  return (
    <>
      <div className="form">
        <div className="form-container">
          <InsertExamineeForm
            onChange={handleChange}
            handleStudySelect={handleStudySelect}
            handleGroupSelect={handleGroupSelect}
            formFields={formFields}
            handleDateChange={handleDateChange}
          />
        </div>
        <Button
          className="submit-button"
          value="Potvrdi"
          onClick={confirmForm}
        />
      </div>
      <InsertExamineeConfirmationPopup
        id="instertExamineeConfirmPopup"
        data={formFields}
      />
    </>
  );
}

export default ManageInsertExamineeForm;
