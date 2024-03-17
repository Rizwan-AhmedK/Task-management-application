import React, { useState } from "react";
import "../styles/SideMenuStyle.css";
import ShowSideBar from "../assets/icon-show-sidebar.svg";
import HideSideBar from "../assets/icon-hide-sidebar.svg";
import Dropdown from "./Dropdown";
import EditBoardWindow from "./EditBoardWindow";

export default function SideMenu({ isSideBarOpen, setIsSideBarOpen }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const ToggleSideMenu = () => {
    setIsSideBarOpen((event) => !event);
  };

  return (
    <div className={`sidebar  ${!isSideBarOpen && "sidebar-closed"} ${isBoardModalOpen && 'sidebar-infront'}`}>
      {isSideBarOpen && <Dropdown setIsBoardModalOpen={setIsBoardModalOpen} />}
      <div
        className={`toggle-sidebar-container  ${
          !isSideBarOpen && "toggle-closed"
        }`}
        onClick={() => ToggleSideMenu()}
      >
        <img
          src={isSideBarOpen ? HideSideBar : ShowSideBar}
          alt="show/hide sidebar icon"
        />
        {isSideBarOpen && <p style={{fontWeight: "bold"}}>Hide Sidebar</p>}
      </div>
      {isBoardModalOpen && (
        <EditBoardWindow
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
