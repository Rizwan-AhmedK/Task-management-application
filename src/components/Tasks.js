import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskWindow from "./TaskWindow";

export default function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({taskIndex, prevColIndex: colIndex}));
  }

  return (
    <div>
      <div
        draggable
        onDragStart={handleOnDrag}
        className="task"
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
      >
        <p style={{fontWeight: "bold"}} className="task-title ">{task.title}</p>
        <p>
          {completed} of {subtasks.length} subtasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskWindow
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}
