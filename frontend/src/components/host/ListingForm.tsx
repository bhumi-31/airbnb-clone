"use client";

import { useEffect, useState } from "react";
import { Listing } from "@/types/listing";
import { HostListingData } from "@/lib/api";

interface ListingFormProps {
    listing?: Listing | null;
    onSubmit: (data: HostListingData) => Promise<void>;
    onCancel: () => void;
}

export default function ListingForm({
    listing,
    onSubmit,
    onCancel,
}: ListingFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("Apartment");
    const [maxGuests, setMaxGuests] = useState("1");
    const [imageUrl, setImageUrl] = useState("");
    const [amenities, setAmenities] = useState("");
    const [saving, setSaving] = useState(false);

    const isEditing = Boolean(listing);

    // Load listing data when editing
    useEffect(() => {
        if (listing) {
            setTitle(listing.title);
            setDescription(listing.description);
            setLocation(listing.location);
            setPrice(listing.price_per_night.toString());
            setPropertyType(listing.property_type);
            setMaxGuests(listing.max_guests.toString());
            setImageUrl(listing.image_url);
            setAmenities(listing.amenities ?? "");
        } else {
            setTitle("");
            setDescription("");
            setLocation("");
            setPrice("");
            setPropertyType("Apartment");
            setMaxGuests("1");
            setImageUrl("");
            setAmenities("");
        }
    }, [listing]);

    // Submit the form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);

            await onSubmit({
                title,
                description,
                location,
                price_per_night: Number(price),
                property_type: propertyType,
                max_guests: Number(maxGuests),
                image_url: imageUrl,
                amenities,
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mb-10 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    {isEditing ? "Edit listing" : "Create a listing"}
                </h2>

                <button
                    onClick={onCancel}
                    className="cursor-pointer text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="text-sm font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Beautiful beach villa"
                        className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        placeholder="Describe your place"
                        className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="text-sm font-medium">
                        Location
                    </label>

                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="Goa, India"
                        className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                {/* Price and guests */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium">
                            Price per night
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="5000"
                            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Maximum guests
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                        />
                    </div>
                </div>

                {/* Property type */}
                <div>
                    <label className="text-sm font-medium">
                        Property type
                    </label>

                    <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-black"
                    >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="House">House</option>
                        <option value="Cabin">Cabin</option>
                        <option value="Cottage">Cottage</option>
                    </select>
                </div>

                {/* Image */}
                <div>
                    <label className="text-sm font-medium">
                        Image URL
                    </label>

                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        placeholder="https://example.com/image.jpg"
                        className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                {/* Amenities */}
                <div>
                    <label className="text-sm font-medium">
                        Amenities
                    </label>

                    <input
                        type="text"
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        placeholder="WiFi, Kitchen, Parking, Pool"
                        className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                {/* Form actions */}
                <div className="flex justify-end gap-3 pt-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer rounded-lg border px-5 py-3 font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="cursor-pointer rounded-lg bg-rose-500 px-5 py-3 font-medium text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : isEditing
                              ? "Save changes"
                              : "Create listing"}
                    </button>
                </div>
            </form>
        </div>
    );
}