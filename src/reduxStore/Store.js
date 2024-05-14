import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import userProgressSlice from "./UserProgressSlice";

const store = configureStore({
    reducer: { cart: CartSlice.reducer, userProgress: userProgressSlice.reducer }
});

export default store;

