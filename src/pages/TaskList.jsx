import { useContext, useState, useMemo, useRef, useCallback } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500)
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter(tasks => tasks.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"];
          const indexA = statusOptions.indexOf(a.status);
          const indexB = statusOptions.indexOf(b.status);
          comparison = indexA - indexB;
        } else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        }
        return comparison * sortOrder;
      })
  }, [tasks, sortBy, sortOrder, searchQuery])

  return (
    <div className="container mt-4 w-50">
      <input
        type="text"
        placeholder="Cerca per nome..."
        onChange={e => debouncedSetSearchQuery(e.target.value)}
        className="form-control mb-3 w-25"
      />
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col"
              data-value="title"
              onClick={() => handleSort("title")}
              className="sortable-header">
              Nome {sortBy === "title" && sortIcon}
            </th>
            <th scope="col"
              data-value="status"
              onClick={() => handleSort("status")}
              className="sortable-header">
              Stato {sortBy === "status" && sortIcon}
            </th>
            <th scope="col"
              data-value="createdAt"
              onClick={() => handleSort("createdAt")}
              className="sortable-header">
              Data di Creazione {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map(task => (
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

export default TaskList;