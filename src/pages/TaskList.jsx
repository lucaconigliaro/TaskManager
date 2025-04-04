import React, { useContext, useState, useMemo, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

function TaskList() {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const searchQuery = useRef("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSearch = useMemo(() => debounce((value) => {
    searchQuery.current = value;
    setDebouncedQuery(value);
  }, 500), []);

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.title.toLowerCase().includes(debouncedQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title) * sortOrder;
        } else if (sortBy === "status") {
          const statusOrder = {
            "To do": 0,
            "Doing": 1,
            "Done": 2
          };
          return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
        } else if (sortBy === "createdAt") {
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
        }
        return 0;
      });
  }, [tasks, debouncedQuery, sortBy, sortOrder]);

  const handleSort = (e) => {
    const currSortBy = e.target.dataset.value;
    if (currSortBy === sortBy) {
      setSortOrder(prev => prev * -1);
    } else {
      setSortBy(currSortBy);
      setSortOrder(1);
    }
  };

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="container mt-4 w-50">
      <input
        type="text"
        placeholder="Cerca per nome..."
        onChange={handleSearch}
        ref={searchQuery}
        className="form-control mb-3 w-25"
      />
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col"
              data-value="title"
              onClick={handleSort}
              className="sortable-header">
              Nome
            </th>
            <th scope="col"
              data-value="status"
              onClick={handleSort}
              className="sortable-header">
              Stato
            </th>
            <th scope="col"
              data-value="createdAt"
              onClick={handleSort}
              className="sortable-header">
              Data di Creazione
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
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