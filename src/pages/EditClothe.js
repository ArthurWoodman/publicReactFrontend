import ClotheForm from "../components/ClotheForm";
import { useRouteLoaderData } from "react-router-dom";

function EditClothePage() {
    const data = useRouteLoaderData('clothe-detail');

    return <ClotheForm clothe={ data.clothe } method='patch' />
}

export default EditClothePage;