import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import dayjs from "dayjs";

export default function TaskDetail() {
    const { id } = useParams(); // Prende l'ID dall'URL
    const { tasks, removeTask, getTasks, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Trova il task con quell'ID
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) return;

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            await getTasks();
            alert("Task eliminato con successo");
            navigate('/');
        } catch (err) {
            alert("Errore durante l'eliminazione del task:", err.message);
        }
    };

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(task.id, updatedTask);
            await getTasks();
            alert("Task modificato con successo");
        } catch (err) {
            alert("Errore durante la modifica del task:", err.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-start">
            <div className="card bg-dark text-white" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <div className="card-body d-flex flex-column">
                    <h3 className="card-title">{task.title}</h3>
                    <p className="card-subtitle mb-2">{dayjs(task.createdAt).format("DD/MM/YYYY")}</p>
                    <p className="card-text">{task.description}</p>
                    <p>{task.status}</p>
                    <div className="mt-auto d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => setShowEditModal(true)}>
                            Modifica Task
                        </button>
                        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                            Elimina Task
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                title="Conferma Eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />

            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleSave}
            />
        </div>
    );
};