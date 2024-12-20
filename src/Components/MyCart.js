import React from "react";
import "./MyCart.css";

export default function MyCart({ cart }) {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0); 
    const totalAmount = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="mycart-container">
      <h1 className="mycart-header">MyCart</h1>
      {cart.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.quantity * item.price}</p>
              </div>
            </div>
          ))}
          <h2 className="total-amount">Total Amount: ₹{totalAmount}</h2>
        </div>
      )}

<div className="cart-summary">
  <h3>Cart Summary</h3>
  {cart.map((item, index) => (
    <div key={index} className="summary-item">
      
      <input type="hidden" name="access_key" value="194686d3-4360-446e-bfc9-a7cbe39356e1" />
      <input type="text" value={item.name} name="Items" className="readonly-item-name" />
      <input
        type="text"
        value={`Total Quantity: ${item.quantity}`}
        readOnly
        name="Quantity"
        className="readonly-input"
      />
    </div>
  ))}

  <div className="total-summary">
    <label>Total Products:</label>
    <input
      type="text"
      value={cart.length}
      readOnly
      className="readonly-input"
    />
    <label>Total Quantity:</label>
    <input
      type="text"
      value={totalQuantity}
      readOnly
      className="readonly-input"
    />
  </div>
</div>

    </div>
  );
}
