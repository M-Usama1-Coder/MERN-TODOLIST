import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ tasks, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <div className={tasks.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {tasks.name}
      </p>
      <div className="task-icons" onClick={() => setToComplete(tasks)}>
        <FaCheckDouble color="green" />
        <FaEdit color="purple" onClick={() => getSingleTask(tasks)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(tasks._id)} />
      </div>
    </div>
  );
};

export default Task;
