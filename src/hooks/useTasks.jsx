import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, []);

    async function addTask(newTask) {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prevTasks => [...prevTasks, task]);
    };

    async function removeTask(taskId) {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "DELETE",
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); 
    };

    async function updateTask(updatedTask) {
        const response = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        });
        const { success, message, task: newTask } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prevTasks =>
            prevTasks.map(oldTask =>
                oldTask.id === newTask.id ? newTask : oldTask  
            )
        );
    };

    return ({
        tasks,
        addTask,
        removeTask,
        updateTask
    });
}

export default useTasks;