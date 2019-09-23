import React, { useState, useEffect } from "react";
import MeasurementOverview from "./MeasurementOverview";
import util from "./common/util";
import measurementApi from "./api/MeasurementApi";

var allMeasurements = [];

function ManageMeasurementOverview() {
  const [data, setData] = useState({
    measurements: [
      {
        name: "",
        surname: "",
        age: "",
        task: "",
        time: "",
        comment: ""
      }
    ],
    filteredExaminee: ""
  });

  useEffect(() => {
    function fetchData() {
      measurementApi
        .measurementOverview() //
        .then(response => {
          const resp = response.data;
          var newState = util.clone(data);
          newState.measurements = resp.measurements;
          allMeasurements = util.copy(resp.measurements);
          setData(newState);
        });
    }
    fetchData();
  }, []);

  function handleFilter({ target }) {
    const newState = util.copy(data);
    newState.filteredExaminee = target.value;
    if (target.value === "") {
      newState.measurements = util.copy(allMeasurements);
    } else {
      var tempMeasurements = [];
      allMeasurements.forEach(measurement => {
        if (
          measurement.name.toLowerCase().includes(target.value.toLowerCase()) ||
          measurement.surname
            .toLowerCase()
            .includes(target.value.toLowerCase()) ||
          (measurement.name + " " + measurement.surname)
            .toLowerCase()
            .includes(target.value.toLowerCase()) ||
          (measurement.surname + " " + measurement.name)
            .toLowerCase()
            .includes(target.value.toLowerCase())
        ) {
          tempMeasurements.push(measurement);
        }
      });
      newState.measurements = tempMeasurements;
    }
    setData(newState);
  }

  return (
    <>
      <MeasurementOverview data={data} onChange={handleFilter} />
    </>
  );
}

export default ManageMeasurementOverview;
