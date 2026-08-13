"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

interface BookingCardProps {
    listingId: number;
    pricePerNight: number;
    maxGuests?: number;
}

export default function BookingCard({
    listingId,
    pricePerNight,
    maxGuests = 4,
}: BookingCardProps) {
    const router = useRouter();
    const { showToast } = useToast();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    let nights = 0;

    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    }

    const subtotal = pricePerNight * nights;
    const fee = subtotal * 0.1;
    const total = subtotal + fee;

    const handleReserve = () => {
        if (!checkIn || !checkOut || nights <= 0) {
            showToast("Please select valid dates.", "error");
            return;
        }

        if (guests > maxGuests) {
            showToast(`Maximum ${maxGuests} guests allowed.`, "error");
            return;
        }

        const params = new URLSearchParams({
            listingId: listingId.toString(),
            checkIn,
            checkOut,
            guests: guests.toString(),
            price: pricePerNight.toString(),
            nights: nights.toString(),
        });

        router.push(`/checkout?${params.toString()}`);
    };

    return (
        <div className="sticky top-28 rounded-2xl border bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold">
                ₹{pricePerNight.toLocaleString("en-IN")}
                <span className="font-normal text-gray-600"> / night</span>
            </h2>

            <div className="mt-5 grid grid-cols-2 rounded-xl border">
                <div className="border-r p-3">
                    <p className="text-xs font-semibold">CHECK-IN</p>
                    <input
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="mt-2 w-full text-sm"
                    />
                </div>

                <div className="p-3">
                    <p className="text-xs font-semibold">CHECKOUT</p>
                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split("T")[0]}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="mt-2 w-full text-sm"
                    />
                </div>
            </div>

            <div className="mt-4 rounded-xl border p-3">
                <label className="text-xs font-semibold">GUESTS</label>

                <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-2 w-full bg-white text-sm outline-none"
                >
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                        (number) => (
                            <option key={number} value={number}>
                                {number} {number === 1 ? "guest" : "guests"}
                            </option>
                        )
                    )}
                </select>
            </div>

            <button
                onClick={handleReserve}
                disabled={!checkIn || !checkOut || nights <= 0}
                className="mt-5 w-full rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 disabled:bg-gray-300"
            >
                Reserve
            </button>

            {nights > 0 && (
                <div className="mt-6 space-y-3 border-t pt-5">
                    <div className="flex justify-between">
                        <span>
                            ₹{pricePerNight.toLocaleString("en-IN")} × {nights} nights
                        </span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>₹{fee.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between border-t pt-3 font-semibold">
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>
                </div>
            )}
        </div>
    );
}