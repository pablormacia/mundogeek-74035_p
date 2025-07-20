import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice"
import userReducer from "../features/user/userSlice"
import { shopApi } from "../services/shopService";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";
import { setupListeners } from "@reduxjs/toolkit/query";

const store =  configureStore({
    reducer: { 
        shopReducer,
        cartReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
     },
     middleware: (getDefaultMiddleware)=>(getDefaultMiddleware()
        .concat(shopApi.middleware))
        .concat(authApi.middleware)
        .concat(userApi.middleware)
})

setupListeners(store.dispatch)

export default store