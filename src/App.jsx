import { Outlet } from "react-router-dom"
import Navbar from "./Components/Header/Navbar"
import Footer from "./Components/Footer/Footer"
import { ClerkProvider } from '@clerk/clerk-react'
import {ProductsContextProvider} from "./Context/ProductsContext"
import CartContextProvider from "./Context/CartContext"

import { ToastContainer } from "react-toastify"

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ProductsContextProvider>
     <CartContextProvider>
      <Navbar/>
      <Outlet/>
      <Footer/>
   {/* //toast  */}
      <ToastContainer
position="bottom-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
     </CartContextProvider>
      </ProductsContextProvider>
    </ClerkProvider>
  )
}
export default App
