import React, { useState } from "react";
import "./UserProfile.css";

export default function UserProfile({ username, cart }) {
const [profilePic, setProfilePic] = useState(null);
const [editing, setEditing] = useState(false);
const [imageSelected, setImageSelected] = useState(false); // New state to track image selection

const handleEditToggle = () => {
  setEditing(true);
  setImageSelected(false); // Reset image selection on edit toggle
};

const handleSave = () => {
  setEditing(false);
  setImageSelected(false); // Reset state after saving
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePic(e.target.result);
      setImageSelected(true); // Set image as selected when file is loaded
    };
    reader.readAsDataURL(file);
  }
};

return (
  <div className="user-profile">
    <div className="profile-header">
      <h1>Hello {username}</h1>
    </div>

    <div className="profile-section">
      <div className="profile-pic">
        <img
          src={
            profilePic ||
            "https://via.placeholder.com/150?text=Profile+Picture"
          }
          alt="Profile"
        />
        {editing && (
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
        )}
      </div>

      <div className="profile-info">
        <h2>{username || "Guest"}</h2>
        {!imageSelected ? (
          <button className="edit-btn" onClick={handleEditToggle}>
            Edit
          </button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>

    <div className="shopping-summary">
      <h2>Shopping Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};
