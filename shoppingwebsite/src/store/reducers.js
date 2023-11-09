import {  createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    cartItems:[],
    subTotal:0,
    shipping:0,
    tax:0,
    total:0,
    flag : false,
}


export const accountSlice = createSlice(
    {
        name:'cart',
        initialState,
        reducers:{
            addToCart: (state, action) => {
                const item = action.payload;
                const isItemExist = state.cartItems.find((i) => i.id === item.id);
                if (isItemExist) {
                  state.cartItems.forEach((i) => {
                    if (i.id === item.id) i.quantity += 1;
                  });
                } else {
                  state.cartItems.push(item);
                }
              },
            increment: (state, action) => {
                  state.cartItems.forEach((i) => {
                    if (i.id === action.payload) i.quantity += 1;
                  });
              },
              decrement:(state,action)=>{
                const item=state.cartItems.find((i)=>i.id===action.payload);
                if(item.quantity>1)
                {
                    state.cartItems.forEach((i)=>{
                        if(i.id===item.id)
                            i.quantity-=1;
                    })
                }
            },
            deleteFromCart: (state, action) => {
                state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            },
            setLogout: (state, action) => {
                state.flag = action.payload;
            },
            calculatePrice: (state) => {
                let sum = 0;
                state.cartItems.forEach((i) => (sum += i.price * i.quantity));
                state.subTotal = sum;
                state.shipping = state.subTotal > 1000 ? 0 : 200;
                state.tax = +(state.subTotal * 0.18).toFixed();
                state.total = (state.subTotal + state.tax + state.shipping).toFixed();
            },
        }, 
    }
)
// Action creators are generated for each case reducer function
export const {addToCart,increment, deleteFromCart, decrement , calculatePrice, setLogout } = accountSlice.actions;


export default accountSlice.reducer;