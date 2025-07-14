import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email:"",
    },
    reducers: {
        setUser: (state,action)=>{
            state.email = "demo"
        },
        clearUser: (state,action)=>{
            state.email = ""
        }
    }
})

export const { setUser,clearUser } = userSlice.actions

export default userSlice.reducer