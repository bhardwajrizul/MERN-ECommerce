import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: '',
        email: '',
        password:'',
        confirmPassword: '',
        loginValid: false,
        signupValid: false,
        loginError: '',
        signUpError: '', 
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setConfirmPassword(state, action) {
            state.confirmPassword = action.payload
        },
        resetForm(state, action) {
            state.name = '',
            state.email='',
            state.password='',
            state.confirmPassword=''
        }
    }
})

export default formSlice.reducer;
export const { setName, setEmail, setPassword, setConfirmPassword, resetForm } = formSlice.actions;