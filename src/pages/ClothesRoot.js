import { Outlet } from "react-router-dom";
import ClothesNavigation from "../components/ClothesNavigation";

function ClothesRootLayout() {
    return <>
        <ClothesNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default ClothesRootLayout;