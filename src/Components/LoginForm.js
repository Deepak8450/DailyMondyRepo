import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginForm.css";
import Capsimg from "./productImg/login-imgc.webp";

export default function LoginForm({ setUsername }) {
  const [result, setResult] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleClick = () => {
    setAnimate(true);
    // Reset animation after it's complete (400ms matches the CSS transition)
    setTimeout(() => setAnimate(false), 400);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name"); // Extract the username from the form

    setResult("Sending...");
    formData.append("access_key", "194686d3-4360-446e-bfc9-a7cbe39356e1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Registration Successfully..");
      setUsername(name); // Update username in App.js
      event.target.reset();
      handleClick();

      // Redirect to the home page after a delay (optional for UX)
      setTimeout(() => {
        navigate("/home"); // Redirect to the home page
      }, 1000); // Adjust delay as needed
    } else {
      console.log("Something went wrong", data);
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
          <input
            type="hidden"
            name="access_key"
            value="194686d3-4360-446e-bfc9-a7cbe39356e1"
          />
          <label htmlFor="username">Enter Full-Name</label>
          <input type="text" id="username" name="name" placeholder="Your full-name" required />
          <label htmlFor="number">Enter Mobile Number</label>
          <input type="text" id="number" name="Number" placeholder="Contact number.." required />
          <label htmlFor="address">Enter your Address</label>
          <input type="text" id="address" name="Address" placeholder="your address.." required />
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
      {result && <span>{result}</span>} {/* Show result only if it's not empty */}
    </div>
  );
}
