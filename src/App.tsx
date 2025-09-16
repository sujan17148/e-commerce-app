import { Outlet } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./Hooks/storeHook";
import { useEffect,useRef } from "react";
import { cartProps, fetchCategoryList, fetchProducts, hydrateCart } from "./store/CartSlice";
import Loader from "./Components/Loader";
import Error from "./Pages/Error";
function App() {
  const dispatch=useAppDispatch()
  const isHydrated=useRef(false)
  const {loading,error,cart} = useAppSelector((state) => state.cart);
  useEffect(()=>{
     dispatch(fetchProducts())
     dispatch(fetchCategoryList())
  },[])
useEffect(()=>{
  const cartdata:cartProps[] =JSON.parse(localStorage.getItem("guest") ||"[]")
   dispatch(hydrateCart(cartdata))
   isHydrated.current=true
},[])
  useEffect(()=>{
  if(!isHydrated.current) return;
    localStorage.setItem("guest",JSON.stringify(cart))
  },[cart])
  if(loading) return <Loader className="h-screen w-full"/>
  if(error) return <Error/>
  return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="max-w-[80%] m-2"
        />
      </>
  );
}
export default App;
