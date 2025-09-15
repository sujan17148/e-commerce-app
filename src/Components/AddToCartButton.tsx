import { useDispatch } from "react-redux";
import { addToCart,} from "../store/CartSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useAppSelector } from "../Hooks/storeHook";

type addToCartButtonProps={
  id:number,
  quantity?:number,
  className?:string
}

export default function AddToCartButton({ id, quantity=1, className = "" }:addToCartButtonProps) {
  let dispatch=useDispatch()
  const {loading,error,cart:cartData,products}=useAppSelector(state=>state.cart)
  let {user}=useUser()
  function addtoCart(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if(!user || !user.id){
      toast.warn("🔒 Please log in to add products to your cart.");
      return;
    }
    if (loading || error) return;
    const product = products.find(i => i.id == id);
    if (!product || quantity<=0){
      toast.warn("⚠️ Please select a valid quantity before adding.");
      return;
    }
 const alreadyInCart=cartData?.some(i=>i.id==id)
    if (alreadyInCart) {
      toast.info("Product is already in the cart — quantity updated.");
    } else {
      toast.success("🎉 Product added to cart!");
    }
    dispatch(addToCart({
        id: product.id,
        title: product.title,
        images: product.images,
        quantity: quantity,
        price: product.price,
        discountPercentage:product.discountPercentage || 0,
      }))
  }
  return (
    <button
      onClick={addtoCart}
      className={`${className} rounded text-sm px-2 p-1 text-primary  font-semibold whitespace-nowrap bg-accent`}
    >
      Add To Cart
    </button>
  );
}
