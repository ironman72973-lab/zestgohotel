import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import "../assets/css/header.css";

function Header({ toggleSidebar }) {
  return (
    <header className="zg-header">
      <div className="zg-header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Link to="/dashboard" className="logo">
          <img src="/logo.png" alt="ZestGo" />
          <span>ZestGo Hotel Portal</span>
        </Link>
      </div>

      <div className="zg-header-right">
        <button className="icon-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-box">
          <FaUserCircle className="profile-icon" />
          <div>
            <h6>Hotel Partner</h6>
            <small>Welcome Back</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;