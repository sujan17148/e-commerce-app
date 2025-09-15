import { useParams } from "react-router-dom";
import { useState } from "react";
import AddToCartButton from "../Components/AddToCartButton"
import { useAppSelector } from "../Hooks/storeHook";

export default function ProductDetails() {
  const { products, error, loading } = useAppSelector(state=>state.cart)
  let { productId } = useParams();
  const [quantity,setQuantity]=useState(1)
  const requiredProduct=products.find(i=>i.id===Number(productId))
  return requiredProduct && (
        <div className="p-5 md:px-10 h-fit">
          <h1 className="font-bold text-lg md:text-xl my-10">
            Home/Products/Details/{requiredProduct.title}
          </h1>
          <div className="product-section md:flex  gap-2.5 mx-auto  w-[90%]">
            <div className="left-section md:w-1/2 ">
            <img src={requiredProduct.images[0]} alt="product" className="w-full max-w-lg md:max-w-xl" />
            </div>
            <div className="right-section md:w-1/2 my-auto">
              <h1 className="title font-bold text-lg md:text-xl">
                {requiredProduct.title}
              </h1>
              <span>Rate:<span className="ml-1 line-through">${requiredProduct.price}</span></span>
              <span className="text-red-500 mx-3">{requiredProduct.discountPercentage}% off</span>
              <p className="description text-gray-600">{requiredProduct.description}</p>
                <div className="cart mt-3 mb-5 space-x-2">
                  <span>Quantity:</span>
                  <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} className="outline-none bg-secondary text-primary px-2 text-center py-2 rounded max-w-16 "/>
                </div>
                <AddToCartButton  id={requiredProduct.id} quantity={quantity} className="py-3  inline-block w-44"/>
            </div>
          </div>
        </div>
      )
}
