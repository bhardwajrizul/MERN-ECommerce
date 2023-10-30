import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        userEmail: null,
        loading: true,
        isLoggedIn: false
    },
    reducers: {
        setUser(state, action) {
            state.userId = action.payload.uid
            state.userEmail = action.payload.email
            state.loading = false
            state.isLoggedIn = true
        },
        resetUser(state, action) {
            state.userId = null;
            state.userEmail = null;
            state.loading = false
            state.isLoggedIn = false
        },
        setUserLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export default userSlice.reducer;
export const {setUser, resetUser, setUserLoading} = userSlice.actions;