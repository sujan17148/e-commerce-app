import AddToCartButton from "./AddToCartButton"
import { type productsProps } from "../store/CartSlice";
export default function CategoryCard({title,images,id,price,discountPercentage}:productsProps){
 return <div className="bg-[#F3F4F6] rounded h-62 w-full sm:w-3/4 mx-auto my-5 p-3 flex gap-2.5 ">
       <img src={images[0]} alt="product" className="h-1/2 my-auto md:h-full rounded-xl aspect-square"/>
       <div className="details flex flex-col justify-center">
         <h1 className="title font-bold line-clamp-3 my-1">{title}</h1>
         <div className="price-section font-semibold flex items-center my-2 gap-2">$<span className="price text-2xl">{price}</span>
          <span className="discount text-sm text-red-500">{discountPercentage}% off</span>
         </div>
         <AddToCartButton id={id} className="custom-button max-w-44 bg-accent"/>
       </div>
       
 </div>
}