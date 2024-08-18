"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import allProducts from '../../../data/products.json';
import { useCart } from '@/context/CartContext';

const ProductDetails = () => {
  const {addToCart} = useCart();
  const { id } = useParams(); // Get the dynamic product ID from the URL

  // Since `useParams()` returns the ID as a string, make sure you handle it correctly
  const product = allProducts.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className="flex items-center md:gap-12 sm:p-6 md:p-40">
        <div className ="w-full flex justify-center h-50 md:basis-2/4 h-96 bg-white  md:p-20 sm:p-10">
          <img className="object-fit"  src={product.image.url} alt={product.name} />
        </div>
        <div className = "ml-3">
          <h3 className ="font-bold md:text-3xl sm:text-xl">{product.name}</h3>
          <p className="md:text-xl sm:text-lg font-semibold">${product.price}</p>
          <p className ="md:text-md sm:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At impedit
            voluptatum vitae labore molestiae, maiores, hic ad officiis
            laudantium in officia, nam vel quod! Nesciunt aperiam explicabo
            facere laboriosam eius.
          </p>
          <button className="bg-emerald-500 p-3 cursor-pointer sm:text-sm md:text-lg m-2 rounded text-white font-semibold"
          onClick={() => addToCart(product)}>
            Add to cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
