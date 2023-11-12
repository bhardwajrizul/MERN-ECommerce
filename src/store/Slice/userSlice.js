import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        userName: null,
        phoneNumber: null,
        address: null,
        userEmail: null,
        loading: true,
        isLoggedIn: false,
        token: null
    },
    reducers: {
        setUser(state, action) {
            state.userId = action.payload.uid
            state.userEmail = action.payload.email
            state.token = action.payload.token
            state.loading = false
            state.isLoggedIn = true
        },
        setToken(state, action) {
            state.token = action.payload
            state.loading = false
        },
        resetUser(state, action) {
            state.userId = null;
            state.userEmail = null;
            state.loading = false
            state.isLoggedIn = false
            state.token = null
        },
        setUserLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export default userSlice.reducer;
export const {setUser, resetUser, setUserLoading, setToken} = userSlice.actions;