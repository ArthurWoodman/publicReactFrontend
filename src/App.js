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
import {lazy, Suspense} from "react";
import { CartContextProvider } from "./store/CartContext";
import {UserProgressContextProvider} from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkoout";

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
                        element: (
                            <Suspense fallback={<p>Loading...</p>}>
                                <ClothesPage />
                            </Suspense>
                        )
                        ,
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
            <UserProgressContextProvider>
                <CartContextProvider>
                    <RouterProvider router={router} />
                    <Cart />
                    <Checkout />
                </CartContextProvider>
            </UserProgressContextProvider>
        );
}

export default App;