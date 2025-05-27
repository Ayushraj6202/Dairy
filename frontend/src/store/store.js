import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authslice.js'

const store = configureStore({
    reducer: {
        auth: authReducer
        // other reducers
    }
})
export default store;