import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Login.css";

export default function Login() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const number = formData.get("Number");

    setResult("Verifying...");

    // ✅ Check Firestore for user
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("number", "==", number));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setResult("User not found. Please register first.");
      return;
    }

    setResult("Login Successfully!");
    setTimeout(() => navigate("/Grain"), 1500);
  };

  return (
    <div className="Form-container">
      <div className="Form-elements">
        <form onSubmit={onSubmit} className="form-componant">
          <h2>Login</h2>
          <label htmlFor="number">Enter Mobile Number</label>
          <input type="text" id="Number" name="Number" placeholder="Enter your registered number" required />
          <button type="submit" className="save-btn">
            Login
            <i className="fa-solid fa-person-walking-arrow-right"></i>
          </button>
        </form>
      </div>
      {result && <span>{result}</span>}
    </div>
  );
}
