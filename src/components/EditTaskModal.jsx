import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({
    show,
    onClose,
    task,
    onSave
}) {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const editFormRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { ...task, title, description, status };
        onSave(updatedTask);
        onClose();
    };

    const content = (
        <div className="container">
        <form 
        onSubmit={handleSubmit} 
        ref={editFormRef}
        className="w-50 mx-auto mt-4">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Nome del Task</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descrizione</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="status" className="form-label">Stato</label>
                <select 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="form-control">
                    <option value="To do">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </form>
    </div>
    )

    return (
        < Modal
            title="Modifica Task"
            content={content}
            show={show}
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    );
};