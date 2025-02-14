import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseconfig";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import "./LoginForm.css";
import Capsimg from "./productImg/login-imgc.webp";

export default function LoginForm({ setUsername }) {
  const [result, setResult] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const number = formData.get("Number");
    const address = formData.get("Address");
    const location = formData.get("Location");

    setResult("Checking user...");

    // ✅ Check if user already exists in Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("number", "==", number));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setResult("User already registered, go to login page.");
      setTimeout(() => navigate("/Login"), 1500); // Redirect to login
      return;
    }

    setResult("Sending...");

    // ✅ Send data via email using Web3Forms
    formData.append("access_key", "194686d3-4360-446e-bfc9-a7cbe39356e1");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Registration Successfully..");
      setUsername(name);

      // ✅ Store user data in Firestore
      try {
        await addDoc(collection(db, "users"), {
          name,
          number,
          address,
          location,
          timestamp: Timestamp.fromDate(new Date()),
        });

        console.log("User added to Firestore successfully");
      } catch (error) {
        console.error("Error adding user to Firestore:", error);
        setResult("Error saving data to database.");
        return;
      }

      event.target.reset();
      handleClick();

      // ✅ Redirect to the verification page after a delay
      setTimeout(() => navigate("/verification"), 1000);
    } else {
      console.error("Something went wrong:", data);
      setResult(data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="poster">
        <img src={Capsimg} id="login-char" alt="" />
        <h2>WELCOME</h2>
        <p>
          Discover fresh and organic vegetables at your fingertips. Register now
          to explore a wide variety of farm-fresh produce delivered straight to
          your doorstep.
        </p>
      </div>
      <div className="form-elements">
        <form onSubmit={onSubmit}>
          <h2>Sign-up</h2>
          <label htmlFor="username">Enter Full-Name</label>
          <input type="text" id="username" name="name" placeholder="Your full-name" required />
          <label htmlFor="number">Enter Mobile Number</label>
          <input type="text" id="number" name="Number" placeholder="Contact number.." required />
          <label htmlFor="address">Enter your Address</label>
          <input type="text" id="address" name="Address" placeholder="Your address.." required />
          <label htmlFor="famous-loc">Nearest famous shop/mall</label>
          <input type="text" id="famous-loc" name="Location" placeholder="Nearest famous shop/mall" required />
          <button
            type="submit"
            className={`save-btn ${animate ? "animate" : ""}`}
            id="sign-up-btn"
            onClick={handleClick}
          >
            Save
            <i className="fa-solid fa-person-walking-arrow-right"></i>
          </button>
        </form>
      </div>
      {result && <span>{result}</span>}
    </div>
  );
}
