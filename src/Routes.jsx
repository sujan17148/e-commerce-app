import { createBrowserRouter, createRoutesFromElements, Route, Navigate,Outlet } from  "react-router-dom";
import App from "./App"
import Home from "./Pages/Home"
import Products from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails";
import About from "./Pages/About"
import Cart from "./Pages/Cart"
import Search from "./Pages/Search"
import NotFound from "./Pages/NotFound";
import Category from "./Pages/Category";
import { useUser} from "@clerk/clerk-react";

export const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<App/>}>
        <Route path="" element={<Home/>}/>
        <Route path="products/details/:productId" element={<ProductDetails/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="category/:productCategory"  element={<Category/>}/>
        <Route path="about" element={<About/>}/>
         <Route element={<ProtectedRoute/>}>
        <Route path="cart" element={<Cart/>}/>
         </Route>
    </Route>
    <Route path="*" element={<NotFound/>}/>
    </>
))

//Protectd Routes
function ProtectedRoute(){
    let currentUser;
    const {user}=useUser()
    if(user && user!={}){
      currentUser=true
    }else{
        currentUser=null
    }
    return currentUser? <Outlet/>:<Navigate to="/" replace/>
}