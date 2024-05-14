import { createSlice } from '@reduxjs/toolkit';
import cartSlice from "./CartSlice";

const userProgressSlice = createSlice({
    name: 'userProgress',
    initialState: {progress: ''},
    reducers: {
        showCart(state) {
            state.progress = 'cart';
        },
        hideCart(state) {
            state.progress = '';
        },
        showCheckout(state) {
            state.progress = 'checkout';
        },
        hideCheckout(state) {
            state.progress = '';
        },
    }
});

export const userProgressActions = userProgressSlice.actions;

export default userProgressSlice;