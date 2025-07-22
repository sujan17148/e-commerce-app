import { useSelector,useDispatch } from "react-redux";
import { removeFromCart,increaseQuantityByOne,decreaseQuantityByOne } from "../Features/CartSlice";
import { IoAdd } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
export default function CartProductCard({id}){
    const dispatch=useDispatch()
    const cartData=useSelector(state=>state.cart.products)
    const product=cartData?.find(product=>product.id==id)   

      function  handleProductDelete(){
            dispatch(removeFromCart(id))
            toast.success("🗑️ Product removed from  cart.");
        }
        function addQuantity(){
            dispatch(increaseQuantityByOne(id))
            toast.success("🛒 Quantity updated!");
        }
        function reduceQuantity(){
            if(product.quantity==1) {
                handleProductDelete()
                return;
            }
            dispatch(decreaseQuantityByOne(id))
            toast.success("🛒 Quantity updated!");
        }
    return <div className="bg-[#F3F4F6] h-32 w-full flex items-center justify-between  p-2 md:p-5 gap-2.5">
        <div className="left-section flex items-center gap-2.5"><img src={product.image} alt="product" className="w-full max-w-24 aspect-square rounded-xl"/>
        <div>
            <p className="title line-clamp-2 text-lg font-normal">{product.title}</p>
            <span className="price text-red-500 font-semibold">${product.price}</span>
        </div></div>
        <div className=" right-section flex gap-2.5 md:gap-5 items-center">
        <div className="button bg-accent rounded font-semibold text-primary p-2 px-4 flex gap-2 items-center">
            <RiSubtractLine  className="text-white text-lg" onClick={()=>reduceQuantity(product.id)}/>
            {product.quantity}
            <IoAdd className="text-white text-lg" onClick={()=>addQuantity(product.id)} />
        </div>
      <MdDelete onClick={()=>handleProductDelete(product.id)} className="text-2xl text-red-600 hover:scale-110 transition duration-300 ease-linear"/>
        </div>
    </div>
}