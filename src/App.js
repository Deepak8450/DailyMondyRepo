import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import tomatoImg from "./Components/productImg/tomato.jfif";
import LehsunImg from "./Components/productImg/Lehsun.jfif";
import onionImg from "./Components/productImg/onion.jfif";
import peasImg from "./Components/productImg/Peas.jfif";
import potatoImg from "./Components/productImg/potato.jfif";

function App() {
  const initialProductList = [
    {img:tomatoImg, price: 40, name: "Tomato", quantity: 0 },
    {img:LehsunImg, price: 50, name: "Lehsun", quantity: 0 },
    {img:onionImg, price: 30, name: "Onion", quantity: 0 },
    {img:peasImg, price: 100, name: "Peas", quantity: 0 },
    {img:potatoImg, price: 40, name: "Patato", quantity: 0 },

  ];

  const [productList, setProductList] = useState(initialProductList);

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

  return (
    <>
      <Navbar />
      <main className="container">
        <ProductList
          productList={productList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </main>
    </>
  );
}

export default App;
