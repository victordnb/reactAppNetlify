import React, { useEffect, useState } from "react";
import useDocumentTitle from "../hooks/use-document-title";
import TaskForm from "../components/task-form";
import TaskList from "../components/task-list";
import TaskItem from "../components/task-item";
import useNotifications from "../hooks/use-notifications";
import api from "../utils/api";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const { createNotification } = useNotifications();

  const pendingTasksCount = tasks.filter((task) => !task.completed).length;
  const completedTasksCount = tasks.length - pendingTasksCount;

  useEffect(async () => {
    await api.getAllTasks()
      .then(setTasks);
  }, []);

  useEffect(() => {
    if (pendingTasksCount === 0) {
      createNotification("You completed all tasks");
    }
  }, [pendingTasksCount]);

  useDocumentTitle(`${pendingTasksCount} tasks left`);

  const createTask = async (task) => {

    try {
      const response = await api.postTask(task);
      if (response.status < 400 && response.status < 500) {
        setTasks([...tasks, task]);
      }
    } catch {
      setTasks(tasks);
      createNotification("Could not create task");
    }
  };

  const removeTask = async (id) => {
    const response = await api.deleteTask(id);
    alert(response.message);
    const tasks = await api.getAllTasks()
    setTasks(tasks);
  };

  const completeTask = async (id, completed) => {
    await api.patchTask(id, { completed: !completed });
    const tasks = await api.getAllTasks()
    setTasks(tasks);
  };

  const clearCompleted = async () => {
    await api.clearCompleted();
    const tasks = await api.getAllTasks()
    setTasks(tasks);
  };

  return (
    <div>
      <p>Pending tasks: {pendingTasksCount}</p>
      <TaskForm onSubmit={createTask} />
      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            boardTitle={task.board ? task.board.title : 'No Board'  }
            completed={task.completed}
            onClick={completeTask}
            onRemove={removeTask}
          />
        ))}
      </TaskList>
      {completedTasksCount > 0 && (
        <button onClick={clearCompleted}>Clear completed tasks</button>
      )}
    </div>
  );
}

export default TaskListPage;
