import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function AddTask() {
    const [title, setTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();
    const { addTask } = useContext(GlobalContext)
    const navigate = useNavigate();

    const titleError = useMemo(() => {
        if (!title.trim())
            return "Il nome della task non può essere vuoto.";
        if ([...title].some(symbol => symbols.includes(symbol)))
            return "Il nome della task non può contenere simboli speciali.";
        return "";
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titleError) {
            return;
        }

        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        try {
            await addTask(newTask);
            alert("Task aggiunta con successo")
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = ""
            navigate("/");
        } catch (err) {
            alert(err.message);
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
                {titleError &&
                    <p style={{ color: "red" }}>{titleError}</p>}

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
                        defaultValue="To do"
                        className="form-control">
                        <option value="To do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button type="submit"
                    disabled={titleError}
                    className="btn btn-primary mt-3">
                    Aggiungi Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;