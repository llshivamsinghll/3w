import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-title-link">
            <h1 className="nav-title">Social</h1>
          </Link>
        </div>
        
        {user && (
          <div className="nav-right">
            <div className="nav-points">
              <span className="points-badge">50 ⭐</span>
            </div>
            <div className="nav-balance">
              <span className="balance-badge">₹0.00</span>
            </div>
            <div className="nav-notification">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">1</span>
            </div>
            <div className="nav-profile" onClick={handleProfileClick}>
              <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
