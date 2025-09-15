import { Outlet } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./Hooks/storeHook";
import { useEffect } from "react";
import { fetchCategoryList, fetchProducts } from "./store/CartSlice";
import Loader from "./Components/Loader";
import Error from "./Pages/Error";
function App() {
  const dispatch=useAppDispatch()
  const {loading,error,products} = useAppSelector((state) => state.cart);
  useEffect(()=>{
     dispatch(fetchProducts())
     dispatch(fetchCategoryList())
  },[])
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
          toastClassName="max-w-[90%] m-1 "
        />
      </>
  );
}
export default App;
