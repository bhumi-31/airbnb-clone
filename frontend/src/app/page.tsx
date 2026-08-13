import { Suspense } from "react";
import { getListings } from "../lib/api";
import ListingExplorer from "../components/ListingExplorer";
import Navbar from "../components/NavBar";

export default async function Home() {
    const listings = await getListings();

    return (
        <>
            <Navbar />
            <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
                <ListingExplorer initialListings={listings} />
            </Suspense>
        </>
    );
}