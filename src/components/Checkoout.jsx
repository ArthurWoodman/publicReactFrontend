import Modal from "./UI/Modal";
import {useContext} from "react";
import cartContext from "../store/CartContext";
import {currencyFormatter} from "../util/formatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import classes from "./Checkout.module.css";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import DesignatedError from "./DesignatedError";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};
export default function Checkout()
{
    const cartCtx = useContext(cartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((prevSummary, item) => prevSummary + item.quantity * item.price, 0);

    const { data, isLoading, error, resetError, sendRequest, clearData } = useHttp('http://localhost:8080/orders', requestConfig);
    function handleClose() {
        userProgressCtx.hideCheckout();
        resetError(null);
    }

    function handleFinish()
    {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout' } onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Ok</Button>
            </p>
        </Modal>
    }

    return <Modal open={userProgressCtx.progress === 'checkout' } onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className={classes["control-row"]}>
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {error && <DesignatedError title="Failed to submit order!" message={error} />}

            <p className={classes["modal-actions"]}>
                { isLoading ?
                    <span>Sending order data...</span>
                    :
                    <>
                        <Button textOnly type="button" onClick={handleClose}>Close</Button>
                        <Button>Submit Order</Button>
                    </>
                }

            </p>
        </form>
    </Modal>;
}
