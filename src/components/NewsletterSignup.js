import classes from './NewsletterSignup.module.css';
import { useFetcher } from "react-router-dom";
import {useEffect} from "react";

function NewsletterSignup() {
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message ) {
            window.alert(data.message);
        }
    }, [data, state]);

    return (
        // with fetcher.Form we do not move to another route when a button clicked
        // So useFetcher is the tool you should use if you wanna trigger a loader or an action
        //  without actually loading the page, the route to which this action or loader belongs.
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;

