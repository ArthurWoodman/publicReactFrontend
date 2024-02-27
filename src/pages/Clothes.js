import ClothesList from '../components/ClothesList';
import {Await, defer, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

function ClothesPage() {
    const { clothes } = useLoaderData();

    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={clothes} >
                {(loadedClothes) => <ClothesList clothes={loadedClothes}/>}
            </Await>
        </Suspense>
    );
}

export default ClothesPage;

async function loadClothes() {
    const response = await fetch('http://localhost:8080/clothes');

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not fetch clothes!'}),
            { status: 500 }
        );
    } else {
        const data = await response.json();

        return data.clothes;
    }
}
export function loader() {
    return defer({
       clothes: loadClothes()
    });
}