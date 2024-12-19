import React from "react";
import "./Product.css";

export default function Product({
  product,
  index,
  incrementQuantity,
  decrementQuantity,
}) {
  const showAlert = ()=>{
    if(product.quantity>0){
    window.alert("Order Confirmation Successful.");
    }
    else{
      window.alert("You need to select Atleast one Product.");
    }
  };
  return (
    <div className="row">
      <div className="Product-info">
        <img src={product.img} id="cart-img"></img>
        <div className="col-5">
          <h2>
            {product.name}
            <span className="price">₹{product.price}/kg</span>
          </h2>
        </div>
      </div>

      <div className="col-3">
        <button
          type="button"
          id="increment"
          onClick={() => incrementQuantity(index)}
        >
          +
        </button>
        <span>{product.quantity}</span>
        <button
          type="button"
          id="dicrement"
          onClick={() => decrementQuantity(index)}
        >
          -
        </button>
      </div>
      <div className="col-2">
        <span id="amount">Total amount ₹{product.quantity * product.price}</span>
        <button id="buy" onClick={showAlert}>Buy</button>
      </div>
      
    </div>
  );
}
