import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === newItem.id
            );

            if (existingCartItemIndex > -1) {
                const updatedItem = {
                    ...state.items[existingCartItemIndex],
                    quantity: state.items[existingCartItemIndex].quantity + 1
                };

                state.items[existingCartItemIndex] = updatedItem;
            } else {
                state.items.push({...newItem, quantity: 1});
            }
        },
        removeItem(state, action) {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );

            const existingCartItem = state.items[existingCartItemIndex];

            if (existingCartItem.quantity === 1) {
                state.items.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1
                };

                state.items[existingCartItemIndex] = updatedItem;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;