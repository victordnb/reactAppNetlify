import React from "react";

function TaskItem({ id, title, completed, boardTitle, onClick, onRemove }) {
  return (
    <li>
      <span
        onClick={() => onClick(id)}
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        <b>{boardTitle !== 'No Board' ? boardTitle: '--' }:</b> {title}
      </span>
      <button onClick={() => onRemove(id)}>X</button>
    </li>
  );
}

export default TaskItem;
