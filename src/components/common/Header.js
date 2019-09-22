import React from "react";
import Menu from "./Menu";
function Header() {
  var isAdmin = window.sessionStorage.getItem("isAdmin");
  var submodule = [];
  if (isAdmin === "true") {
    submodule = ["Studija", "Ispitanik", "Merenje"];
  } else {
    submodule = ["Ispitanik", "Merenje"];
  }
  var submenues = [
    {
      name: "UNOS",
      submodules: submodule
    },
    {
      name: "PRETRAGA",
      submodules: ["Studija", "Ispitanik"]
    }
  ];
  return (
    <div className="header">
      <Menu content={submenues} />
    </div>
  );
}

export default Header;
