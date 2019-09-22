import React from "react";
import Popup from "reactjs-popup";
import { NavLink } from "react-router-dom";

function Menu(props) {
  var createSubMenu = function(data) {
    var submenu = [];
    for (let i = 0; i < data.submodules.length; i++) {
      let lower = data.name.toLowerCase();
      let toString = "/" + lower + data.submodules[i] + "Page";
      let id = lower + data.submodules[i];
      let childElement = (
        <NavLink className="sub-menu-item-content" to={toString}>
          {data.submodules[i]}
        </NavLink>
      );
      let element = (
        <div key={id} className="sub-menu-item">
          {" "}
          {childElement}{" "}
        </div>
      );
      submenu.push(element);
    }
    return submenu;
  };

  return (
    <div className="menu">
      <Popup
        trigger={<div className="menu-item">{props.content[0].name}</div>}
        on="hover"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "5px", border: "none" }}
        arrow={false}
      >
        {createSubMenu(props.content[0])}
      </Popup>

      <Popup
        trigger={<div className="menu-item">{props.content[1].name}</div>}
        on="hover"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "5px", border: "none" }}
        arrow={false}
      >
        {createSubMenu(props.content[1])}
      </Popup>
      <NavLink className="menu-item no-underline" to="">
        IZLOGUJ SE
      </NavLink>
    </div>
  );
}

export default Menu;
