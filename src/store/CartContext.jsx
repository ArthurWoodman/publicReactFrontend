// this store is deprecated since Redux has been implemented
import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {
    const updatedItems = [...state.items];

    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        if (existingCartItemIndex > -1) {
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1
            };

            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        // const existingCartItemIndex = state.items.findIndex(
        //     (item) => item.id === action.item.id
        // );
        //
        // const existingCartItem = state.items[existingCartItemIndex];
        //
        // if (existingCartItem.quantity === 1) {
        //     updatedItems.splice(existingCartItemIndex, 1);
        // } else {
        //     const updatedItem = {
        //         ...existingCartItem,
        //         quantity: existingCartItem.quantity - 1
        //     };
        //
        //     updatedItems[existingCartItemIndex] = updatedItem;
        // }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART' ) {
        return { ...state, items: [] };
    }

    return state;
}

//init: The initializer function that should return the initial state. If it’s not specified,
// the initial state is set to initialArg. Otherwise, the initial state is set to the result of calling init(initialArg).
function initInitialState(arg)
{
    return arg;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }, initInitialState);

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', item: {id: id} });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;