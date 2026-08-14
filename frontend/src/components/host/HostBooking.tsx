"use client";

import { useEffect, useState } from "react";
import { HostBooking, getHostBookings } from "../../lib/api";

const currentHost = {
    id: 1,
};

export default function HostBookings() {
    const [bookings, setBookings] = useState<HostBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load bookings for the current host
    const loadBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getHostBookings(currentHost.id);
            setBookings(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    return (
        <section className="mt-14">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                    Your bookings
                </h2>

                <p className="mt-1 text-gray-500">
                    Bookings made for your properties
                </p>
            </div>

            {/* Show loading state */}
            {loading && (
                <div className="py-8 text-center text-gray-500">
                    Loading bookings...
                </div>
            )}

            {/* Show error message */}
            {!loading && error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Show message when there are no bookings */}
            {!loading && !error && bookings.length === 0 && (
                <div className="rounded-xl border border-dashed p-10 text-center">
                    <h3 className="text-lg font-semibold">
                        No bookings yet
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Your property bookings will appear here.
                    </p>
                </div>
            )}

            {/* Display all bookings */}
            {!loading && !error && bookings.length > 0 && (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {booking.listing_title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {booking.location}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Stay
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {booking.check_in} → {booking.check_out}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Guests
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {booking.guests}
                                        {booking.guests === 1
                                            ? " guest"
                                            : " guests"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Nightly price
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        ₹
                                        {booking.price_per_night.toLocaleString(
                                            "en-IN"
                                        )}
                                        <span className="font-normal text-gray-500">
                                            {" "}
                                            / night
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}