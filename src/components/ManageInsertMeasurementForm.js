import React, { useState, useEffect } from "react";
import InsertMeasurementForm from "./InsertMeasurementForm";
import Button from "./common/Button";
import InsertMeasurementsConfirmationPopup from "./common/InsertMeasurementsConfirmationPopup";
import util from "./common/util";
import measurementApi from "./api/MeasurementApi";

var measurementId = 1;

function ManageInsertMeasurementForm() {
  const [formFields, setFormFields] = useState({
    studies: [
      {
        id: "",
        name: ""
      }
    ],
    selectedStudy: "",
    examinees: [
      {
        id: "",
        name: "",
        surname: ""
      }
    ],
    selectedExaminee: "",
    groups: [
      {
        id: "",
        name: ""
      }
    ],
    selectedGroup: "",
    tasks: [
      {
        id: "",
        name: ""
      }
    ],
    selectedTask: "",
    measurements: [
      {
        id: "measurement" + measurementId,
        time: "00:00",
        label: "Merenje " + measurementId,
        comment: "",
        renderAdd: true
      }
    ]
  });

  useEffect(() => {
    function fetchData() {
      measurementApi
        .insertMeasurementInit() //
        .then(response => {
          const data = response.data;
          var newState = util.clone(formFields);
          var newStudies = data.studies;
          var newGroups = [];
          var newTasks = [];
          var newExaminees = [];
          newStudies.forEach(study => {
            newGroups = newGroups.concat(study.groups);
            newTasks = newTasks.concat(study.tasks);
          });
          newGroups.forEach(group => {
            newExaminees = newExaminees.concat(group.examinees);
          });
          newState.studies = newStudies;
          newState.groups = newGroups;
          newState.tasks = newTasks;
          newState.examinees = newExaminees;
          newState.selectedStudy = "" + newStudies[0].id;
          newState.selectedGroup = "" + newGroups[0].id;
          newState.selectedTask = "" + newTasks[0].id;
          newState.selectedExaminee = "" + newExaminees[0].id;
          setFormFields(newState);
        });
    }
    fetchData();
  }, []);

  function getNextMeasurementId() {
    return (measurementId += 1);
  }

  function addMeasurementField() {
    const newFormField = util.copy(formFields);
    let nextId = getNextMeasurementId();
    let measurement = {
      id: "measurement" + nextId,
      time: "00:00",
      label: "Merenje " + nextId,
      comment: "",
      renderAdd: true
    };
    for (let i = 0; i < newFormField.measurements.length; i += 1) {
      newFormField.measurements[i].renderAdd = false;
    }
    newFormField.measurements.push(measurement);
    setFormFields(newFormField);
  }

  function removeMeasurementField({ target }) {
    const newFormField = util.copy(formFields);
    var stringId = target.id;
    var subStringid = stringId.slice(11, stringId.length);
    var id = parseInt(subStringid);
    var idMeasurement = "measurement" + id;
    var isFound = false;
    for (let i = 0; i < newFormField.measurements.length; i++) {
      if (isFound) {
        newFormField.measurements[i].label = "Merenje " + (i + 1);
        newFormField.measurements[i].id = "measurement" + (i + 1);
      } else {
        if (newFormField.measurements[i].id === idMeasurement) {
          isFound = true;
          newFormField.measurements.splice(i, 1);
          if (i === newFormField.measurements.length) {
            newFormField.measurements[i - 1].renderAdd = true;
          } else {
            i -= 1;
          }
        }
      }
    }
    measurementId = newFormField.measurements.length;
    setFormFields(newFormField);
  }

  function handleChange({ target }) {
    const newFormField = util.copy(formFields);
    for (let i = 0; i < newFormField.measurements.length; i += 1) {
      if (newFormField.measurements[i].id === target.id) {
        newFormField.measurements[i].comment = target.value;
        break;
      }
    }
    setFormFields(newFormField);
  }

  function handleStudySelect({ target }) {
    var newState = util.clone(formFields);
    newState.selectedStudy = target.value;
    newState.studies.forEach(study => {
      if (study.id == newState.selectedStudy) {
        newState.groups = study.groups;
        newState.tasks = study.tasks;
        var newExaminees = [];
        newState.groups.forEach(group => {
          newExaminees = newExaminees.concat(group.examinees);
        });
        newState.examinees = newExaminees;
      }
    });
    setFormFields(newState);
  }

  function handleGroupSelect({ target }) {
    var newState = util.clone(formFields);
    newState.selectedGroup = target.value;
    newState.groups.forEach(group => {
      if (group.id == newState.selectedGroup) {
        var newExaminees = group.examinees;
        newState.examinees = newExaminees;
      }
    });
    setFormFields(newState);
  }

  function handleTaskSelect({ target }) {
    var newState = util.clone(formFields);
    newState.selectedTask = target.value;
    setFormFields(newState);
  }

  function getMinutesId(stringId) {
    var subStringid = stringId.slice(13, stringId.length);
    return parseInt(subStringid);
  }

  function getHoursId(stringId) {
    var subStringid = stringId.slice(11, stringId.length);
    return parseInt(subStringid);
  }

  function handleExamineeSelect({ target }) {
    var newState = util.clone(formFields);
    newState.selectedExaminee = target.value;
    setFormFields(newState);
  }

  function handleMinutesSelect({ target }) {
    var newState = util.clone(formFields);
    var id = getMinutesId(target.id);
    var currentTime = newState.measurements[id - 1].time;
    var newTime = currentTime.slice(0, 2);
    newTime = newTime.concat(":").concat(target.value);
    newState.measurements[id - 1].time = newTime;
    setFormFields(newState);
  }

  function handleHoursSelect({ target }) {
    var newState = util.clone(formFields);
    var id = getHoursId(target.id);
    var currentTime = newState.measurements[id - 1].time;
    var newTime = currentTime.slice(3, 5);
    newTime = target.value.concat(":").concat(newTime);
    newState.measurements[id - 1].time = newTime;
    setFormFields(newState);
  }

  function confirmForm() {
    document.getElementById("instertMeasurementConfirmPopup").style.display =
      "block";
  }

  return (
    <>
      <div className="form">
        <div className="form-container">
          <InsertMeasurementForm
            onChange={handleChange}
            tasks={formFields.tasks}
            groups={formFields.groups}
            studies={formFields.studies}
            examinees={formFields.examinees}
            handleStudySelect={handleStudySelect}
            handleGroupSelect={handleGroupSelect}
            handleTaskSelect={handleTaskSelect}
            handleExamineeSelect={handleExamineeSelect}
            measurements={formFields.measurements}
            handleMinutesSelect={handleMinutesSelect}
            handleHoursSelect={handleHoursSelect}
            addMeasurementField={addMeasurementField}
            removeMeasurementField={removeMeasurementField}
          />
        </div>
        <Button
          className="submit-button"
          value="Potvrdi"
          onClick={confirmForm}
        />
      </div>
      <InsertMeasurementsConfirmationPopup
        id="instertMeasurementConfirmPopup"
        data={formFields}
      />
    </>
  );
}

export default ManageInsertMeasurementForm;
