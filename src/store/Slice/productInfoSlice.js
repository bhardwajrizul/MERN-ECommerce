import { createSlice } from "@reduxjs/toolkit";

const initState = {
    pid: '',
    quantity: 1, // assuming default quantity is 1
    size: null
}

const productInfoSlice = createSlice({
    name: 'productInfo',
    initialState: initState,
    reducers: {
        setProductInfo: (state, action) => {
            // Sets the entire product information, replacing the current state
            state.pid = action.payload.pid;
            state.quantity = action.payload.quantity;
            state.size = action.payload?.size || null;
        },
        updateProductInfo: (state, action) => {
            // Updates individual properties of the product information
            const { pid, quantity, size } = action.payload;
            if (pid !== undefined) {
                state.pid = pid;
            }
            if (quantity !== undefined) {
                state.quantity = quantity;
            }
            if (size !== undefined) {
                state.size = size;
            }
        },
        resetProductInfo: (state) => {
            state.pid = initState.pid;
            state.quantity = initState.quantity;
            state.size = initState.size;
        },
    }
});

export const {
    setProductInfo,
    updateProductInfo,
    resetProductInfo,
} = productInfoSlice.actions;

export default productInfoSlice.reducer;
