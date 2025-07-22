import { NavLink, Link,useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  let location=useLocation()
  const totalCartItems=useSelector(state=>state.cart?.products?.length) || 0
  const [isMobileSearchVisible,setIsMobileSearchVisible]=useState(false)
  useEffect(()=>{
setIsMobileSearchVisible(false)
  },[location.search])
 
  return (
    <div className="navbar h-16 sticky top-0 left-0 z-10 text-black bg-primary shadow-xl flex justify-between items-center px-5 lg:px-10">
      <div className="top-left flex items-center gap-10">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Shop<span className="text-secondary">Craft</span>
          </h1>
        </Link>
        <ul className="links hidden lg:flex gap-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="top-right flex items-center gap-2.5 ">
                <div className=" relative mobile-searchbar sm:hidden ">
                <IoSearchSharp onClick={()=>setIsMobileSearchVisible(prev=>!prev)} className="flex items-center justify-center p-2 h-9 w-9 rounded-full hover:bg-accent hover:text-primary "/>
                  <div className={`searchbar-box absolute top-10 -right-5 z-5 ${isMobileSearchVisible? "" :"hidden"}`}>
                    <SearchBar/>
                  </div>
                </div>
           <div className="searchbar hidden sm:inline-block">
              <SearchBar />
           </div>
        <Link className="relative" to="/cart">
          <span className="totalcartItems absolute rounded-full bg-red-500 text-primary h-[22px] w-[22px]  flex items-center justify-center font-semibold top-0 right-0">{totalCartItems}</span>
          <FaCartShopping className="font-bold h-11 w-11 p-2 rounded-full hover:bg-secondary" />
        </Link>
        <div className="user hidden lg:flex items-center">
            {/* signed in state  */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* //signed out state  */}
          <SignedOut>
            <SignInButton className="p-2  bg-secondary outline-none text-primary font-semibold rounded hover:scale-105 transition duration-200 ease-linear" />
          </SignedOut>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
}
function MobileNavbar({ className }) {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  return (
    <div className="mobile-navbar-section relative">
      <HiMenuAlt3
        className="font-bold text-xl lg:hidden h-11 w-11 p-2 hover:bg-secondary rounded-full"
        onClick={() => setIsMenuHidden(false)}
      />
      <div
        className={`${
          isMenuHidden ? "hidden" : ""
        } absolute -top-2.5 -right-5 h-screen w-screen bg-primary text-black p-5`}
      >
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Shop<span className="text-secondary">Craft</span>
          </h1>
        </Link>
        <RxCross2
          className="h-11 w-11 p-2 font-semibold rounded-full hover:*:bg-secondary absolute top-3 right-2"
          onClick={() => setIsMenuHidden(true)}
        />
        <ul className="links space-y-2.5 mt-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-md font-semibold pb-1 hover:text-secondary ${
                  isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li><SignedIn>
            <UserButton />
          </SignedIn>

          {/* //signed out state  */}
          <SignedOut>
            <SignInButton className="p-2 bg-secondary text-primary font-semibold rounded hover:scale-105 transition duration-200 ease-linear" />
          </SignedOut></li>
        </ul>
      </div>
    </div>
  );
}
