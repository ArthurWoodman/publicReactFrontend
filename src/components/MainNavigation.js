import {Form, NavLink, useRouteLoaderData} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';
import Button from "./UI/Button";
import {useContext} from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

function MainNavigation() {
    const token = useRouteLoaderData('root');
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce(
        (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
        0
    );

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header className={classes.header}>
            <NewsletterSignup/>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/clothes"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Clothes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/newsletter"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Newsletter
                        </NavLink>
                    </li>
                    {!token && <li>
                        <NavLink
                            to="/auth?mode=login"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Login
                        </NavLink>
                    </li>}
                    {token && <li>
                        <Form action='/logout' method='POST'>
                            <button className={classes.logout}>Logout</button>
                        </Form>
                    </li>}
                    <li className={classes.cart}>
                        <Button textOnly onClick={handleShowCart}>
                            Cart ({totalCartItems})
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;