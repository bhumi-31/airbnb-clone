"use client";

import { useState } from "react";

interface SearchBarProps {
    onSearch: (
        location: string,
        guests: number,
        checkIn: string,
        checkOut: string
    ) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState(0);
    const [showGuests, setShowGuests] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    return (
        <div className="relative mx-auto mt-6 flex w-full max-w-5xl items-center rounded-full border bg-white p-1.5 shadow-lg">
            {/* Where */}
            <div className="flex-1 rounded-full px-6 py-2 hover:bg-gray-100">
                <p className="text-xs font-semibold">Where</p>
                <input
                    type="text"
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-500"
                />
            </div>

            <div className="h-10 border-l border-gray-300" />

            {/* When */}
            <div className="flex-1 rounded-full px-6 py-2 hover:bg-gray-100">
                <p className="text-xs font-semibold">When</p>
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-500 outline-none"
                    />
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-500 outline-none"
                    />
                </div>
            </div>

            <div className="h-10 border-l border-gray-300" />

            {/* Who */}
            <div className="relative flex-1 rounded-full px-6 py-2 hover:bg-gray-100">
                <button
                    onClick={() => setShowGuests(!showGuests)}
                    className="w-full cursor-pointer text-left"
                >
                    <p className="text-xs font-semibold">Who</p>
                    <p className="text-sm text-gray-500">
                        {guests === 0
                            ? "Add guests"
                            : `${guests} guest${guests > 1 ? "s" : ""}`}
                    </p>
                </button>

                {/* Guest dropdown */}
                {showGuests && (
                    <div className="absolute right-0 top-20 z-50 w-64 rounded-2xl border bg-white p-5 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Guests</p>
                                <p className="text-sm text-gray-500">
                                    Add guests
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        setGuests(Math.max(0, guests - 1))
                                    }
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-lg hover:bg-gray-100"
                                >
                                    −
                                </button>

                                <span className="w-4 text-center">
                                    {guests}
                                </span>

                                <button
                                    onClick={() => setGuests(guests + 1)}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-lg hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Search */}
            <button
                onClick={() =>
                    onSearch(location, guests, checkIn, checkOut)
                }
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-rose-500 text-white hover:bg-rose-600"
            >
                🔍
            </button>
        </div>
    );
}