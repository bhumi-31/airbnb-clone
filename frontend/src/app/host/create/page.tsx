"use client";

import { useRouter } from "next/navigation";
import { createListing } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";
import ListingForm from "@/components/host/ListingForm";
import { HostListingData } from "@/lib/api";

export default function CreateListingPage() {
    const router = useRouter();
    const { showToast } = useToast();

    const handleCreate = async (data: HostListingData) => {
        try {
            await createListing(1, data);
            showToast("Listing created successfully.", "success");
            router.push("/host");
        } catch (error) {
            console.error(error);
            showToast("Failed to create listing.", "error");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-10">
                <h1 className="mb-2 text-3xl font-semibold">
                    Create a listing
                </h1>

                <p className="mb-8 text-gray-500">
                    Tell guests about your place.
                </p>

                <ListingForm
                    onSubmit={handleCreate}
                    onCancel={() => router.push("/host")}
                />
            </div>
        </main>
    );
}