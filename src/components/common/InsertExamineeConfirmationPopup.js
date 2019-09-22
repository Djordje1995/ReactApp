import React from "react";
import Button from "./Button";
import ExamineeApi from "../api/ExamineeApi";
import { useAlert } from "react-alert";

function InsertExamineeConfirmationPopup(props) {
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
  function getStudyNameById(id) {
    var ret = "";
    props.data.studies.some(study => {
      if (study.id == id) {
        ret = study.name;
      }
    });
    return ret;
  }
  function getGroupNameById(id) {
    var ret = "";
    props.data.groups.some(group => {
      if (group.id == id) {
        ret = group.name;
      }
    });
    return ret;
  }
  var displayData = function() {
    var elementsToDisplay = [];
    createPopupElement("Ime", props.data.name, elementsToDisplay);
    createPopupElement("Prezime", props.data.surname, elementsToDisplay);
    if (props.data.parentsName || props.data.parentsName !== "") {
      createPopupElement(
        "Ime jednog roditelja",
        props.data.parentsName,
        elementsToDisplay
      );
    }
    if (props.data.comment || props.data.comment !== "") {
      createPopupElement("Komentar", props.data.comment, elementsToDisplay);
    }
    createPopupElement("Godine", props.data.age, elementsToDisplay);
    createPopupElement(
      "Datum",
      props.data.date.toDateString(),
      elementsToDisplay
    );
    createPopupElement(
      "Studija",
      getStudyNameById(props.data.selectedStudy),
      elementsToDisplay
    );
    createPopupElement(
      "Grupa",
      getGroupNameById(props.data.selectedGroup),
      elementsToDisplay
    );
    return elementsToDisplay;
  };

  function closePopup() {
    document.getElementById(props.id).style.display = "none";
  }

  function succesfullCallback(response) {
    if (response.data === true) {
      alert.show("Ispitanik je uspesno unet");
    } else {
      alert.show("Ispitanik nije uspesno unet");
    }
    document.getElementById(props.id).style.display = "none";
  }

  function insertExaminee() {
    if (errorMessage !== "") {
      alert.show(errorMessage);
      return;
    }
    if (props.data.name === "") {
      alert.show("Pacijent mora imati ime!");
      return;
    }
    if (props.data.surname === "") {
      alert.show("Pacijent mora imati prezime!");
      return;
    }
    if (props.data.date === null) {
      alert.show("Morate uneti datum!");
      return;
    }
    if (props.data.age === null) {
      alert.show("Morate uneti godine!");
      return;
    }
    var submitData = {
      name: props.data.name,
      surname: props.data.surname,
      parentsName: props.data.parentsName,
      comment: props.data.comment,
      age: parseInt(props.data.age),
      date: props.data.date,
      study: props.data.selectedStudy,
      group: props.data.selectedGroup
    };
    ExamineeApi.insertExaminee(submitData).then(succesfullCallback);
  }

  return (
    <div className="popup-container" id={props.id}>
      <div className="confirmation-popup">
        <div className="confirmation-popup-header">
          <div className="close" onClick={closePopup} />
        </div>
        <div className="confirmation-popup-context">
          {displayData()}
          <Button className="button" value="Sacuvaj" onClick={insertExaminee} />
          <Button className="button" value="Nazad" onClick={closePopup} />
        </div>
      </div>
    </div>
  );
}

export default InsertExamineeConfirmationPopup;
