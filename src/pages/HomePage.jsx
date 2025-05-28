import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container text-center mt-5 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-4 mb-3 fw-bold">🧠 Welcome to Task Manager</h1>
      <p className="lead text-muted mb-4">Plan smarter. Work better. Achieve more.</p>

      <div className="d-flex gap-3">
        <Link to="/allTasks" className="btn btn-primary btn-lg shadow">
          📋 View Tasks
        </Link>
        <Link to="/AddTask" className="btn btn-outline-warning btn-lg shadow">
          ➕ New Task
        </Link>
      </div>

      <div className="mt-5 text-white" style={{ fontSize: "0.9rem" }}>
        <p>Organize your work and life, all in one place.</p>
      </div>
    </div>
  );
}