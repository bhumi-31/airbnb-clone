"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryBar from "./CategoryBar";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative bg-white">
            <div className="mx-auto flex h-[86px] max-w-[1600px] items-center px-14">
                <Link href="/">
                    <Image
                        src="/images.png"
                        alt="Airbnb"
                        width={180}
                        height={90}
                        className="object-contain"
                    />
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Suspense fallback={null}>
                        <CategoryBar />
                    </Suspense>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <Link
                        href="/host"
                        className="rounded-full px-4 py-3 font-medium hover:bg-gray-100"
                    >
                        Become a host
                    </Link>

                    <button className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100">
                        🌐
                    </button>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
                    >
                        ☰
                    </button>
                </div>

                {menuOpen && (
                    <div className="absolute right-14 top-[75px] z-50 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <Link
                            href="/host"
                            className="block cursor-pointer rounded-xl px-4 py-3 hover:bg-gray-100"
                        >
                            Airbnb your home
                        </Link>

                        <Link
                            href="/trips"
                            className="block cursor-pointer rounded-xl px-4 py-3 hover:bg-gray-100"
                        >
                            My Trips
                        </Link>

                        <Link
                            href="/favorites"
                            className="block cursor-pointer rounded-xl px-4 py-3 hover:bg-gray-100"
                        >
                            Favorites
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}