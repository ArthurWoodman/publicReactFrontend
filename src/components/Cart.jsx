import Modal from "./UI/Modal";
import {useContext} from "react";
import CartContext from "../store/CartContext";
import {currencyFormatter} from "../util/formatter";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((prevSummary, item) => prevSummary + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return <Modal
               className={classes['cart']}
               open={userProgressCtx.progress === 'cart'}
               onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
        <h2>Your Cart</h2>
        <ul>
            {
                cartCtx.items.map(
                    item => (
                        <CartItem
                            key={item.id}
                            name={item.title}
                            quantity={item.quantity}
                            price={item.price}
                            onIncrease={() => cartCtx.addItem(item)}
                            onDecrease={() => cartCtx.removeItem(item.id)}
                        />
                    )
                )
            }
        </ul>
        <p className={classes['cart-total']}>
            {currencyFormatter.format(cartTotal)}
        </p>
        <p className={classes['modal-actions']}>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Checkout</Button>}
        </p>
    </Modal>;
}