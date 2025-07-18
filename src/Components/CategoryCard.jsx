import AddToCartButton from "./AddToCartButton"
export default function CategoryCard({details}){
 return <div className="bg-[#F3F4F6] rounded h-62 w-full sm:w-3/4 mx-auto my-5 p-3 flex gap-2.5 ">
       <img src={details.image} alt="product" className="h-1/2 my-auto md:h-full rounded-xl aspect-square"/>
       <div className="details flex flex-col justify-center">
         <h1 className="title font-bold line-clamp-3 my-1">{details.title}</h1>
         <div className="price-section font-semibold flex items-center my-2">$<span className="price text-2xl">{details.price}</span> <span className="discount font-medium">({Math.round((details.price-details.discount)/details.price)}% off)</span>
         {!!details?.onSale && <span className="on-sale  text-red-700 text-lg  h-fit p-2">Sale</span>}
         {!!details?.popular && <span className="popular text-red-700 text-lg  h-fit p-2">Popular</span>}
         </div>
         <AddToCartButton id={details.id} className="custom-button max-w-44 bg-accent"/>
       </div>
       
 </div>
}