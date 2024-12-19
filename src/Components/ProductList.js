import React from 'react';
import Product from './Product';

export default function ProductList({ productList, incrementQuantity, decrementQuantity }) {
  return (
    <div>
      {productList.map((product, index) => (
        <Product
          key={index}
          product={product}
          index={index}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      ))}
    </div>
  );
}
