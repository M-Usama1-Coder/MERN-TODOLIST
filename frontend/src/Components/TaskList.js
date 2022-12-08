import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import loadingImg from "./assets/loader.gif";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
      setisLoading(false);
    } catch (error) {
      toast.error(error.message);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const Submit = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please Enter Name");
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Created Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      getTasks();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const update = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please Enter Name");
    }
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, formData);
      toast.success("Updated Successfully");
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        newFormData
      );
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const completedTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(completedTask);
  }, [tasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        Submit={Submit}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        update={update}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks: </b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks: </b> {completedTasks.length}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a Task</p>
      ) : (
        <>
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              tasks={task}
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TaskList;
