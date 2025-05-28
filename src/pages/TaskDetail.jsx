import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { getStatusBadgeClass } from "../utils/statusUtils";
import EditTaskModal from "../components/EditTaskModal";
import Modal from "../components/Modal";
import dayjs from "dayjs";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) return <h2 className="container text-white mt-5">Task not found</h2>;

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task successfully deleted");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task updated successfully");
            setShowEditModal(false);
        } catch (err) {
            alert("Error updating task: " + err.message);
        }
    };

    return (
        <div className="container text-white pt-5 mt-5">
            <h2 className="text-center fw-bold mb-4">📝 Detail</h2>
            <div className="bg-dark p-4 rounded shadow w-25 mx-auto">
                <h3>{task.title}</h3>
                <p className="mb-1">
                    Created: {dayjs(task.createdAt).format("DD/MM/YYYY")}
                </p>
                <p className="mb-2">{task.description}</p>
                <p>
                    Status: <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
                </p>
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-primary shadow" onClick={() => setShowEditModal(true)}>
                        Edit
                    </button>
                    <button className="btn btn-outline-danger shadow" onClick={() => setShowModal(true)}>
                        Delete
                    </button>
                </div>
            </div>

            <Modal
                title="Confirm Deletion"
                content="Are you sure you want to delete this task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Delete"
            />

            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleSave}
            />
        </div>
    );
}