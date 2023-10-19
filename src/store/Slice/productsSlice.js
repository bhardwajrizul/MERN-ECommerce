import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        page: 1
    },
    reducers: {
        pushNewProductsToPage(state, action) {
            state.data = [...state.data, ...action.payload];
        },
        showMoreProducts(state, actions) {
            state.page = state.page + 1;
        },
        resetProductsAndPage(state, actions){
            state.data = [];
            state.page = 1;
        },
        
    }
})

export const {
    pushNewProductsToPage,
    showMoreProducts,
    resetProductsAndPage
} = productsSlice.actions;
export const productsReducer =  productsSlice.reducer;