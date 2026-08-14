"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "../../components/ToastProvider";

export default function CheckoutPage() {
    const { showToast } = useToast();

    const [listingId, setListingId] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const [nights, setNights] = useState(0);

    const [paying, setPaying] = useState(false);
    const [success, setSuccess] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">(
        "card"
    );

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setListingId(Number(params.get("listingId")) || 0);
        setCheckIn(params.get("checkIn") || "");
        setCheckOut(params.get("checkOut") || "");
        setGuests(Number(params.get("guests")) || 1);
        setPrice(Number(params.get("price")) || 0);
        setNights(Number(params.get("nights")) || 0);
    }, []);

    const subtotal = price * nights;
    const fee = subtotal * 0.1;
    const total = subtotal + fee;

    const handlePayment = async () => {
        try {
            setPaying(true);

            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            if (!API_URL) {
                showToast(
                    "API URL is not configured.",
                    "error"
                );
                return;
            }

            const response = await fetch(
                `${API_URL}/api/bookings/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        listing_id: listingId,
                        check_in: checkIn,
                        check_out: checkOut,
                        guests,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                showToast(
                    data.detail || "Booking failed.",
                    "error"
                );
                return;
            }

            setSuccess(true);

            showToast(
                "Payment successful!",
                "success"
            );

        } catch (error) {
            console.error("Payment error:", error);

            showToast(
                "Something went wrong. Please try again.",
                "error"
            );

        } finally {
            setPaying(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-16">
                <div className="mx-auto max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                        ✓
                    </div>

                    <h1 className="mt-5 text-2xl font-semibold">
                        Payment successful
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Your booking has been confirmed.
                    </p>

                    <Link
                        href="/trips"
                        className="mt-7 block cursor-pointer rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600"
                    >
                        View My Trips
                    </Link>

                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">

                <h1 className="text-3xl font-semibold">
                    Confirm and pay
                </h1>

                <div className="mt-8 grid gap-8 md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="rounded-2xl border bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Your stay
                        </h2>

                        <div className="mt-6 space-y-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Check-in
                                </span>

                                <span className="font-medium">
                                    {checkIn}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Check-out
                                </span>

                                <span className="font-medium">
                                    {checkOut}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Guests
                                </span>

                                <span className="font-medium">
                                    {guests}
                                </span>
                            </div>

                        </div>

                        {/* PAYMENT METHOD */}
                        <div className="mt-6 border-t pt-5">

                            <h3 className="font-semibold">
                                Payment method
                            </h3>

                            <div className="mt-4 space-y-3">

                                {/* CARD */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod("card")
                                    }
                                    className={`w-full cursor-pointer rounded-xl border p-4 text-left transition ${
                                        paymentMethod === "card"
                                            ? "border-rose-500 bg-rose-50"
                                            : "border-gray-300 hover:border-gray-500"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="font-medium">
                                                💳 Card
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Mock payment
                                            </p>
                                        </div>

                                        {paymentMethod === "card" && (
                                            <span className="text-rose-500">
                                                ✓
                                            </span>
                                        )}

                                    </div>
                                </button>

                                {/* UPI */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod("upi")
                                    }
                                    className={`w-full cursor-pointer rounded-xl border p-4 text-left transition ${
                                        paymentMethod === "upi"
                                            ? "border-rose-500 bg-rose-50"
                                            : "border-gray-300 hover:border-gray-500"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="font-medium">
                                                UPI
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Mock payment
                                            </p>
                                        </div>

                                        {paymentMethod === "upi" && (
                                            <span className="text-rose-500">
                                                ✓
                                            </span>
                                        )}

                                    </div>
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="h-fit rounded-2xl border bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Price details
                        </h2>

                        <div className="mt-6 space-y-4">

                            <div className="flex justify-between">
                                <span>
                                    ₹{price.toLocaleString("en-IN")} ×{" "}
                                    {nights} nights
                                </span>

                                <span>
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    Service fee
                                </span>

                                <span>
                                    ₹{fee.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between border-t pt-4 text-lg font-semibold">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{total.toLocaleString("en-IN")}
                                </span>

                            </div>

                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={paying}
                            className="mt-7 w-full cursor-pointer rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            {paying
                                ? "Processing payment..."
                                : `Pay ₹${total.toLocaleString("en-IN")}`}
                        </button>

                        <p className="mt-3 text-center text-xs text-gray-500">
                            This is a mock payment. No real money will be charged.
                        </p>

                    </div>

                </div>
            </div>
        </main>
    );
}