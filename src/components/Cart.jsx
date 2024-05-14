import Modal from "./UI/Modal";
import {currencyFormatter} from "../util/formatter";
import Button from "./UI/Button";
import { userProgressActions } from "../reduxStore/UserProgressSlice";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../reduxStore/CartSlice";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart() {
    const dispatch = useDispatch();
    const CartItems = useSelector((state) => state.cart.items);
    const userProgressProgress = useSelector(state => state.userProgress.progress);
    const cartTotal = CartItems.reduce((prevSummary, item) => prevSummary + item.quantity * item.price, 0);

    function handleCloseCart() {
        dispatch(userProgressActions.hideCart());
    }

    function handleGoToCheckout() {
        dispatch(userProgressActions.showCheckout());
    }

    return <Modal
               className={classes['cart']}
               open={userProgressProgress === 'cart'}
               onClose={userProgressProgress === 'cart' ? handleCloseCart : null}
    >
        <h2>Your Cart</h2>
        <ul>
            {
                CartItems.map(
                    item => (
                        <CartItem
                            key={item.id}
                            name={item.title}
                            quantity={item.quantity}
                            price={item.price}
                            onIncrease={() => dispatch(cartActions.addItem(item))}
                            onDecrease={() => dispatch(cartActions.removeItem(item.id))}
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
            {CartItems.length > 0 && <Button onClick={handleGoToCheckout}>Checkout</Button>}
        </p>
    </Modal>;
}