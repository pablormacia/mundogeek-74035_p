import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email:"",
        localId:"",
        profileImage:""
    },
    reducers: {
        setUser: (state,action)=>{
            state.email = action.payload.email
            state.localId = action.payload.localId
        },
        clearUser: (state,action)=>{
            state.email = "",
            state.localId="",
            state.profileImage=""
        },
        setProfileImage:(state, action) =>{
            state.profileImage = action.payload
        }
    }
})

export const { setUser,clearUser,setProfileImage } = userSlice.actions

export default userSlice.reducer