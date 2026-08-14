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

const destinations = [
    { name: "Nearby", subtitle: "Find what's around you", icon: "📍" },
    { name: "Chandigarh", subtitle: "Near you", icon: "🏙️" },
    { name: "Amritsar", subtitle: "Popular destination", icon: "🏛️" },
    { name: "Shimla", subtitle: "For nature lovers", icon: "🏔️" },
    { name: "Goa", subtitle: "Popular beach destination", icon: "🌴" },
    { name: "Manali", subtitle: "For mountain lovers", icon: "🏔️" },
];

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState(0);
    const [showGuests, setShowGuests] = useState(false);
    const [showWhere, setShowWhere] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    return (
        <div className="relative mx-auto mt-6 flex w-full max-w-5xl items-center rounded-full border bg-white p-1.5 shadow-lg">
            <div className="relative flex-1">
                <button
                    onClick={() => {
                        setShowWhere(!showWhere);
                        setShowGuests(false);
                    }}
                    className="w-full cursor-pointer rounded-full px-6 py-2 text-left hover:bg-gray-100"
                >
                    <p className="text-xs font-semibold">Where</p>
                    <p className="text-sm text-gray-500">
                        {location || "Search destinations"}
                    </p>
                </button>

                {showWhere && (
                    <div className="absolute left-0 top-20 z-50 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <p className="px-3 py-2 text-xs font-medium text-gray-500">
                            Suggested destinations
                        </p>
                        {destinations.map((destination) => (
                            <button
                                key={destination.name}
                                onClick={() => {
                                    setLocation(destination.name === "Nearby" ? "" : destination.name);
                                    setShowWhere(false);
                                }}
                                className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left hover:bg-gray-100"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                                    {destination.icon}
                                </span>
                                <span>
                                    <span className="block text-sm font-medium">
                                        {destination.name}
                                    </span>
                                    <span className="block text-sm text-gray-500">
                                        {destination.subtitle}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-10 border-l border-gray-300" />

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

            <div className="relative flex-1 rounded-full px-6 py-2 hover:bg-gray-100">
                <button
                    onClick={() => {
                        setShowGuests(!showGuests);
                        setShowWhere(false);
                    }}
                    className="w-full cursor-pointer text-left"
                >
                    <p className="text-xs font-semibold">Who</p>
                    <p className="text-sm text-gray-500">
                        {guests === 0 ? "Add guests" : `${guests} guest${guests > 1 ? "s" : ""}`}
                    </p>
                </button>

                {showGuests && (
                    <div className="absolute right-0 top-20 z-50 w-64 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Guests</p>
                                <p className="text-sm text-gray-500">Add guests</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setGuests(Math.max(0, guests - 1))}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-lg hover:bg-gray-100"
                                >
                                    −
                                </button>
                                <span className="w-4 text-center">{guests}</span>
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

            <button
                onClick={() => onSearch(location, guests, checkIn, checkOut)}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-rose-500 text-white hover:bg-rose-600"
            >
                🔍
            </button>
        </div>
    );
}