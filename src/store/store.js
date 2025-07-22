import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/CartSlice"

export const store =configureStore({
    reducer:{
        cart:cartReducer
    }
})