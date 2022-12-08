import React from "react";

function TaskForm({ name, handleInputChange, Submit, isEditing, update }) {
  return (
    <form className="task-form" onSubmit={isEditing ? update : Submit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
}

export default TaskForm;
