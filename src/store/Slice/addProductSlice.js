import { createSlice } from "@reduxjs/toolkit";

const addProductSlice = createSlice({
    name: 'addProduct',
    initialState: {
        gender: {
            value: '',
            error: null
        },
        category: {
            value: '',
            error: null
        },
        subCategory: {
            value: '',
            error: null
        },
        inputFields: [
            {
                value: '',
                error: null
            }
        ]
    },
    reducers: {
        setGender(state, action) {
            state.gender = action.payload
        },
        setCategory(state, action) {
            state.category = action.payload
        },
        setSubCategory(state, action) {
            state.subCategory = action.payload
        },
        addInputFields(state, action) {
            state.inputFields = [
                ...state.inputFields,
                {
                    value: '',
                    error: null
                }
            ]
        },
        updateInputFields(state, action) {
            state.inputFields = action.payload
        },
    }
})

export const {
    setGender,
    setCategory,
    setSubCategory,
    addInputFields,
    updateInputFields
} = addProductSlice.actions;


export default addProductSlice.reducer;