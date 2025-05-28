import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef();

  useEffect(() => {
    setEditedTask(task); // Reset on open
  }, [task]);

  const changeEditedTask = (key, event) => {
    setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  const { title, description, status } = editedTask;

  const content = (
    <form onSubmit={handleSubmit} ref={editFormRef}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Task Name</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => changeEditedTask("title", e)}
          className="form-control bg-dark text-white border-secondary"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => changeEditedTask("description", e)}
          className="form-control bg-dark text-white border-secondary"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => changeEditedTask("status", e)}
          className="form-select bg-dark text-white border-secondary"
        >
          <option value="To do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      title="Edit Task"
      content={content}
      show={show}
      confirmText="Save"
      onConfirm={() => editFormRef.current.requestSubmit()}
      onClose={onClose}
    />
  );
}