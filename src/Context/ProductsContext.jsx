import { createContext } from "react";
import useFetch from "../Hooks/useFetch";

export const ProductsContext=createContext()

export function ProductsContextProvider({children}){
    const {data,error,isLoading}=useFetch("https://fakestoreapi.in/api/products?limit=150")
    return <ProductsContext.Provider value={{data,error,isLoading}}>
        {children}
    </ProductsContext.Provider>
}