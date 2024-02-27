import {redirect} from "react-router-dom";

export function action() {
    localStorage.removeItem('spa_token');
    localStorage.removeItem('spa_token_expiration');

    return redirect('/');
}