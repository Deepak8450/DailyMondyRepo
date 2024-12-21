import React, { useState } from "react";
import "./LoginForm.css";
import Capsimg from "./productImg/login-imgc.webp";

export default function LoginForm({ setUsername }) {
  const [result, setResult] = useState("");

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
      setResult("Order Send Successfully..");
      setUsername(name); // Update username in App.js
      event.target.reset();
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
          <input type="hidden" name="access_key" value="194686d3-4360-446e-bfc9-a7cbe39356e1" />
          <label htmlFor="username">Enter Full-Name</label>
          <input type="text" id="username" name="name" required />
          <label htmlFor="number">Enter Mobile Number</label>
          <input type="text" id="number" name="Number" required />
          <label htmlFor="address">Enter your Address</label>
          <input type="text" id="address" name="Address" required />
          <label htmlFor="famous-loc">Nearest famous shop/mall</label>
          <input type="text" id="famous-loc" name="Location" required />
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
      {result && <span>{result}</span>} {/* Show result only if it's not empty */}
    </div>
  );
}
