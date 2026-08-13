"use client";

import { useEffect, useState } from "react";

import {
    MyTrip,
    getMyTrips,
} from "../lib/api";

export default function MyTrips() {

    const [trips, setTrips] =
        useState<MyTrip[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =================================================
    // LOAD TRIPS
    // =================================================

    useEffect(() => {

        const loadTrips = async () => {

            try {

                const data =
                    await getMyTrips();

                setTrips(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load your trips."
                );

            } finally {

                setLoading(false);

            }
        };

        loadTrips();

    }, []);


    // =================================================
    // LOADING
    // =================================================

    if (loading) {

        return (

            <main className="min-h-screen bg-white">

                <div className="mx-auto max-w-6xl px-6 py-10">

                    <h1 className="text-3xl font-semibold text-gray-900">
                        My Trips
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Loading your trips...
                    </p>

                </div>

            </main>

        );

    }


    // =================================================
    // ERROR
    // =================================================

    if (error) {

        return (

            <main className="min-h-screen bg-white">

                <div className="mx-auto max-w-6xl px-6 py-10">

                    <h1 className="text-3xl font-semibold text-gray-900">
                        My Trips
                    </h1>

                    <p className="mt-6 text-sm text-red-500">
                        {error}
                    </p>

                </div>

            </main>

        );

    }


    // =================================================
    // UI
    // =================================================

    return (

        <main className="min-h-screen bg-white">

            <div className="mx-auto max-w-6xl px-6 py-10">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="mb-8">

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        My Trips
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View your upcoming and past stays.
                    </p>

                </div>


                {/* =====================================
                    EMPTY STATE
                ===================================== */}

                {trips.length === 0 ? (

                    <div className="rounded-2xl border border-dashed p-12 text-center">

                        <h2 className="text-xl font-semibold">
                            No trips yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Your bookings will appear here.
                        </p>

                    </div>

                ) : (

                    <>

                        {/* =================================
                            TRIP GRID
                        ================================= */}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                            {trips.map((trip) => (

                                <div
                                    key={trip.id}
                                    className="group flex min-h-[250px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                                >


                                    {/* =========================
                                        IMAGE
                                    ========================= */}

                                    <div className="w-[42%] shrink-0">

                                        <img
                                            src={trip.image_url}
                                            alt={
                                                trip.listing_title
                                            }
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />

                                    </div>


                                    {/* =========================
                                        DETAILS
                                    ========================= */}

                                    <div className="flex flex-1 flex-col p-5">


                                        {/* TITLE */}

                                        <div>

                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {
                                                    trip.listing_title
                                                }
                                            </h2>

                                            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">

                                                <span>
                                                    📍
                                                </span>

                                                {
                                                    trip.location
                                                }

                                            </p>

                                        </div>


                                        {/* DATE */}

                                        <div className="mt-6 grid grid-cols-2 gap-4 border-b pb-4">

                                            <div>

                                                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                                                    CHECK-IN
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                    {
                                                        trip.check_in
                                                    }
                                                </p>

                                            </div>


                                            <div>

                                                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                                                    CHECK-OUT
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                    {
                                                        trip.check_out
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        {/* GUEST + PRICE */}

                                        <div className="mt-4 grid grid-cols-2 gap-4">

                                            <div>

                                                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                                                    GUESTS
                                                </p>

                                                <p className="mt-1 text-sm text-gray-900">

                                                    {trip.guests}

                                                    {trip.guests === 1
                                                        ? " guest"
                                                        : " guests"}

                                                </p>

                                            </div>


                                            <div>

                                                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                                                    PRICE
                                                </p>

                                                <p className="mt-1 text-sm text-gray-900">

                                                    ₹
                                                    {trip.price_per_night.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                    <span className="text-gray-500">
                                                        {" "}
                                                        / night
                                                    </span>

                                                </p>

                                            </div>

                                        </div>


                                        {/* STATUS */}

                                        <div className="mt-auto pt-4">

                                            <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">

                                                Confirmed

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* =================================
                            END MESSAGE
                        ================================= */}

                        <p className="mt-10 text-center text-sm text-gray-400">

                            You've reached the end of your trips.

                        </p>

                    </>

                )}

            </div>

        </main>

    );
}