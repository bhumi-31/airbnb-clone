import MyTrips from "@/components/MyTrips";
import Link from "next/link";

export default function TripsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-8">

                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
                >
                    ← Back to stays
                </Link>

                

                {/* rest of your existing code */}
                <MyTrips/>
            </div>
        </main>
    );
}