import { createReducer,createSlice } from "@reduxjs/toolkit";
import React, { act } from 'react'

const initialState = {
    status:false,
    user:{},
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storelogin: (state,action) => {
            // console.log("data de diya userdata me ",action.payload);
            console.log("store ",action.payload.data);
            state.status = true;
            state.user = action.payload.data;
        },
        storelogout: (state) => {
            state.role = '';
            state.user = {};
        }
    }
})
export const { storelogin,storelogout } = authSlice.actions;
export default authSlice.reducer