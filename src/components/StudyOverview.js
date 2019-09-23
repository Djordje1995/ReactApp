import React from "react";
import { CSVLink } from "react-csv";

function StudyOverview(props) {
  var exportData = function() {
    var dataToExport = [];
    var header = [
      "Grupa",
      "Ime",
      "Prezime",
      "Ime Roditelja",
      "Godine",
      "Datum Snimanja",
      "Komentar"
    ];
    dataToExport.push(header);
    props.data.examinees.forEach(examinee => {
      let ee = [
        examinee.group,
        examinee.name,
        examinee.surname,
        examinee.parentName,
        examinee.age,
        formatDate(examinee.entryDate),
        examinee.comment
      ];
      dataToExport.push(ee);
    });
    return dataToExport;
  };
  var renderStudySelectField = function() {
    let selectOptions = [];
    let obj = (
      <option value="all" key="all">
        Sve Studije
      </option>
    );
    selectOptions.push(obj);
    props.data.studies.forEach(function(study) {
      let o = (
        <option value={study.id} key={study.id}>
          {study.name}
        </option>
      );
      selectOptions.push(o);
    });
    return (
      <div className="overview-header-filter">
        <select
          id="selectStudy"
          onChange={props.handleStudySelect}
          className="overview-header-select-box"
        >
          {selectOptions}
        </select>
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

  var formatDate = function(date) {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "." + month + "." + year + ".";
  };

  var renderStudyOverviewTable = function() {
    var examinees = [];
    var zebra = true;
    var tempGroup = props.data.examinees[0].group;
    props.data.examinees.forEach(examinee => {
      if (examinee.group !== tempGroup) {
        zebra = !zebra;
      }
      tempGroup = examinee.group;
      var cName = zebra ? "table-row-zebra" : "table-row-no-zebra";
      let tr = (
        <tr className={cName}>
          <td className="table-cell">{examinee.group}</td>
          <td className="table-cell">{examinee.name}</td>
          <td className="table-cell">{examinee.surname}</td>
          <td className="table-cell">{examinee.parentName}</td>
          <td className="table-cell">{examinee.age}</td>
          <td className="table-cell">{formatDate(examinee.entryDate)}</td>
          <td className="table-cell">{examinee.comment}</td>
          <td className="table-cell">&#9998;</td>
        </tr>
      );
      examinees.push(tr);
    });
    return (
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>Grupa</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Ime Roditelja</th>
            <th>Godine</th>
            <th>Datum snimanja</th>
            <th>Komentar</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{examinees}</tbody>
      </table>
    );
  };
  return (
    <>
      <div className="overview-module-header">
        <h4>PRIKAZ ISPITANIKA</h4>
        {renderStudySelectField()}
      </div>
      <div className="overview-class">{renderStudyOverviewTable()}</div>
    </>
  );
}

export default StudyOverview;
