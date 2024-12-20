import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import LoginForm from "./Components/LoginForm";
import MyCart from "./Components/MyCart";
import tomatoImg from "./Components/productImg/tomato.jfif";
import LehsunImg from "./Components/productImg/Lehsun.jfif";
import onionImg from "./Components/productImg/onion.jfif";
import peasImg from "./Components/productImg/Peas.jfif";
import potatoImg from "./Components/productImg/potato.jfif";
import greenCapsicumImg from "./Components/productImg/greenCapsicum.jfif";
import EggplantsImg from "./Components/productImg/Eggplants.jfif";
import CapsicumImg from "./Components/productImg/Capsicum.jfif";
import Futter from "./Components/Futter";
import HeroSection from "./Components/HeroSection";

function App() {
  const initialProductList = [
    { img: tomatoImg, price: 40, name: "Tomato", quantity: 0 },
    { img: LehsunImg, price: 50, name: "Garlic", quantity: 0 },
    { img: onionImg, price: 30, name: "Onion", quantity: 0 },
    { img: peasImg, price: 100, name: "Peas", quantity: 0 },
    { img: potatoImg, price: 40, name: "Potato", quantity: 0 },
    { img: greenCapsicumImg, price: 80, name: "Capsicum", quantity: 0 },
    { img: EggplantsImg, price: 45, name: "Eggplants", quantity: 0 },
    { img: CapsicumImg, price: 100, name: "Capsicum", quantity: 0 },
  ];

  const [productList, setProductList] = useState(initialProductList);
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState(1000);

  const incrementQuantity = (index) => {
    const updatedProductList = [...productList];
    updatedProductList[index].quantity++;
    setProductList(updatedProductList);
  };

  const decrementQuantity = (index) => {
    const updatedProductList = [...productList];
    if (updatedProductList[index].quantity > 0) {
      updatedProductList[index].quantity--;
    }
    setProductList(updatedProductList);
  };

  const addToCart = (index) => {
    const product = productList[index];
    const cartItemIndex = cart.findIndex((item) => item.name === product.name);
    if (cartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[cartItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleBuyNow = (index) => {
    const selectedProduct = productList[index];
    const totalCost = selectedProduct.quantity * selectedProduct.price;

    if (selectedProduct.quantity === 0) {
      alert("Please select at least one item.");
      return;
    }

    if (budget < totalCost) {
      alert("Insufficient budget to buy this product.");
      return;
    }

    const updatedCart = [...cart];
    const cartItem = updatedCart.find((item) => item.name === selectedProduct.name);

    if (cartItem) {
      cartItem.quantity += selectedProduct.quantity;
    } else {
      updatedCart.push({ ...selectedProduct });
    }

    setCart(updatedCart);
    setBudget((prevBudget) => prevBudget - totalCost);

    // Reset product quantity after adding to cart
    const updatedProductList = [...productList];
    updatedProductList[index].quantity = 0;
    setProductList(updatedProductList);
  };

  return (
    <>
      <Router>
        <Navbar />
        <HeroSection />
        <Routes>
          <Route path="Register" element={<LoginForm />} />
          <Route
            path="Product"
            element={
              <ProductList
                productList={productList}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                handleBuyNow={handleBuyNow}
              />
            }
          />
          <Route path="MyCart" element={<MyCart cart={cart} />} />
        </Routes>
        <Futter />
      </Router>
    </>
  );
}

export default App;
