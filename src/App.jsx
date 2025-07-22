import { Outlet } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import { ProductsContextProvider } from "./Context/ProductsContext";
import { ToastContainer } from "react-toastify";
import {  useSelector } from "react-redux";
import useLocalStorage from "./Hooks/useLocalStorage";
import { useEffect } from "react";
function App() {
  const cartData = useSelector((state) => state.cart);
   const {setStorageData} =useLocalStorage("guest",{products:[]})
   useEffect(()=>{
      setStorageData(cartData)
   },[cartData])

  
  return (
      <ProductsContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
        {/* //toast  */}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          oldestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ProductsContextProvider>
  );
}
export default App;
