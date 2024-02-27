import classes from "./CartItem.module.css"
import {currencyFormatter} from "../util/formatter";

export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {
    return <li className={classes['cart-item']}>
        <p>{name} - {quantity} * {currencyFormatter.format(price)}</p>
        <p className={classes["cart-item-actions"]}>
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}