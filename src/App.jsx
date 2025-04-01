import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Tasklist from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./contexts/GlobalContext";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Tasklist />} />
            <Route path="/AddTask" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;