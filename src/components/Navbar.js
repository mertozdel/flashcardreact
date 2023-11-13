import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import { useAuth } from '../useAuth'; // Correct the import path

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = user != null;

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">ValuzeWork</div>
      <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
      
      </button>
      <nav className={`nav-container ${isNavExpanded ? "expanded" : ""}`}>
        <ul className="nav-links left-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
            
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/uploadspage" className={({ isActive }) => isActive ? "active-link" : ""}>Uploads</NavLink>
            </li>
          )}
        </ul>
        <ul className="nav-links right-links">
          {user && user.role === 'admin' && (
            <NavLink to="/admin-panel" className={({ isActive }) => isActive ? "active-link" : ""}>Admin Panel</NavLink>
          )}
          {!isAuthenticated ? (
            <> 
              <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? "active-link" : ""}>Sign Up</NavLink>
            </>
          ) : (
            <button class="button-54" role="button" onClick={handleLogout}>Logout</button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
