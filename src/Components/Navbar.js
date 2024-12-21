import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ username }) {
  const [user, setUser] = useState(null); // Tracks whether the user is logged in

  // Example of setting the user's name (Replace with actual login logic)

  return (
    <div className="header">
      <nav>
        <span>
          <i className="fa-solid fa-cart-shopping"></i>DailyMondy
        </span>
      </nav>
      <div className="services">
        {/* Conditionally render Register or Profile */}
        {user ? (
          <li>
            <button id="Profile">
              <Link to="/Profile">{username}</Link>
            </button>
          </li>
        ) : (
          <li>
            <button id="Register">
              <Link to="/Register">Register</Link>
            </button>
          </li>
        )}

        <li>
          <Link to="/Product">
            <span>Vegetables</span>
          </Link>
        </li>
        <li>
          <Link to="/MyCart">
            <span>MyCart</span>
          </Link>
        </li>
        <li>
          <Link to="/Profile">
            <span>
              <i class="fa-regular fa-user"></i>
              {username}
            </span>
          </Link>
        </li>
      </div>

      {/* Button to simulate user login for demonstration purposes 
      {!user && (
        <button onClick={handleLogin} className="login-btn">
          Simulate Login
        </button>
        
        */}
      <div className="hamburger">
        <input type="checkbox"></input>
        <div className="hamburger-lines">
          <span id="line1"></span>
          <span id="line2"></span>
          <span id="line3"></span>
        </div>
        <div className="menu-items">
          <li>
            <button id="Register">
              <Link to="/Register">Register</Link>
            </button>
          </li>
          <li>
            <Link to="/Product">
              <span>Vegetables</span>
            </Link>
          </li>
          <li>
            <Link to="/MyCart">
              <span>MyCart</span>
            </Link>
          </li>
          <li>
            <Link to="/Profile">
              <span>
                <i class="fa-regular fa-user"></i>
                {username}
              </span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
