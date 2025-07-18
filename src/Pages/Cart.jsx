import { useContext,useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import CartProductCard from "../Components/CartProductCard";
import { Link } from "react-router-dom";
import CartImage from "../assets/cart.png"

export default function Cart() {
  const { cartData} = useContext(CartContext);
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
        <Bills data={cartData}/>
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

function Bills({data}){
  const [totalAmount,setTotalAmount]=useState(0)
  const [totalDiscount,setTotalDiscount]=useState(0)
  let deliveryCharge=25
  let handlingCharge=5
  useEffect(()=>{
    const totalAmount=data?.map(product=>product.price*product.quantity)?.reduce((acc,currentVal)=>{
      return acc+currentVal;
    },0)
    const totalDiscount=data?.map(product=>product.discount*product.quantity || 0)?.reduce((acc,currentVal)=>{
      return acc+currentVal;
    },0) 
   setTotalAmount(totalAmount)
  setTotalDiscount(totalDiscount)
  },[data])
  return <div className="bg-primary shadow-[6px_6px_12px_#c5c5c5] w-full md:w-1/2 min-h-52 p-3 rounded-xl">
            <h1 className="text-secondary font-semibold text-xl mb-3">Bill details</h1>
            <div className="bill-details">
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Items total</span> <span>${totalAmount}</span></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Delivery charge</span> <div><span className="line-through">${deliveryCharge}</span>  <span className="font-semibold text-red-500">Free</span></div></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Handling charge</span><span>${handlingCharge}</span></div>
                 <hr  className="text-gray-300 mt-2"/>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>GrandTotal</span> <span>${totalAmount+handlingCharge}</span></div>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Discount</span> <span>${totalDiscount}</span></div>
                 <hr  className="text-gray-300 mt-2"/>
                 <div className="flex justify-between text-lg  text-gray-500 items-center"> <span>Net Total</span> <span>${totalAmount+handlingCharge-totalDiscount}</span></div>
                 
            </div>
  </div>
}
