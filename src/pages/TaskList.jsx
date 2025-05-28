import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

// Debounce utility to delay search execution
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1); // 1 = ascending, -1 = descending
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced function to update search query
  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  // Toggle or change sort field
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  // Memoized sorting and filtering
  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOrder = ["To do", "Doing", "Done"];
          comparison =
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        } else if (sortBy === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="bg-dark text-light shadow w-100" style={{ maxWidth: "800px" }}>
        <div className="p-4">
          <h2 className="text-center mb-4 fw-bold">📋 Task List</h2>

          <input
            type="text"
            placeholder="Search by name..."
            onChange={(e) => debouncedSetSearchQuery(e.target.value)}
            className="form-control mb-4 w-50 mx-auto shadow-sm"
          />

          <table className="table table-dark table-bordered text-center align-middle">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("title")}
                  className="sortable-header"
                >
                  Name {sortBy === "title" ? sortIcon : "↕"}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="sortable-header"
                >
                  Status {sortBy === "status" ? sortIcon : "↕"}
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="sortable-header"
                >
                  Created At {sortBy === "createdAt" ? sortIcon : "↕"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}