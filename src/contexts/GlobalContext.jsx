import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Contesto React che permette di condividere dati tra componenti senza passare props
export const GlobalContext = createContext();

//Variabile d'ambiente
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Componente che avvolge l'intera applicazione, che accetta un componente
export const GlobalProvider = ({ children }) => {

    // Definisico lo stato dei task
    const [tasks, setTasks] = useState([]);

    // Richiesta GET a/tasks con axios
    useEffect(() => {
        axios.get(`${API_URL}/tasks`)
            .then(resp => setTasks(resp.data))
            .catch(err => console.error("Errore nel recupero dei task:", err));
    }, [])

    return (
        // Passo i task in modo che i figli del GlobalContext possano utillizzarli
        <GlobalContext.Provider value={{ tasks, setTasks }} >
            {children}
        </GlobalContext.Provider>
    );
};