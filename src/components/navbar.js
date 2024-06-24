import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import "./Navbar.css";
import { CodeIcon } from "./icons"; // Adjust this if you have a different logo/icon

function NavBar({ userName, onLogout }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          <span>Agrillnovate</span>
          <span className="icon">
            <CodeIcon />
          </span>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/home"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/Publicknowledge"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Public Knowledge
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/agricultureresearch"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Agriculture Research
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/forums"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Forums
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/Infographics"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Infographics
            </NavLink>
          </li>
          {userName ? (
            <>
              <li className="nav-item">
                <span className="user-info"><FaUserCircle /> {userName}</span>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="logout-button"><FaSignOutAlt /> Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <FaTimes className="icon" />
          ) : (
            <FaBars className="icon" />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
