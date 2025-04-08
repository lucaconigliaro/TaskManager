import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave}) {
    const [editedTask, setEditedTask] = useState(task);
    const { title, description, status } = editedTask;
    const editFormRef = useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedTask);
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
                        onChange={e => changeEditedTask("title", e)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrizione</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => changeEditedTask("description", e)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Stato</label>
                    <select
                        id="status"
                        value={status}
                        onChange={e => changeEditedTask("status", e)}
                        className="form-control">
                        <option value="To do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </form>
        </div>
    );

    return (
        < Modal
            title="Modifica Task"
            content={content}
            show={show}
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            onClose={onClose}
        />
    );
};