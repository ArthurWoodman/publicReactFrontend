import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import EditClothePage from './pages/EditClothe';
import ErrorPage from './pages/Error';
import ClotheDetailPage, {action as deleteClotheAction, loader as clotheDetailLoader} from './pages/ClotheDetail';
import ClothesRootLayout from './pages/ClothesRoot';
import HomePage from './pages/Home';
import NewClothePage from './pages/NewClothe';
import RootLayout from './pages/Root';
import {action as manipulateClotheAction} from './components/ClotheForm';
import NewsletterPage, {action as newsletterAction} from './pages/Newsletter';
import AuthenticationPage, {action as authAction} from "./pages/Authentication";
import { action as logoutAction } from './pages/Logout';
import {checkAuthLoader, getAuthToken} from './util/auth';
import {lazy} from "react";
import Cart from "./components/Cart";
import Checkout from "./components/Checkoout";
import { Provider } from "react-redux";
import store from "./reduxStore/Store";

const ClothesPage = lazy(() => import('./pages/Clothes'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: getAuthToken,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'auth',
                element: <AuthenticationPage />,
                action: authAction
            },
            {
                path: 'clothes',
                element: <ClothesRootLayout />,
                children: [
                    {
                        index: true,
                        element: <ClothesPage />,
                        loader: () => import('./pages/Clothes').then(module => module.loader()),
                    },
                    {
                        path: ':clotheId',
                        id: 'clothe-detail',
                        loader: clotheDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <ClotheDetailPage />,
                                action: deleteClotheAction,
                            },
                            {
                                path: 'edit',
                                loader: checkAuthLoader,
                                element: <EditClothePage />,
                                action: manipulateClotheAction,
                            },
                        ],
                    },
                    {
                        path: 'new',
                        element: <NewClothePage />,
                        action: manipulateClotheAction,
                        loader: checkAuthLoader
                    },
                ],
            },
            {
                path: 'newsletter',
                element: <NewsletterPage />,
                action: newsletterAction,
            },
            {
                path: 'logout',
                action: logoutAction
            },
        ],
    },
]);

function App() {
    return (
            <Provider store={store}>
                <RouterProvider router={router} />
                <Cart />
                <Checkout />
            </Provider>
        );
}

export default App;