import React, { useState } from "react";
import "./Navbar.css";
import Dmlogo from "./productImg/Dm-logo2.jpeg";
import { Link } from "react-router-dom";

export default function Navbar({ username }) {
  const [user, setUser] = useState(null); // Tracks whether the user is logged in

  // Example of setting the user's name (Replace with actual login logic)

  return (
    <div className="header">
      <nav>
        <div className="logo">
          <img src={Dmlogo} className="dm-logo"/>
          <span id="logo-name">DailyMandi</span>
        </div>
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
          
          <div className="drop-down">
            <span className="drop-down-btn">Catigories</span>
            <input type="checkbox" id="catigory-checked"/>
            <div className="drop-down-menu">
               <ul>
                <li><Link to="/Grain">Our Products</Link></li>
                <li><Link to="/Vegetables">Vegetables</Link></li>
               </ul>
            </div>
          </div>
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
            <Link to="/Vegetables">
              <span>Vegetables</span>
            </Link>
          </li>
          <li>
            <Link to="/Grain">
              <span>Product</span>
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