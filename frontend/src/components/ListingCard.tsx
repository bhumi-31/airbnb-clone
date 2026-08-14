"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Listing } from "../types/listing";
import { useToast } from "./ToastProvider";

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    const [favorite, setFavorite] = useState(false);
    const { showToast } = useToast();

    // Check if the listing is already saved
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorite(saved.some((item: Listing) => item.id === listing.id));
    }, [listing.id]);

    // Add or remove the listing from favorites
    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();

        const saved: Listing[] = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

        if (favorite) {
            const updated = saved.filter((item) => item.id !== listing.id);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setFavorite(false);
            showToast("Removed from favorites.", "success");
        } else {
            saved.push(listing);
            localStorage.setItem("favorites", JSON.stringify(saved));
            setFavorite(true);
            showToast("Added to favorites.", "success");
        }
    };

    return (
        <Link href={`/listings/${listing.id}`} className="group cursor-pointer">
            <div>
                <div className="relative aspect-[4/4.2] overflow-hidden rounded-xl">
                    <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                        onClick={toggleFavorite}
                        className={`absolute right-3 top-3 cursor-pointer text-2xl drop-shadow-md ${
                            favorite ? "text-rose-500" : "text-white"
                        }`}
                    >
                        {favorite ? "♥" : "♡"}
                    </button>
                </div>

                <div className="mt-3">
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-gray-900">
                            {listing.location}
                        </h2>
                        <span>★ {listing.rating}</span>
                    </div>

                    <p className="mt-1 text-gray-500">{listing.title}</p>

                    <p className="mt-1">
                        <b>
                            ₹{listing.price_per_night.toLocaleString("en-IN")}
                        </b>{" "}
                        <span className="text-gray-600">night</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}