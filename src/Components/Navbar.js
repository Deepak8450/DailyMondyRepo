import React, { useState,useEffect } from "react";
import "./Navbar.css";
import Dmlogo from "./productImg/pixelcut-export.png";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

export default function Navbar({ username }) {
  const [user, setUser] = useState(null); // Tracks whether the user is logged in
  const auth = getAuth();
  useEffect(() => {
    const fetchUserName = async (uid) => {
      if (!uid) return;

      try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data().name); // Firestore se "name" fetch karo
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Firebase Auth se user ka UID lena
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserName(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);
  
  // Example of setting the user's name (Replace with actual login logic)
  const [menuOpen , setMenuOpen] = useState(false);

  const handleMenuToggle = () =>{
    setMenuOpen(!menuOpen);
  };
   const handleMenuItemClick =() =>{
    setMenuOpen(false);
   };

  return (
    <div className="header">
      <nav>
        <div className="logo">
          <img src={Dmlogo} className="dm-logo"/>
          <span id="logo-name"><span className="text-[orange]" id="daily">Daily</span>Mandi</span>
        </div>
      </nav>
      <div className="services">
        {/* Conditionally render Register or Profile */}
        {user ? (
          
          <li>
            <button id="Profile">
              <Link to="/Profile">{username ? username : "Guest"}</Link>
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
          <Link to="/home">
            <span>Home</span>
          </Link>
        </li>
        <li>
          
          <div className="drop-down">
            <span className="drop-down-btn">Catigories</span>
            <input type="checkbox" id="catigory-checked" checked={menuOpen} onChange={handleMenuToggle}/>
            <div className="drop-down-menu">
               <ul>
                <li onClick={handleMenuItemClick}><Link to="/Grain">Our Products</Link></li>
                <li onClick={handleMenuItemClick}><Link to="/Vegetables">Vegetables</Link></li>
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
        <li>
          <Link to="/Rate">
            <span>Rate-us</span>
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
        <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle}></input>
        <div className="hamburger-lines">
          <span id="line1"></span>
          <span id="line2"></span>
          <span id="line3"></span>
        </div>
        <div className="menu-items">
        <li onClick={handleMenuItemClick}>
            <Link to="/home">
              <span>Home</span>
            </Link>
          </li>
         <li onClick={handleMenuItemClick}>
            <Link to="/Grain">
              <span>Product</span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <Link to="/Vegetables">
              <span>Vegetables</span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <button id="Register">
              <Link to="/Register">Register</Link>
            </button>
          </li>
          
        
          <li onClick={handleMenuItemClick}>
            <Link to="/MyCart">
              <span>MyCart</span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <Link to="/Profile">
              <span>
                <i class="fa-regular fa-user"></i>
                {username ? username : "Guest"}
              </span>
            </Link>
          </li>
          <li onClick={handleMenuItemClick}>
            <Link to="/Rate">
              <span>Rate-us</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
    
  );
}
