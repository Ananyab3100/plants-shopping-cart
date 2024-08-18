"use client"
import toast from 'react-hot-toast';

const { createContext, useContext, useState } = require("react");

const CartContext = createContext();

//hook
export const useCart =() => useContext(CartContext);

export const CartProvider = ({children})=>{

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [discount, setDiscount] = useState({ type: null, value: 0 });

    const addToCart = (product) =>{
     setCart((prevCart) =>{
     const existingProduct = prevCart.find((item) => item.id == product.id);

     if(existingProduct){
        return(
        prevCart.map((item) => item.id == product.id ? {...item , quantity: item.quantity + 1} : item)
        )
        
     }

     return [...prevCart,{...product, quantity :1}];

     });
     toast.success("Item added to the cart!" ,{
        duration: 2000,
     });
     setIsCartOpen(true);
    }

    const removeFromCart = (product) =>{
        setCart((prevCart) => prevCart.filter((item) => item.id != product.id ));
        toast.error("Item removed from the cart.", {
            duration: 2000, // Duration in milliseconds
          });
        
    }

    const clearCart = () => {
        setCart([]);
        toast("Cart has been cleared.", {
            duration: 2000, // Duration in milliseconds
          });
    }
   

    const getTotalPrice = () =>{
        const totalprice =cart.reduce((total,item) => total + item.price * item.quantity,0)
          
         if(discount.type === "fixed"){
            return Math.max(totalprice - discount.value, 0); // Ensure price doesn’t go below $0
          } else if (discount.type === "percentage") {
            return totalprice - totalprice * (discount.value / 100);
          }

         return totalprice;
    }

    const applyDiscount = (type, value) => {
        if (type === "fixed" || type === "percentage") {
          setDiscount({ type, value });
          toast.success("Discount applied of $10.", {
            duration: 2000, // Duration in milliseconds
          });
        } else {
          toast.success("Invalid coupon", {
            duration: 2000, // Duration in milliseconds
          });
        }
    };

    return(
        <>
        <CartContext.Provider value ={{cart,setCart, isCartOpen,setIsCartOpen, addToCart, removeFromCart,clearCart ,getTotalPrice,discount, applyDiscount}}>
         {children}
        </CartContext.Provider>
        </>
    )
 

}
