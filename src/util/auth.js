import {redirect} from "react-router-dom";

export function getAuthToken() {
    const token = localStorage.getItem('spa_token');
    const tokenDuration = getTokenDuration();

    if (!token) {
        return null;
    }

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}

export function getTokenDuration()
{
    const storedExpirationDate = localStorage.getItem('spa_token_expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
}