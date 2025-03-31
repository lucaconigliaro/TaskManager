import { createContext } from "react";
import useTasks from "../hooks/useTasks";

// Contesto React che permette di condividere dati tra componenti senza passare props
export const GlobalContext = createContext();

// Componente che avvolge l'intera applicazione
export function GlobalProvider({ children }) {
    // Faccio il return di useTasks
    const tasksData = useTasks();

    return (
        // Passo i task e le funzioni di gestione con lo spread in modo che tutti i componenti del GlobalContext possano utilizzarli
        <GlobalContext.Provider value={{ ...tasksData }}>
            {children}
        </GlobalContext.Provider>
    );
};