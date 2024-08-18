"use client"

import { useCart } from '@/context/CartContext'
import React from 'react'
import { useState } from 'react'

const CartSidebar = ({ closeSidebar }) => {
const {cart, setCart, addToCart, removeFromCart,clearCart,getTotalPrice,discount, applyDiscount} = useCart();

const [discountCode, setDiscountCode] = useState("");

const handleApplyDiscount = () => {
    // Example logic for applying discounts based on a code
    if (discountCode === "SAVE10") {
      applyDiscount("fixed", 10); // $10 off
    } else if (discountCode === "PERCENT10") {
      applyDiscount("percentage", 10); // 10% off
    } else {
        toast("Invalid coupon.", {
            duration: 2000, // Duration in milliseconds
          });
    }
  };

const handleDecrement = (item) =>{
    if (item.quantity == 1) {
        removeFromCart(item); // Decrease quantity if it's greater than 1
    }
    else{
    setCart((prevCart) => prevCart.map((cartItem) => cartItem.id == item.id ? {...cartItem, quantity: cartItem.quantity -1} : cartItem))
    }

    
}

const handleIncrement = (item) =>{
setCart((prevCart) => prevCart.map((cartItem) => cartItem.id == item.id ? {...cartItem, quantity : cartItem.quantity + 1} : cartItem)
)
}

  return (
    
      
    <>
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 transition-transform transform">
      <button className="text-gray-500 " onClick={closeSidebar}>✖</button>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-900 text-sm">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="font-medium text-gray-900 text-xs">${item.price}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Quantity
                  </p>

                  <div className="flex ">
                  <button
                      onClick={() => handleDecrement(item)}
                      className="px-2 py-0.5 bg-cyan-50 rounded text-gray-700 font-semibold"
                    >
                      -
                    </button>
                    <p className="px-2 py-0.5 text-sm text-gray-600 font-semibold">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-2 py-0.5 bg-cyan-50 rounded text-gray-700 font-semibold"
                    >
                      +
                    </button>
                    </div>

                </div>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

       {/* Discount Code Section */}
       {cart.length > 0 && (
          <div>
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="p-2 border rounded w-full mb-2 text-gray-800 text-sm"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-cyan-200 text-sm text-gray-600 p-2 w-full rounded font-semibold mb-4 hover:border-teal-200 hover:border-2 hover:bg-white"
            >
              Apply Discount
            </button>
          </div>
        )}


      {cart.length > 0 && (
        
        <div>
        <div className="bg-cyan-50 text-gray-900 p-2 mt-4 w-full  font-semibold flex justify-between">
           <div>Total</div>
           <div>$ {getTotalPrice().toFixed(2)}</div>
            </div>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white p-2 mt-4 w-full rounded font-semibold hover:border-2 hover:border-red-500 hover:bg-white hover:text-red-500"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
    </>
    
  )
}

export default CartSidebar
