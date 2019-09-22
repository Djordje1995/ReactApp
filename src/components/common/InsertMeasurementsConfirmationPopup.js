import React from "react";
import Button from "./Button";
import MeasurementApi from "../api/MeasurementApi";
import { useAlert } from "react-alert";
import util from "./util";

function InsertMeasurementsConfirmationPopup(props) {
  const alert = useAlert();
  var errorMessage = "";

  function createPopupElement(label, value, elementsToDisplay) {
    var obj = (
      <div>
        <span className="confirmation-popup-content-left-side">
          {label + ": "}
        </span>
        <span className="confirmation-popup-content-right-side">{value}</span>
      </div>
    );
    elementsToDisplay.push(obj);
  }
  function getExamineeById(id) {
    var ret = "";
    props.data.examinees.some(examinee => {
      if (examinee.id == id) {
        ret = examinee.name + " " + examinee.surname;
      }
    });
    return ret;
  }
  function getTaskById(id) {
    var ret = "";
    props.data.tasks.some(task => {
      if (task.id == id) {
        ret = task.name;
      }
    });
    return ret;
  }
  var displayData = function() {
    var elementsToDisplay = [];
    var i = 1;
    createPopupElement(
      "Pacijent",
      getExamineeById(props.data.selectedExaminee),
      elementsToDisplay
    );
    createPopupElement(
      "Task",
      getTaskById(props.data.selectedTask),
      elementsToDisplay
    );
    props.data.measurements.forEach(measurement => {
      createPopupElement("Vreme " + i, measurement.time, elementsToDisplay);
      if (measurement.comment || measurement.comment !== "") {
        createPopupElement(
          "Komentar " + i,
          measurement.comment,
          elementsToDisplay
        );
      }
      i += 1;
    });
    return elementsToDisplay;
  };

  function closePopup() {
    document.getElementById(props.id).style.display = "none";
  }

  function succesfullCallback(response) {
    if (response.data === true) {
      alert.show("Merenja su uspesno uneta");
    } else {
      alert.show("Merenja nisu uspesno uneta");
    }
    document.getElementById(props.id).style.display = "none";
  }

  function insertMeasurements() {
    if (errorMessage !== "") {
      alert.show(errorMessage);
      return;
    }
    var submitData = {
      study: parseInt(props.data.selectedStudy),
      group: parseInt(props.data.selectedGroup),
      task: parseInt(props.data.selectedTask),
      examinee: parseInt(props.data.selectedExaminee),
      measurements: []
    };
    props.data.measurements.forEach(measurement => {
      var m = util.copy(measurement);
      m.id = parseInt(m.id);
      submitData.measurements.push(m);
    });
    MeasurementApi.insertMeasurements(submitData).then(succesfullCallback);
  }

  return (
    <div className="popup-container" id={props.id}>
      <div className="confirmation-popup">
        <div className="confirmation-popup-header">
          <div className="close" onClick={closePopup} />
        </div>
        <div className="confirmation-popup-context">
          {displayData()}
          <Button
            className="button"
            value="Sacuvaj"
            onClick={insertMeasurements}
          />
          <Button className="button" value="Nazad" onClick={closePopup} />
        </div>
      </div>
    </div>
  );
}

export default InsertMeasurementsConfirmationPopup;
