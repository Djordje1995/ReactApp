import React from "react";
import Header from "./common/Header";
import "../App.less";
import ManageInsertStudyForm from "./ManageInsertStudyForm";

function unosStudijaPage() {
  return (
    <>
      <Header />
      <div className="app-container">
        <ManageInsertStudyForm />
      </div>
    </>
  );
}

export default unosStudijaPage;
