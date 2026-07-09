import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span>
          SkillPath <span className="gradient-text">AI</span>
        </span>
      </Link>

      {/* Hamburger menu icon (optional but recommended for mobile toggle) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Simple standard string concatenation or conditional template literal */}
      <div className={menuOpen ? "nav-menu active" : "nav-menu"}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>

        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          About
        </NavLink>

        <Link to="/login" className="nav-btn-login">
          Login
        </Link>

        <Link to="/register" className="nav-btn-register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;