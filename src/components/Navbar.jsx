import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/allTasks", title: "Tasks" },
    { path: "/AddTask", title: "New Task" }
  ];

  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">
          📝 TaskManager
        </Link>
        <ul className="navbar-nav gap-2 ms-auto d-flex flex-row align-items-center">
          {navLinks.map((curLink, index) => (
            <li key={index} className="nav-item d-flex align-items-center">
              <NavLink
                to={curLink.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link active text-primary' : 'nav-link text-light'
                }
              >
                {curLink.title}
              </NavLink>
              {index < navLinks.length - 1 && (
                <span className="text-secondary mx-2">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}