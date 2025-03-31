import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

function TaskList() {

  // Recupero i tasks dal GlobalContezt
  const { tasks } = useContext(GlobalContext);

  return (
    <div className="container mt-4">
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Stato</th>
            <th scope="col">Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Esporto la funzione con React.memo per evitare render inutili
export default React.memo(TaskList);