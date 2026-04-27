import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-leaf"></i> Eco News & Action Hub
        </Link>
        <div className="navbar-links">
          <Link to="/news">News</Link>
          <Link to="/actions">Take Action</Link>
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/community">Community</Link>
          {user?.role === 'admin' && <Link to="/admin" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Admin</Link>}
          {user ? (

            <div className="user-menu">
              <span className="user-points"><i className="fas fa-star"></i> {user.points || 0} pts</span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary">Login</Link>
          )}
          <button onClick={toggleTheme} className="theme-toggle">
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
