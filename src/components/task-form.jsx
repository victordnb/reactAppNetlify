import React, { useState, useRef, useEffect } from "react";
import { generateId } from "../utils/string";
import useLocalStorage from "../hooks/use-local-storage";
import Select from 'react-select';
import api from '../utils/api';

function TaskForm({ onSubmit, children }) {
  const [title, setTitle] = useLocalStorage("taskTitle", "");

  const [selected, setSelected] = useState("");
  const [options, setOptions ] = useState([]);

  const [error, setError] = useState("");

  const ref = useRef();


  useEffect(async () => {
    await api.getAllBoards()
      .then((boards) => {
        let transform = [];
        boards.forEach((board) => {
          transform.push({ value: board._id, label: board.title });
        });
        setOptions(transform);
      });
  }, []);


  const handleInput = (event) => {
    const newText = event.target.value;
    setTitle(newText);
    if (error && newText) {
      setError("");
    }
  };

  const handleChange = selectedOption => {
    setSelected(selectedOption)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      setError("Your task title cannot be empty");
    } else if(!selected) {
      setError("Your task board cannot be empty");
    } else {
      onSubmit({
        title,
        board: selected.value,
      });
      setTitle("");
      setSelected("");
      setError("");
    }
    ref.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={ref}
        placeholder="Task title"
        type="text"
        value={title}
        onChange={handleInput}
      />
      <Select
        value={selected}
        onChange={handleChange}
        options={options}
      />
      <button type="submit">Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {children}
    </form>
  );
}

export default TaskForm;
