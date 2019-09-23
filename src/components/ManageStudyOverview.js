import React, { useState, useEffect } from "react";
import StudyOverview from "./StudyOverview";
import util from "./common/util";
import studyApi from "./api/StudyApi";

function ManageStudyOverview() {
  const [data, setData] = useState({
    examinees: [
      {
        group: "",
        name: "",
        surname: "",
        parentsName: "",
        age: "",
        entryDate: "",
        comment: ""
      }
    ],
    selectedStudy: "Sve studije",
    studies: [
      {
        id: "",
        name: ""
      }
    ]
  });

  useEffect(() => {
    function fetchData() {
      studyApi
        .studyOverview() //
        .then(response => {
          const resp = response.data;
          var newState = util.clone(data);
          var newStudies = resp.studies;
          var newExaminees = resp.examinees;
          newState.examinees = newExaminees;
          newState.studies = newStudies;
          newState.selectedStudy = "Sve studije";
          setData(newState);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <StudyOverview data={data} />
    </>
  );
}

export default ManageStudyOverview;
