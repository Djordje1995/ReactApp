import React from "react";
import Header from "./common/Header";
import "../App.less";
import ManageStudyOverview from "./ManageStudyOverview";

function pretragaStudijaPage() {
  return (
    <>
      <Header />
      <div className="app-container">
        <ManageStudyOverview />
      </div>
    </>
  );
}

export default pretragaStudijaPage;
