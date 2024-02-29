import {redirect} from "react-router-dom";

export function action() {
    localStorage.removeItem('shop_token');
    localStorage.removeItem('shop_token_expiration');

    return redirect('/');
}