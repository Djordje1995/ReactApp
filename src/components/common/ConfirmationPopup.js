import React from "react";
import Button from "./Button";
import StudyApi from "../api/StudyApi";
import { useAlert } from "react-alert";

function ConfirmationPopup(props) {
  const alert = useAlert();

  var study = {
    name: "",
    tasks: [],
    groups: []
  };
  var errorMessage = "";

  var iterate = (obj, dataToDisplay) => {
    Object.keys(obj).forEach(key => {
      if (key === "label" || key === "value") {
        let o = {
          key: key,
          value: obj[key]
        };
        dataToDisplay.push(o);
      }
      if (typeof obj[key] === "object") {
        iterate(obj[key], dataToDisplay);
      }
    });
  };

  function addStudyName(value, index) {
    if (index !== 0) {
      return;
    }
    if (value === "" || value === undefined) {
      errorMessage = "Niste uneli naziv studije!";
      return;
    }
    study["name"] = value;
  }

  function addTasks(label, value) {
    if (label === undefined) {
      return;
    }
    if (!label.includes("Task")) {
      return;
    }
    if (value === "" || value === undefined) {
      return;
    }
    study["tasks"].push(value);
  }

  function addGroups(label, value) {
    if (label === undefined) {
      return;
    }
    if (!label.includes("Grupa")) {
      return;
    }
    if (value === "" || value === undefined) {
      return;
    }
    study["groups"].push(value);
  }

  var displayData = function() {
    var dataToDisplay = [];
    iterate(props.data, dataToDisplay);
    var elementsToDisplay = [];
    for (let i = 0; i < dataToDisplay.length; ) {
      let label = dataToDisplay[i];
      let value = dataToDisplay[i + 1];
      if (label.key === "label" && value.key === "value") {
        addStudyName(value.value, i);
        addTasks(label.value, value.value);
        addGroups(label.value, value.value);
        let obj = (
          <div>
            <span className="confirmation-popup-content-left-side">
              {label.value + ": "}
            </span>
            <span className="confirmation-popup-content-right-side">
              {value.value}
            </span>
          </div>
        );
        elementsToDisplay.push(obj);
        i += 2;
      } else {
        i += 1;
      }
    }
    return elementsToDisplay;
  };

  function closePopup() {
    document.getElementById(props.id).style.display = "none";
  }

  function succesfullCallback(response) {
    if (response.data === true) {
      alert.show("Studija je uspesno kreirana");
    }
    alert.show("Studija nije uspesno kreirana");
    document.getElementById(props.id).style.display = "none";
  }

  function insertStudy() {
    if (errorMessage !== "") {
      alert.show(errorMessage);
      return;
    }
    if (study.tasks.length === 0) {
      alert.show("Studija mora imati task!");
      return;
    }
    if (study.groups.length === 0) {
      alert.show("Studija mora imati grupu ispitanika!");
      return;
    }
    StudyApi.insertStudy(study).then(succesfullCallback);
  }

  return (
    <div className="popup-container" id={props.id}>
      <div className="confirmation-popup">
        <div className="confirmation-popup-header">
          <div className="close" onClick={closePopup} />
        </div>
        <div className="confirmation-popup-context">
          {displayData()}
          <Button className="button" value="Sacuvaj" onClick={insertStudy} />
          <Button className="button" value="Nazad" onClick={closePopup} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
