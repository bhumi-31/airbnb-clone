import { Listing } from "../types/listing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// PUBLIC LISTINGS
export async function getListings(): Promise<Listing[]> {
    const response = await fetch(
        `${API_URL}/api/listings`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch listings");
    }

    return response.json();
}


// HOST LISTING DATA
export interface HostListingData {
    title: string;
    description: string;
    location: string;
    price_per_night: number;
    property_type: string;
    max_guests: number;
    image_url: string;
    amenities: string;
}


// GET HOST LISTINGS
export async function getHostListings(
    hostId: number
): Promise<Listing[]> {

    const response = await fetch(
        `${API_URL}/api/host/listings?host_id=${hostId}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch host listings"
        );
    }

    return response.json();
}


// CREATE LISTING
export async function createListing(
    hostId: number,
    listing: HostListingData
): Promise<Listing> {

    const response = await fetch(
        `${API_URL}/api/host/listings?host_id=${hostId}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(listing),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create listing"
        );
    }

    return response.json();
}


// UPDATE LISTING
export async function updateListing(
    hostId: number,
    listingId: number,
    listing: HostListingData
): Promise<Listing> {

    const response = await fetch(
        `${API_URL}/api/host/listings/${listingId}?host_id=${hostId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(listing),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to update listing"
        );
    }

    return response.json();
}


// DELETE LISTING
export async function deleteListing(
    hostId: number,
    listingId: number
): Promise<void> {

    const response = await fetch(
        `${API_URL}/api/host/listings/${listingId}?host_id=${hostId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to delete listing"
        );
    }
}



// HOST BOOKINGS
export interface HostBooking {
    id: number;
    listing_id: number;
    listing_title: string;
    location: string;
    price_per_night: number;
    check_in: string;
    check_out: string;
    guests: number;
}

export async function getHostBookings(
    hostId: number
): Promise<HostBooking[]> {

    const response = await fetch(
        `${API_URL}/api/host/bookings?host_id=${hostId}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch host bookings"
        );
    }

    return response.json();
}

// =====================================================
// MY TRIPS


export interface MyTrip {
    id: number;
    listing_id: number;
    listing_title: string;
    location: string;
    image_url: string;
    price_per_night: number;
    check_in: string;
    check_out: string;
    guests: number;
}

export async function getMyTrips(): Promise<MyTrip[]> {

    const response = await fetch(
        `${API_URL}/api/bookings/my-trips`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch trips"
        );
    }

    return response.json();
}