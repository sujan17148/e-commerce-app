import { useContext, } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { useDispatch,useSelector } from "react-redux";
import { addToCart,increaseQuantity } from "../Features/CartSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export default function AddToCartButton({ id, quantity = 1, className = "" }) {
  let dispatch=useDispatch()
  let cartData=useSelector(state=>state.cart.products)
  let {user}=useUser()
  const { data, error, isLoading } = useContext(ProductsContext);
  function addtoCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!user || !user.id){
      toast.warn("🔒 Please log in to add products to your cart.");
      return;
    }
    if (isLoading || error) return;
    const product = data?.products.find(product => product.id == id);
    if (!product || product.quantity<=0 || quantity<=0){
      toast.warn("⚠️ Please select a valid quantity before adding.");
      return;
    }
 const alreadyInCart=cartData?.some(product=>product.id==id)
    if (alreadyInCart) {
      toast.info("Product is already in the cart — quantity updated.");
    } else {
      toast.success("🎉 Product added to cart!");
    }
    dispatch(addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        quantity: quantity,
        price: product.price,
        discount:product.discount || 0,
      }))
  }
  return (
    <button
      onClick={(e) => addtoCart(e)}
      className={`${className} rounded text-sm px-2 p-1 text-primary  font-semibold whitespace-nowrap bg-accent`}
    >
      Add To Cart
    </button>
  );
}
