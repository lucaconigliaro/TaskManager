import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>© 2025 TaskManager. All rights reserved.</p>
      </footer>
    </div>
  );
}