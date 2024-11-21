import { configureStore } from "@reduxjs/toolkit";
import heightReducer from './slice/heightSlice'



export const store = configureStore({
    reducer:{
        navheight:heightReducer,
    }
})