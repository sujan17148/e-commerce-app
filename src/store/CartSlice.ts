import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
export type productsProps={
   id:number,
   title:string,
   description:string,
   category:string,
   price:number,
   discountPercentage:number,
   rating:number,
   tags:string[],
   brand:string,
   images:string[]
}
export type cartProps={
  id:number,
  title:string,
  images:string[],
  quantity:number,
  price:number,
  discountPercentage:number  
}
type cartStateProps ={
  products:productsProps[],
  cart:cartProps[],
  categoryList:string[],
  error:boolean,
  loading:boolean
}

export const fetchProducts=createAsyncThunk("cart/fetchProducts",
  async()=>{
    const response= await fetch("https://dummyjson.com/products?limit=150")
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data= await response.json()
    return data.products
  }
)
export const fetchCategoryList=createAsyncThunk("cart/fetchCategoryList",
  async()=>{
    const response= await fetch('https://dummyjson.com/products/category-list')
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data= await response.json()
    return data
  }
)

 const initialState:cartStateProps=  {
  products:[],
  cart:[],
  categoryList:[],
  error:false,
  loading:false
 }
 					

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
       addToCart:(state,action:PayloadAction<cartProps>)=>{
        const item=state.cart.find(cartItem=>cartItem.id==action.payload.id)
         if(item){
          item.quantity+=action.payload.quantity
         }
         else{
          state.cart.push(action.payload)
         }
       },
       removeFromCart:(state,action:PayloadAction<number>)=>{
         state.cart=state.cart.filter(i=>i.id!==action.payload)
       },
       updateQuantity:(state,action:PayloadAction<{id:number,quantity:number}>)=>{
        const {id,quantity}=action.payload
        const item=state.cart.find(i=>i.id==id)
        if(item) item.quantity+=quantity
       },
       increaseQuantityByOne:(state,action:PayloadAction<number>)=>{
        const item=state.cart.find(i=>i.id==action.payload)
        if(item) item.quantity+=1
       },
       decreaseQuantityByOne:(state,action:PayloadAction<number>)=>{
        const item=state.cart.find(i=>i.id==action.payload)
        if(item){
          if(item.quantity===1){
            state.cart=state.cart.filter(i=>i.id!==action.payload) 
          }
          else {
            item.quantity-=1
          } 
        } 
       }
    },
    extraReducers:(builder)=>{
      builder.addCase(fetchProducts.fulfilled,(state,action:PayloadAction<productsProps[]>)=>{
        state.loading=false
        state.error=false
        state.products=action.payload
      }),
      builder.addCase(fetchProducts.pending,(state)=>{
        state.loading=true
        state.error=false
      }),
      builder.addCase(fetchProducts.rejected,(state)=>{
        state.loading=false
        state.error=true
      }),
      builder.addCase(fetchCategoryList.fulfilled,(state,action:PayloadAction<string[]>)=>{
        state.categoryList=action.payload
      })
    }
  
})
export const{addToCart,removeFromCart,updateQuantity,decreaseQuantityByOne,increaseQuantityByOne}=cartSlice.actions
export default cartSlice.reducer