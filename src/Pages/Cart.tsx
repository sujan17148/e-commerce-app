import {useEffect, useMemo, useState } from "react";
import CartProductCard from "../Components/CartProductCard";
import { Link } from "react-router-dom";
import CartImage from "../assets/cart.png"
import { useAppSelector } from "../Hooks/storeHook";
import { cartProps } from "../store/CartSlice";
import { Billing } from "../utility/Billing";

export default function Cart() {
  const cartData=useAppSelector(state=>state.cart.cart)
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (<>
    {cartData?.length<=0 ? <NoCartItems/>: 
    <div className="cart-page space-y-5 p-5 md:px-10">
      <h1 className="font-bold text-lg md:text-xl ">
        My Cart({cartData.length})
      </h1>
     <div className="w-full md:max-w-3/4 mx-auto space-y-5">
      { cartData.map((product) => (
          <CartProductCard key={product.id}
          id={product.id}
          />
        ))}
        <Bills/>
    </div>
     </div>
}
        </>
  );
}

function NoCartItems(){
  return <div className="w-full min-h-[80dvh] flex flex-col gap-5 items-center justify-center">
        <h1 className="text-secondary font-bold text-2xl md:text-4xl">Looks like your cart is empty.</h1>
        <img src={CartImage} alt="cart"  className="w-62 aspect-square object-cover"/>
        <Link to="/products" className="custom-button bg-accent" >Continue Shopping</Link>
  </div>
}

function Bills(){
  const data=useAppSelector(state=>state.cart.cart)
  const billings=useMemo(()=>new Billing(data),[data])
  return <div className="bg-primary shadow-[6px_6px_12px_#c5c5c5] w-full md:w-1/2 min-h-52 p-3 rounded-xl">
            <h1 className="text-secondary font-semibold text-xl mb-3">Bill details</h1>
            <div className="bill-details">
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Items total</span> <span>${billings.TotalAmount}</span></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Delivery charge</span> <div><span className="line-through">${billings.deliveryCharge}</span>  <span className="font-semibold text-red-500">Free</span></div></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Handling charge</span><span>${billings.handlingCharge}</span></div>
                 <hr  className="text-gray-300 mt-2"/>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>GrandTotal</span> <span>${billings.GrandTotal}</span></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Discount</span> <span>${billings.TotalDiscount}</span></div>
                 <hr  className="text-gray-300 mt-2"/>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Net Total</span> <span>${billings.NetTotal}</span></div>
                 
            </div>
  </div>
}
