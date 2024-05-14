import PageContent from "./PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage({title = '', message = ''}) {
    const error = useRouteError();

    if (title.length === 0) {
        if (error.status === 404) {
            title = 'Not found!';
        } else {
            title = 'An error occurred!';
        }
    }

    if (message.length === 0) {
        if (error.status === 500) {
            message = JSON.parse(error.data).message;
        } else if (error.status === 404) {
            message = 'Could not find';
        } else if (error.message) {
            message = error.message;
        } else {
            message = 'Something went wrong!';
        }
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;