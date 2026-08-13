"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./ToastProvider";
import { Listing } from "../types/listing";
import SearchBar from "./SearchBar";
import ListingCard from "./ListingCard";

interface Props {
    initialListings: Listing[];
}

export default function ListingExplorer({ initialListings }: Props) {
    const [listings, setListings] = useState(initialListings);
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const params = useSearchParams();
    const category = params.get("category");

    const { showToast } = useToast();

    useEffect(() => {
        setListings(initialListings);
        setPage(1);
        setLocation("");
        setGuests(0);
        setCheckIn("");
        setCheckOut("");
    }, [category, initialListings]);

    const filtered = listings.filter(
        (l) =>
            !category ||
            l.property_type.toLowerCase() === category.toLowerCase()
    );

    const handleSearch = async (
        loc: string,
        guestCount: number,
        checkin: string,
        checkout: string,
        pageNumber = 1
    ) => {
        if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
            showToast("Check-out date must be after check-in date.", "error");
            return;
        }
        const p = new URLSearchParams();

        if (loc.trim()) p.set("location", loc);
        if (guestCount > 0) p.set("guests", guestCount.toString());
        if (checkin) p.set("check_in", checkin);
        if (checkout) p.set("check_out", checkout);

        p.set("page", pageNumber.toString());
        p.set("limit", "6");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/?${p}`);

            if (!res.ok) throw new Error("Failed to fetch listings");

            setListings(await res.json());
            setPage(pageNumber);
            setLocation(loc);
            setGuests(guestCount);
            setCheckIn(checkin);
            setCheckOut(checkout);
        } catch (error) {
            console.error(error);
            showToast("Something went wrong while searching.", "error");
        }
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />

            <div className="mt-5 border-t border-gray-200" />
            <main className="mx-auto max-w-6xl px-6 py-8">
                <h1 className="mb-8 text-2xl font-semibold">
                    {category ? `${category} stays` : "Explore stays"}
                </h1>

                {filtered.length === 0 ? (
                    <p className="text-gray-500">No listings found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
                            {filtered.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center gap-6">
                            <button
                                onClick={() =>
                                    page > 1 &&
                                    handleSearch(
                                        location,
                                        guests,
                                        checkIn,
                                        checkOut,
                                        page - 1
                                    )
                                }
                                disabled={page === 1}
                                className="rounded-lg border px-5 py-2 disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span>Page {page}</span>

                            <button
                                onClick={() =>
                                    listings.length === 6 &&
                                    handleSearch(
                                        location,
                                        guests,
                                        checkIn,
                                        checkOut,
                                        page + 1
                                    )
                                }
                                disabled={listings.length < 6}
                                className="rounded-lg border px-5 py-2 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}