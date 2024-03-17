import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import EditBoardWindow from "./EditBoardWindow";
import "../styles/BoardStyle.css";
import Column from "./TaskColumn";
import EmptyBoard from "./EmptyBoard";
import SideMenu from "./SideMenu";

export default function MainBoard() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div
      className={isBigScreen && isSideBarOpen ? "board open-sidebar" : "board"}
    >
      {isBigScreen && (
        <SideMenu
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => {
            return <Column key={index} colIndex={index} />;
          })}
          <div
            className="add-column-column"
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
          >
            <h1>+ New Column</h1>
          </div>
        </>
      ) : (
        <EmptyBoard type="edit" />
      )}
      {isBoardModalOpen && <EditBoardWindow type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}
