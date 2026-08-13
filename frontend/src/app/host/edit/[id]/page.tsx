"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHostListings, updateListing } from "../../../../lib/api";
import { Listing } from "../../../../types/listing";
import { useToast } from "../../../../components/ToastProvider";
import ListingForm from "../../../../components/host/ListingForm";
import { HostListingData } from "../../../../lib/api";

export default function EditListingPage() {
    const { id } = useParams();
    const router = useRouter();
    const { showToast } = useToast();

    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadListing = async () => {
            try {
                const listings = await getHostListings(1);
                const found = listings.find(
                    (item) => item.id === Number(id)
                );

                if (!found) {
                    showToast("Listing not found.", "error");
                    router.push("/host");
                    return;
                }

                setListing(found);
            } catch (error) {
                console.error(error);
                showToast("Failed to load listing.", "error");
                router.push("/host");
            } finally {
                setLoading(false);
            }
        };

        loadListing();
    }, [id]);

    const handleUpdate = async (data: HostListingData) => {
        if (!listing) return;

        try {
            await updateListing(1, listing.id, data);
            showToast("Listing updated successfully.", "success");
            router.push("/host");
        } catch (error) {
            console.error(error);
            showToast("Failed to update listing.", "error");
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <p className="py-20 text-center text-gray-500">
                    Loading listing...
                </p>
            </main>
        );
    }

    if (!listing) return null;

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-10">
                <h1 className="text-3xl font-semibold">
                    Edit listing
                </h1>

                <p className="mb-8 mt-2 text-gray-500">
                    Update your listing details.
                </p>

                <ListingForm
                    listing={listing}
                    onSubmit={handleUpdate}
                    onCancel={() => router.push("/host")}
                />
            </div>
        </main>
    );
}