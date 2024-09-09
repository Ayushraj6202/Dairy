import { createReducer,createSlice } from "@reduxjs/toolkit";
import React, { act } from 'react'
import selleremail from "../../inf";
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
            // console.log("data de diya userdata me ",action.payload,selleremail);
            if(action.payload.email===selleremail){
                state.role='seller';
            }
            // console.log("store ",action.payload);
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