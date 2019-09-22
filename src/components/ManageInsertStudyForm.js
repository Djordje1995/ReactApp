import React, { useState } from "react";
import InsertStudyForm from "./InsertStudyForm";
import Button from "./common/Button";
import ConfirmationPopup from "./common/ConfirmationPopup";

var taskId = 1,
  groupId = 1;

function ManageInsertStudyForm() {
  const [formFields, setFormFields] = useState({
    studyName: {
      name: "name",
      label: "Naziv studije",
      id: "name",
      value: ""
    },
    tasks: [
      {
        name: "task" + taskId,
        label: "Task " + taskId,
        id: "task" + taskId,
        renderAdd: true,
        value: ""
      }
    ],
    groups: [
      {
        name: "group" + groupId,
        label: "Grupa ispitanika " + groupId,
        id: "group" + groupId,
        renderAdd: true,
        value: ""
      }
    ]
  });

  function getNextTaskId() {
    return (taskId += 1);
  }

  function getNextGroupId() {
    return (groupId += 1);
  }

  function copy(o) {
    var out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      out[key] = typeof v === "object" && v !== null ? copy(v) : v;
    }
    return out;
  }

  function addTaskField() {
    const newFormField = copy(formFields);
    let nextId = getNextTaskId();
    let task = {
      name: "task" + nextId,
      label: "Task " + nextId,
      id: "task" + nextId,
      renderAdd: true,
      value: ""
    };
    for (let i = 0; i < newFormField.tasks.length; i++) {
      newFormField.tasks[i].renderAdd = false;
    }
    newFormField.tasks.push(task);
    setFormFields(newFormField);
  }

  function addGroupField() {
    const newFormField = copy(formFields);
    let nextId = getNextGroupId();
    let task = {
      name: "group" + nextId,
      label: "Grupa ispitanika " + nextId,
      id: "group" + nextId,
      renderAdd: true,
      value: ""
    };
    for (let i = 0; i < newFormField.groups.length; i++) {
      newFormField.groups[i].renderAdd = false;
    }
    newFormField.groups.push(task);
    setFormFields(newFormField);
  }

  function removeTaskField({ target }) {
    const newFormField = copy(formFields);
    var stringId = target.id;
    var subStringid = stringId.slice(4, stringId.length);
    var id = parseInt(subStringid);
    var idTask = "task" + id;
    var isFound = false;
    for (let i = 0; i < newFormField.tasks.length; i++) {
      if (isFound) {
        newFormField.tasks[i].name = "task" + (i + 1);
        newFormField.tasks[i].label = "Task " + (i + 1);
        newFormField.tasks[i].id = "task" + (i + 1);
      } else {
        if (newFormField.tasks[i].id === idTask) {
          isFound = true;
          newFormField.tasks.splice(i, 1);
          if (i === newFormField.tasks.length) {
            newFormField.tasks[i - 1].renderAdd = true;
          } else {
            i -= 1;
          }
        }
      }
    }
    taskId = newFormField.tasks.length;
    setFormFields(newFormField);
  }

  function removeGroupField({ target }) {
    const newFormField = copy(formFields);
    var stringId = target.id;
    var subStringid = stringId.slice(5, stringId.length);
    var id = parseInt(subStringid);
    var idGroup = "group" + id;
    var isFound = false;
    for (let i = 0; i < newFormField.groups.length; i++) {
      if (isFound) {
        newFormField.groups[i].name = "groups" + (i + 1);
        newFormField.groups[i].label = "Grupa ispitanika " + (i + 1);
        newFormField.groups[i].id = "group" + (i + 1);
      } else {
        if (newFormField.groups[i].id === idGroup) {
          isFound = true;
          newFormField.groups.splice(i, 1);
          if (i === newFormField.groups.length) {
            newFormField.groups[i - 1].renderAdd = true;
          } else {
            i -= 1;
          }
        }
      }
    }
    groupId = newFormField.groups.length;
    setFormFields(newFormField);
  }

  function handleChange({ target }) {
    const newFormField = copy(formFields);
    if (target.id.includes("task")) {
      for (let i = 0; i < newFormField.tasks.length; i++) {
        if (newFormField.tasks[i].id === target.id) {
          newFormField.tasks[i].value = target.value;
          break;
        }
      }
    } else if (target.id.includes("group")) {
      for (let i = 0; i < newFormField.groups.length; i++) {
        if (newFormField.groups[i].id === target.id) {
          newFormField.groups[i].value = target.value;
          break;
        }
      }
    } else {
      newFormField.studyName.value = target.value;
    }
    setFormFields(newFormField);
  }

  function confirmForm() {
    document.getElementById("instertStudyConfirmPopup").style.display = "block";
  }

  return (
    <>
      <div className="form">
        <div className="form-container">
          <InsertStudyForm
            onChange={handleChange}
            taskFormFields={formFields.tasks}
            groupFormFields={formFields.groups}
            addGroupField={addGroupField}
            addTaskField={addTaskField}
            removeTaskField={removeTaskField}
            removeGroupField={removeGroupField}
          />
        </div>
        <Button
          className="submit-button"
          value="Potvrdi"
          onClick={confirmForm}
        />
      </div>
      <ConfirmationPopup id="instertStudyConfirmPopup" data={formFields} />
    </>
  );
}

export default ManageInsertStudyForm;
