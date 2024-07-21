import {createSlice} from "@reduxjs/toolkit";



const productReducer = createSlice({
    name:'productReducer',
    initialState:{
        products:null,
    },
    reducers:{
        setProducts:(state, action)=>{
            const data=action.payload;
            state.products = data;
        },
        clearProducts:(state, action)=>{
            state.products=null;
        }
    }
})

export const {setProducts} = productReducer.actions;
export default productReducer.reducer;