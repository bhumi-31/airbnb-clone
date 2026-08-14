"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Listing } from "../types/listing";
import { useToast } from "./ToastProvider";

export default function Favorites() {
    const [favorites, setFavorites] = useState<Listing[]>([]);
    const { showToast } = useToast();

    // Load saved favorites
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(saved);
    }, []);

    // Remove a listing from favorites
    const removeFavorite = (id: number) => {
        const updated = favorites.filter((listing) => listing.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
        showToast("Removed from favorites.", "success");
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-3xl font-semibold">Your Favorites</h1>
                <p className="mt-2 text-gray-500">Places you've saved.</p>

                {favorites.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
                        <h2 className="text-xl font-semibold">No favorites yet</h2>
                        <p className="mt-2 text-gray-500">
                            Save places you love and find them here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((listing) => (
                            <div key={listing.id}>
                                <Link href={`/listings/${listing.id}`} className="cursor-pointer">
                                    <img
                                        src={listing.image_url}
                                        alt={listing.title}
                                        className="aspect-[4/4.2] w-full rounded-xl object-cover"
                                    />
                                </Link>

                                <div className="mt-3 flex justify-between">
                                    <div>
                                        <h2 className="font-semibold">{listing.location}</h2>
                                        <p className="text-gray-500">{listing.title}</p>
                                        <p className="mt-1">
                                            <b>₹{listing.price_per_night.toLocaleString("en-IN")}</b>{" "}
                                            night
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFavorite(listing.id)}
                                        className="cursor-pointer text-2xl text-rose-500"
                                    >
                                        ♥
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}