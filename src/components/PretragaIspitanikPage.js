import React from "react";
import Header from "./common/Header";
import "../App.less";
import ManageMeasurementOverview from "./ManageMeasurementOverview";

function pretragaIspitanikPage() {
  return (
    <>
      <Header />
      <div className="app-container">
        <ManageMeasurementOverview />
      </div>
    </>
  );
}

export default pretragaIspitanikPage;
