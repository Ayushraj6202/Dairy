import { createReducer,createSlice } from "@reduxjs/toolkit";
import React, { act } from 'react'

const initialState = {
    role:'user',
    status:false,
    user:{},
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storelogin: (state,action) => {
            // console.log("data de diya userdata me ",action.payload,import.meta.env.VITE_SELLER_EMAIL);
            if(action.payload.email==="ammanrajkumar96082@gmail.com"){
                state.role='seller';
                // console.log("seller");
            }
            // console.log("store ",action.payload,state.role);
            state.status = true;
            state.user = action.payload;
        },
        storelogout: (state) => {
            state.status = false;
            state.user = {};
            state.role='user';
        }
    }
})
export const { storelogin,storelogout } = authSlice.actions;
export default authSlice.reducer