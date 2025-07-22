import { createSlice } from "@reduxjs/toolkit";
 const initialState=  JSON.parse(localStorage.getItem("guest")) || {products: []}
					
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
       addToCart:(state,action)=>{
        const existing = state.products.find(p => p.id === action.payload.id);
        const qty = action.payload.quantity || 1;
        if(existing){
          existing.quantity+=qty
        }
        else{
          state.products.push({...action.payload,quantity:qty})
        }
       },
       removeFromCart:(state,action)=>{
         state.products=state.products.filter(product=>product.id!=action.payload)
       },
       increaseQuantityByOne:(state,action)=>{
        state.products=state.products.map(product=>product.id===action.payload?{...product,quantity:product.quantity+1} :product)
       },
       decreaseQuantityByOne:(state,action)=>{
        state.products=state.products.map(product=>product.id===action.payload?{...product,quantity:product.quantity-1} :product)
       }
    }
})

export const{addToCart,removeFromCart,increaseQuantity,decreaseQuantityByOne,increaseQuantityByOne}=cartSlice.actions
export default cartSlice.reducer