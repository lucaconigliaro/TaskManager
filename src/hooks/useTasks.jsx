import { useState, useEffect } from "react";
import axios from "axios";

//Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

function useTasks() {

    // Definisico lo stato dei task
    const [tasks, setTasks] = useState([]);

    // Richiesta asincrona GET a /tasks con axios 
    async function getTasks() {
        try {
            const response = await axios.get(`${API_URL}/tasks`);
            const dataTasks = response.data
            setTasks(dataTasks);
        } catch (err) {
            console.error(err)
        }
    };

    // Recupero i dati solo al primo render
   useEffect(() => {
        getTasks()
    }, []);

    async function addTask(newTask) {
        try {
            const response = await axios.post(`${API_URL}/tasks`, newTask);
            console.log("Risposta API:", response.data); // Controlla cosa restituisce l'API
    
            if (response.data.success) {
                setTasks([...tasks, newTask]);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            console.error("Errore nell'aggiungere il task:", err.message);
        }
    };

    async function removeTask() {
        // rimuovo nuovo task
    };

    async function updateTask() {
        // modifico task
    };

    return ({
        tasks,
        getTasks,
        addTask,
        removeTask,
        updateTask
    });
};

export default useTasks;