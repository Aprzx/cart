// src/components/CartPage.js
import React from "react";

function CartPage({ cart }) {
  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={`${item.title}-${index}`}>
              <img src={item.img} alt={item.title} width="50" />
              <span>{item.title}</span> - ${item.newPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;
