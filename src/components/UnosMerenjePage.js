import React from "react";
import Header from "./common/Header";
import "../App.less";
import ManageInsertMeasurementForm from "./ManageInsertMeasurementForm";

function unosMerenjePage() {
  return (
    <>
      <Header />
      <div className="app-container">
        <ManageInsertMeasurementForm />
      </div>
    </>
  );
}

export default unosMerenjePage;
