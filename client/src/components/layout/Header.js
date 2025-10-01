import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            <h1>EcoSnap</h1>
          </Link>
          
          <div className="nav-links">
            <Link to="/map">Map</Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <span>Welcome, {user?.name || user?.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
