"use client"
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import { useCart } from '@/context/CartContext';

const Nav = () => {
  
  const {cart,getTotalPrice,isCartOpen, setIsCartOpen} = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <>
    <div>
      <nav className= "bg-emerald-500 min-h-12 text-white flex justify-around items-center w-screen">
        
        <a>
					<div className= " ">
						<p className="">
							PLANTS <span className='text-green-800 text-xl'>☘</span>
						</p>
					</div>
			</a>
    
        
      <div className="flex gap-x-2 cursor-pointer items-center">
      
				<span className="text-xl " onClick={toggleCart} >🛒</span>
       
        <p>${getTotalPrice().toFixed(2)}</p>
			</div>
    
      {isCartOpen && <CartSidebar closeSidebar={toggleCart} />}
      </nav>
    </div>
    </>
  )
}

export default Nav
