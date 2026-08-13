import Link from "next/link";
import BookingCard from "../../../components/BookingCard";

interface Listing {
    id: number;
    title: string;
    description: string;
    location: string;
    price_per_night: number;
    property_type: string;
    max_guests: number;
    rating: number;
    image_url: string;
    amenities: string | null;
}

interface ListingPageProp {
    params: Promise<{
        id: string;
    }>;
}

export default async function ListingPage({
    params,
}: ListingPageProp) {
    const { id } = await params;

    const response = await fetch(
        `http://127.0.0.1:8000/api/listings/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-2xl font-semibold">
                    Listing not found
                </h1>

                <Link
                    href="/"
                    className="mt-4 inline-block text-rose-500"
                >
                    ← Back to listings
                </Link>
            </main>
        );
    }

    const listing: Listing = await response.json();

    return (
        <main className="mx-auto max-w-7xl px-6 py-8">

            {/* Back */}
            <Link
                href="/"
                className="mb-6 inline-block text-sm font-medium hover:underline"
            >
                ← Back to stays
            </Link>

            {/* Title */}
            <div className="mb-6">
                <h1 className="text-3xl font-semibold">
                    {listing.title}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span>★ {listing.rating}</span>
                    <span>·</span>
                    <span>{listing.location}</span>
                </div>
            </div>

            {/* Photo Gallery */}
            <div className="mb-8 grid h-[450px] grid-cols-2 gap-2 overflow-hidden rounded-2xl md:grid-cols-4">

                <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="col-span-2 h-full w-full object-cover md:row-span-2"
                />

                <img
                    src={listing.image_url}
                    alt=""
                    className="hidden h-full w-full object-cover md:block"
                />

                <img
                    src={listing.image_url}
                    alt=""
                    className="hidden h-full w-full object-cover md:block"
                />

                <img
                    src={listing.image_url}
                    alt=""
                    className="hidden h-full w-full object-cover md:block"
                />

            </div>

            {/* Main Content */}
            <div className="grid gap-10 md:grid-cols-3">

                {/* Left */}
                <div className="md:col-span-2">

                    {/* Host / Property */}
                    <div className="border-b pb-8">
                        <h2 className="text-xl font-semibold">
                            {listing.property_type} hosted by Airbnb Host
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {listing.max_guests} guests
                        </p>
                    </div>

                    {/* Description */}
                    <section className="border-b py-8">
                        <h2 className="text-xl font-semibold">
                            About this place
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            {listing.description}
                        </p>
                    </section>

                    {/* Amenities */}
                    <section className="border-b py-8">
                        <h2 className="text-xl font-semibold">
                            What this place offers
                        </h2>

                        <div className="mt-5 grid grid-cols-2 gap-5">
                            {listing.amenities
                                ?.split(",")
                                .map((amenity) => (
                                    <div key={amenity}>
                                        {amenity.trim()}
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="py-8">
                        <h2 className="text-xl font-semibold">
                            ⭐ {listing.rating} · Reviews
                        </h2>

                        <div className="mt-6 space-y-5">

                            <div>
                                <p className="font-semibold">
                                    Great place!
                                </p>

                                <p className="mt-1 text-gray-600">
                                    Beautiful property and excellent location.
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Amazing stay
                                </p>

                                <p className="mt-1 text-gray-600">
                                    Very comfortable and clean.
                                </p>
                            </div>

                        </div>
                    </section>

                </div>

                {/* Booking Card */}
                <div>
                    <BookingCard
                        listingId={listing.id}
                        pricePerNight={listing.price_per_night}
                        maxGuests={listing.max_guests}
                    />
                </div>

            </div>

        </main>
    );
}