"use client";
import React from 'react';
import Link from 'next/link';
import allProducts from '../data/products.json';
import { useCart } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';


const Card = () => {
   const {addToCart} = useCart();

  return (
    <div className="container">
    <h2 className="font-bold text-lg mt-7 ml-20">
       All Products 
       <span text-xl font-bold>🌿</span>
    </h2>
    <div className="mx-20 my-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
       {allProducts.map((product) => {
          return (
             <div className="" key={product.id}>
                
                <Link href={`/productDetails/${product.id}`}>
                <div className="bg-white flex h-50 w-full justify-center items-center rounded cursor-pointer">
                  <img
                    className="text-center p-4 "
                    src={product.image.url}
                    alt={product.name}
                  />
                </div>
              </Link>
                
             
             <div className="">
                <h3 className="font-bold m-2">{product.name}</h3>
                <p className="text-sm m-2">${product.price}</p>
                <button className="bg-emerald-500 p-3 cursor-pointer text-sm m-2 rounded text-white font-semibold hover:border-2 hover:border-emerald-500 hover:bg-white hover:text-emerald-500" 
                onClick={() => addToCart(product)}>Add to cart 🛒</button>
             </div>

          </div>
          );
       })}
    </div>
    </div>
    
 </div>
  )
}

export default Card
