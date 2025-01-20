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
import Rice from "./Components/productImg/rice.jpg";
import Wheat from "./Components/productImg/Wheat.jpg";
import corn from "./Components/productImg/corn.jpg";
import Rice2 from "./Components/productImg/rice2.jpg";
import Urad from "./Components/productImg/Urad.jpeg";
import Rahar from "./Components/productImg/Rahar.jpeg";
import Moong from "./Components/productImg/Moong.jpeg";
import Chana from "./Components/productImg/Chana.jpeg";

import Futter from "./Components/Futter";
import HeroSection from "./Components/HeroSection";
import UserProfile from "./Components/UserProfile";
import Grain from "./Components/Grain";
{/*Grain pictures import */};
function App() {
  // grain data
  const [grainData, setGrainData] = useState( [
    {
      name: "Rice",
      price: 40,
      image: Rice,
      quantity: 5
    },
    {
      name: "Wheat",
      price: 50,
      image: Wheat,
      quantity: 5
    },
    {
      name: "Barley",
      price: 35,
      image: corn,
      quantity: 5
    },
    {
      name: "Rice",
      price: 35,
      image: Rice2,
      quantity: 5
    },
    {
      name: "Urad Dal",
      price: 60,
      image: Urad,
      quantity: 5
    },
    {
      name: "Moong Dal",
      price: 108,
      image: Moong,
      quantity: 5
    },
    {
      name: "Rahar dal",
      price: 85,
      image: Rahar,
      quantity: 5
    },
    {
      name: "Chana dal",
      price: 70,
      image: Chana,
      quantity: 5
    },
  ]);

  const incrementGrainQuantity =(index) =>{
    const updatedGrains = grainData.map((grain, i)=>
    i === index  ? {...grain, quantity: grain.quantity +1} : grain );
    setGrainData(updatedGrains);
    };
    const decrementGrainQuantity = (index) => {
      const updatedGrains = grainData.map((grain, i) =>
        i === index && grain.quantity > 0 // Only decrement if quantity is greater than 0
          ? { ...grain, quantity: grain.quantity - 1 }
          : grain
      );
      setGrainData(updatedGrains);
    };
    

// function perform
  
  const [username, setUsername] = useState(null);
  const initialProductList = [
    { img: tomatoImg, price: 40, name: "Tomato", quantity: 0 },
    { img: LehsunImg, price: 280, name: "Garlic", quantity: 0 },
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
 const handleBuyGrain = (index) => {
  const selectedGrain = grainData[index];
  if(selectedGrain.quantity <5){
    alert("Minimum Quantity is 5 to proceed with the purchase.");
    return;
  }

  setCart((prevCart)=> [...prevCart, selectedGrain]);
  alert(`${selectedGrain.name} added to your cart!`);

 }
  return (
    <>
      <Router>
        <Navbar username={username}/>
    
        <Routes>
        <Route path="DailyMondyRepo" element={<HeroSection/>} />
        <Route path="Profile" element={<UserProfile username={username} cart={cart}/>} />
          <Route path="Register" element={<LoginForm setUsername={setUsername}/>} />
          <Route
            path="Vegetables"
            element={
              <ProductList
                productList={productList}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                handleBuyNow={handleBuyNow}
              />
            }
          />
          <Route path="Grain" element={<Grain grains={grainData} incrementGrainQuantity={incrementGrainQuantity} decrementGrainQuantity={decrementGrainQuantity} handleBuyGrain={handleBuyGrain}/>}
         />
          <Route path="MyCart" element={<MyCart cart={cart} grains={grainData} username={username}/>} />
        </Routes>
        <Futter />
      </Router>
    </>
  );
};
export default App;
