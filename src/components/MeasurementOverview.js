import React from "react";
import { CSVLink } from "react-csv";
import TextInput from "./common/TextInput";
import Button from "./common/Button";

function MeasurementOverview(props) {
  var exportData = function() {
    var dataToExport = [];
    var header = [
      "Ime",
      "Prezime",
      "Godine",
      "Task",
      "Vreme Snimanja",
      "Komentar"
    ];
    dataToExport.push(header);
    props.data.measurements.forEach(measurement => {
      let ee = [
        measurement.name,
        measurement.surname,
        measurement.age,
        measurement.task,
        formatTime(measurement.time), //formatTIme
        measurement.comment
      ];
      dataToExport.push(ee);
    });
    return dataToExport;
  };
  var renderMeasurementFilterField = function() {
    return (
      <div className="overview-header-filter">
        <TextInput
          id="examineeFilter"
          onChange={props.onChange}
          name="filteredExaminee"
          value={props.data.filteredExaminee}
          error=""
          className="overview-header-select-box"
          formGroup={true}
          styleFilter="filter-class"
          placeholder="Pretrazi ispitanika"
        />
        <Button className="magnifying-glass" value="&#128269;"></Button>

        {/* </div> */}
        <CSVLink
          className="button export-button"
          separator={","}
          data={exportData()}
        >
          export
        </CSVLink>
      </div>
    );
  };

  var formatTime = function(time) {
    return time.slice(11, 16);
  };

  var renderMeasurementOverviewTable = function() {
    var measurements = [];
    var zebra = true;
    if (props.data.measurements.length === 0) {
      return (
        <table className="table">
          <thead>
            <tr className="table-header">
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godine</th>
              <th>Task</th>
              <th>Vreme merenja</th>
              <th>Komentar</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr className={"empty-table-row"}>Nema dostupnih podataka</tr>
          </tbody>
        </table>
      );
    }
    var tempTask = props.data.measurements[0].task;
    props.data.measurements.forEach(measurement => {
      if (measurement.task !== tempTask) {
        zebra = !zebra;
      }
      tempTask = measurement.task;
      var cName = zebra ? "table-row-zebra" : "table-row-no-zebra";
      let tr = (
        <tr className={cName}>
          <td className="table-cell">{measurement.name}</td>
          <td className="table-cell">{measurement.surname}</td>
          <td className="table-cell">{measurement.age}</td>
          <td className="table-cell">{measurement.task}</td>
          <td className="table-cell">{formatTime(measurement.time)}</td>
          <td className="table-cell">{measurement.comment}</td>
          <td className="table-cell">&#9998;</td>
        </tr>
      );
      measurements.push(tr);
    });
    return (
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>Ime</th>
            <th>Prezime</th>
            <th>Godine</th>
            <th>Task</th>
            <th>Vreme merenja</th>
            <th>Komentar</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{measurements}</tbody>
      </table>
    );
  };
  return (
    <>
      <div className="overview-module-header">
        <h4>PRIKAZ MERENJA</h4>
        {renderMeasurementFilterField()}
      </div>
      <div id="measurementTable" className="overview-class">
        {renderMeasurementOverviewTable()}
      </div>
    </>
  );
}

export default MeasurementOverview;
