import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navLinks = [
    { path: "/", title: "Lista dei Task" },
    { path: "/AddTask", title: "Aggiungi Task" }
  ];

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">TaskManager</a>
        <ul className="navbar-nav  gap-2 ms-auto d-flex flex-row">
          {navLinks.map((curLink, index) => (
            <li key={index} className="nav-item">
              <NavLink 
                to={curLink.path} 
                className={({ isActive }) => isActive ? 'nav-link active text-primary' : 'nav-link text-light'}
              >
                {curLink.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};