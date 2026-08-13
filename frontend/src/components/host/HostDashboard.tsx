"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Listing } from "../../types/listing";
import { getHostListings, deleteListing } from "../../lib/api";
import { useToast } from "../ToastProvider";
import HostListingCard from "./HostListingCard";

const currentHost = { id: 1, name: "Airbnb Host" };

export default function HostDashboard() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { showToast } = useToast();

    useEffect(() => {
        const loadListings = async () => {
            try {
                setListings(await getHostListings(currentHost.id));
            } catch (error) {
                console.error(error);
                showToast("Failed to load listings.", "error");
            } finally {
                setLoading(false);
            }
        };

        loadListings();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteListing(currentHost.id, id);

            setListings((current) =>
                current.filter((listing) => listing.id !== id)
            );

            setDeleteId(null);
            showToast("Listing deleted successfully.", "success");
        } catch (error) {
            console.error(error);
            showToast("Failed to delete listing.", "error");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-10">

                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
                >
                    ← Back to stays
                </Link>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            Your listings
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Welcome, {currentHost.name}
                        </p>
                    </div>

                    <Link
                        href="/host/create"
                        className="rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white hover:bg-rose-600"
                    >
                        + Create listing
                    </Link>
                </div>

                {/* Host navigation */}
                <div className="mt-8 flex gap-8 border-b">
                    <Link
                        href="/host"
                        className="border-b-2 border-black pb-3 font-semibold"
                    >
                        Your listings
                    </Link>

                    <Link
                        href="/host/reservations"
                        className="pb-3 text-gray-500 hover:text-black"
                    >
                        Reservations
                    </Link>
                </div>

                {/* Listings */}
                {loading ? (
                    <p className="py-10 text-center text-gray-500">
                        Loading listings...
                    </p>
                ) : listings.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed p-12 text-center">
                        <h2 className="text-xl font-semibold">
                            No listings yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first listing and start hosting.
                        </p>

                        <Link
                            href="/host/create"
                            className="mt-5 inline-block rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white"
                        >
                            Create listing
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <HostListingCard
                                key={listing.id}
                                listing={listing}
                                onDelete={(id) => setDeleteId(id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-semibold">
                            Delete listing?
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Are you sure you want to delete this listing?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-lg border px-5 py-2 font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="rounded-lg bg-rose-500 px-5 py-2 font-medium text-white hover:bg-rose-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}