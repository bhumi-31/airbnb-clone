from database import SessionLocal
from models.listing import Listing
from models.user import User


new_listings = [
    Listing(
        title="Desert Camp",
        description="Unique desert stay with beautiful sunset views and traditional interiors.",
        location="Jaisalmer, India",
        price_per_night=3500,
        property_type="Cabin",
        max_guests=4,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1548013146-72479768bada",
        amenities="WiFi, Parking, Air conditioning, Kitchen"
    ),

    Listing(
        title="Forest Cottage",
        description="Quiet cottage surrounded by lush greenery and peaceful nature.",
        location="Rishikesh, India",
        price_per_night=4000,
        property_type="Cottage",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        amenities="WiFi, Parking, Kitchen, Heating"
    ),

    Listing(
        title="Luxury City Apartment",
        description="Stylish apartment with modern interiors in a prime city location.",
        location="Delhi, India",
        price_per_night=4800,
        property_type="Apartment",
        max_guests=3,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        amenities="WiFi, Air conditioning, Kitchen, TV"
    ),

    Listing(
        title="Hilltop Villa",
        description="Beautiful hilltop villa offering peaceful surroundings and mountain views.",
        location="Shimla, India",
        price_per_night=5600,
        property_type="Villa",
        max_guests=6,
        rating=4.9,
        image_url="https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        amenities="WiFi, Mountain view, Parking, Fireplace, Kitchen"
    ),

    Listing(
        title="Riverside Cottage",
        description="Relaxing cottage beside the river, perfect for a peaceful getaway.",
        location="Rishikesh, India",
        price_per_night=3900,
        property_type="Cottage",
        max_guests=4,
        rating=4.6,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        amenities="WiFi, River view, Parking, Kitchen"
    ),

    Listing(
        title="Beachside Apartment",
        description="Modern apartment close to the beach with beautiful coastal views.",
        location="Goa, India",
        price_per_night=5000,
        property_type="Apartment",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities="WiFi, Pool, Air conditioning, Kitchen, Beach access"
    ),

    Listing(
        title="Luxury Beach Villa",
        description="Beautiful beachfront villa with a private pool and stunning ocean views.",
        location="Goa, India",
        price_per_night=6500,
        property_type="Villa",
        max_guests=6,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        amenities="WiFi, Private pool, Beach access, Kitchen, Air conditioning"
    ),

    Listing(
        title="Cozy Mountain Cabin",
        description="Peaceful wooden cabin surrounded by mountains and nature.",
        location="Manali, India",
        price_per_night=3400,
        property_type="Cabin",
        max_guests=4,
        rating=4.9,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        amenities="WiFi, Mountain view, Fireplace, Parking, Heating"
    ),

    Listing(
        title="Modern City Apartment",
        description="Modern apartment located in the heart of Mumbai.",
        location="Mumbai, India",
        price_per_night=3800,
        property_type="Apartment",
        max_guests=3,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1554995207-c18c203602cb",
        amenities="WiFi, Air conditioning, Kitchen, TV, Elevator"
    ),

    Listing(
        title="Lake View Retreat",
        description="Peaceful retreat with beautiful lake views and modern interiors.",
        location="Udaipur, India",
        price_per_night=5800,
        property_type="House",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        amenities="WiFi, Lake view, Parking, Kitchen, Air conditioning"
    ),

    Listing(
        title="Kerala Beach House",
        description="Relaxing beach house surrounded by palm trees and beautiful coastal views.",
        location="Kerala, India",
        price_per_night=4200,
        property_type="House",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        amenities="WiFi, Beach access, Garden, Kitchen, Parking"
    ),

    Listing(
        title="Mountain View House",
        description="Spacious house with breathtaking mountain views and a peaceful atmosphere.",
        location="Mussoorie, India",
        price_per_night=5200,
        property_type="House",
        max_guests=6,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        amenities="WiFi, Mountain view, Parking, Fireplace, Kitchen"
    ),
]


def seed_listings():
    db = SessionLocal()

    try:
        # Create a demo host if one doesn't already exist
        host = db.query(User).filter(
            User.name == "Demo Host"
        ).first()

        if not host:
            host = User(
                name="Demo Host",
                role="host"
            )

            db.add(host)
            db.commit()
            db.refresh(host)

            print(f"Created seed host with ID: {host.id}")

        # Add listings only if the database is empty
        existing_count = db.query(Listing).count()

        if existing_count == 0:

            for listing in new_listings:
                listing.host_id = host.id

            db.add_all(new_listings)
            db.commit()

            print("12 listings added successfully")

        else:
            print(
                f"Listings already exist: {existing_count}"
            )

    finally:
        db.close()


if __name__ == "__main__":
    seed_listings()