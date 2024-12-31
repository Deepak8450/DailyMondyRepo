import React from "react";
import "./Grain.css";

export default function Grain({
  grains,
  index,
  incrementGrainQuantity,
  decrementGrainQuantity,
  handleBuyGrain,
}) {
  return (
    <div className="grain-container">
      <h1>Available Grains</h1>
      <div className="grain-list">
        {grains.map((grain, index) => (
          <div key={index} className="grain-item">
            <img src={grain.image} alt={grain.name} className="grain-img" />
            <h3>{grain.name}</h3>
            <p>Price: ₹{grain.price * grain.quantity}</p>
            <div className="col-9">
              <button
                type="button"
                id="incrBtn"
                onClick={() => incrementGrainQuantity(index)}
              >
                +
              </button>
              <span>{grain.quantity}</span>
              <button
                type="button"
                id="dicreBtn"
                onClick={() => decrementGrainQuantity(index)}
              >
                -
              </button>
            </div>
            <button className="buy-btn" onClick={() => handleBuyGrain(index)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
