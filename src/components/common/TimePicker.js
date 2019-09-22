import React from "react";
import "../../App.less";

function TimePicker(props) {
  function formatNumber(number) {
    if (number < 10) {
      return "0" + number;
    }
    return "" + number;
  }
  function getHours(time) {
    return time.slice(0, 2);
  }
  function getMinutes(time) {
    return time.slice(3, 5);
  }
  var hours = function() {
    let selectOptions = [];
    for (let i = 0; i < 24; i += 1) {
      let o = (
        <option value={formatNumber(i)} key={formatNumber(i)}>
          {formatNumber(i)}
        </option>
      );
      selectOptions.push(o);
    }
    return (
      <div className="hourSelect">
        <select
          id={"selectHours" + props.id}
          onChange={props.handleHoursSelect}
          className="select-box form-field hourSelectBox"
          value={getHours(props.time)}
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  var minutes = function() {
    let selectOptions = [];
    for (let i = 0; i < 60; i += 1) {
      let o = (
        <option value={formatNumber(i)} key={formatNumber(i)}>
          {formatNumber(i)}
        </option>
      );
      selectOptions.push(o);
    }
    return (
      <div className="minuteSelect">
        <select
          id={"selectMinutes" + props.id}
          onChange={props.handleMinutesSelect}
          className="select-box form-field minuteSelectBox"
          value={getMinutes(props.time)}
        >
          {selectOptions}
        </select>
      </div>
    );
  };
  return (
    <div className="time-picker">
      {hours()}
      {minutes()}
    </div>
  );
}

export default TimePicker;
