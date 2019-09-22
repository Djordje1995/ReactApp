import React from "react";
import Header from "./common/Header";
import "../App.less";
import ManageInsertExameneeForm from "./ManageInsertExamineeForm";

function unosIspitanikPage() {
  return (
    <>
      <Header />
      <div className="app-container">
        <ManageInsertExameneeForm />
      </div>
    </>
  );
}

export default unosIspitanikPage;
