import { useRef, useState } from "react";
import useTasks from "../hooks/useTasks";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function AddTask() {
    const [title, setTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();
    const [error, setError] = useState("");
    const { addTask } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const description = descriptionRef.current.value;
        const status = statusRef.current.value;

        if (!title.trim()) {
            setError("Il campo 'Nome' non può essere vuoto.");
            return;
        } else if (symbols.split("").some((symbol) => title.includes(symbol))) {
            setError("Il campo 'Nome' non può contenere simboli speciali.");
            return;
        } else if (!description.trim()) {
            setError("Il campo 'Descrizione' non può essere vuoto.");
            return;
        };

        setError(""); // Reset dell'errore

        const task = { title, description, status };
        try {
            await addTask(task); // Aspetta la risposta della funzione
            alert("Task creata con successo!"); 
            // Reset dei campi
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do"; 
        } catch (err) {
            alert("Impossibile creare la task", err.message);
        }  
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
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
                        ref={descriptionRef}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Stato</label>
                    <select 
                    id="status" 
                    ref={statusRef} 
                    className="form-control">
                        <option value="To do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {error && <div style={{color: "red"}}>{error}</div>}

                <button type="submit" className="btn btn-primary mt-3">
                    Aggiungi Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;