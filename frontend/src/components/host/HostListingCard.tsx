"use client";

import Link from "next/link";
import { Listing } from "@/types/listing";

interface Props {
    listing: Listing;
    onDelete: (id: number) => void;
}

export default function HostListingCard({ listing, onDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md">
            <img
                src={listing.image_url}
                alt={listing.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-5">
                <div className="flex justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">{listing.title}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {listing.location}
                        </p>
                    </div>
                    <span className="text-sm">★ {listing.rating}</span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                    {listing.description}
                </p>

                <p className="mt-4">
                    <b>₹{listing.price_per_night.toLocaleString("en-IN")}</b>
                    <span className="text-gray-500"> / night</span>
                </p>

                {listing.amenities && (
                    <p className="mt-2 line-clamp-1 text-xs text-gray-500">
                        {listing.amenities}
                    </p>
                )}

                <div className="mt-5 flex gap-3">
                    <Link
                        href={`/host/edit/${listing.id}`}
                        className="flex-1 cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => onDelete(listing.id)}
                        className="flex-1 cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}