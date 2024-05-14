import {Await, defer, redirect} from "react-router-dom";
import ClotheItem from "../components/ClotheItem";
import { useRouteLoaderData } from "react-router-dom";
import ClothesList from "../components/ClothesList";
import {Suspense} from "react";
import {getAuthToken} from "../util/auth";

function ClotheDetailPage() {
    const { clothe, clothes } = useRouteLoaderData('clothe-detail');

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading a clothe...</p>}>
                <Await resolve={clothe}>
                    {(loadedClothe) => <ClotheItem clothe={ loadedClothe }/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading clothes...</p>}>
                <Await resolve={clothes}>
                    {(loadedClothes) => <ClothesList clothes={loadedClothes}></ClothesList> }
                </Await>
            </Suspense>
        </>
    );
}

export default ClotheDetailPage;

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

async function loadClothe(clotheId) {
    const response = await fetch(`http://localhost:8080/clothes/${clotheId}`);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not fetch an item details!'}),
            { status: 500 }
        );
    } else {
        const data = await response.json();

        return data.clothe;
    }
}
export async function loader({request, params}) {
    const id = params.clotheId;

    return defer({
        clothe: await loadClothe(id),
        clothes: loadClothes()
    });
}

export async function action({ params, request }) {
    const clotheId = await params.clotheId;
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/clothes/${clotheId}`, {
        method: request.method,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not delete a clothe!'}),
            { status: 500 }
        );
    } else {
        return redirect('/clothes');
    }
}