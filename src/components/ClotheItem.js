import classes from './ClotheItem.module.css';
import {Link, useRouteLoaderData, useSubmit} from "react-router-dom";
import {currencyFormatter} from "../util/formatter";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import {cartActions} from "../reduxStore/CartSlice";

function ClotheItem({clothe}) {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();
    const dispatch = useDispatch();

    function handleAddClotheToCart(clothe) {
        dispatch(cartActions.addItem(clothe));
    }

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit(null, {method: 'delete'});
        }
    }

    return (
        <article className={classes.clothe}>
            <img src={clothe.image} alt={clothe.title}/>
            <h1>{clothe.title}</h1>
            <time>{clothe.date}</time>
            <h3 className={classes["clothe-item-price"]}>Price: {currencyFormatter.format(clothe.price)}</h3>
            <p>{clothe.description}</p>
            {token && <menu className={classes.actions}>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
            </menu>}
            <p className={classes["clothe-item-action"]}>
                <Button onClick={() => {
                    handleAddClotheToCart(clothe)
                }}>Add to Cart</Button>
            </p>
        </article>
    );
}

export default ClotheItem;
