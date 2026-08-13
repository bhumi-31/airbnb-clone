import HostBookings from "../../../components/host/HostBooking";

export default function ReservationsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-8 flex gap-8 border-b">
                    <a
                        href="/host"
                        className="pb-3 text-gray-500 hover:text-black"
                    >
                        Your listings
                    </a>

                    <a
                        href="/host/reservations"
                        className="border-b-2 border-black pb-3 font-semibold"
                    >
                        Reservations
                    </a>
                </div>

                <HostBookings />
            </div>
        </main>
    );
}