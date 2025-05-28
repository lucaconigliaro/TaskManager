import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();
  const { addTask } = useContext(GlobalContext);
  const navigate = useNavigate();

  const titleError = useMemo(() => {
    if (!title.trim()) return "Task title cannot be empty.";
    if ([...title].some((symbol) => symbols.includes(symbol)))
      return "Task title cannot contain special characters.";
    return "";
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleError) return;

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task successfully added!");
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "";
      navigate("/allTasks");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card bg-dark text-light shadow-lg w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 fw-bold">📝 Add a New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Task Name
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter task title"
              />
              {titleError && (
                <small className="text-danger">{titleError}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                ref={descriptionRef}
                className="form-control"
                rows={4}
                placeholder="Enter task details"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                ref={statusRef}
                defaultValue="To do"
                className="form-select"
              >
                <option value="To do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                disabled={!!titleError}
                className="btn btn-warning w-50 fw-semibold shadow-sm"
              >
                ➕ Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}