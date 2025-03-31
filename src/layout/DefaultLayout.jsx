import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function DefaultLayout() {
    return (
        <div>
            <NavBar />
            <Outlet className="background-dark"/>
            <footer className="mt-4 bg-dark text-white text-center py-3">
                <p>© 2025 TaskManager. All rights reserved.</p>
            </footer> 
        </div>
    );
};