import { createSlice } from '@reduxjs/toolkit'

const heightSlice = createSlice({
    name:"navheight",
    initialState : {
        value: 0,
    },
    reducers:{
        setheight : (state, action)=>{

            
            state.value = action.payload;
        }
    
    }


})


export const {setheight} = heightSlice.actions;

export default heightSlice.reducer;